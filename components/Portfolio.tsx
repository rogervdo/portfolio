'use client';

import { SideNav } from '@/components/SideNav';
import { Spotlight } from '@/components/Spotlight';
import { ThemeMenu } from '@/components/ThemeMenu';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SECTION_IDS = ['about', 'experience', 'projects', 'leadership'] as const;

/** Brittany-style list row hover: panel fill, dim siblings, inset hairline (projects + leadership + experience). */
const LIST_ITEM_HOVER_PANEL =
  'group relative lg:-mx-6 lg:rounded-sm lg:border lg:border-transparent lg:bg-transparent lg:p-6 lg:transition-colors lg:hover:border-transparent lg:hover:bg-panel lg:group-hover/list:opacity-60 lg:hover:shadow-[inset_0_1px_0_0_var(--color-divider-inset)] lg:hover:!opacity-100';

const SOCIAL = [
  { kind: 'github' as const, label: 'GitHub', href: 'https://github.com/rogervdo' },
  {
    kind: 'linkedin' as const,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rogeliojesus',
  },
  { kind: 'email' as const, label: 'Email', href: 'mailto:rogervdo@icloud.com' },
] as const;

const JOBS = [
  {
    range: 'July 2025 — Present',
    title: 'Junior Software Engineer',
    href: '#experience',
    company: 'Hanova Consulting',
    lines: [
      'Developed an insurance policy management system with OpenAI-powered parsing and OCR, integrated with Odoo—Python-focused backend work and policy–claim database logic.',
      'Inherited and maintained a FastAPI microservice with Selenium automation for insurance portals, webhooks, database operations, and end-to-end tests across providers.',
      'Built a realtime n8n pipeline from spreadsheets into a CRM, cutting manual data entry time by about 95%.',
      'Led adoption of GitHub Issues and Projects across the company with standardized workflows for bugs, features, and releases.',
    ],
    chips: ['Python', 'FastAPI', 'Odoo', 'OpenAI', 'n8n', 'Selenium', 'PostgreSQL'],
  },
] as const;

const PROJECTS = [
  {
    title: 'Nori — AI requirements assistant (NortDev)',
    body: 'Banorte-aligned web stack for structured requirements: conversational IA, RAG over organizational knowledge, and exportable corporate docs.',
    image: '/images/NORI.jpeg',
    links: [
      { label: 'Backend (API)', href: 'https://github.com/nortdevv/nori-api' },
      { label: 'Frontend', href: 'https://github.com/nortdevv/nori' },
    ],
  },
  {
    title: 'Machtia — soft skills for the coffee sector',
    body: 'RAG with semantic and hybrid search, embeddings, and an AI chat assistant wired to Apple Intelligence tooling. FastAPI backend, Streamlit admin, SwiftUI iOS client, PostgreSQL with pgvector.',
    image: '/images/MACHTIA.png',
    links: [
      { label: 'iOS app', href: 'https://github.com/Bryan-Meza/Coffee-Overflow-MachtiaApp' },
      { label: 'Desktop (Streamlit)', href: 'https://github.com/rogervdo/MachtiaStreamlit' },
    ],
  },
  {
    title: 'OXXO training platform',
    body: 'Advisor training stack: ASP.NET Core REST APIs and Razor Pages with Unity WebGL scenarios. Modular C# services for session lifecycle, check-in/out, auth, and decision tracking for large concurrent cohorts.',
    image: '/images/OXXO.png',
    links: [
      { label: 'Unity', href: 'https://github.com/rogervdo/oxxo-unity' },
      { label: 'Web', href: 'https://github.com/rogervdo/oxxo-web' },
    ],
  },
  {
    title: 'YouTube Stamina Focus',
    body: 'Chromium (Manifest V3) extension for softer daily limits on YouTube: caps, optional countdowns, comment gating, quality nudges, and thumbnail downgrades—everything stays on-device.',
    image: '/images/STAMINA.png',
    links: [{ label: 'Repository', href: 'https://github.com/rogervdo/Stamina' }],
  },
] as const;

