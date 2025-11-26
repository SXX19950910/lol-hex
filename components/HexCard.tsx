
import React from 'react';
import { HextechCard, CardTier } from '../types';
import { Sparkles, Shield, Zap, Sword, Flame, Heart, RefreshCw, Crosshair, Wind, Ghost, Snowflake, Footprints, Coins, Crown, Skull, Timer, Smile, Star, Anchor, Droplet, Trophy, FlaskConical, Dices, Home, HeartCrack, Dumbbell, ChevronsRight, Bomb, Volume2, Users, Mountain } from 'lucide-react';

interface HexCardProps {
  card: HextechCard;
  isSelected: boolean;
  onSelect: (card: HextechCard) => void;
}

const getCardIcon = (name: string, tier: CardTier) => {
  // Specific mappings for new cards based on images
  if (name.includes('不动如山')) return <Anchor className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('杀戮')) return <Skull className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('飞弹')) return <Ghost className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('闪电')) return <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('基石法师')) return <Flame className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('关键')) return <Crosshair className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('钢化你心')) return <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('溢流')) return <Droplet className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('仆从')) return <Ghost className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('回力')) return <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('狂徒')) return <Footprints className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('坚韧')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('坦克引擎')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  
  if (name.includes('佳酿')) return <FlaskConical className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('瞄准镜') || name.includes('狙神')) return <Crosshair className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('循环') || name.includes('往复')) return <Timer className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('无休') || name.includes('回复') || name.includes('虹吸')) return <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('炽烈') || name.includes('黎明') || name.includes('一板一眼')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('缩小') || name.includes('射线')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('心灵净化')) return <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Latest batch mappings
  if (name.includes('穿针')) return <Crosshair className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('质变')) return <Dices className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('接二连三')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('狂妄')) return <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('无尽')) return <Coins className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('耀光')) return <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Newest batch (Image 5)
  if (name.includes('易损')) return <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('急急小子')) return <Wind className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('回城')) return <Home className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('律动')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('夜狩')) return <Ghost className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Image 6
  if (name.includes('吸血习性')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('神射法师')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Silver Cards (Image 7 & 8)
  if (name.includes('物理转魔法')) return <FlaskConical className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('大力')) return <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('霸符兄弟')) return <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('灵巧')) return <Wind className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('俯冲轰炸')) return <HeartCrack className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('唯快不破')) return <ChevronsRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('侵蚀')) return <Skull className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('急救用具')) return <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('闪光弹')) return <Wind className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('冰霜') || name.includes('幽灵')) return <Snowflake className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('渴血')) return <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('恶趣味')) return <Anchor className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Silver Cards (Image 9)
  if (name.includes('重量级')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('冰寒')) return <Anchor className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('练腿')) return <Footprints className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('由心及物')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('炼狱龙魂')) return <Flame className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('海洋龙魂')) return <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Silver Cards (Image 10)
  if (name.includes('退敌力场')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('自我毁灭')) return <Bomb className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('暗影疾奔')) return <Wind className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('扇巴掌')) return <Anchor className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Silver Cards (Image 11)
  if (name.includes('天音爆')) return <Volume2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('旋转至胜')) return <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('会心防御')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('残暴之力')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('折磨者')) return <Flame className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Silver Cards (Image 12)
  if (name.includes('台风')) return <Wind className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('不可阻挡')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('巫师')) return <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('磐石')) return <Anchor className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('魔法转物理')) return <FlaskConical className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('良性循环')) return <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('升级')) return <FlaskConical className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Silver Cards (Image 13 - Latest)
  if (name.includes('逃跑计划')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('血上加伤')) return <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('闪闪现现')) return <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('帽上加帽')) return <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('强力护盾')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('吵闹鬼')) return <Ghost className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // Silver Cards (Image 14 - Latest)
  if (name.includes('活力再生')) return <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('快中求稳')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('防护面纱')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('刃下生风')) return <Wind className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('点亮他们')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('山脉龙魂')) return <Mountain className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('家园卫士')) return <Footprints className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  if (name.includes('面包') || name.includes('急速')) return <Timer className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('星') || name.includes('干预')) return <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('大脑')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('闪现') || name.includes('快感')) return <Footprints className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('全心为你') || name.includes('坚决')) return <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('裁决') || name.includes('武器')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  
  // Existing specific mappings
  if (name.includes('雪球')) return <Snowflake className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('靴') || name.includes('踢踏舞') || name.includes('身法')) return <Footprints className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('金') || name.includes('任务') || name.includes('有始有终')) return <Coins className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('王') || name.includes('冠')) return <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('死') || name.includes('不祥') || name.includes('残忍')) return <Skull className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('时间') || name.includes('尤里卡') || name.includes('发明家')) return <Timer className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('小丑') || name.includes('猫咪')) return <Smile className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;

  // General fallback logic
  if (name.includes('巨人') || name.includes('龙魂') || name.includes('心') || name.includes('奶昔')) return <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('拳') || name.includes('剑') || name.includes('穿透') || name.includes('砍') || name.includes('斩')) return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('巫术') || name.includes('珠光') || name.includes('法') || name.includes('魔')) return <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('火') || name.includes('炼狱') || name.includes('燃烧') || name.includes('慢炖')) return <Flame className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('治疗') || name.includes('复') || name.includes('友') || name.includes('诺言')) return <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('刷新') || name.includes('急速') || name.includes('唤醒')) return <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('瞄准') || name.includes('弱点') || name.includes('激光')) return <Crosshair className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('风') || name.includes('行')) return <Wind className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (name.includes('暗影') || name.includes('消失') || name.includes('不可选取')) return <Ghost className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  
  // Tier fallbacks
  if (tier === CardTier.PRISMATIC) return <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  if (tier === CardTier.GOLD) return <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
  return <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
};

