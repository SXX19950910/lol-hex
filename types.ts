export enum CardTier {
  SILVER = '白银',
  GOLD = '黄金',
  PRISMATIC = '棱彩'
}

export interface HextechCard {
  id: string;
  name: string;
  tier: CardTier;
  description: string;
  icon?: string; // Optional icon class or url placeholder logic
  tags: string[]; // e.g., 'Offense', 'Defense', 'Utility'
}

export interface DeckAnalysis {
  synergyScore: number;
  analysis: string;
  suggestedChampions: string[];
}

export interface Champion {
  id: string; // The English key for DDragon (e.g. "Aatrox")
  name: string; // Chinese name
  title: string;
  roles: string[];
}