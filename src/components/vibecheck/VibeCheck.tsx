import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  ShieldCheck,
  Terminal,
  Rocket,
  Bug,
  Palette,
  Coffee,
  Sun,
  Sunset,
  Flame,
  Zap,
  Shield,
  Ship,
  Layers,
  Brain,
  Search,
  Palmtree,
  Target,
  Share2,
  Sparkles,
  Waves,
} from 'lucide-react';
import './vibecheck.css';

interface VibeCheckProps {
  onClose: () => void;
  onNavigateToGenerator: () => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    iconKey: string;
    text: string;
    archetypeWeights: Record<string, number>;
  }[];
}

interface Archetype {
  id: string;
  iconKey: string;
  name: string;
  tagline: string;
}

const IconRenderer: React.FC<{ name: string; size?: number; color?: string }> = ({
  name,
  size = 24,
  color = 'var(--brand-yellow)',
}) => {
  switch (name) {
    case 'code': return <Code2 size={size} color={color} />;
    case 'cpu': return <Cpu size={size} color={color} />;
    case 'shield-check': return <ShieldCheck size={size} color={color} />;
    case 'terminal': return <Terminal size={size} color={color} />;
    case 'rocket': return <Rocket size={size} color={color} />;
    case 'bug': return <Bug size={size} color={color} />;
    case 'palette': return <Palette size={size} color={color} />;
    case 'coffee': return <Coffee size={size} color={color} />;
    case 'sun': return <Sun size={size} color={color} />;
    case 'sunset': return <Sunset size={size} color={color} />;
    case 'flame': return <Flame size={size} color={color} />;
    case 'zap': return <Zap size={size} color={color} />;
    case 'shield': return <Shield size={size} color={color} />;
    case 'ship': return <Ship size={size} color={color} />;
    case 'layers': return <Layers size={size} color={color} />;
    case 'brain': return <Brain size={size} color={color} />;
    case 'search': return <Search size={size} color={color} />;
    case 'palmtree': return <Palmtree size={size} color={color} />;
    case 'waves': return <Waves size={size} color={color} />;
    default: return <Sparkles size={size} color={color} />;
  }
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is your stack / primary weapon of choice?',
    options: [
      { iconKey: 'code', text: 'React, Vite & Modern Frontend', archetypeWeights: { shark: 2, wave: 2 } },
      { iconKey: 'cpu', text: 'Rust, Systems & High Performance', archetypeWeights: { crab: 3, turtle: 1 } },
      { iconKey: 'shield-check', text: 'Solidity, Smart Contracts & Web3', archetypeWeights: { wave: 3, shark: 1 } },
      { iconKey: 'terminal', text: 'Python, PyTorch & AI Neural Nets', archetypeWeights: { palm: 2, wave: 2 } },
    ],
  },
  {
    id: 2,
    text: "It's 3 AM at Hacker House Goa. You are…",
    options: [
      { iconKey: 'rocket', text: 'Shipping the final feature to prod', archetypeWeights: { shark: 3 } },
      { iconKey: 'bug', text: 'Tracking down a single sneaky bug', archetypeWeights: { crab: 2, turtle: 2 } },
      { iconKey: 'palette', text: 'Refining pixel-perfect animations', archetypeWeights: { palm: 2, wave: 1 } },
      { iconKey: 'coffee', text: 'Drinking chai & hyping up the team', archetypeWeights: { bonfire: 3 } },
    ],
  },
  {
    id: 3,
    text: 'What is your ideal Goa hackathon vibe?',
    options: [
      { iconKey: 'sun', text: 'Coding on a sun lounger with ocean breeze', archetypeWeights: { palm: 3 } },
      { iconKey: 'sunset', text: 'Rooftop sunset demo sessions', archetypeWeights: { wave: 2, bonfire: 2 } },
      { iconKey: 'flame', text: 'Full moon beach party & late night builds', archetypeWeights: { bonfire: 3 } },
      { iconKey: 'zap', text: 'Locked in a quiet room, shipping 100 commits', archetypeWeights: { shark: 2, crab: 2 } },
    ],
  },
  {
    id: 4,
    text: 'What is your deployment philosophy?',
    options: [
      { iconKey: 'zap', text: 'Push straight to main & test in prod', archetypeWeights: { shark: 3 } },
      { iconKey: 'shield', text: '100% test coverage & strict CI/CD', archetypeWeights: { crab: 3 } },
      { iconKey: 'ship', text: 'Ship live on stage during presentation', archetypeWeights: { bonfire: 2, wave: 2 } },
      { iconKey: 'layers', text: 'Careful code reviews & elegant architecture', archetypeWeights: { turtle: 3 } },
    ],
  },
  {
    id: 5,
    text: 'If you had one hackathon superpower, it would be…',
    options: [
      { iconKey: 'zap', text: 'Ship 10x faster than average humans', archetypeWeights: { shark: 3 } },
      { iconKey: 'brain', text: 'Never need sleep for 4 full days', archetypeWeights: { bonfire: 2, shark: 1 } },
      { iconKey: 'search', text: 'Understand any complex codebase instantly', archetypeWeights: { crab: 2, turtle: 2 } },
      { iconKey: 'palmtree', text: 'Stay 100% calm & chill under pressure', archetypeWeights: { palm: 3 } },
    ],
  },
];

