import React, { useState, useMemo } from 'react';
import { CHAMPIONS } from '../data/champions';
import { Champion } from '../types';
import { Search, User, ChevronDown, Check } from 'lucide-react';

interface ChampionSelectorProps {
  selectedChampion: Champion | null;
  onSelect: (champion: Champion) => void;
}

export const ChampionSelector: React.FC<ChampionSelectorProps> = ({ selectedChampion, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredChampions = useMemo(() => {
    return CHAMPIONS.filter(c => 
      c.name.includes(search) || 
      c.title.includes(search) || 
      c.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSelect = (champion: Champion) => {
    onSelect(champion);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative w-full max-w-md z-30">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between p-3 rounded-xl border transition-all
          bg-slate-800/80 hover:bg-slate-800
          ${isOpen ? 'border-cyan-500 ring-1 ring-cyan-500/50' : 'border-slate-600 hover:border-slate-500'}
        `}
      >
        <div className="flex items-center gap-3">
          {selectedChampion ? (
            <>
              <div className="w-10 h-10 rounded-full border border-cyan-500/50 overflow-hidden bg-slate-900">
                <img 
                  src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${selectedChampion.id}.png`} 
                  alt={selectedChampion.name}
                  className="w-full h-full object-cover transform scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxZTI5M2IiLz48L3N2Zz4=';
                  }}
                />
              </div>
              <div className="text-left">
                <div className="text-cyan-100 font-bold leading-tight">{selectedChampion.name}</div>
                <div className="text-xs text-cyan-400/70">{selectedChampion.title}</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-left">
                <div className="text-slate-300 font-medium">选择你的英雄</div>
                <div className="text-xs text-slate-500">自动匹配最佳强化</div>
              </div>
            </>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Search Input */}
          <div className="p-3 border-b border-slate-700 bg-slate-800/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="搜索英雄名称..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 placeholder-slate-600"
              />
            </div>
          </div>

          {/* List */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar p-1">
            {filteredChampions.length > 0 ? (
              <div className="grid grid-cols-1 gap-1">
                {filteredChampions.map(champion => (
                  <button
                    key={champion.id}
                    onClick={() => handleSelect(champion)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors w-full text-left group"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 group-hover:border-cyan-500/50">
                      <img 
                        src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.id}.png`} 
                        alt={champion.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-300 group-hover:text-cyan-200">{champion.name}</div>
                      <div className="text-[10px] text-slate-500 group-hover:text-cyan-500/70">{champion.title}</div>
                    </div>
                    {selectedChampion?.id === champion.id && (
                      <Check className="w-4 h-4 text-cyan-500 mr-2" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-slate-500">
                未找到英雄
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};