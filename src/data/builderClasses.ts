export interface BuilderClassOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const BUILDER_CLASSES: BuilderClassOption[] = [
  {
    id: 'terminal-wizard',
    name: 'Terminal Wizard',
    icon: '[CLI]',
    description: 'Commands bash & zsh with dark magic and keystroke efficiency',
  },
  {
    id: 'code-alchemist',
    name: 'Code Alchemist',
    icon: '[CODE]',
    description: 'Transmutes raw caffeine and messy specs into elegant gold',
  },
  {
    id: 'api-architect',
    name: 'API Architect',
    icon: '[API]',
    description: 'Crafts robust GraphQL & REST endpoints that withstand high load',
  },
  {
    id: 'cloud-nomad',
    name: 'Cloud Nomad',
    icon: '[CLOUD]',
    description: 'Orchestrates serverless pods and multi-region clusters from the beach',
  },
  {
    id: 'pixel-hacker',
    name: 'Pixel Hacker',
    icon: '[UI]',
    description: 'Obsessed with fluid 60fps frame rates and micro-interactions',
  },
  {
    id: 'data-wrangler',
    name: 'Data Wrangler',
    icon: '[DATA]',
    description: 'Trains LLMs, tames vector databases, and extracts pure signal',
  },
  {
    id: 'open-source-ranger',
    name: 'Open Source Ranger',
    icon: '[OSS]',
    description: 'Patrols repositories, squashes bugs, and leaves green commits',
  },
  {
    id: 'product-maverick',
    name: 'Product Maverick',
    icon: '[PROD]',
    description: 'Ships full-stack MVPs from idea to mainnet before dawn',
  },
];
