import React from 'react';
import { DeckAnalysis } from '../types';
import { X, Bot, Trophy, Users, Star } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  analysis: DeckAnalysis | null;
}

const getGrade = (score: number) => {
  if (score >= 95) return { grade: 'S+', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500' };
  if (score >= 90) return { grade: 'S', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500' };
  if (score >= 80) return { grade: 'A', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500' };
  if (score >= 70) return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500' };
  if (score >= 60) return { grade: 'C', color: 'text-slate-300', bg: 'bg-slate-500/20', border: 'border-slate-500' };
  return { grade: 'D', color: 'text-gray-500', bg: 'bg-gray-500/20', border: 'border-gray-500' };
};

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, isLoading, analysis }) => {
  if (!isOpen) return null;

  const gradeInfo = analysis ? getGrade(analysis.synergyScore) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-yellow-100 font-serif">强化评分结果</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="relative">
                 <div className="w-16 h-16 border-4 border-slate-700 rounded-full"></div>
                 <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                 <Bot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-500" />
              </div>
              <div className="text-center">
                <p className="text-cyan-400 font-bold text-lg animate-pulse">海克斯核心计算中...</p>
                <p className="text-slate-500 text-sm mt-1">正在评估卡片协同与强度</p>
              </div>
            </div>
          ) : analysis && gradeInfo ? (
            <div className="space-y-8">
              
              {/* Score & Grade Display */}
              <div className="flex items-center justify-center gap-8">
                {/* Numeric Score */}
                <div className="flex flex-col items-center">
                  <div className="relative flex items-center justify-center w-24 h-24">
                     <svg className="w-full h-full transform -rotate-90">
                       <circle className="text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" r="44" cx="48" cy="48" />
                       <circle 
                          className={gradeInfo.color} 
                          strokeWidth="8" 
                          strokeDasharray={276} 
                          strokeDashoffset={276 - (276 * analysis.synergyScore) / 100} 
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="44" cx="48" cy="48" 
                        />
                     </svg>
                     <span className={`absolute text-3xl font-bold ${gradeInfo.color}`}>{analysis.synergyScore}</span>
                  </div>
                  <span className="text-sm text-slate-400 mt-2 font-medium tracking-wider">综合评分</span>
                </div>

                {/* Letter Grade */}
                <div className="flex flex-col items-center">
                   <div className={`w-24 h-24 flex items-center justify-center rounded-2xl border-4 ${gradeInfo.border} ${gradeInfo.bg} shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
                      <span className={`text-6xl font-serif font-black italic ${gradeInfo.color} drop-shadow-lg`}>{gradeInfo.grade}</span>
                   </div>
                   <span className="text-sm text-slate-400 mt-2 font-medium tracking-wider">强度评级</span>
                </div>
              </div>

              {/* Text Analysis */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 shadow-inner">
                <div className="flex items-center gap-2 mb-2 text-cyan-300">
                  <Bot className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">AI 点评</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                  {analysis.analysis}
                </p>
              </div>

              {/* Suggested Champions */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-cyan-300 border-b border-slate-700/50 pb-2">
                  <Users className="w-5 h-5" />
                  <h3 className="font-bold text-base uppercase tracking-wider">适配英雄</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedChampions.map((champ, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-lg shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] text-slate-300">{champ[0]}</span>
                      </div>
                      <span className="text-slate-200 text-sm font-medium">{champ}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center text-slate-400 py-8">
              暂无分析数据。
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-800/50 text-center flex justify-center items-center gap-1.5">
          <Star className="w-3 h-3 text-yellow-500" />
          <p className="text-xs text-slate-500">Gemini AI 实时分析 • 仅供娱乐参考</p>
        </div>
      </div>
    </div>
  );
};
