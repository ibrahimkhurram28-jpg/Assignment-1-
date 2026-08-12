import { CONSONANTS, VOWELS } from "./phonemes";

function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

export function generateWordleHtml(config) {
  const {
    phonemeWord,
    englishWord,
    numGuesses = 6,
    showHints = true,
    activityTitle = "Phoneme'le",
    studentName = "",
    studentNumber = "",
  } = config;

  const answer = phonemeWord.map((p) => p.trim()).filter(Boolean);
  const keyboardRows = [CONSONANTS, VOWELS];
  const dataPayload = {
    answer,
    englishWord,
    numGuesses: Math.max(1, Number(numGuesses) || 6),
    showHints: !!showHints,
    keyboardRows: keyboardRows.map((row) => row.map((p) => ({ ipa: p.ipa, label: p.label, example: p.example }))),
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(activityTitle)}: Phoneme Wordle</title>
<style>
:root{--bg:#f4f7f5;--surface:#fff;--ink:#182420;--soft:#4b5b55;--primary:#0f6e63;--border:#dbe4e0;--present:#e8823c;--correct:#2f8f5b;--absent:#8a948f}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,"Segoe UI",Roboto,Arial,sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:2rem 1rem 3rem}h1{font-family:Georgia,serif;margin:0 0 .25rem}.sub{color:var(--soft);margin:0 0 1.5rem;text-align:center;max-width:32rem}.grid{display:grid;gap:.5rem;margin-bottom:1.5rem}.row{display:grid;gap:.5rem;grid-auto-flow:column}.tile{width:3.4rem;height:3.4rem;border:2px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-family:Consolas,Menlo,monospace;background:var(--surface);font-weight:600}.tile.correct{background:var(--correct);border-color:var(--correct);color:#fff}.tile.present{background:var(--present);border-color:var(--present);color:#fff}.tile.absent{background:var(--absent);border-color:var(--absent);color:#fff}.msg{min-height:1.6rem;font-weight:600;margin-bottom:1rem;text-align:center}.msg.win{color:var(--correct)}.msg.lose{color:#c0503b}.keyboard{display:flex;flex-direction:column;gap:.6rem;max-width:40rem}.kbrow{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center}.key{border:1px solid var(--border);background:var(--surface);color:var(--ink);border-radius:6px;padding:.5rem .6rem;font-family:Consolas,Menlo,monospace;cursor:pointer;font-size:1rem;min-width:2.6rem}.key .hint{display:block;font-family:Arial,sans-serif;font-size:.6rem;color:var(--soft);margin-top:.15rem}.controls{display:flex;gap:.6rem;margin:1.25rem 0}.btn{border-radius:8px;padding:.6rem 1.1rem;border:1px solid var(--border);background:var(--surface);cursor:pointer;font-weight:600}.btn.primary{background:var(--primary);border-color:var(--primary);color:#fff}footer{margin-top:2.5rem;color:var(--soft);font-size:.85rem;text-align:center}
</style>
</head>
<body>
<h1>${esc(activityTitle)}</h1>
<p class="sub">Build the target word one phoneme at a time. Click phoneme tiles below to fill a row, then press Enter.</p>
<div id="grid" class="grid"></div>
<div id="msg" class="msg" role="status" aria-live="polite"></div>
<div class="controls"><button class="btn" id="backspace" type="button">⌫ Remove</button><button class="btn primary" id="enter" type="button">Enter ↵</button></div>
<div id="keyboard" class="keyboard"></div>
<footer>${esc(studentName)}${studentName && studentNumber ? ", " : ""}${esc(studentNumber)}</footer>
<script>
const DATA=${JSON.stringify(dataPayload)};const answer=DATA.answer;const wordLen=answer.length;const maxGuesses=DATA.numGuesses;let currentRow=0;let currentGuess=[];let gameOver=false;const gridEl=document.getElementById('grid');const msgEl=document.getElementById('msg');const kbEl=document.getElementById('keyboard');gridEl.style.gridTemplateRows='repeat('+maxGuesses+', auto)';for(let r=0;r<maxGuesses;r++){const row=document.createElement('div');row.className='row';row.style.gridTemplateColumns='repeat('+wordLen+', auto)';for(let c=0;c<wordLen;c++){const tile=document.createElement('div');tile.className='tile';tile.id='tile-'+r+'-'+c;row.appendChild(tile)}gridEl.appendChild(row)}DATA.keyboardRows.forEach(group=>{const rowEl=document.createElement('div');rowEl.className='kbrow';group.forEach(p=>{const key=document.createElement('button');key.type='button';key.className='key';key.innerHTML='/'+p.ipa+'/'+(DATA.showHints?'<span class="hint">'+p.label+'</span>':'');key.addEventListener('click',()=>pressPhoneme(p.ipa));rowEl.appendChild(key)});kbEl.appendChild(rowEl)});document.getElementById('backspace').addEventListener('click',()=>{if(!gameOver){currentGuess.pop();render()}});document.getElementById('enter').addEventListener('click',submit);function pressPhoneme(ipa){if(gameOver||currentGuess.length>=wordLen)return;currentGuess.push(ipa);render()}function render(){for(let c=0;c<wordLen;c++){document.getElementById('tile-'+currentRow+'-'+c).textContent=currentGuess[c]||''}}function submit(){if(gameOver||currentGuess.length!==wordLen)return;const result=scoreGuess(currentGuess,answer);for(let c=0;c<wordLen;c++)document.getElementById('tile-'+currentRow+'-'+c).classList.add(result[c]);if(result.every(r=>r==='correct')){gameOver=true;msgEl.textContent='Correct! /'+answer.join(' ')+'/ = "'+DATA.englishWord+'"';msgEl.className='msg win'}else{currentRow++;currentGuess=[];if(currentRow>=maxGuesses){gameOver=true;msgEl.textContent='Out of guesses. The word was /'+answer.join(' ')+'/ = "'+DATA.englishWord+'"';msgEl.className='msg lose'}}}function scoreGuess(guess,ans){const result=Array(guess.length).fill('absent');const copy=[...ans];for(let i=0;i<guess.length;i++){if(guess[i]===ans[i]){result[i]='correct';copy[i]=null}}for(let i=0;i<guess.length;i++){if(result[i]==='correct')continue;const idx=copy.indexOf(guess[i]);if(idx!==-1){result[i]='present';copy[idx]=null}}return result}
</script>
</body>
</html>`;
}
