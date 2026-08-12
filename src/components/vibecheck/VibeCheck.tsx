import React, { useState } from 'react';
import './vibecheck.css';

interface VibeCheckProps {
  onClose: () => void;
  onNavigateToGenerator: () => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    emoji: string;
    text: string;
    archetypeWeights: Record<string, number>;
  }[];
}

interface Archetype {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is your stack / primary weapon of choice?',
    options: [
      { emoji: '⚛️', text: 'React, Vite & Modern Frontend', archetypeWeights: { shark: 2, wave: 2 } },
      { emoji: '🦀', text: 'Rust, Systems & High Performance', archetypeWeights: { crab: 3, turtle: 1 } },
      { emoji: '⛓️', text: 'Solidity, Smart Contracts & Web3', archetypeWeights: { wave: 3, shark: 1 } },
      { emoji: '🐍', text: 'Python, PyTorch & AI Neural Nets', archetypeWeights: { palm: 2, wave: 2 } },
    ],
  },
  {
    id: 2,
    text: "It's 3 AM at Hacker House Goa. You are…",
    options: [
      { emoji: '🚀', text: 'Shipping the final feature to prod', archetypeWeights: { shark: 3 } },
      { emoji: '🐛', text: 'Tracking down a single sneaky bug', archetypeWeights: { crab: 2, turtle: 2 } },
      { emoji: '🎨', text: 'Refining pixel-perfect animations', archetypeWeights: { palm: 2, wave: 1 } },
      { emoji: '☕', text: 'Drinking chai & hyping up the team', archetypeWeights: { bonfire: 3 } },
    ],
  },
  {
    id: 3,
    text: 'What is your ideal Goa hackathon vibe?',
    options: [
      { emoji: '🏖️', text: 'Coding on a sun lounger with ocean breeze', archetypeWeights: { palm: 3 } },
      { emoji: '🌅', text: 'Rooftop sunset demo sessions', archetypeWeights: { wave: 2, bonfire: 2 } },
      { emoji: '🔥', text: 'Full moon beach party & late night builds', archetypeWeights: { bonfire: 3 } },
      { emoji: '⚡', text: 'Locked in a quiet room, shipping 100 commits', archetypeWeights: { shark: 2, crab: 2 } },
    ],
  },
  {
    id: 4,
    text: 'What is your deployment philosophy?',
    options: [
      { emoji: '⚡', text: 'Push straight to main & test in prod', archetypeWeights: { shark: 3 } },
      { emoji: '🛡️', text: '100% test coverage & strict CI/CD', archetypeWeights: { crab: 3 } },
      { emoji: '🚢', text: 'Ship live on stage during presentation', archetypeWeights: { bonfire: 2, wave: 2 } },
      { emoji: '🐢', text: 'Careful code reviews & elegant architecture', archetypeWeights: { turtle: 3 } },
    ],
  },
  {
    id: 5,
    text: 'If you had one hackathon superpower, it would be…',
    options: [
      { emoji: '⚡', text: 'Ship 10x faster than average humans', archetypeWeights: { shark: 3 } },
      { emoji: '🧠', text: 'Never need sleep for 4 full days', archetypeWeights: { bonfire: 2, shark: 1 } },
      { emoji: '🔍', text: 'Understand any complex codebase instantly', archetypeWeights: { crab: 2, turtle: 2 } },
      { emoji: '🌴', text: 'Stay 100% calm & chill under pressure', archetypeWeights: { palm: 3 } },
    ],
  },
];

const ARCHETYPES: Record<string, Archetype> = {
  shark: {
    id: 'shark',
    emoji: '🦈',
    name: 'Goa Shark',
    tagline: 'You ship faster than the ocean tide. Driven, relentless, and born to win.',
  },
  palm: {
    id: 'palm',
    emoji: '🌴',
    name: 'Palm Tree Hacker',
    tagline: 'Steady, deeply rooted, and always shipping elegantly under tropical shade.',
  },
  bonfire: {
    id: 'bonfire',
    emoji: '🔥',
    name: 'Beach Bonfire',
    tagline: 'You light up the hackathon! High energy, maximum hype, and community spirit.',
  },
  wave: {
    id: 'wave',
    emoji: '🌊',
    name: 'Wave Rider',
    tagline: 'You ride the newest tech waves. Bleeding edge, ambitious, and visionary.',
  },
  turtle: {
    id: 'turtle',
    emoji: '🐢',
    name: 'Turtle Architect',
    tagline: 'Thoughtful, clean, and rock solid. Quality architecture over chaotic speed.',
  },
  crab: {
    id: 'crab',
    emoji: '🦀',
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
      // Compute winning archetype
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
    const text = `I took the Builder Vibe Check for Hacker House Goa 2026! My archetype is ${result.emoji} ${result.name} — "${result.tagline}"\n\nWhat kind of builder are you? Generate your pass at #FrameInGoa! 🌴`;
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
              <h2 className="vibecheck-title">Builder Vibe Check 🎯</h2>
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
                    <span className="option-emoji">{opt.emoji}</span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="result-card">
            <span className="vibecheck-badge">YOUR BUILDER ARCHETYPE</span>
            <div className="result-emoji-circle">{result.emoji}</div>
            <h2 className="result-archetype-name">{result.name}</h2>
            <p className="result-tagline">"{result.tagline}"</p>

            <div className="result-actions">
              <button
                type="button"
                className="btn-share-vibe"
                onClick={handleShareResult}
              >
                SHARE ON X WITH #FrameInGoa 🚀
              </button>
              <button
                type="button"
                className="btn-secondary-vibe"
                onClick={() => {
                  onClose();
                  onNavigateToGenerator();
                }}
              >
                CREATE YOUR BUILDER PASS ✦
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