export const HexCard: React.FC<HexCardProps> = ({ card, isSelected, onSelect }) => {
  const isPrismatic = card.tier === CardTier.PRISMATIC;
  const isGold = card.tier === CardTier.GOLD;

  // Base styles for the card container
  let cardBorderClass = '';
  let cardBgClass = '';
  let headerBgClass = '';
  let titleColorClass = '';
  let glowClass = '';
  let iconContainerClass = '';
  let iconColorClass = '';
  let selectionRingClass = '';

  if (isPrismatic) {
    cardBorderClass = 'border-fuchsia-400';
    cardBgClass = 'bg-slate-900';
    headerBgClass = 'bg-gradient-to-r from-purple-900 via-fuchsia-900 to-purple-900';
    titleColorClass = 'text-transparent bg-clip-text bg-gradient-to-b from-white to-fuchsia-200';
    // Remove scale from glow/selection state, use translation and shadow only
    glowClass = isSelected 
      ? 'shadow-[0_0_25px_rgba(217,70,239,0.6)] border-fuchsia-300' 
      : 'hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:border-fuchsia-400';
    iconContainerClass = 'bg-gradient-to-br from-fuchsia-950 to-purple-950 border-fuchsia-500/50';
    iconColorClass = 'text-fuchsia-300 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]';
    selectionRingClass = 'ring-2 ring-fuchsia-400 ring-offset-2 ring-offset-slate-900';
  } else if (isGold) {
    cardBorderClass = 'border-yellow-500';
    cardBgClass = 'bg-slate-900';
    headerBgClass = 'bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-900';
    titleColorClass = 'text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-200';
    glowClass = isSelected 
      ? 'shadow-[0_0_25px_rgba(234,179,8,0.6)] border-yellow-300' 
      : 'hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:border-yellow-400';
    iconContainerClass = 'bg-gradient-to-br from-yellow-950 to-amber-950 border-yellow-500/50';
    iconColorClass = 'text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]';
    selectionRingClass = 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-slate-900';
  } else {
    // Silver
    cardBorderClass = 'border-slate-400';
    cardBgClass = 'bg-slate-900';
    headerBgClass = 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800';
    titleColorClass = 'text-slate-200';
    glowClass = isSelected 
      ? 'shadow-[0_0_25px_rgba(148,163,184,0.6)] border-slate-200' 
      : 'hover:shadow-[0_0_15px_rgba(148,163,184,0.3)] hover:border-slate-300';
    iconContainerClass = 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-500/50';
    iconColorClass = 'text-slate-300 drop-shadow-[0_0_5px_rgba(148,163,184,0.8)]';
    selectionRingClass = 'ring-2 ring-slate-300 ring-offset-2 ring-offset-slate-900';
  }

  return (
    <div
      onClick={() => onSelect(card)}
      className={`
        relative group cursor-pointer 
        flex flex-col
        h-[340px] sm:h-[380px] md:h-[420px] 
        w-full
        transition-all duration-200 ease-out
        ${isSelected ? 'z-10 -translate-y-2' : 'z-0 hover:z-30 hover:-translate-y-2'}
      `}
    >
      {/* Selection Checkmark Overlay */}
      {isSelected && (
        <div className={`
          absolute -top-3 -right-3 z-50 rounded-full p-1 shadow-lg border-2 border-slate-900
          animate-in zoom-in duration-200
          ${isPrismatic ? 'bg-fuchsia-500' : isGold ? 'bg-yellow-500' : 'bg-slate-500'}
        `}>
           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
      )}

      {/* Main Card Container */}
      <div className={`
        relative flex flex-col h-full
        border-2 sm:border-[3px] rounded-sm
        ${cardBorderClass} ${cardBgClass} ${glowClass}
        ${isSelected ? selectionRingClass : ''}
        overflow-hidden
        transition-colors duration-200
      `}>
        
        {/* Top Metallic Header Bar */}
        <div className={`
          relative h-8 sm:h-10 md:h-12 flex items-center justify-center shrink-0
          border-b-2 ${isPrismatic ? 'border-fuchsia-500/50' : isGold ? 'border-yellow-500/50' : 'border-slate-500/50'}
          ${headerBgClass}
        `}>
          {/* Tier Label */}
          <span className={`text-xs sm:text-sm font-bold uppercase tracking-[0.2em] ${isPrismatic ? 'text-fuchsia-200' : isGold ? 'text-yellow-100' : 'text-slate-300'}`}>
            {card.tier}
          </span>
          
          {/* Decorative side accents */}
          <div className="absolute left-2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/50 rounded-full" />
          <div className="absolute right-2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/50 rounded-full" />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col p-2 sm:p-4 relative">
          
          {/* Background Gradient */}
          <div className={`absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${
            isPrismatic ? 'from-fuchsia-900 via-slate-900 to-slate-900' : 
            isGold ? 'from-yellow-900 via-slate-900 to-slate-900' : 
            'from-slate-700 via-slate-900 to-slate-900'
          }`} />

          {/* Icon Area - Compact on mobile */}
          <div className="flex justify-center mb-1 sm:mb-2 relative z-10 shrink-0 mt-3 sm:mt-4">
            <div className={`
              w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 
              rotate-45 flex items-center justify-center 
              border-2 shadow-inner transition-transform duration-300 group-hover:scale-110
              ${iconContainerClass}
            `}>
              <div className={`-rotate-45 ${iconColorClass}`}>
                {getCardIcon(card.name, card.tier)}
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="relative z-10 text-center flex flex-col items-center flex-1 overflow-hidden mt-1 sm:mt-2 min-h-0">
            <h3 className={`font-serif text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 leading-tight ${titleColorClass} line-clamp-1`}>
              {card.name}
            </h3>
            
            {/* Divider */}
            <div className={`w-8 sm:w-16 h-px mb-2 sm:mb-3 shrink-0 ${isPrismatic ? 'bg-fuchsia-500/50' : isGold ? 'bg-yellow-500/50' : 'bg-slate-500/50'}`} />
            
            {/* Description - Scroll enabled, padded */}
            <div className="flex-1 overflow-y-auto w-full px-1 custom-scrollbar">
              <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed ${isPrismatic ? 'text-fuchsia-100/90' : isGold ? 'text-yellow-100/90' : 'text-slate-300'}`}>
                {card.description}
              </p>
            </div>
          </div>

          {/* Tags (Bottom) */}
          <div className="mt-2 pt-2 flex justify-center gap-1 flex-wrap relative z-10 shrink-0 opacity-80 sm:opacity-70 group-hover:opacity-100 transition-opacity">
            {card.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className={`
                text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider
                ${isPrismatic 
                  ? 'border-fuchsia-700 bg-fuchsia-950/50 text-fuchsia-300' 
                  : isGold 
                  ? 'border-yellow-700 bg-yellow-950/50 text-yellow-300' 
                  : 'border-slate-600 bg-slate-800/50 text-slate-400'}
              `}>
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
