"use client";

import { ArrowRight, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { currentLearning } from "@/content/currentLearning";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
};

const credentialHighlights = ["Java", "Python", "CCNA", "Generative AI", "Network Automation"];
const linkedIn = socials.find((social) => social.platform === "linkedin");
const focusAreas = currentLearning.filter((area) =>
  ["software-automation", "data-center-infrastructure", "cloud-technologies", "ai-driven-automation"].includes(
    area.id,
  ),
);

export function Hero() {
  const reduceMotion = useReducedMotion();
  const entrance = { opacity: 1, y: 0 };
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-slate-950"
      id="about"
    >
      <Image
        alt="Enterprise data center racks with organized network cabling"
        className="object-cover object-[62%_center]"
        fill
        priority
        sizes="100vw"
        src="/images/data-center-automation-hero.png"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/65" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.div
          animate={entrance}
          className="max-w-3xl"
          initial={initial}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-cyan-200">
            <span aria-hidden="true" className="h-px w-8 bg-cyan-300" />
            {profile.location}
          </p>

          <h1
            className="max-w-3xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl"
            id="hero-title"
          >
            Software Automation Trainee at Cisco Systems.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Martin Chetty builds AI-driven automation solutions for enterprise infrastructure, bringing together
            Python, Java, networking, cloud, and generative AI.
          </p>

          <ul aria-label="Core strengths" className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-100">
            {credentialHighlights.map((credential) => (
              <li className="flex items-center gap-2" key={credential}>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan-300" />
                {credential}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              href={`mailto:${profile.email}`}
            >
              Start a conversation
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            {linkedIn ? (
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/35 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                href={linkedIn.href}
                rel="noreferrer"
                target="_blank"
              >
                Connect on LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            {socials.map((social) => {
              const Icon = socialIcons[social.platform];

              return (
                <a
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  href={social.href}
                  key={social.platform}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" size={18} />
                  {social.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          animate={entrance}
          className="mt-14 border-t border-white/20 pt-5"
          initial={initial}
          transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium text-slate-300">Current focus</p>
          <ul aria-label="Current focus areas" className="mt-3 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <li className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white" key={area.id}>
                {area.label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