const LEADERSHIP: readonly {
  title: string;
  body: string;
  href?: string;
  /** Local `/images/...` path, or omit to use a compact placeholder. */
  imageSrc?: string;
  /** Label used only for the placeholder when `imageSrc` is absent. */
  placeholderLabel: string;
}[] = [
  {
    title: 'Focus Coding Group — co-founder',
    body: 'Co-founded Focus Coding Group with the objective of improving how we practice and level up as engineers. Members have landed roles at Oracle, Pinterest, C3.ai, Accenture, and Softtek.',
    imageSrc: '/images/CODEORDIE.png',
    placeholderLabel: 'L1-focus',
  },
  {
    title: 'HackMTY 2025 — Capital One track (Cappie)',
    body: 'Hackathon delivery for the Capital One fintech challenge: AI-forward banking UX with personalized coaching—FastAPI backend, MySQL, and Gemini for categorization and savings recommendations.',
    href: 'https://github.com/rogervdo/Hackmty2025-CapitalOne',
    imageSrc: '/images/CAPITAL.jpeg',
    placeholderLabel: 'L2-hackmty',
  },
  {
    title: 'Code or Die — LeetCode companion extension',
    body: 'Open-source Chrome extension (forked from LeetNet) for friend activity feeds, difficulty leaderboards, daily rankings, and a strikes system—with aggressive client-side caching to limit API chatter.',
    href: 'https://github.com/rogervdo/Code-or-Die',
    imageSrc: '/images/CODEORDIE_EXT.png',
    placeholderLabel: 'L3-code-or-die',
  },
];

