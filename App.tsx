import React, { useState, useMemo } from 'react';
import { HEXTECH_CARDS } from './data/hextechCards';
import { CardTier, HextechCard, DeckAnalysis, Champion } from './types';
import { HexCard } from './components/HexCard';
import { AnalysisModal } from './components/AnalysisModal';
import { ChampionSelector } from './components/ChampionSelector';
import { analyzeDeck, recommendAugments } from './services/gemini';
import { Search, Filter, Box, Zap, Trophy, X } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<HextechCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTierFilter, setActiveTierFilter] = useState<CardTier | '全部'>('全部');
  
  // Champion Logic
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [isAutoMatching, setIsAutoMatching] = useState(false);

  // Analysis Logic
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DeckAnalysis | null>(null);

  const filteredCards = useMemo(() => {
    return HEXTECH_CARDS.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            card.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = activeTierFilter === '全部' || card.tier === activeTierFilter;
      return matchesSearch && matchesTier;
    });
  }, [searchTerm, activeTierFilter]);

  const toggleCardSelection = (card: HextechCard) => {
    if (selectedCards.find(c => c.id === card.id)) {
      setSelectedCards(prev => prev.filter(c => c.id !== card.id));
    } else {
      if (selectedCards.length >= 4) {
        // Optional: Maybe show a toast instead of alert for better UI
        alert("你最多只能选择 4 个强化进行分析。");
        return;
      }
      setSelectedCards(prev => [...prev, card]);
    }
  };

  const handleAnalyze = async () => {
    if (selectedCards.length === 0) return;
    
    setIsAnalysisOpen(true);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const result = await analyzeDeck(selectedCards);
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleAutoMatch = async () => {
    if (!selectedChampion) return;
    
    setIsAutoMatching(true);
    // Clear current selection to make room for recommendations
    setSelectedCards([]);
    
    const recommendedIds = await recommendAugments(selectedChampion.name, HEXTECH_CARDS);
    
    if (recommendedIds.length > 0) {
      const matchedCards = HEXTECH_CARDS.filter(card => recommendedIds.includes(card.id));
      setSelectedCards(matchedCards.slice(0, 4));
    } else {
      alert("自动匹配失败，请稍后重试。");
    }
    
    setIsAutoMatching(false);
  };

  const clearSelection = () => setSelectedCards([]);

  return (
    <div className="min-h-screen bg-[#0f172a] hex-bg text-slate-200 pb-40">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded rotate-45 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.6)]">
              <Box className="w-5 h-5 text-white -rotate-45" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 font-serif truncate">
              海克斯选择器
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center text-xs text-slate-400 space-x-4">
                <span>卡片总数：{HEXTECH_CARDS.length}</span>
                <span>已选：{selectedCards.length}/4</span>
             </div>
             {/* Mobile count indicator */}
             <div className="md:hidden text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                {selectedCards.length}/4
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Section: Champion Selector & Auto Match */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-slate-900/50 to-slate-800/50 p-4 rounded-2xl border border-slate-700/50 shadow-inner">
          <div className="w-full md:w-auto md:flex-1">
             <ChampionSelector selectedChampion={selectedChampion} onSelect={setSelectedChampion} />
          </div>
          
          <div className="w-full md:w-auto">
            <button
              onClick={handleAutoMatch}
              disabled={!selectedChampion || isAutoMatching}
              className={`
                w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                ${!selectedChampion 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                  : 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.3)] border border-yellow-500/50'
                }
              `}
            >
              {isAutoMatching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>匹配中...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" />
                  <span>智能匹配强化</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
          
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="搜索强化..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block pl-10 p-2.5 placeholder-slate-500 transition-all"
            />
          </div>

          {/* Tier Filters - Scrollable on mobile */}
          <div className="flex-1 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-2 min-w-max">
              {(['全部', CardTier.SILVER, CardTier.GOLD, CardTier.PRISMATIC] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTierFilter(tier)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all border whitespace-nowrap
                    ${activeTierFilter === tier 
                      ? tier === CardTier.PRISMATIC ? 'bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.2)]' 
                      : tier === CardTier.GOLD ? 'bg-yellow-900/40 text-yellow-300 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]'
                      : tier === CardTier.SILVER ? 'bg-slate-700 text-slate-200 border-slate-400'
                      : 'bg-cyan-900/40 text-cyan-300 border-cyan-500'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }
                  `}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Grid - 2 cols on mobile, optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredCards.map((card) => (
            <HexCard 
              key={card.id} 
              card={card} 
              isSelected={!!selectedCards.find(c => c.id === card.id)}
              onSelect={toggleCardSelection}
            />
          ))}
          {filteredCards.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">未找到符合条件的强化。</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Bar (Selected Deck) - Mobile Optimized */}
      <div className={`fixed bottom-0 left-0 right-0 z-30 transition-transform duration-300 ${selectedCards.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-cyan-500/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-3 sm:p-4 pb-6 sm:pb-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
            
            {/* Selected Cards List - Enhanced visibility */}
            <div className="w-full flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 sm:mr-4">
              {selectedCards.map(card => (
                <div 
                  key={card.id} 
                  onClick={() => toggleCardSelection(card)} 
                  className={`
                    relative group flex items-center justify-between gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all active:scale-95 flex-shrink-0
                    w-36 sm:w-48 shadow-md
                    ${
                      card.tier === CardTier.PRISMATIC ? 'bg-fuchsia-950/90 border-fuchsia-500/60 text-fuchsia-100 hover:bg-fuchsia-900' :
                      card.tier === CardTier.GOLD ? 'bg-yellow-950/90 border-yellow-500/60 text-yellow-100 hover:bg-yellow-900' :
                      'bg-slate-800/95 border-slate-500/60 text-slate-200 hover:bg-slate-700'
                    }
                  `}
                >
                   <div className="flex flex-col overflow-hidden">
                      <span className="text-[10px] opacity-70 leading-none uppercase tracking-wider mb-0.5">{card.tier}</span>
                      <span className="text-xs sm:text-sm font-bold truncate">{card.name}</span>
                   </div>
                   
                   <div className="p-1 -mr-1 rounded-full hover:bg-white/20 text-white/50 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                   </div>
                </div>
              ))}
              
              {/* Placeholder / Counter */}
              {selectedCards.length < 4 && (
                <div className="flex-shrink-0 text-slate-500 text-xs sm:text-sm italic px-3 border border-dashed border-slate-700 rounded-lg h-[54px] w-32 sm:w-auto flex items-center justify-center whitespace-nowrap bg-slate-900/50">
                   {selectedCards.length === 0 ? '选择强化...' : `还差 ${4 - selectedCards.length} 个`}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="w-full sm:w-auto flex items-center gap-2 sm:gap-3 sm:pl-4 sm:border-l border-slate-700 sm:ml-4">
              <button 
                onClick={clearSelection}
                className="flex-1 sm:flex-none py-2 text-slate-400 hover:text-white transition-colors text-sm border border-slate-700 sm:border-transparent rounded-lg sm:rounded-none bg-slate-800 sm:bg-transparent"
              >
                清空
              </button>
              <button
                onClick={handleAnalyze}
                disabled={selectedCards.length === 0}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-yellow-900/50 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
              >
                <Trophy className="w-4 h-4" />
                <span>开始评分</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnalysisModal 
        isOpen={isAnalysisOpen} 
        onClose={() => setIsAnalysisOpen(false)}
        isLoading={isAnalyzing}
        analysis={analysisResult}
      />
    </div>
  );
};

export default App;