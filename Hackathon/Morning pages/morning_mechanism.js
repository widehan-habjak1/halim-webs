const WORDS_PER_PAGE = 117;
const TOTAL_WORDS = 350;

let state = { mode: 'none', currentDate: null, saveTimer: null };

/* ── UTILS ── */
function getTodayKey() { return new Date().toISOString().slice(0, 10); }

function formatDate(key) {
  return new Date(key + 'T00:00:00').toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
  });
}

function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

function loadEntries() {
  const raw = localStorage.getItem('morning_pages_entries');
  return raw ? JSON.parse(raw) : {};
}

function saveEntries(entries) {
  localStorage.setItem('morning_pages_entries', JSON.stringify(entries));
}

/* ── SIDEBAR ── */
function renderSidebar() {
  const entries = loadEntries();
  const list = document.getElementById('entriesList');
  const keys = Object.keys(entries).sort((a, b) => b.localeCompare(a));

  if (keys.length === 0) {
    list.innerHTML = '<div class="empty-state">No pages yet.<br>Click <em>+ new pages</em> to begin.</div>';
    return;
  }

  list.innerHTML = keys.map(key => {
    const e = entries[key];
    const words = countWords(e.text || '');
    const done = words >= TOTAL_WORDS;
    const preview = (e.text || '').trim().slice(0, 40) || '—';
    const isActive = state.currentDate === key;
    return `
      <div class="entry-item${isActive ? ' active' : ''}" data-key="${key}">
        <div class="entry-item-top">
          <div class="entry-date">${formatDate(key)}</div>
          <button class="entry-delete-btn" data-key="${key}">✕</button>
        </div>
        <div class="entry-preview">${preview}</div>
        <div class="entry-words ${done ? 'entry-complete' : ''}">${words} words${done ? ' ✓' : ''}</div>
      </div>`;
  }).join('');

  list.querySelectorAll('.entry-item').forEach(el => {
    el.addEventListener('click', () => {
      closeSidebar();
      openEntry(el.dataset.key);
    });
  });

  list.querySelectorAll('.entry-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.key;
      if (confirm(`${formatDate(key)} 삭제할까요?`)) {
        const entries2 = loadEntries();
        delete entries2[key];
        saveEntries(entries2);
        if (state.currentDate === key) {
          state.currentDate = null;
          state.mode = 'none';
          document.getElementById('writeMode').style.display = 'none';
          document.getElementById('readMode').classList.remove('show');
          document.getElementById('noEntry').style.display = 'flex';
        }
        renderSidebar();
        renderStreak();
      }
    });
  });
}

/* ── MOBILE SIDEBAR ── */
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}
document.getElementById('menuBtn').addEventListener('click', openSidebar);
document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

/* ── MODES ── */
function openNewEntry() {
  const key = getTodayKey();
  const entries = loadEntries();
  if (!entries[key]) {
    entries[key] = { text: '', createdAt: new Date().toISOString() };
    saveEntries(entries);
  }
  openWriteMode(key);
}

function openEntry(key) {
  key === getTodayKey() ? openWriteMode(key) : openReadMode(key);
}

function getEditor(n) { return document.getElementById('editor' + n); }

function openWriteMode(key) {
  state.mode = 'write';
  state.currentDate = key;

  document.getElementById('noEntry').style.display = 'none';
  const wm = document.getElementById('writeMode');
  wm.style.display = 'flex';
  document.getElementById('readMode').classList.remove('show');

  const text = loadEntries()[key]?.text || '';
  const parts = splitForEditing(text);
  getEditor(1).value = parts[0];
  getEditor(2).value = parts[1];
  getEditor(3).value = parts[2];

  document.getElementById('todayDate').innerHTML = `<strong>${formatDate(key)}</strong>`;
  updateProgress();
  renderSidebar();

  [1, 2].forEach(n => { while (isOverflowing(getEditor(n)) && n < 3) handlePageInput(n); });
}

function openReadMode(key) {
  state.mode = 'read';
  state.currentDate = key;

  document.getElementById('noEntry').style.display = 'none';
  document.getElementById('writeMode').style.display = 'none';
  const rm = document.getElementById('readMode');
  rm.classList.add('show');

  const text = loadEntries()[key]?.text || '';
  const words = countWords(text);
  document.getElementById('readDate').textContent = formatDate(key);
  document.getElementById('readMeta').textContent = `${words} words · ${Math.round(words / WORDS_PER_PAGE * 10) / 10} pages`;
  document.getElementById('readText').textContent = text;
  renderSidebar();
}