/** Brand mark — inherits `currentColor` from the parent link. */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={`h-8 w-8 shrink-0 ${className ?? ''}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.481 0-.237-.009-.866-.013-1.702c-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={`h-8 w-8 shrink-0 ${className ?? ''}`}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={`h-8 w-8 shrink-0 ${className ?? ''}`}
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

/** Small → used on “archive” links (Brittany uses a horizontal chevron-like arrow here). */
function ArrowRightTiny(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="-mt-px ml-px inline-block h-4 w-4 shrink-0 transition-transform duration-150 group-hover/link:translate-x-0.5 group-focus-visible/link:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0"
      aria-hidden
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Matches common “external / open” affordance (↑→) beside titles — stroke, inherits currentColor, ~12×12 px. */
function ArrowUpRightTiny({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`pointer-events-none inline-block shrink-0 align-baseline text-current opacity-95 h-3 w-3 motion-reduce:transition-none ${className ?? ''}`}
    >
      <path
        d="M2.67 9.31 9.38 2.61M9.37 2.625H5.37M9.37 2.625V6.63"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useSectionSpy(sectionIds: readonly string[]) {
  const [active, setActive] = useState<string | null>(() => sectionIds[0] ?? null);

  useEffect(() => {
    const nodes = sectionIds.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => Boolean(n));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: '-32% 0px -52% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

export default function Portfolio() {
  const active = useSectionSpy(SECTION_IDS);

  return (
    <div className="relative isolate min-h-screen">
      <Spotlight />

      <a
        href="#about"
        className="fixed left-4 top-4 z-[60] -translate-y-28 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink shadow transition focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 md:px-12 lg:flex-row lg:items-start lg:justify-between lg:gap-x-24">
        <aside className="flex flex-col gap-24 pt-16 lg:sticky lg:top-0 lg:z-40 lg:min-h-[100dvh] lg:w-[48%] lg:max-w-md lg:justify-between lg:self-start lg:gap-12 lg:pt-24 lg:pb-12">
          <div>
            <header>
              <h1 className="text-4xl font-bold tracking-tight text-bright sm:text-5xl">
                <Link href="/">Rogelio Villarreal</Link>
              </h1>
              <p className="mt-4 max-w-xs text-lg font-medium leading-normal text-bright lg:text-xl">
                Junior Software Engineer · CS @ Tec de Monterrey
              </p>
              <p className="mt-4 max-w-xs text-base leading-normal text-inkFaint">
                I build innovative and impactful projects, as well as integration pipelines to automate processes.
                Experienced with Python, Node, Swift/iOS and AI Integration
              </p>

              <SideNav active={active} className="mt-16 hidden lg:block" />
            </header>

            <nav className="mt-10 lg:hidden" aria-label="Jump links">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-widest text-inkFaint">
                <li>
                  <a href="#about" className="hover:text-bright">
                    About
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-bright">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-bright">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#leadership" className="hover:text-bright">
                    Leadership
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <footer className="pb-16 lg:mt-auto lg:pb-0">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-widest">
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    {...(s.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer noopener' })}
                    aria-label={s.label}
                    className="inline-flex items-center text-inkSoft transition-colors hover:text-accent focus-visible:text-accent"
                  >
                    {s.kind === 'github' ? <GitHubIcon /> : s.kind === 'linkedin' ? <LinkedInIcon /> : <EmailIcon />}
                  </Link>
                </li>
              ))}
            </ul>
          </footer>
        </aside>

        <main className="lg:flex lg:w-[52%] lg:flex-col lg:py-24">
          <article className="pb-16 text-base leading-relaxed text-inkMuted lg:pb-12">
            <section id="about" className="mb-10 scroll-mt-16 lg:mb-14 lg:scroll-mt-24">
              <h2 className="sr-only">About</h2>
              <div className="flex flex-col gap-4 lg:gap-12">
                <p>
                  I&apos;m <span className="text-inkSoft">Rogelio Jesús Villarreal De Ochoa</span>, working toward a
                  B.S. in Computer Science and Technology at{' '}
                  <span className="text-inkSoft">Tecnológico de Monterrey</span> (August 2023 to June 2027) with a GPA
                  of 93.1/100 (3.73/4.0). I&apos;ve taken OOP, data structures &amp; algorithms, database systems,
                  software construction, multi-agent systems &amp; computational graphics, and cybersecurity.
                </p>
                <p>
                  I spend most of my technical time in Python, Node, Swift/iOS, and AI integrations. On team projects I
                  often take a coordinating role: aligning on goals, delegating clearly, and keeping communication
                  explicit, so what we ship stays close to the ambitious vision we set together.
                </p>
              </div>
            </section>

            <section
              id="experience"
              className="relative scroll-mt-16 lg:scroll-mt-24"
              aria-labelledby="experience-heading"
            >
              <h2 id="experience-heading" className="sr-only">
                Experience
              </h2>

              <ol className="group/list space-y-3">
                {JOBS.map((job) => (
                  <li key={`${job.range}-${job.company}`}>
                    <div className={LIST_ITEM_HOVER_PANEL}>
                      <a
                        href={job.href}
                        className="group/link-card relative mb-px block pb-12 focus-visible:z-40 focus-visible:outline-none lg:pb-8"
                      >
                        <span aria-hidden className="absolute inset-0 rounded-lg lg:-inset-x-px" />
                        <div className="relative z-10 grid gap-y-px sm:auto-rows-min sm:grid-cols-8 sm:gap-x-8 lg:gap-x-10">
                          <header className="z-10 text-[11px] font-semibold uppercase leading-normal tracking-normal text-inkFaint sm:col-span-2 sm:w-44 sm:tracking-wide lg:tracking-wider xl:w-52">
                            {job.range}
                          </header>
                          <div className="z-10 sm:col-span-6">
                            <span className="block text-xl font-semibold tracking-tight text-bright">
                              <span className="text-bright">{job.title}</span>
                              <span className="text-bright"> · </span>
                              <span className="transition-colors hover:text-accent hover:underline hover:underline-offset-4 hover:transition-none focus-visible:text-accent">
                                <span className="inline-flex items-center gap-x-2 whitespace-nowrap">
                                  <span>{job.company}</span>
                                  <ArrowUpRightTiny className="-translate-y-px opacity-95" />
                                </span>
                              </span>
                            </span>
                            <div className="mt-4 space-y-3 text-sm leading-normal text-inkMuted lg:leading-relaxed">
                              {job.lines.map((line) => (
                                <p key={line}>{line}</p>
                              ))}
                            </div>
                            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2" aria-label="Technologies used">
                              {job.chips.map((c) => (
                                <li
                                  key={c}
                                  className="rounded-full bg-chip px-3 py-1 text-xs font-medium tracking-wide text-accent"
                                >
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                href="/resume.pdf"
                className="group/link mt-14 inline-flex items-center gap-x-2 text-[15px] font-semibold text-bright transition-colors hover:text-accent focus-visible:text-accent sm:text-base"
              >
                View full résumé <ArrowUpRightTiny className="translate-y-[0.11em]" />
              </Link>
            </section>

            <section id="projects" className="scroll-mt-24 lg:pb-16">
              <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-bright">Featured projects</h2>
              <ul className="group/list space-y-10">
                {PROJECTS.map((p) => {
                  const primary = p.links[0]?.href ?? '#projects';
                  return (
                    <li key={p.title}>
                      <article>
                        <div className={LIST_ITEM_HOVER_PANEL}>
                          <div className="relative z-10 grid gap-4 sm:grid-cols-8 sm:items-start sm:gap-x-4 sm:gap-y-0 lg:gap-x-6">
                            <div className="sm:col-span-2 sm:row-start-1">
                              <Image
                                className="aspect-video w-full shrink-0 rounded border-2 border-borderSubtle bg-media object-cover opacity-95 transition-colors sm:max-w-[200px] sm:translate-y-px"
                                src={p.image}
                                width={400}
                                height={225}
                                alt=""
                                sizes="(min-width: 640px) 200px, 100vw"
                              />
                            </div>
                            <div className="mt-4 sm:col-span-6 sm:mt-0 sm:flex sm:flex-col sm:justify-center">
                              <h3 className="text-xl font-semibold tracking-tight text-bright">
                                <a
                                  href={primary}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="group/card mb-2 inline-flex items-center gap-x-2 text-sm font-semibold leading-snug tracking-tight text-bright transition-colors hover:text-accent hover:underline hover:underline-offset-4 hover:transition-none sm:mb-1 sm:text-base xl:text-lg"
                                >
                                  {p.title}
                                  <ArrowUpRightTiny className="-translate-y-px opacity-95" />
                                </a>
                              </h3>
                              <p className="text-sm">{p.body}</p>
                              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-wider text-accent-muted">
                                {p.links.map((l) => (
                                  <li key={l.href}>
                                    <a
                                      href={l.href}
                                      target="_blank"
                                      rel="noreferrer noopener"
                                      className="transition-colors hover:text-accent hover:underline hover:underline-offset-4"
                                    >
                                      {l.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
              <a
                href="https://github.com/rogervdo?tab=repositories"
                target="_blank"
                rel="noreferrer noopener"
                className="group/link mt-10 inline-flex items-center gap-x-2 text-[15px] font-semibold text-bright transition-colors hover:text-accent focus-visible:text-accent sm:text-base"
              >
                More repositories on GitHub <ArrowRightTiny />
              </a>
            </section>

            <section id="leadership" className="scroll-mt-24 lg:scroll-mt-24">
              <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-bright">
                Leadership activities
              </h2>
              <ul className="group/list space-y-10">
                {LEADERSHIP.map((item, index) => {
                  const HeadingContent = (
                    <span className="group/link inline-flex items-center gap-x-2 text-sm font-semibold leading-snug text-bright transition-colors hover:text-accent hover:underline hover:underline-offset-4 hover:transition-none focus-visible:text-accent sm:text-[15px] lg:text-[15px]">
                      <span>{item.title}</span>
                      {item.href ? <ArrowUpRightTiny className="-translate-y-px shrink-0" /> : null}
                    </span>
                  );

                  return (
                    <li key={item.title}>
                      <article>
                        <div className={LIST_ITEM_HOVER_PANEL}>
                          <div className="outline-offset-8 transition-colors focus-within:z-40">
                            <div className="relative z-10 grid gap-4 sm:grid-cols-8 sm:items-start sm:gap-x-4 sm:gap-y-px lg:gap-x-6">
                              <div className="relative sm:col-span-2">
                                <Image
                                  alt=""
                                  className="aspect-video w-full rounded border-2 border-borderSubtle bg-media object-cover opacity-95 transition-colors sm:max-w-[200px] sm:translate-y-px"
                                  height={225}
                                  src={
                                    item.imageSrc ??
                                    `https://placehold.co/800x450/172033/8492a9/png?font=mono&text=${encodeURIComponent(item.placeholderLabel)}`
                                  }
                                  width={400}
                                  sizes="(min-width: 640px) 200px, 100vw"
                                  loading={index === 0 ? 'eager' : 'lazy'}
                                />
                              </div>
                              <div className="mt-4 sm:col-span-6 sm:mt-0 sm:flex sm:min-h-full sm:flex-col sm:justify-center">
                                <h3 className="text-xl font-semibold tracking-tight text-bright">
                                  {item.href ? (
                                    <a
                                      href={item.href}
                                      target="_blank"
                                      rel="noreferrer noopener"
                                      className="rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
                                    >
                                      {HeadingContent}
                                    </a>
                                  ) : (
                                    HeadingContent
                                  )}
                                </h3>
                                <p className="mt-2 max-w-prose text-sm leading-relaxed text-inkMuted lg:mt-3">
                                  {item.body}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          </article>

          <p className="mt-8 max-w-md text-sm leading-normal text-inkFaint lg:sticky lg:top-28 lg:z-40 lg:mt-12 lg:self-start lg:leading-relaxed">
            Built with Next.js · TypeScript · Tailwind CSS.
          </p>
        </main>
      </div>

      <ThemeMenu />
    </div>
  );
}

