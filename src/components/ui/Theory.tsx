// Minimal markdown-to-HTML renderer.
// Supports headings (###), unordered lists (- ), pipe tables, and inline **bold**, *italic*, `code`.
// Just enough for our short theory blocks — no third-party dep needed.

import type { ReactNode } from 'react';

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let i = 0;
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const m = match[0];
    if (m.startsWith('**')) {
      nodes.push(<strong key={i++} className="font-semibold text-ink">{m.slice(2, -2)}</strong>);
    } else if (m.startsWith('`')) {
      nodes.push(<code key={i++} className="rounded bg-navy-50 px-1 py-0.5 text-[0.9em] font-mono">{m.slice(1, -1)}</code>);
    } else {
      nodes.push(<em key={i++} className="italic">{m.slice(1, -1)}</em>);
    }
    last = match.index + m.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function Theory({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^###\s+/.test(line)) {
      out.push(<h3 key={key++} className="mt-6 text-base font-bold text-ink">{inline(line.replace(/^###\s+/, ''))}</h3>);
      i++; continue;
    }
    if (/^##\s+/.test(line)) {
      out.push(<h2 key={key++} className="mt-7 text-lg font-extrabold text-ink">{inline(line.replace(/^##\s+/, ''))}</h2>);
      i++; continue;
    }

    if (/^\s*-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*-\s+/, ''));
        i++;
      }
      out.push(
        <ul key={key++} className="mt-3 space-y-1.5 text-sm text-ink list-disc pl-5">
          {items.map((it, idx) => <li key={idx}>{inline(it)}</li>)}
        </ul>
      );
      continue;
    }

    if (/^\|.*\|$/.test(line) && i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1])) {
      const header = line.slice(1, -1).split('|').map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\|.*\|$/.test(lines[i])) {
        rows.push(lines[i].slice(1, -1).split('|').map((c) => c.trim()));
        i++;
      }
      out.push(
        <div key={key++} className="mt-4 overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr>
                {header.map((h, idx) => (
                  <th key={idx} className="border-b border-navy-200 bg-surface-soft text-left px-3 py-2 font-semibold text-ink">{inline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => <td key={ci} className="border-b border-navy-100 px-3 py-2 text-ink">{inline(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.trim() === '') {
      i++; continue;
    }

    // paragraph (collect contiguous non-blank, non-special lines)
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' &&
      !/^###\s+/.test(lines[i]) && !/^##\s+/.test(lines[i]) &&
      !/^\s*-\s+/.test(lines[i]) && !/^\|.*\|$/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    out.push(<p key={key++} className="mt-3 text-sm text-ink leading-relaxed">{inline(buf.join(' '))}</p>);
  }

  return <div className="prose-tight">{out}</div>;
}
