/* AstroMind: a dependency-free educational mission explorer. Data: data/missions.json. */
'use strict';

const STORAGE_KEY = 'astromind.completedMissions.v1';
const state = { missions: [], filter: 'All', search: '', completed: readCompleted(), current: null, quizIndex: 0, selected: null, answers: [] };
const $ = (selector) => document.querySelector(selector);

function readCompleted() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return new Set(Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string') : []);
  } catch { return new Set(); }
}
function persistCompleted() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.completed])); }
  catch { /* Site remains usable in private browsing / blocked storage. */ }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function safeLink(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && ['nasa.gov','www.nasa.gov','science.nasa.gov','www.jpl.nasa.gov'].includes(url.hostname) ? url.toString() : '#'; }
  catch { return '#'; }
}
const zoneIcons = {Moon: '☾', Mars: '✹', 'Deep Space': '✦'};

function renderStats() {
  const total = state.missions.length;
  const completed = state.missions.filter(m => state.completed.has(m.id)).length;
  $('#mission-total').textContent = String(total).padStart(2,'0');
  $('#quiz-total').textContent = String(state.missions.reduce((n,m) => n + m.quiz.length, 0)).padStart(2,'0');
  $('#progress-label').textContent = `${completed} / ${total} completed`;
  $('#progress-bar').style.width = `${total ? 100 * completed / total : 0}%`;
}
function renderCards() {
  const query = state.search.trim().toLowerCase();
  const matches = state.missions.filter(m => (state.filter === 'All' || m.destination === state.filter) &&
    `${m.name} ${m.hardware} ${m.destination} ${m.summary}`.toLowerCase().includes(query));
  const grid = $('#mission-grid');
  if (!matches.length) { grid.innerHTML = '<p class="empty-message">No matching missions. Try a different destination or search term.</p>'; return; }
  grid.innerHTML = matches.map(m => `
    <article class="mission-card" data-zone="${escapeHTML(m.destination)}">
      <div class="mission-card-top"><span class="zone-label">${escapeHTML(m.destination.toUpperCase())}</span><span class="zone-icon" aria-hidden="true">${zoneIcons[m.destination] || '✦'}</span></div>
      <div class="mission-card-body">
        <span class="mission-eyebrow">${escapeHTML(m.eyebrow)}</span>
        <h3>${escapeHTML(m.name)}</h3>
        <p>${escapeHTML(m.summary)}</p>
        <div class="card-footer"><span class="status ${m.statusKind === 'active' ? 'active':''}">${escapeHTML(m.statusLabel)}</span><button type="button" class="mission-open" data-open="${escapeHTML(m.id)}" aria-label="Open ${escapeHTML(m.name)} mission">Explore →</button></div>
        ${state.completed.has(m.id) ? '<span class="completed-tag">✓ Knowledge check complete</span>' : ''}
      </div>
    </article>`).join('');
  grid.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openMission(button.dataset.open)));
}
function openMission(id) {
  const mission = state.missions.find(m => m.id === id);
  if (!mission) return;
  state.current = mission; state.quizIndex = 0; state.selected = null; state.answers = [];
  const facts = mission.facts.map(f => `<div class="fact"><span>${escapeHTML(f.label)}</span><strong>${escapeHTML(f.value)}</strong></div>`).join('');
  const discoveries = mission.discoveries.map(item => `<li>${escapeHTML(item)}</li>`).join('');
  $('#dialog-content').innerHTML = `
    <p class="dialog-eyebrow">${escapeHTML(mission.destination)} / ${escapeHTML(mission.hardware)}</p>
    <h2 id="dialog-title">${escapeHTML(mission.name)}</h2>
    <p class="lead">${escapeHTML(mission.summary)}</p><span class="detail-status">${escapeHTML(mission.statusLabel)}</span>
    <div class="detail-section"><h3>Mission log</h3><p>${escapeHTML(mission.story)}</p></div>
    <div class="detail-section"><h3>Quick facts</h3><div class="fact-grid">${facts}</div></div>
    <div class="detail-section"><h3>What we learned</h3><ul>${discoveries}</ul>
      <a class="source-link" href="${escapeHTML(safeLink(mission.source))}" target="_blank" rel="noopener noreferrer">Verify this mission on NASA ↗</a></div>
    <section class="detail-section" aria-labelledby="quiz-heading"><h3 id="quiz-heading">Knowledge check</h3><div id="quiz-region" aria-live="polite"></div></section>
  `;
  renderQuestion();
  const dialog = $('#mission-dialog');
  if (!dialog.open) dialog.showModal();
  $('#dialog-close').focus();
}
function renderQuestion() {
  const mission = state.current;
  const root = $('#quiz-region');
  if (!mission || !root) return;
  if (state.quizIndex >= mission.quiz.length) {
    const correct = state.answers.reduce((sum,answer,index) => sum + Number(answer === mission.quiz[index].correctIndex),0);
    state.completed.add(mission.id); persistCompleted(); renderStats(); renderCards();
    root.innerHTML = `<div class="quiz-result" role="status"><strong>${correct} / ${mission.quiz.length}</strong><h3>Mission check complete!</h3><p>Nice work, explorer. Your completion is saved in this browser. Review the mission facts anytime.</p><button id="quiz-replay" type="button">Retake quiz ↻</button></div>`;
    $('#quiz-replay').addEventListener('click', () => { state.quizIndex = 0; state.selected = null; state.answers = []; renderQuestion(); });
    return;
  }
  const question = mission.quiz[state.quizIndex];
  state.selected = null;
  root.innerHTML = `
    <p class="quiz-progress">QUESTION ${state.quizIndex + 1} / ${mission.quiz.length}</p>
    <p class="quiz-question">${escapeHTML(question.question)}</p>
    <div class="quiz-options">${question.options.map((choice,index) => `<button type="button" class="quiz-choice" data-choice="${index}">${String.fromCharCode(65+index)}. ${escapeHTML(choice)}</button>`).join('')}</div>
    <p class="quiz-feedback" id="quiz-feedback" aria-live="polite">Choose one answer.</p>
    <button type="button" class="quiz-next" id="quiz-next" disabled>${state.quizIndex + 1 === mission.quiz.length ? 'Finish quiz →' : 'Next question →'}</button>`;
  root.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => selectChoice(Number(button.dataset.choice))));
  $('#quiz-next').addEventListener('click', () => {
    if (state.selected === null) return;
    state.answers.push(state.selected); state.quizIndex++; renderQuestion();
  });
}
function selectChoice(index) {
  if (state.selected !== null) return;
  state.selected = index;
  const question = state.current.quiz[state.quizIndex];
  $('#quiz-region').querySelectorAll('[data-choice]').forEach(button => {
    const value = Number(button.dataset.choice);
    button.disabled = true;
    if (value === question.correctIndex) button.classList.add('correct');
    else if (value === index) button.classList.add('incorrect');
  });
  $('#quiz-feedback').textContent = `${index === question.correctIndex ? 'Correct!' : 'Not quite.'} ${question.explanation}`;
  $('#quiz-next').disabled = false;
  $('#quiz-next').focus();
}
async function init() {
  $('#dialog-close').addEventListener('click', () => $('#mission-dialog').close());
  $('#mission-dialog').addEventListener('click', event => { if (event.target === $('#mission-dialog')) $('#mission-dialog').close(); });
  $('#destination-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-filter]'); if (!button) return;
    state.filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(chip => { const selected = chip === button; chip.classList.toggle('selected',selected); chip.setAttribute('aria-pressed',String(selected)); });
    renderCards();
  });
  $('#mission-search').addEventListener('input', event => { state.search = event.target.value; renderCards(); });
  $('#reset-progress').addEventListener('click', () => {
    if (state.completed.size === 0) return;
    if (window.confirm('Clear your completed mission progress on this device?')) { state.completed.clear(); persistCompleted(); renderCards(); renderStats(); }
  });
  try {
    const response = await fetch('data/missions.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.missions)) throw new Error('Invalid mission data');
    state.missions = payload.missions;
    if (payload.metadata?.lastReviewed) $('#reviewed-date').textContent = `NASA sources reviewed ${payload.metadata.lastReviewed}`;
    renderStats(); renderCards();
  } catch (error) {
    console.error('AstroMind could not load mission data:',error);
    $('#mission-grid').innerHTML = '';
    $('#load-error').hidden = false;
  }
}
document.addEventListener('DOMContentLoaded',init);
