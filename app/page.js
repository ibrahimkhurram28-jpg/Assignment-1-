import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <div className="max-w-2xl">
        <p className="label mb-3" style={{ color: "var(--color-primary)" }}>
          Assessment 1 · Frontend design and usability
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-5 leading-tight">
          Build phoneme-based classroom activities in minutes.
        </h1>
        <p className="text-lg mb-8" style={{ color: "var(--color-ink-soft)" }}>
          Phoneme Builder helps Speech Pathology teachers turn a target sound into a playable
          Wordle-style game or a phoneme Word Search, configure it here, preview it live, then
          download a single HTML file that runs in any browser.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/wordle" className="btn btn-primary">Build a Wordle activity</Link>
          <Link href="/wordsearch" className="btn btn-outline">Build a Word Search</Link>
        </div>
      </div>
    </div>
  );
}
