export const metadata = { title: "About: Phoneme Builder" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <h1 className="font-display text-3xl font-semibold mb-6">About this project</h1>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-2">What this is</h2>
        <p style={{ color: "var(--color-ink-soft)" }}>
          Phoneme Builder is a Wordle-style web application builder for Speech Pathology students and teachers. It lets a teacher configure phoneme-based classroom activities and generate a standalone HTML page that students can play in any normal web browser, with no login, install, or server required.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-2">Scope of this stage</h2>
        <p style={{ color: "var(--color-ink-soft)" }}>
          This build is Assessment 1 and is frontend only. There is no database or backend. The Wordle activity is built around a single fixed phoneme word, and the Word Search activity uses a small fixed list of five phoneme-based words.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-2">The two tools</h2>
        <ul className="space-y-2" style={{ color: "var(--color-ink-soft)" }}>
          <li><strong style={{ color: "var(--color-ink)" }}>Wordle</strong>: enter a phoneme word and its English match, then students guess it phoneme by phoneme with Wordle-style colour feedback.</li>
          <li><strong style={{ color: "var(--color-ink)" }}>Word Search</strong>: a fixed set of phoneme-based words is hidden in a letter grid, with phonetic clues that reveal their English match once found.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-3">Walkthrough video</h2>
        <div className="card overflow-hidden p-2">
          <video
            className="w-full rounded-lg"
            controls
            preload="metadata"
            playsInline
          >
            <source src="/walkthrough.mp4" type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
      </section>
    </div>
  );
}
