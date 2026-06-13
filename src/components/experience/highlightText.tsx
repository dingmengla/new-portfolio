import { Fragment } from "react";

type Span = { start: number; end: number };

function findSpans(text: string, phrases: string[]): Span[] {
  const spans: Span[] = [];

  for (const phrase of phrases.filter(Boolean)) {
    let from = 0;
    while (from < text.length) {
      const idx = text.indexOf(phrase, from);
      if (idx === -1) break;
      spans.push({ start: idx, end: idx + phrase.length });
      from = idx + phrase.length;
    }
  }

  spans.sort((a, b) => a.start - b.start || b.end - a.end);

  const merged: Span[] = [];
  for (const span of spans) {
    const last = merged[merged.length - 1];
    if (last && span.start < last.end) {
      last.end = Math.max(last.end, span.end);
    } else {
      merged.push({ ...span });
    }
  }

  return merged;
}

export function renderHighlightedText(
  text: string,
  phrases: string[],
  boldClassName = "font-semibold text-neutral-300"
) {
  const spans = findSpans(text, phrases);
  if (spans.length === 0) return text;

  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  spans.forEach((span, i) => {
    if (span.start > cursor) {
      nodes.push(<Fragment key={`t-${i}`}>{text.slice(cursor, span.start)}</Fragment>);
    }
    nodes.push(
      <strong key={`b-${i}`} className={boldClassName}>
        {text.slice(span.start, span.end)}
      </strong>
    );
    cursor = span.end;
  });

  if (cursor < text.length) {
    nodes.push(<Fragment key="tail">{text.slice(cursor)}</Fragment>);
  }

  return nodes;
}
