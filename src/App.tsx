import type { ReactNode } from 'react';
import { addresses, cardQuestions, chains, gaps, meetingPoints, navigation, networks, phases, questions, reviews, thesis, work } from './content';

function Icon({ kind = 'arrow', className = '' }: { kind?: 'arrow' | 'down' | 'download' | 'chevron'; className?: string }) {
  return <svg className={`icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'arrow' && <path d="M5 12h14m-6-6 6 6-6 6" />}
    {kind === 'down' && <path d="M12 4v16m-6-6 6 6 6-6" />}
    {kind === 'download' && <><path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4" /></>}
    {kind === 'chevron' && <path d="m6 9 6 6 6-6" />}
  </svg>;
}

function Section({ id, number, title, children, className = '' }: { id: string; number: string; title: string; children: ReactNode; className?: string }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`section ${className}`}>
    <h2 id={`${id}-title`} tabIndex={-1}><span className="section-number" aria-hidden="true">{number}</span>{title}</h2>
    <div className="section-body">{children}</div>
  </section>;
}

function Contents({ mobile = false }: { mobile?: boolean }) {
  const links = <nav aria-label={mobile ? 'Mobile contents' : 'Proposal contents'}>
    <ol>{navigation.map(([id, label], i) => <li key={id}><a href={`#${id}`}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{label}</a></li>)}</ol>
  </nav>;
  return mobile ? <details className="mobile-contents" id="contents"><summary>On this page<Icon kind="chevron" /></summary>{links}</details>
    : <aside className="reading-nav"><p>On this page</p>{links}<a className="back-top" href="#top">Back to top<Icon kind="arrow" /></a></aside>;
}

function SwarmDiagram() {
  return <figure className="diagram">
    <svg viewBox="0 0 500 620" role="img" aria-labelledby="diagram-title diagram-description" xmlns="http://www.w3.org/2000/svg">
      <title id="diagram-title">Two swarms, one card</title>
      <desc id="diagram-description">A Rider with one brief and one itemised plan connects to IMD, which builds and launches, and Claus, which reviews, houses and runs. A Swarm card connects both swarms, with a dashed slot below for the next swarm. At the bottom, one signed record holds quote, order, delivery, review and payment receipts from both swarms.</desc>
      <g className="diagram-lines" fill="none" strokeWidth="1.5">
        <path d="M250 94v30H95v38M250 124h155v38M95 260v76h85M405 260v76h-85M250 374v32M95 336v162M405 336v162" />
        <path d="M250 464v34" strokeDasharray="5 5" />
      </g>
      <g className="diagram-box">
        <rect x="140" y="2" width="220" height="92" rx="8" />
        <rect x="2" y="162" width="186" height="98" rx="8" />
        <rect x="312" y="162" width="186" height="98" rx="8" />
        <rect x="2" y="498" width="496" height="120" rx="8" />
      </g>
      <rect className="diagram-card" x="180" y="298" width="140" height="76" rx="8" />
      <rect className="diagram-next" x="180" y="406" width="140" height="58" rx="8" strokeDasharray="5 5" />
      <g className="diagram-label" textAnchor="middle">
        <text x="250" y="32">Rider</text>
        <text x="250" y="58" className="diagram-detail">one brief,</text>
        <text x="250" y="82" className="diagram-detail">one itemised plan</text>
        <text x="95" y="193">IMD swarm</text>
        <text x="95" y="222" className="diagram-detail">builds and</text>
        <text x="95" y="246" className="diagram-detail">launches</text>
        <text x="405" y="193">Claus swarm</text>
        <text x="405" y="222" className="diagram-detail">reviews, houses</text>
        <text x="405" y="246" className="diagram-detail">and runs</text>
        <text x="250" y="344" className="diagram-card-label">Swarm card</text>
        <text x="250" y="442" className="diagram-detail">Next swarm</text>
        <text x="250" y="535">One signed record</text>
        <text x="250" y="568" className="diagram-detail">quote, order, delivery, review and</text>
        <text x="250" y="596" className="diagram-detail">payment receipts from both swarms</text>
      </g>
    </svg>
  </figure>;
}

function Address({ value }: { value: string }) {
  return <code className="address"><bdi>{value}</bdi></code>;
}

export default function App() {
  return <>
    <a href="#main" className="skip-link">Skip to proposal</a>
    <header id="top" className="site-header shell">
      <div className="header-row">
        <a href="#top" className="site-name" aria-label="swarmcard, back to top">swarmcard<span className="name-dot" aria-hidden="true">.</span></a>
        <a className="download-link" href="./swarmcard-proposal-v0.3.txt" download><span>Download proposal</span><Icon kind="download" /></a>
      </div>
      <p className="byline">Independent proposal by <strong>ultrapara</strong> of uxp-labs.</p>
    </header>

    <div className="shell mobile-navigation"><Contents mobile /></div>

    <div className="shell page-layout">
      <Contents />
      <main id="main" tabIndex={-1}>
        <header className="proposal-header">
          <h1>Two swarms,<br /><span>one card.</span></h1>
          <p className="subtitle">a proposal for Claus to become the second swarm beside IMD, adjacent and not a copy.</p>
          <p className="revision">proposal v0.3, revised after an IMD swarm review of 18 agent steps.</p>
          <div className="hero-actions">
            <a href="#idea" className="button button-primary">Read the proposal<Icon kind="down" /></a>
            <a href="#questions" className="question-link">Go to founder questions<Icon /></a>
          </div>
          <p className="header-disclosure">Not an official page of Claus, IMD, Paradigm or Tempo. Nothing here is agreed by either team.</p>
        </header>

        <Section id="idea" number="01" title="The idea in three lines" className="idea-section">
          <div className="idea-lines">
            <p>IMD builds.</p>
            <p>Claus reviews, houses and runs what gets built.</p>
            <p>They trade work through one small open profile, each paid in its own asset, so a third swarm can join without a redesign.</p>
          </div>
        </Section>

        <Section id="thesis" number="02" title="Thesis">
          <p>Matt Huang wrote on <time dateTime="2026-11-10">Nov 10 2026</time> about swarm riders, the few people who can reliably command large swarms of agents, and about swarm native companies.</p>
          <a className="source-link" href="https://x.com/matthuang/status/2120209025099043286">Read Matt Huang’s post<Icon /></a>
          <h3 className="list-intro">What the proposal takes from it</h3>
          <ul className="principles">{thesis.map(([title, text]) => <li key={title}><strong>{title}.</strong>{text && <> {text}</>}</li>)}</ul>
        </Section>

        <Section id="today" number="03" title="Where each network stands today">
          <p className="section-note">Facts checked on <time dateTime="2026-11-12">Nov 12 2026</time>.</p>
          <div className="network-grid">{networks.map(network => <div className="network" key={network.name}>
            <div className="network-heading"><h3>{network.name}</h3><a href={network.url}>{network.domain}<Icon /></a></div>
            <ul>{network.items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>)}</div>
          <p className="linked-note"><strong>Already linked:</strong> a disputed Claus paid deal goes to a panel of five IMD members, and four must agree.</p>
        </Section>

        <Section id="gap" number="04" title="The gap">
          <ul className="gap-grid">{gaps.map(([title, text]) => <li key={title}><h3>{title}</h3>{text && <p>{text}</p>}</li>)}</ul>
        </Section>

        <Section id="design" number="05" title="The design">
          <ul className="meeting-points">{meetingPoints.map(([title, text]) => <li key={title}><h3>{title}</h3>{text && <p>{text}</p>}</li>)}</ul>
          <SwarmDiagram />
        </Section>

        <Section id="work" number="06" title="Seven pieces of work">
          <ol className="work-list">{work.map(([title, text]) => <li key={title}><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </Section>

        <Section id="swarm-card" number="07" title="The swarm card">
          <p className="section-lead">One signed, versioned file.</p>
          <ol className="card-questions">{cardQuestions.map(question => <li key={question}>{question}</li>)}</ol>
          <p className="stability-test">A third, unrelated swarm passing the profile with no custom work is the test that it is stable.</p>
        </Section>

        <Section id="chains" number="08" title="Chains, in order">
          <ol className="chain-list">{chains.map(([name, text]) => <li key={name}><h3>{name}</h3><p>{text}</p></li>)}</ol>
        </Section>

        <Section id="phases" number="09" title="Phases and exit tests">
          <ol className="phase-list" start={0}>{phases.map(([name, text, exit]) => <li key={name}>
            <h3>{name}</h3><div><p>{text}</p><p className="exit-test"><strong>Exit test</strong><br />{exit}</p></div>
          </li>)}</ol>
        </Section>

        <Section id="keys" number="10" title="Who holds the keys today">
          <p>Plain facts read from chain on <time dateTime="2026-11-12">Nov 12 2026</time>.</p>
          <div className="key-record">
            <h3>IMD Intake on Ethereum</h3>
            <dl>
              <div><dt>Intake</dt><dd><Address value={addresses.intake} /></dd></div>
              <div><dt>Owner</dt><dd><Address value={addresses.intakeOwner} /></dd></div>
              <div><dt>Result writer</dt><dd><Address value={addresses.writer} /></dd></div>
            </dl>
            <p className="section-note">Owner and result writer are both plain wallets.</p>
          </div>
          <div className="key-record">
            <h3>CLAUS on Robinhood Chain</h3>
            <dl>
              <div><dt>CLAUS</dt><dd><Address value={addresses.claus} /></dd></div>
              <div><dt>Owned by contract</dt><dd><Address value={addresses.clausOwner} /></dd></div>
              <div><dt>Which is owned by wallet</dt><dd><Address value={addresses.wallet} /></dd></div>
            </dl>
          </div>
          <p>The proposal asks both teams to publish what each key can do.</p>
        </Section>

        <Section id="questions" number="11" title="Questions for the founders">
          <div className="founder-questions">{questions.map(([title, items]) => <div key={title}>
            <h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>)}</div>
        </Section>

        <Section id="review" number="12" title="How this was made">
          <p>The first draft was reviewed by three IMD swarm jobs, six agents each.</p>
          <ul className="review-links">{reviews.map(([label, url]) => <li key={label}><a href={url}>{label} review<Icon /></a></li>)}</ul>
          <p>The swarm cut several ideas from the first draft, among them turning all 300 houses into seats and a flat CLAUS price.</p>
          <a className="download-end" href="./swarmcard-proposal-v0.3.txt" download>Download the proposal as text<Icon kind="download" /></a>
        </Section>
      </main>
    </div>

    <footer className="site-footer shell">
      <div><p>Independent proposal by <strong>ultrapara</strong>, uxp-labs.</p><p>Not affiliated with Claus, IMD, Paradigm or Tempo.<br />Nothing here is agreed by either team. Not financial advice.</p></div>
      <a href="#top">Back to top<Icon kind="down" className="up-arrow" /></a>
    </footer>
  </>;
}
