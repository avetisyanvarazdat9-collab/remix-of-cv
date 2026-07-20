import { useEffect, useMemo, useRef, useState } from "react";

type ParsedStat = {
  target: number;
  prefix: string;
  suffix: string;
  useGrouping: boolean;
};

function parseNumericStat(value: string): ParsedStat | null {
  const normalized = value.replace(/,/g, "");
  const match = normalized.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numStr, suffix] = match;
  const target = Number(numStr);
  if (!Number.isFinite(target)) return null;

  return {
    target,
    prefix,
    suffix,
    useGrouping: value.includes(","),
  };
}

function formatCount(n: number, useGrouping: boolean) {
  const rounded = Math.round(n);
  return useGrouping ? rounded.toLocaleString("en-US") : String(rounded);
}

function formatStat({ target, prefix, suffix, useGrouping }: ParsedStat) {
  return `${prefix}${formatCount(target, useGrouping)}${suffix}`;
}

const DURATION_MS = 1800;

export function useCountUp<T extends HTMLElement = HTMLDivElement>(value: string) {
  const ref = useRef<T>(null);
  const parsed = useMemo(() => parseNumericStat(value), [value]);
  const finalDisplay = parsed ? formatStat(parsed) : value;

  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!parsed) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(finalDisplay);
          return;
        }

        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(parsed.target * eased);
          setDisplay(`${parsed.prefix}${formatCount(current, parsed.useGrouping)}${parsed.suffix}`);

          if (progress < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(finalDisplay);
          }
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [parsed, finalDisplay]);

  return { ref, display: parsed ? display : value };
}