/* ── PROGRESS ── */
function updateProgress() {
  const text = getCombinedText();
  const words = countWords(text);
  document.getElementById('wordCount').innerHTML = `<span class="num">${words}</span>`;
}

/* ── SAVE ── */
function scheduleSave() {
  const status = document.getElementById('saveStatus');
  status.textContent = '— saving...';
  status.className = 'status-saving';
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(() => {
    const entries = loadEntries();
    if (!entries[state.currentDate]) entries[state.currentDate] = {};
    entries[state.currentDate].text = getCombinedText();
    entries[state.currentDate].updatedAt = new Date().toISOString();
    saveEntries(entries);
    status.textContent = '— saved';
    status.className = 'status-saved';
    renderSidebar();
  }, 600);
}

/* ── EXPORT ── */
let exportTargetKey = null;

function openExportModal(key) {
  exportTargetKey = key;
  const entries = loadEntries();
  const words = countWords(entries[key]?.text || '');
  document.getElementById('exportModalSub').textContent = `${formatDate(key)} · ${words} words`;
  document.getElementById('exportModal').classList.add('open');
}
function closeExportModal() {
  document.getElementById('exportModal').classList.remove('open');
}
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('exportTxt').addEventListener('click', () => {
  const entries = loadEntries();
  const text = entries[exportTargetKey]?.text || '';
  downloadFile(`morning-pages-${exportTargetKey}.txt`, text);
  closeExportModal();
});

document.getElementById('exportMd').addEventListener('click', () => {
  const entries = loadEntries();
  const text = entries[exportTargetKey]?.text || '';
  const words = countWords(text);
  const md = `# Morning Pages — ${formatDate(exportTargetKey)}\n\n_${words} words_\n\n---\n\n${text}`;
  downloadFile(`morning-pages-${exportTargetKey}.md`, md);
  closeExportModal();
});

document.getElementById('exportAll').addEventListener('click', () => {
  const entries = loadEntries();
  const keys = Object.keys(entries).sort((a, b) => a.localeCompare(b));
  const content = keys.map(key => {
    const text = entries[key]?.text || '';
    const words = countWords(text);
    return `===== ${formatDate(key)} (${words} words) =====\n\n${text}`;
  }).join('\n\n\n');
  downloadFile(`morning-pages-all.txt`, content);
  closeExportModal();
});

document.getElementById('exportClose').addEventListener('click', closeExportModal);
document.getElementById('exportModal').addEventListener('click', e => {
  if (e.target === document.getElementById('exportModal')) closeExportModal();
});

/* ── EVENTS ── */

document.getElementById('newBtn').addEventListener('click', () => { closeSidebar(); openNewEntry(); });
document.getElementById('mobileNewBtn').addEventListener('click', openNewEntry);
document.getElementById('readBackBtn').addEventListener('click', openNewEntry);

document.getElementById('exportBtnWrite').addEventListener('click', () => openExportModal(state.currentDate));
document.getElementById('exportBtnRead').addEventListener('click', () => openExportModal(state.currentDate));

/* ── THEME ── */
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('morning_theme');
if (savedTheme === 'light') { document.body.classList.add('light'); themeBtn.textContent = '🌙'; }

themeBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('morning_theme', isLight ? 'light' : 'dark');
});



// PAGE LOAD
function isOverflowing(ed) {
  return ed.scrollHeight > ed.clientHeight + 2; // +2 버퍼
}

function handlePageInput(n) {
  const ed = getEditor(n);

  // 다음 페이지가 있고, 현재 페이지가 가득 찼으면 → 넘친 부분을 다음 페이지로 밀어내기
  if (n < 3 && isOverflowing(ed)) {
    const next = getEditor(n + 1);
    // 마지막 한 글자(혹은 단어)를 다음 페이지 맨 앞으로 이동
    let text = ed.value;
    let moved = '';
    // 마지막 단어 단위로 떼어내기 (단어가 안 쪼개지게)
    const lastSpace = text.search(/\s+\S*$/);
    if (lastSpace > 0) {
      moved = text.slice(lastSpace);
      text = text.slice(0, lastSpace);
    } else {
      moved = text.slice(-1);
      text = text.slice(0, -1);
    }
    ed.value = text;
    next.value = moved.replace(/^\s+/, '') + next.value;
    next.focus();
    next.setSelectionRange(moved.trim().length, moved.trim().length);
  }

  updateProgress();
  scheduleSave();
}

