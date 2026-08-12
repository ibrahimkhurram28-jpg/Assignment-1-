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

## References

International Phonetic Association. (n.d.). *The International Phonetic Alphabet and the IPA chart*. Retrieved August 12, 2026, from https://www.internationalphoneticassociation.org/content/full-ipa-chart/ipa-vowels

MDN Web Docs. (n.d.). *Document: Cookie property*. Retrieved August 12, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

MDN Web Docs. (n.d.). *Responsive web design*. Retrieved August 12, 2026, from https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design

Nielsen, J. (1994, April 24). *10 usability heuristics for user interface design*. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/

React. (n.d.). *Your first component*. Retrieved August 12, 2026, from https://react.dev/learn/your-first-component

Vercel. (n.d.). *Installation*. Next.js. Retrieved August 12, 2026, from https://nextjs.org/docs/app/getting-started/installation

World Wide Web Consortium. (2024, December 12). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
