import { GoogleGenAI, Type } from "@google/genai";
import { DeckAnalysis, HextechCard } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDeck = async (cards: HextechCard[]): Promise<DeckAnalysis> => {
  if (!cards || cards.length === 0) {
    return {
      synergyScore: 0,
      analysis: "请至少选择一张卡片进行分析。",
      suggestedChampions: []
    };
  }

  const cardNames = cards.map(c => `${c.name} (${c.tier})`).join(', ');

  const prompt = `
    作为英雄联盟斗魂竞技场(Arena)模式的专家级教练，请对玩家选择的以下海克斯强化组合进行严厉且专业的评分。
    
    卡片组合: ${cardNames}。
    
    请严格评估这些强化的协同效应、强度上限以及是否互斥。
    协同评分(synergyScore)说明：
    - 95-100: 完美的神级组合（T0），几乎必胜，如"珠光护手+全能吸血+暴击流"。
    - 85-94: 极强的T1组合，有核心思路。
    - 70-84: 还可以的T2组合，有一些配合但不够极致。
    - 50-69: 比较平庸，可能是散件堆砌。
    - 0-49: 糟糕的选择，强化之间互相矛盾或毫无收益。

    请提供：
    1. 协同评分 (0-100)。
    2. 用简短犀利的中文点评这个组合的优缺点（100字以内）。
    3. 列出3个最适合此构建的英雄名称。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            synergyScore: { type: Type.NUMBER },
            analysis: { type: Type.STRING },
            suggestedChampions: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['synergyScore', 'analysis', 'suggestedChampions']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as DeckAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      synergyScore: 0,
      analysis: "分析失败。海克斯核心暂时无法响应，请稍后重试。",
      suggestedChampions: []
    };
  }
};

export const recommendAugments = async (championName: string, allCards: HextechCard[]): Promise<string[]> => {
  // To avoid sending too much data, we only send simplified card list (ID, Name, Tier)
  const simplifiedCards = allCards.map(c => `ID:${c.id}, Name:${c.name}, Tier:${c.tier}`).join('\n');
  
  const prompt = `
    我是英雄联盟(League of Legends)斗魂竞技场(Arena)模式的玩家。
    我选择的英雄是: ${championName}。
    请从以下海克斯强化列表中，选出最适合该英雄的4个强化的ID。
    列表:
    ${simplifiedCards}

    返回结果必须是一个包含4个ID字符串的JSON数组。不要包含其他任何解释。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const recommendedIds = JSON.parse(text);
    return Array.isArray(recommendedIds) ? recommendedIds : [];
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return [];
  }
};
