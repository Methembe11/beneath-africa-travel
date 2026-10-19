export type LockupVariant = "roman" | "italic" | "sans";

export type LockupLine = {
  text: string;
  variant?: LockupVariant;
  /** one word inside the line set in italic, for pattern D */
  italicWord?: string;
};

/* ============================================================
   The two-family hard-break lockup.

   Two lines, hard break. Line two is indented in `em`, resolved
   against this element's own font-size, and stepped down to
   0.86em. Three signals then do one job: the size drop, the
   indent, and the slant. Drop the size step and it reads as a
   wrapping error.

   Indent ladder is 0 / 0.90 / 1.20 / 1.55em and nothing else.
   Italic gets 0.35em more than roman because italic faces carry
   a negative left sidebearing — without the correction an
   italic line looks less indented than a roman one at the same
   nominal value.
   ============================================================ */

export default function Lockup({
  lines,
  as: Tag = "h2",
  size = "d2",
  className,
  id,
}: {
  lines: readonly LockupLine[];
  as?: "h1" | "h2" | "h3" | "p";
  size?: "d1" | "d2" | "d3";
  className?: string;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      data-size={size}
      className={`lockup ${className ?? ""}`.trim()}
    >
      {lines.map((line, i) => {
        const variant: LockupVariant = line.variant ?? "roman";
        const body = renderLine(line);
        if (i === 0) {
          return <span key={i}>{body}</span>;
        }
        return (
          <span key={i} className="lockup__l2" data-variant={variant}>
            {body}
          </span>
        );
      })}
    </Tag>
  );
}

function renderLine(line: LockupLine) {
  if (!line.italicWord) return line.text;
  const at = line.text.indexOf(line.italicWord);
  if (at === -1) return line.text;
  const before = line.text.slice(0, at);
  const word = line.italicWord;
  const after = line.text.slice(at + word.length);
  return (
    <>
      {before}
      <em>{word}</em>
      {after}
    </>
  );
}