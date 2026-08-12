# Phoneme Builder — Assessment 1

Phoneme Builder is a frontend web application for creating simple phoneme-based classroom activities for Speech Pathology teaching.

The project includes two activity builders:

- **Wordle** — create a phoneme-based target word, choose the number of guesses and hints, preview the game, and export it as a standalone HTML file.
- **Word Search** — generate a phoneme word-search puzzle with selectable grid sizes and optional diagonal placement, preview it, and export it as a standalone HTML file.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Main project structure

```text
app/
  page.js
  wordle/page.js
  wordsearch/page.js
  settings/page.js
  about/page.js
components/
  Header.jsx
  Footer.jsx
  ThemeProvider.jsx
  PhonemeChart.jsx
  WordlePreview.jsx
  WordSearchPreview.jsx
lib/
  phonemes.js
  wordSearchGrid.js
  generateWordleHtml.js
  generateWordSearchHtml.js
  download.js
```

## Assessment 1 scope

This stage is frontend-only and does not use a database or backend. The Wordle activity uses one phoneme target at a time and the Word Search uses a fixed starter list. The project structure is designed so these features can be expanded in later assessments.

## Walkthrough

The About page contains a section for the short website walkthrough video.
