"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SideNav } from "@/components/SideNav";
import { Spotlight } from "@/components/Spotlight";

const SECTION_IDS = ["about", "experience", "projects", "leadership"] as const;

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/rogervdo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rogeliojesus" },
  { label: "Email", href: "mailto:rogervdo@icloud.com" },
] as const;

const JOBS = [
  {
    range: "July 2025 — Present",
    title: "Junior Software Engineer",
    href: "#experience",
    company: "Hanova Consulting",
    lines: [
      "Developed an insurance policy management system with OpenAI-powered parsing and OCR, integrated with Odoo—Python-focused backend work and policy–claim database logic.",
      "Inherited and maintained a FastAPI microservice with Selenium automation for insurance portals, webhooks, database operations, and end-to-end tests across providers.",
      "Built a realtime n8n pipeline from spreadsheets into a CRM, cutting manual data entry time by about 95%.",
      "Led adoption of GitHub Issues and Projects across the company with standardized workflows for bugs, features, and releases.",
    ],
    chips: ["Python", "FastAPI", "Odoo", "OpenAI", "n8n", "Selenium", "PostgreSQL"],
  },
] as const;

const PROJECTS = [
  {
    title: "Nori — AI requirements assistant (NortDev)",
    body: "Banorte-aligned web stack for structured requirements: conversational IA, RAG over organizational knowledge, and exportable corporate docs.",
    links: [
      { label: "Backend (API)", href: "https://github.com/nortdevv/nori-api" },
      { label: "Frontend", href: "https://github.com/nortdevv/nori" },
    ],
  },
  {
    title: "Machtia — soft skills for the coffee sector",
    body: "RAG with semantic and hybrid search, embeddings, and an AI chat assistant wired to Apple Intelligence tooling. FastAPI backend, Streamlit admin, SwiftUI iOS client, PostgreSQL with pgvector.",
    links: [
      { label: "iOS app", href: "https://github.com/Bryan-Meza/Coffee-Overflow-MachtiaApp" },
      { label: "Desktop (Streamlit)", href: "https://github.com/rogervdo/MachtiaStreamlit" },
    ],
  },
  {
    title: "OXXO training platform",
    body: "Advisor training stack: ASP.NET Core REST APIs and Razor Pages with Unity WebGL scenarios. Modular C# services for session lifecycle, check-in/out, auth, and decision tracking for large concurrent cohorts.",
    links: [
      { label: "Unity", href: "https://github.com/rogervdo/oxxo-unity" },
      { label: "Web", href: "https://github.com/rogervdo/oxxo-web" },
    ],
  },
  {
    title: "YouTube Stamina Focus",
    body: "Chromium (Manifest V3) extension for softer daily limits on YouTube: caps, optional countdowns, comment gating, quality nudges, and thumbnail downgrades—everything stays on-device.",
    links: [{ label: "Repository", href: "https://github.com/rogervdo/Stamina" }],
  },
] as const;

