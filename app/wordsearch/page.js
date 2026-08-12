"use client";

import { useState } from "react";
import { WORD_SEARCH_WORDS } from "@/lib/phonemes";
import { generateWordSearchHtml } from "@/lib/generateWordSearchHtml";
import { downloadHtml } from "@/lib/download";
import { WordSearchPreview } from "@/components/WordSearchPreview";

const SIZE_PRESETS = [
  { value: 8, label: "Small (8×8)" },
  { value: 10, label: "Medium (10×10)" },
  { value: 13, label: "Large (13×13)" },
];

export default function WordSearchPage() {
  const [size, setSize] = useState(10);
  const [allowDiagonal, setAllowDiagonal] = useState(true);
  const [activityTitle, setActivityTitle] = useState("Phoneme Word Search");
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  function handleGenerate() {
    const html = generateWordSearchHtml({ words: WORD_SEARCH_WORDS, size, allowDiagonal, activityTitle, studentName, studentNumber });
    downloadHtml("phoneme-word-search", html);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-8">
        <p className="label mb-2" style={{ color: "var(--color-primary)" }}>Builder</p>
        <h1 className="font-display text-3xl font-semibold">Word Search activity</h1>
        <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
          A fixed set of five phoneme-based words is hidden in the grid. Students match the phonetic clue to the hidden word, and can hover a clue for the letter hint.
        </p>
      </header>

      <div className="grid lg:grid-cols-[22rem,1fr] gap-8">
        <form className="card p-5 space-y-5 h-fit" onSubmit={(e) => e.preventDefault()} aria-label="Word Search activity settings">
          <div>
            <label className="label block mb-1" htmlFor="activityTitle">Activity title</label>
            <input id="activityTitle" className="input" value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} />
          </div>

          <fieldset>
            <legend className="label mb-1">Grid size</legend>
            <div className="flex flex-col gap-2 text-sm">
              {SIZE_PRESETS.map((preset) => (
                <label key={preset.value} className="flex items-center gap-2">
                  <input type="radio" name="size" checked={size === preset.value} onChange={() => setSize(preset.value)} />
                  {preset.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="label mb-1">Directions</legend>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={allowDiagonal} onChange={(e) => setAllowDiagonal(e.target.checked)} />
              Allow diagonal placements
            </label>
          </fieldset>

          <div><label className="label block mb-1" htmlFor="studentName">Your name (footer credit)</label><input id="studentName" className="input" value={studentName} onChange={(e) => setStudentName(e.target.value)} /></div>
          <div><label className="label block mb-1" htmlFor="studentNumber">Student number</label><input id="studentNumber" className="input" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} placeholder="Enter student number" /></div>

          <button type="button" className="btn btn-primary w-full" onClick={handleGenerate}>Generate .html</button>

          <div>
            <p className="label mb-2">Word list (fixed for this stage)</p>
            <ul className="space-y-1 text-sm">
              {WORD_SEARCH_WORDS.map((w) => (
                <li key={w.english} className="font-mono-phoneme">/{w.phonemes.join(" ")}/ <span className="font-sans" style={{ color: "var(--color-ink-soft)" }}>→ {w.english}</span></li>
              ))}
            </ul>
          </div>
        </form>

        <section className="card p-5 sm:p-8 overflow-x-auto" aria-label="Live preview">
          <h2 className="font-semibold mb-4">Preview</h2>
          <WordSearchPreview key={`${size}-${allowDiagonal}`} words={WORD_SEARCH_WORDS} size={size} allowDiagonal={allowDiagonal} />
        </section>
      </div>
    </div>
  );
}