function handlePageKeydown(n, e) {
  const ed = getEditor(n);
  // backspace at very start of page (n>1) → merge back into previous page
  if (e.key === 'Backspace' && ed.selectionStart === 0 && ed.selectionEnd === 0 && n > 1) {
    e.preventDefault();
    const prev = getEditor(n - 1);
    const cursorPos = prev.value.length;
    prev.value += ed.value;
    ed.value = '';
    prev.focus();
    prev.setSelectionRange(cursorPos, cursorPos);
    updateProgress();
    scheduleSave();
  }
}

[1, 2, 3].forEach(n => {
  const ed = getEditor(n);
  ed.addEventListener('input', () => handlePageInput(n));
  ed.addEventListener('keydown', (e) => handlePageKeydown(n, e));
});

function splitForEditing(fullText) {
  return [fullText || '', '', ''];
}

/* ── STREAK ── */
function calcStreak() {
  const entries = loadEntries();
  const keys = Object.keys(entries).sort((a, b) => b.localeCompare(a));
  if (keys.length === 0) return 0;

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (let i = 0; i < 365; i++) {
    const key = cursor.toISOString().slice(0, 10);
    if (entries[key] && countWords(entries[key].text || '') > 0) {
      streak++;
    } else if (i > 0) {
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function renderStreak() {
  document.getElementById('streakCount').textContent = calcStreak();
}

/* ── STATS VIEW ── */
function openStatsView() {
  state.mode = 'stats';
  document.getElementById('noEntry').style.display = 'none';
  document.getElementById('writeMode').style.display = 'none';
  document.getElementById('readMode').classList.remove('show');
  document.getElementById('statsView').classList.add('show');
  closeSidebar();
  renderStats();
}
function closeStatsView() {
  document.getElementById('statsView').classList.remove('show');
}

function renderStats() {
  const entries = loadEntries();
  const keys = Object.keys(entries);
  const totalWords = keys.reduce((sum, k) => sum + countWords(entries[k].text || ''), 0);
  const streak = calcStreak();

  document.getElementById('statStreak').textContent = streak;
  document.getElementById('statTotal').textContent = keys.length;
  document.getElementById('statWords').textContent = totalWords >= 1000
    ? (totalWords / 1000).toFixed(1) + 'k'
    : totalWords;

  renderHeatmap(entries);
}

function renderHeatmap(entries) {
  const grid = document.getElementById('heatmapGrid');
  grid.innerHTML = '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 179; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const words = entries[key] ? countWords(entries[key].text || '') : 0;

    let level = 0;
    if (words > 0) level = 1;
    if (words >= WORDS_PER_PAGE) level = 2;
    if (words >= WORDS_PER_PAGE * 2) level = 3;
    if (words >= TOTAL_WORDS) level = 4;

    const cell = document.createElement('div');
    cell.className = 'heatmap-cell';
    cell.dataset.level = level;
    cell.title = `${key}: ${words} words`;
    grid.appendChild(cell);
  }
}

document.getElementById('statsBtn').addEventListener('click', openStatsView);
document.getElementById('statsBackBtn').addEventListener('click', () => {
  closeStatsView();
  openNewEntry();
});

// Combined
function getCombinedText() {
  return getEditor(1).value + getEditor(2).value + getEditor(3).value;
}

/* ── CLEAR ALL ── */
document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('모든 페이지들을 삭제할까요? 되돌릴 수 없어요.')) {
    localStorage.removeItem('morning_pages_entries');
    state.currentDate = null;
    state.mode = 'none';
    document.getElementById('writeMode').style.display = 'none';
    document.getElementById('readMode').classList.remove('show');
    document.getElementById('statsView').classList.remove('show');
    document.getElementById('noEntry').style.display = 'flex';
    renderSidebar();
    renderStreak();
  }
});

/* ── INIT ── */
renderSidebar();
renderStreak();
const todayKey = getTodayKey();
if (loadEntries()[todayKey]) openWriteMode(todayKey);