const ARCHETYPES: Record<string, Archetype> = {
  shark: {
    id: 'shark',
    iconKey: 'zap',
    name: 'Goa Shark',
    tagline: 'You ship faster than the ocean tide. Driven, relentless, and born to win.',
  },
  palm: {
    id: 'palm',
    iconKey: 'palmtree',
    name: 'Palm Tree Hacker',
    tagline: 'Steady, deeply rooted, and always shipping elegantly under tropical shade.',
  },
  bonfire: {
    id: 'bonfire',
    iconKey: 'flame',
    name: 'Beach Bonfire',
    tagline: 'You light up the hackathon! High energy, maximum hype, and community spirit.',
  },
  wave: {
    id: 'wave',
    iconKey: 'waves',
    name: 'Wave Rider',
    tagline: 'You ride the newest tech waves. Bleeding edge, ambitious, and visionary.',
  },
  turtle: {
    id: 'turtle',
    iconKey: 'layers',
    name: 'Turtle Architect',
    tagline: 'Thoughtful, clean, and rock solid. Quality architecture over chaotic speed.',
  },
  crab: {
    id: 'crab',
    iconKey: 'cpu',
    name: 'Rust Crab',
    tagline: 'Obsessed with type safety, zero-cost abstractions, and rock-hard correctness.',
  },
};

export const VibeCheck: React.FC<VibeCheckProps> = ({
  onClose,
  onNavigateToGenerator,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({
    shark: 0,
    palm: 0,
    bonfire: 0,
    wave: 0,
    turtle: 0,
    crab: 0,
  });
  const [result, setResult] = useState<Archetype | null>(null);

  const handleSelectOption = (weights: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(weights).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });
    setScores(newScores);

    if (currentStep + 1 < QUESTIONS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      let topArchetypeKey = 'shark';
      let maxScore = -1;
      Object.entries(newScores).forEach(([key, val]) => {
        if (val > maxScore) {
          maxScore = val;
          topArchetypeKey = key;
        }
      });
      setResult(ARCHETYPES[topArchetypeKey] || ARCHETYPES.shark);
    }
  };

  const handleShareResult = () => {
    if (!result) return;
    const text = `I took the Builder Vibe Check for Hacker House Goa 2026! My archetype is ${result.name} — "${result.tagline}"\n\nWhat kind of builder are you? Generate your pass at #FrameInGoa!`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&hashtags=FrameInGoa,HHGoa2026`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="vibecheck-backdrop" onClick={onClose}>
      <div className="vibecheck-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="vibecheck-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {!result ? (
          <>
            <div className="vibecheck-header">
              <span className="vibecheck-badge">
                QUESTION {currentStep + 1} OF {QUESTIONS.length}
              </span>
              <h2 className="vibecheck-title">
                <Target size={22} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Builder Vibe Check
              </h2>
              <div className="vibecheck-progress-bar">
                <div
                  className="vibecheck-progress-fill"
                  style={{
                    width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="question-container" key={currentQ.id}>
              <h3 className="question-text">{currentQ.text}</h3>
              <div className="options-grid">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="option-card"
                    onClick={() => handleSelectOption(opt.archetypeWeights)}
                  >
                    <span className="option-emoji">
                      <IconRenderer name={opt.iconKey} size={22} />
                    </span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="result-card">
            <span className="vibecheck-badge">YOUR BUILDER ARCHETYPE</span>
            <div className="result-emoji-circle">
              <IconRenderer name={result.iconKey} size={40} color="var(--brand-yellow)" />
            </div>
            <h2 className="result-archetype-name">{result.name}</h2>
            <p className="result-tagline">"{result.tagline}"</p>

            <div className="result-actions">
              <button
                type="button"
                className="btn-share-vibe"
                onClick={handleShareResult}
              >
                <Share2 size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> SHARE ON X WITH #FrameInGoa
              </button>
              <button
                type="button"
                className="btn-secondary-vibe"
                onClick={() => {
                  onClose();
                  onNavigateToGenerator();
                }}
              >
                <Sparkles size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> CREATE YOUR BUILDER PASS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
