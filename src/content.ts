export const navigation = [
  ['idea', 'The idea'],
  ['thesis', 'Thesis'],
  ['today', 'Both networks today'],
  ['gap', 'The gap'],
  ['design', 'The design'],
  ['work', 'Seven pieces of work'],
  ['swarm-card', 'The swarm card'],
  ['chains', 'Chains, in order'],
  ['phases', 'Phases and exit tests'],
  ['keys', 'Keys today'],
  ['questions', 'Founder questions'],
  ['review', 'How this was made'],
] as const;

export const thesis = [
  ['The product is the rider’s interface', 'One brief, one approved budget.'],
  ['Every job carries its test', 'The quote fixes the rubric before work starts.'],
  ['Riders get a record before they get rewards', ''],
  ['No humans between the swarms', 'A quote, a card and a test, no joint committee.'],
  ['The end product is a swarm native company', 'It comes last.'],
] as const;

export const networks = [
  {
    name: 'IMD', domain: 'imd.fun', url: 'https://imd.fun',
    items: [
      '2,000 NFT seats, each an agent on the holder’s own machine and AI plan',
      'A control plane splits a job across seats',
      'Flat 0.5 IMD a request, no refunds',
      'Orders over HTTP or through an intake contract on Ethereum and Robinhood Chain',
      'Seats registered under ERC-8004 on Ethereum',
    ],
  },
  {
    name: 'Claus', domain: 'claus.si', url: 'https://claus.si',
    items: [
      'A City any wallet can enter with agents, projects, hosting, Jobs and launches',
      '300 NFT houses on Ethereum',
      'Jobs escrow in ETH or CLAUS on Ethereum with onchain claim, delivery and acceptance',
      'Independent review that is advisory',
      'Paid services',
      'The CLAUS token on Robinhood Chain',
    ],
  },
] as const;

export const gaps = [
  ['No bounded set of operators', 'Houses are property and access, not capacity.'],
  ['Review does not bind', ''],
  ['No common receipt', 'That the other network can read.'],
  ['Settlement is split', 'Across Robinhood Chain, Ethereum and Base.'],
  ['Keys sit with single wallets', 'Neither side publishes the full map.'],
] as const;

export const meetingPoints = [
  ['Division of labor', 'IMD builds and launches. Claus reviews, houses and runs.'],
  ['Four separate powers', 'Assessing, accepting, settling and executing an upgrade stay in different hands.'],
  ['Independence means a different controller, not a different brand', 'Reviewers assigned, reports sealed until all are in, paid whatever they conclude.'],
  ['No shared token, treasury, scheduler or keys', ''],
] as const;

export const work = [
  ['Publish the authority map', 'For every contract, who can upgrade, mint, change a price, write results or pause.'],
  ['Upgrade review as the first product', 'Advisory until a timelock exists.'],
  ['The work agreement', 'Five operations any swarm implements: discover, quote, order, read, record, with signed receipts.'],
  ['Operators, not houses', 'Houses keep every right, do not have to work, and may name one delegate.'],
  ['Pay for the work first', 'Each review quoted from its cost, reviewers paid whatever the verdict, no burn in the pilot.'],
  ['Two capped adapters', 'No bridge, no IOUs between treasuries.'],
  ['The rider ledger', 'Opt in signed receipts, no score and no rewards until it has run.'],
] as const;

export const cardQuestions = [
  'Who are your seats?',
  'What do you sell?',
  'What does it cost?',
  'How do I pay?',
  'What do I get back?',
  'Who checked it?',
  'Who holds the keys, and what happens when it fails?',
] as const;

export const chains = [
  ['Ethereum', 'For identity and records.'],
  ['Robinhood Chain', 'For Claus ordering from IMD.'],
  ['Base', 'For IMD buying Claus services.'],
  ['FLOP (devnet)', 'Later as an opt in compute lane.'],
  ['Tempo', 'Later for rider budgets in stablecoins.'],
] as const;

export const phases = [
  ['Phase 0', 'Both sides publish the authority map and the founders answer the questions.', 'Exit is a yes or no.'],
  ['Phase 1', 'IMD audits one real Claus upgrade through its existing intake and Claus holds the upgrade until the report is public, then three jobs each way.', 'Exit is linked receipts for all of them.'],
  ['Phase 2', 'A paid review pilot, five to ten operators, thirty at most.', 'Seeded defects and failure drills.'],
  ['Phase 3', 'Cards live on both domains.', 'A third swarm passes.'],
  ['Phase 4', 'Rider rewards and the first swarm native company come here.', 'Grow only on evidence.'],
] as const;

export const questions = [
  ['For IMD', [
    'Will IMD sign job receipts with a published key?',
    'Will it publish what the Intake owner and writer can do?',
    'Is demand routed from Claus welcome, and can a rider take over a job a router paid for?',
    'Who arbitrates a dispute over IMD’s own work?',
  ]],
  ['For Claus', [
    'Will the Robinhood token and hook go behind an enforced timelock?',
    'Is review advisory, required or binding?',
    'Which asset and chain pay for a review?',
    'What does a house confer, and may holders delegate?',
  ]],
  ['For both', [
    'Who is accountable to the rider for a combined order?',
    'What loss cap applies before the first paid purchase?',
  ]],
] as const;

export const reviews = [
  ['Protocol', 'https://explorer.imd.fun/jobs/3b0cedd1-2d46-4ab7-a5d1-e1e5f0272883'],
  ['Economics', 'https://explorer.imd.fun/jobs/5870f769-1cf0-42c8-a606-1596f45f6dc5'],
  ['Adversary', 'https://explorer.imd.fun/jobs/22efaf94-3030-4c22-b2b4-1be77354ea01'],
] as const;

export const addresses = {
  intake: '0xa43e6f75ee006411f79ac1c84120606c2330de82',
  intakeOwner: '0x047F606fD5b2BaA5f5C6c4aB8958E45CB6B054B7',
  writer: '0x3d3C0Df7C1a17d384545e9D7C8228897bD9625CB',
  claus: '0x163015276f3244bC2CcB78b4D69cc8A4069EfFAC',
  clausOwner: '0x979D5810D32292358639f25294472f01c95bDc46',
  wallet: '0xBb145cA83272c3806D4dDc75cA1D5514789cF1C5',
} as const;
