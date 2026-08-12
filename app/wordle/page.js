"use client";

import { useState } from "react";
import { splitPhonemeWord } from "@/lib/phonemes";
import { generateWordleHtml } from "@/lib/generateWordleHtml";
import { downloadHtml } from "@/lib/download";
import { PhonemeChart } from "@/components/PhonemeChart";
import { WordlePreview } from "@/components/WordlePreview";

export default function WordlePage() {
  const [phonemeInput, setPhonemeInput] = useState("k æ t");
  const [englishWord, setEnglishWord] = useState("cat");
  const [numGuesses, setNumGuesses] = useState(6);
  const [showHints, setShowHints] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  const answer = splitPhonemeWord(phonemeInput);

  function appendPhoneme(ipa) {
    setPhonemeInput((prev) => (prev.trim() ? `${prev.trim()} ${ipa}` : ipa));
  }

  function handleGenerate() {
    const html = generateWordleHtml({ phonemeWord: answer, englishWord, numGuesses, showHints, activityTitle: `Phoneme'le: ${englishWord || "activity"}`, studentName, studentNumber });
    downloadHtml(`phonemele-${(englishWord || "activity").toLowerCase()}`, html);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-8">
        <p className="label mb-2" style={{ color: "var(--color-primary)" }}>Builder</p>
        <h1 className="font-display text-3xl font-semibold">Wordle activity</h1>
        <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>Configure a single phoneme-based target word. Students guess it phoneme by phoneme, with Wordle-style colour feedback.</p>
      </header>
      <div className="grid lg:grid-cols-[22rem,1fr] gap-8">
        <form className="card p-5 space-y-5 h-fit" onSubmit={(e) => e.preventDefault()} aria-label="Wordle activity settings">
          <div><label className="label block mb-1" htmlFor="phonemeWord">Phoneme word</label><input id="phonemeWord" className="input font-mono-phoneme" value={phonemeInput} onChange={(e) => setPhonemeInput(e.target.value)} placeholder="e.g. k æ t" /><p className="text-xs mt-1" style={{ color: "var(--color-ink-soft)" }}>Separate each phoneme with a space, or tap symbols from the chart below.</p></div>
          <div><label className="label block mb-1" htmlFor="englishWord">English word</label><input id="englishWord" className="input" value={englishWord} onChange={(e) => setEnglishWord(e.target.value)} placeholder="e.g. cat" /></div>
          <div><label className="label block mb-1" htmlFor="numGuesses">Number of guesses</label><input id="numGuesses" type="number" min={1} max={10} className="input" value={numGuesses} onChange={(e) => setNumGuesses(Math.max(1, Math.min(10, Number(e.target.value) || 1)))} /></div>
          <fieldset><legend className="label mb-1">Show hints</legend><div className="flex gap-4 text-sm"><label className="flex items-center gap-2"><input type="radio" name="hints" checked={showHints} onChange={() => setShowHints(true)} />Yes</label><label className="flex items-center gap-2"><input type="radio" name="hints" checked={!showHints} onChange={() => setShowHints(false)} />No</label></div></fieldset>
          <div><label className="label block mb-1" htmlFor="studentName">Your name (footer credit)</label><input id="studentName" className="input" value={studentName} onChange={(e) => setStudentName(e.target.value)} /></div>
          <div><label className="label block mb-1" htmlFor="studentNumber">Student number</label><input id="studentNumber" className="input" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} placeholder="Enter student number" /></div>
          <button type="button" className="btn btn-primary w-full" onClick={handleGenerate} disabled={answer.length === 0}>Generate .html</button>
          <div><p className="label mb-2">Phoneme reference</p><PhonemeChart onPick={appendPhoneme} showHints={showHints} /></div>
        </form>
        <section className="card p-5 sm:p-8" aria-label="Live preview"><h2 className="font-semibold mb-4">Preview</h2><WordlePreview key={`${phonemeInput}-${numGuesses}`} answer={answer} englishWord={englishWord} numGuesses={numGuesses} showHints={showHints} /></section>
      </div>
    </div>
  );
}
