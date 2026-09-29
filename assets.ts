/**
 * Teladu ePhone High-Fidelity Asset Manifest
 */

export const EPHONE_ASSETS = {
  logo: '/src/assets/images/teladu_logo_1790631109207.jpg',
  heroShowcase: '/src/assets/images/ephone_hero_showcase_1790631119532.jpg',
  cameraDetail: '/src/assets/images/ephone_camera_detail_1790631129708.jpg',
  colorwaysLineup: '/src/assets/images/ephone_colorways_group_1790631140057.jpg',
  lifestyleDisplay: '/src/assets/images/ephone_lifestyle_display_1790631150542.jpg',
} as const;

export interface ColorwayOption {
  id: string;
  name: string;
  hex: string;
  threeColor: number;
  roughness: number;
  metalness: number;
  description: string;
}

export const COLORWAYS: ColorwayOption[] = [
  {
    id: 'natural-titanium',
    name: 'Natural Titanium',
    hex: '#9e9b94',
    threeColor: 0x9e9b94,
    roughness: 0.28,
    metalness: 0.92,
    description: 'Precision blasted aerospace-grade 5 titanium alloy with satin sheen',
  },
  {
    id: 'cosmic-obsidian',
    name: 'Cosmic Obsidian',
    hex: '#18191d',
    threeColor: 0x18191d,
    roughness: 0.32,
    metalness: 0.88,
    description: 'Deep diamond-like carbon PVD coating resistant to micro-scratches',
  },
  {
    id: 'nebula-cobalt',
    name: 'Nebula Cobalt',
    hex: '#1e3a5f',
    threeColor: 0x1e3a5f,
    roughness: 0.25,
    metalness: 0.94,
    description: 'Sub-micron anodized deep ocean cobalt with subtle metallic flake',
  },
  {
    id: 'ceramic-frost',
    name: 'Ceramic Frost',
    hex: '#f1f5f9',
    threeColor: 0xe2e8f0,
    roughness: 0.18,
    metalness: 0.35,
    description: 'Nanocrystal ceramic shield back with optical anti-fingerprint surface',
  },
];