const LEADERSHIP: readonly {
  title: string;
  year: string;
  body: string;
  href?: string;
  imageSlug: string;
}[] = [
  {
    title: "Focus Coding Group — co-founder",
    year: "2023 — Present",
    body:
      'Co-founded Focus Coding Group with the objective of improving how we practice and level up as engineers. Members have landed roles at Oracle, Pinterest, C3.ai, Accenture, and Softtek.',
    imageSlug: "L1-focus",
  },
  {
    title: "HackMTY 2025 — Capital One track (Cappie)",
    year: "2025",
    body: "Hackathon delivery for the Capital One fintech challenge: AI-forward banking UX with personalized coaching—FastAPI backend, MySQL, and Gemini for categorization and savings recommendations.",
    href: "https://github.com/rogervdo/Hackmty2025-CapitalOne",
    imageSlug: "L2-hackmty",
  },
  {
    title: "Code or Die — LeetCode companion extension",
    year: "2024 — Present",
    body: "Open-source Chrome extension (forked from LeetNet) for friend activity feeds, difficulty leaderboards, daily rankings, and a strikes system—with aggressive client-side caching to limit API chatter.",
    href: "https://github.com/rogervdo/Code-or-Die",
    imageSlug: "L3-code-or-die",
  },
];

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
      className={`pointer-events-none inline-block shrink-0 align-baseline text-current opacity-95 h-3 w-3 motion-reduce:transition-none ${className ?? ""}`}
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
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: "-32% 0px -52% 0px", threshold: 0 },
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
        className="fixed left-4 top-4 z-[60] -translate-y-28 rounded-md bg-teal-300 px-4 py-2 text-sm font-semibold text-teal-900 shadow transition focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 md:px-12 lg:flex-row lg:items-start lg:justify-between lg:gap-x-24">
        <aside className="flex flex-col gap-24 pt-16 lg:sticky lg:top-0 lg:z-40 lg:min-h-[100dvh] lg:w-[48%] lg:max-w-md lg:justify-between lg:self-start lg:gap-12 lg:pt-24 lg:pb-12">
          <div>
            <header>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <Link href="/">Rogelio Villarreal</Link>
              </h1>
              <p className="mt-4 max-w-xs text-lg font-medium leading-normal text-slate-200 lg:text-xl">
                Junior Software Engineer · CS @ Tec de Monterrey
              </p>
              <p className="mt-4 max-w-xs text-base leading-normal text-slate-500">
                Full-stack delivery with pragmatic AI integrations—FastAPI and Python backends, careful data modeling,
                and iOS when the problem calls for it.
              </p>

              <SideNav active={active} className="mt-16 hidden lg:block" />
            </header>

            <nav className="mt-10 lg:hidden" aria-label="Jump links">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <li>
                  <a href="#about" className="hover:text-slate-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-slate-200">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-slate-200">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#leadership" className="hover:text-slate-200">
                    Leadership
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <footer className="pb-16 lg:mt-auto lg:pb-0">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    {...(s.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noreferrer noopener" })}
                    className="hover:text-teal-300"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </footer>
        </aside>

        <main className="lg:flex lg:w-[52%] lg:flex-col lg:py-24">
          <article className="pb-24 text-base leading-relaxed text-slate-400 lg:pb-16">
            <section id="about" className="scroll-mt-16 lg:scroll-mt-24">
              <h2 className="sr-only">About</h2>
              <div className="flex flex-col gap-4 lg:gap-12">
                <p>
                  I&apos;m <span className="text-slate-300">Rogelio Jesús Villarreal De Ochoa</span>, pursuing a Bachelor
                  of Science in Computer Science and Technology at{" "}
                  <span className="text-slate-300">Tecnológico de Monterrey</span> (August 2023 — June 2027) with a GPA of{" "}
                  93.1/100 (3.73/4.0). My coursework spans OOP, data structures &amp; algorithms, database systems,
                  software construction, multi-agent systems &amp; computational graphics, and cybersecurity.
                </p>
                <p>
                  Outside of class I ship product-style systems: integrations with LLM and OCR providers, realtime
                  automation pipelines, Swift and SwiftUI when the interface needs to be native, and Postgres or
                  MySQL backends via FastAPI. I care about reproducible workflows—issues, milestones, reviews—and about
                  making AI assist without replacing clear requirements.
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

              <div className="mb-12 flex justify-end">
                <Link
                  href="/resume.pdf"
                  className="group/link inline-flex items-baseline gap-x-1 text-[11px] font-semibold uppercase tracking-widest text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300 sm:text-[12px]"
                >
                  <span aria-hidden className="-translate-x-px text-slate-400">
                    [
                  </span>
                  <span>Résumé</span>
                  <ArrowUpRightTiny className="translate-y-[0.2em]" />
                  <span aria-hidden className="translate-x-px text-slate-400">
                    ]
                  </span>
                </Link>
              </div>

              <ol className="group/list space-y-3">
                {JOBS.map((job) => (
                  <li key={`${job.range}-${job.company}`}>
                    <div className="group relative lg:-mx-6 lg:rounded-md lg:border lg:border-transparent lg:bg-transparent lg:p-6 lg:transition-colors lg:hover:border-transparent lg:hover:bg-slate-800/50 lg:group-hover/list:opacity-60 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.15)] lg:hover:!opacity-100">
                      <a href={job.href} className="group/link-card relative mb-px block pb-12 focus-visible:z-40 focus-visible:outline-none lg:pb-8">
                        <span aria-hidden className="absolute inset-0 rounded-lg lg:-inset-x-px" />
                        <div className="relative z-10 grid gap-y-px sm:auto-rows-min sm:grid-cols-8 sm:gap-x-8 lg:gap-x-10">
                          <header className="z-10 text-[11px] font-semibold uppercase leading-normal tracking-normal text-slate-500 sm:col-span-2 sm:w-44 sm:tracking-wide lg:tracking-wider xl:w-52">
                            {job.range}
                          </header>
                          <div className="z-10 sm:col-span-6">
                            <span className="block text-xl font-semibold tracking-tight text-slate-200">
                              <span className="text-slate-200">{job.title}</span>
                              <span className="text-slate-200"> · </span>
                              <span className="transition-colors hover:text-teal-300 hover:underline hover:underline-offset-4 hover:transition-none focus-visible:text-teal-300">
                                <span className="inline-flex items-center gap-x-2 whitespace-nowrap">
                                  <span>{job.company}</span>
                                  <ArrowUpRightTiny className="-translate-y-px opacity-95" />
                                </span>
                              </span>
                            </span>
                            <div className="mt-4 space-y-3 text-sm leading-normal text-slate-400 lg:leading-relaxed">
                              {job.lines.map((line) => (
                                <p key={line}>{line}</p>
                              ))}
                            </div>
                            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2" aria-label="Technologies used">
                              {job.chips.map((c) => (
                                <li
                                  key={c}
                                  className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium tracking-wide text-teal-300"
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
                className="group/link mt-14 inline-flex items-center gap-x-2 text-[15px] font-semibold text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300 sm:text-base"
              >
                View full résumé <ArrowUpRightTiny className="translate-y-[0.11em]" />
              </Link>
            </section>

            <section id="projects" className="scroll-mt-24 lg:pb-28">
              <h2 className="mb-14 text-xs font-semibold uppercase tracking-widest text-slate-200">Featured projects</h2>
              <ul className="space-y-24">
                {PROJECTS.map((p, index) => {
                  const primary = p.links[0]?.href ?? "#projects";
                  return (
                    <li key={p.title}>
                      <article>
                        <div className="relative z-10 grid gap-12 sm:grid-cols-8 sm:items-start sm:gap-x-8 sm:gap-y-0 lg:gap-x-10">
                          <div className="sm:col-span-2 sm:row-start-1">
                            <Image
                              className="aspect-video w-full shrink-0 rounded-lg border border-slate-200/10 bg-slate-800/70 object-cover transition-colors sm:aspect-[4/3] sm:max-w-[150px]"
                              src={`https://placehold.co/800x600/122131/75879b/png?font=mono&text=P${index + 1}`}
                              width={300}
                              height={225}
                              alt=""
                              sizes="(min-width: 640px) 150px, 100vw"
                            />
                          </div>
                          <div className="mt-10 sm:col-span-6 sm:mt-0 sm:flex sm:flex-col sm:justify-center">
                            <h3 className="text-xl font-semibold tracking-tight text-slate-200">
                              <a
                                href={primary}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="group/card mb-3 inline-flex items-center gap-x-2 text-sm font-semibold leading-snug tracking-tight text-slate-200 transition-colors hover:text-teal-300 hover:underline hover:underline-offset-4 hover:transition-none sm:mb-2 sm:text-base xl:text-lg"
                              >
                                {p.title}
                                <ArrowUpRightTiny className="-translate-y-px opacity-95" />
                              </a>
                            </h3>
                            <p className="text-sm">{p.body}</p>
                            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-wider text-teal-300/90">
                              {p.links.map((l) => (
                                <li key={l.href}>
                                  <a
                                    href={l.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="transition-colors hover:text-teal-300 hover:underline hover:underline-offset-4"
                                  >
                                    {l.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
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
                className="group/link mt-16 inline-flex items-center gap-x-2 text-[15px] font-semibold text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300 sm:text-base"
              >
                More repositories on GitHub <ArrowRightTiny />
              </a>
            </section>

            <section id="leadership" className="scroll-mt-24 lg:scroll-mt-24">
              <h2 className="mb-14 text-xs font-semibold uppercase tracking-widest text-slate-200">Leadership activities</h2>
              <ul className="space-y-20">
                {LEADERSHIP.map((item, index) => {
                  const HeadingContent = (
                    <span className="group/link inline-flex items-center gap-x-2 text-sm font-semibold leading-snug text-slate-200 transition-colors hover:text-teal-300 hover:underline hover:underline-offset-4 hover:transition-none focus-visible:text-teal-300 sm:text-[15px] lg:text-[15px]">
                      <span>{item.title}</span>
                      {item.href ? <ArrowUpRightTiny className="-translate-y-px shrink-0" /> : null}
                    </span>
                  );

                  return (
                    <li key={item.title}>
                      <article>
                        <div className="outline-offset-8 transition-colors focus-within:z-40">
                          <div className="relative z-10 grid gap-12 sm:grid-cols-8 sm:items-start sm:gap-x-8 sm:gap-y-px lg:gap-x-10">
                            <div className="relative sm:col-span-2">
                              <Image
                                alt=""
                                className="aspect-[5/4] w-full rounded-lg border border-slate-200/10 bg-slate-800/70 object-cover transition-colors sm:aspect-[4/3] sm:max-w-[150px]"
                                height={225}
                                src={`https://placehold.co/800x560/172033/8492a9/png?font=mono&text=${encodeURIComponent(item.imageSlug)}`}
                                width={300}
                                sizes="(min-width: 640px) 150px, 100vw"
                                loading={index === 0 ? "eager" : "lazy"}
                              />
                            </div>
                            <div className="sm:col-span-6 sm:flex sm:min-h-full sm:flex-col sm:justify-center">
                              <time
                                className="text-xs font-semibold uppercase tracking-wide text-slate-500 lg:translate-y-[0.15rem]"
                                dateTime={item.year.split("—")[0]?.trim() ?? item.year}
                              >
                                {item.year}
                              </time>
                              <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-200 lg:mt-4">
                                {item.href ? (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400/70"
                                  >
                                    {HeadingContent}
                                  </a>
                                ) : (
                                  HeadingContent
                                )}
                              </h3>
                              <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-400 lg:mt-4">{item.body}</p>
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

          <p className="mt-8 max-w-md text-sm leading-normal text-slate-500 lg:sticky lg:top-28 lg:z-40 lg:mt-12 lg:self-start lg:leading-relaxed">
            Adapted layout inspired by{" "}
            <a href="https://brittanychiang.com" className="font-medium text-slate-500 hover:text-teal-300">
              brittanychiang.com
            </a>
            . Built with Next.js · TypeScript · Tailwind CSS.
          </p>
        </main>
      </div>
    </div>
  );
}
