import { BuilderProfile } from '../types/builder';

/**
 * Dynamically generates an entertaining, stack-specific fun fact or quote based on the user's tech stack, role, and builder class.
 */
export function getDynamicFunFact(profile: Partial<BuilderProfile>, forceRandom: boolean = false): string {
  const stackLower = (profile.stack || '').toLowerCase();
  const roleLower = (profile.role || '').toLowerCase();
  const classLower = (profile.builderClass || '').toLowerCase();

  const matchedFacts: string[] = [];

  // Stack-specific facts & tech jokes
  if (stackLower.includes('react') || stackLower.includes('next') || stackLower.includes('vue') || stackLower.includes('frontend')) {
    matchedFacts.push(
      'Centers flexbox divs on the first try without checking StackOverflow.',
      'Spent 3 hours fine-tuning micro-animations, 3 minutes writing business logic.',
      'Can debug a React re-render cascade blindfolded while sitting on the beach.',
      'Replaced 12 nested state variables with 1 clean custom hook.',
      'UI perfectionist whose 60fps animations make browsers sing.'
    );
  }

  if (stackLower.includes('node') || stackLower.includes('express') || stackLower.includes('backend') || stackLower.includes('bun')) {
    matchedFacts.push(
      'Turns raw caffeine and unhandled promises into 99.99% uptime microservices.',
      'Event loop whisperer who processes 10,000 requests/sec from a Goan beach chair.',
      'Fueled by Goan filter coffee and zero unhandled promise rejections.',
      'Writes REST and GraphQL APIs that survive midnight traffic spikes.'
    );
  }

  if (stackLower.includes('python') || stackLower.includes('ai') || stackLower.includes('llm') || stackLower.includes('pytorch') || stackLower.includes('ml') || stackLower.includes('pandas')) {
    matchedFacts.push(
      'Fine-tunes custom LLMs at 3 AM while listening to Goa trance beats.',
      'Transforms raw matrix math into AI sentience using GPU clusters in Goa.',
      'Prompt engineering wizard who tricked an LLM into writing 100% unit test coverage.',
      'Tames vector databases and embedding models for breakfast.'
    );
  }

  if (stackLower.includes('solidity') || stackLower.includes('web3') || stackLower.includes('crypto') || stackLower.includes('blockchain') || stackLower.includes('rust')) {
    matchedFacts.push(
      'Gas optimization addict who counts every single gwei before deploying.',
      'Borrow checker survivor who writes memory-safe smart contracts.',
      'Audits smart contract bytecodes for reentrancy bugs while watching Goan sunsets.',
      'Deploys zero-knowledge proofs from the Arabian Sea shoreline.'
    );
  }

  if (stackLower.includes('postgres') || stackLower.includes('sql') || stackLower.includes('mongo') || stackLower.includes('db') || stackLower.includes('prisma')) {
    matchedFacts.push(
      'Writes EXPLAIN ANALYZE SQL queries faster than the Goan sea breeze.',
      'ACID compliance enthusiast who refuses to compromise on schema integrity.',
      'Tamed a complex database schema with elegant indexing and zero locks.'
    );
  }

  if (stackLower.includes('aws') || stackLower.includes('docker') || stackLower.includes('k8s') || stackLower.includes('devops') || stackLower.includes('cloud') || stackLower.includes('terraform')) {
    matchedFacts.push(
      'Orchestrates serverless Kubernetes pods live from a beachfront hammock.',
      'Deploys multi-region cloud infrastructure via Terraform before morning coffee.',
      'Turned 400 lines of YAML into a self-healing Kubernetes cluster.'
    );
  }

  if (stackLower.includes('typescript') || stackLower.includes('ts')) {
    matchedFacts.push(
      '`any` type hater & strict mode maximalist.',
      'Refactored 50 modules without a single runtime error thanks to strict TypeScript.'
    );
  }

  if (stackLower.includes('flutter') || stackLower.includes('react native') || stackLower.includes('ios') || stackLower.includes('swift') || stackLower.includes('android')) {
    matchedFacts.push(
      'Pushes mobile hotfixes directly from a Goan beach shack to App Store review.',
      'Crafts native 120Hz gesture animations for mobile apps.'
    );
  }

  if (stackLower.includes('go') || stackLower.includes('golang')) {
    matchedFacts.push(
      'Goroutine concurrency master who handles millions of channels effortlessly.',
      'Compiles statically linked binaries faster than a compiler warm-up.'
    );
  }

  // Class / Role Fallbacks if stack keywords weren't matched
  if (matchedFacts.length === 0) {
    if (classLower.includes('terminal')) {
      matchedFacts.push('Replaced all GUI apps with custom zsh scripts & Vim keybindings.');
    } else if (classLower.includes('alchemist')) {
      matchedFacts.push('Transmutes messy specs and late-night caffeine into pure code gold.');
    } else if (classLower.includes('pixel')) {
      matchedFacts.push('Obsessed with 60fps micro-interactions and pixel-perfect design.');
    } else if (classLower.includes('maverick') || roleLower.includes('full stack')) {
      matchedFacts.push('Ships full-stack MVPs from napkin sketch to mainnet in under 24 hours.');
    } else {
      matchedFacts.push(
        'Building & shipping the future live on the beaches of Goa at HH Goa 2026!',
        'Turns complex engineering challenges into clean, production-ready code.'
      );
    }
  }

  if (forceRandom) {
    const randomIndex = Math.floor(Math.random() * matchedFacts.length);
    return matchedFacts[randomIndex];
  }

  // Deterministically select fact based on string content hash so it updates when stack changes
  const seedString = `${profile.stack || ''}-${profile.role || ''}-${profile.builderClass || ''}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % matchedFacts.length;

  return matchedFacts[index];
}
