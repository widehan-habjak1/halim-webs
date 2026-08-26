document.addEventListener('DOMContentLoaded', () => {
  const saveJournal = document.querySelector('.submit-btn') // 저널 항목을 저장하는 버튼 선택
  const texts = document.querySelector('#journal') // 저널 텍스트가 입력되는 textarea 또는 입력 요소 선택
  const savedJournal = document.querySelector('#saved-journals') // 저장된 항목이 표시될 컨테이너 요소 선택
  const dateElement = document.querySelector('.date b') // 페이지 상단의 날짜 텍스트 선택

  const formatDate = (date) => {
    const day = date.getDate()
    const suffix = ['th', 'st', 'nd', 'rd'][(day % 100 > 10 && day % 100 < 14) ? 0 : (day % 10 < 4 ? day % 10 : 0)]
    const month = date.toLocaleDateString('en', { month: 'long' })
    const year = date.getFullYear()
    return `${day}${suffix} ${month}, ${year}`
  }

  if (dateElement) {
    dateElement.textContent = formatDate(new Date())
  }

  if (!saveJournal || !texts || !savedJournal) {
    // 요소가 없으면 조용히 중단(HTML과 클래스/ID가 일치하는지 확인
    return
  }

  // 초기 렌더링: 이미 저장된 항목 표시
  const renderEntries = (entries) => {
    savedJournal.innerHTML = ''
    entries.forEach(item => {
      const entryElement = document.createElement('div')
      entryElement.className = 'journal-entry'
      entryElement.textContent = `${item.date}: ${item.text}`
      savedJournal.appendChild(entryElement)
    })
  }

  const existing = JSON.parse(localStorage.getItem('dailyJournalEntries') || '[]')
  if (existing.length) renderEntries(existing)

  saveJournal.addEventListener('click', () => { // 저장 버튼의 클릭 이벤트를 감지
  const text = texts.value.trim() // 입력에서 텍스트를 가져오고 앞뒤 공백 제거
  if (!text) return // 정리된 텍스트가 비어 있으면 중단

  const entry = { // 저널 항목과 타임스탬프를 저장할 객체 생성
    text, // 저널 텍스트 속성
    date: new Date().toLocaleString(), // 읽기 쉬운 문자열 형식의 현재 날짜/시간
  }
    const entries = JSON.parse(localStorage.getItem('dailyJournalEntries') || '[]') // localStorage에서 기존 항목을 불러오거나 빈 배열로 시작
    entries.unshift(entry) // 새 항목을 배열 앞에 추가
    localStorage.setItem('dailyJournalEntries', JSON.stringify(entries)) // 업데이트된 배열을 JSON으로 localStorage에 저장

    renderEntries(entries)

    texts.value = '' // 저장 후 입력 필드 지우기
    texts.focus() // 다음 항목을 위해 입력으로 포커스 이동
  })
})