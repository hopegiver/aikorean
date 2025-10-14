class WordMatch {
  constructor(options = {}) {
    this.options = options;
    this.element = null;
    this.allWords = [
      // 라운드 1
      { korean: '안녕하세요', meaning: 'Hello' },
      { korean: '감사합니다', meaning: 'Thank you' },
      { korean: '사랑', meaning: 'Love' },
      { korean: '친구', meaning: 'Friend' },
      { korean: '학교', meaning: 'School' },
      // 라운드 2
      { korean: '음식', meaning: 'Food' },
      { korean: '가족', meaning: 'Family' },
      { korean: '시간', meaning: 'Time' },
      { korean: '물', meaning: 'Water' },
      { korean: '책', meaning: 'Book' },
      // 라운드 3
      { korean: '집', meaning: 'House' },
      { korean: '나무', meaning: 'Tree' },
      { korean: '꽃', meaning: 'Flower' },
      { korean: '하늘', meaning: 'Sky' },
      { korean: '바다', meaning: 'Sea' },
      // 라운드 4
      { korean: '산', meaning: 'Mountain' },
      { korean: '강', meaning: 'River' },
      { korean: '길', meaning: 'Road' },
      { korean: '문', meaning: 'Door' },
      { korean: '창문', meaning: 'Window' }
    ];

    this.currentRound = 1;
    this.totalRounds = 4;
    this.wordsPerRound = 5;
    this.currentWords = [];
    this.selectedCards = [];
    this.matchedPairs = [];
    this.attempts = 0;
    this.totalAttempts = 0;
    this.startTime = null;
    this.koreanCards = [];
    this.meaningCards = [];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-module kla-word-match';
    this.element.innerHTML = `
      <div class="kla-module-header">
        <h3>단어 짝 맞추기</h3>
        <p class="kla-module-subtitle">한국어 단어와 영어 의미를 연결하세요</p>
      </div>

      <div class="kla-word-match-content">
        <div class="kla-round-info">
          <span class="kla-round-text">라운드 <span id="currentRound">1</span> / ${this.totalRounds}</span>
        </div>

        <div class="kla-game-stats">
          <div class="kla-stat">
            <span class="kla-stat-label">매칭:</span>
            <span class="kla-stat-value" id="matchCount">0 / ${this.wordsPerRound}</span>
          </div>
          <div class="kla-stat">
            <span class="kla-stat-label">시도:</span>
            <span class="kla-stat-value" id="attemptCount">0</span>
          </div>
          <div class="kla-stat">
            <span class="kla-stat-label">시간:</span>
            <span class="kla-stat-value" id="timeCount">00:00</span>
          </div>
        </div>

        <div class="kla-game-board-container">
          <div class="kla-game-column">
            <div class="kla-column-header">🇰🇷 한국어</div>
            <div class="kla-game-board" id="koreanBoard"></div>
          </div>

          <div class="kla-game-column">
            <div class="kla-column-header">🇺🇸 영어</div>
            <div class="kla-game-board" id="meaningBoard"></div>
          </div>
        </div>

        <div class="kla-game-actions">
          <button class="kla-btn kla-btn-secondary" id="resetButton">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="currentColor"/>
            </svg>
            다시 시작
          </button>
        </div>

        <div class="kla-result-section" id="resultSection" style="display: none;">
          <div class="kla-completion-badge">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700"/>
            </svg>
            <h3 id="resultTitle">라운드 완료!</h3>
          </div>

          <div class="kla-final-stats">
            <div class="kla-final-stat">
              <span class="kla-stat-number" id="finalAttempts">0</span>
              <span class="kla-stat-text">번 시도</span>
            </div>
            <div class="kla-final-stat">
              <span class="kla-stat-number" id="finalTime">00:00</span>
              <span class="kla-stat-text">소요 시간</span>
            </div>
            <div class="kla-final-stat">
              <span class="kla-stat-number" id="finalAccuracy">0%</span>
              <span class="kla-stat-text">정확도</span>
            </div>
          </div>

          <button class="kla-btn kla-btn-primary" id="nextRoundButton">
            다음 라운드
          </button>
          <button class="kla-btn kla-btn-primary" id="playAgainButton" style="display: none;">
            처음부터 다시
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
    this.initGame();
    return this.element;
  }

  attachEventListeners() {
    const resetButton = this.element.querySelector('#resetButton');
    const playAgainButton = this.element.querySelector('#playAgainButton');
    const nextRoundButton = this.element.querySelector('#nextRoundButton');

    resetButton.addEventListener('click', () => this.resetGame());
    playAgainButton.addEventListener('click', () => this.resetGame());
    nextRoundButton.addEventListener('click', () => this.nextRound());
  }

  initGame() {
    this.currentRound = 1;
    this.totalAttempts = 0;
    this.startTime = Date.now();
    this.loadRound();
    this.startTimer();
  }

  loadRound() {
    this.selectedCards = [];
    this.matchedPairs = [];
    this.attempts = 0;

    // 현재 라운드의 단어 가져오기
    const startIdx = (this.currentRound - 1) * this.wordsPerRound;
    this.currentWords = this.allWords.slice(startIdx, startIdx + this.wordsPerRound);

    this.createCards();
    this.updateStats();

    const currentRoundEl = this.element.querySelector('#currentRound');
    if (currentRoundEl) {
      currentRoundEl.textContent = this.currentRound;
    }
  }

  createCards() {
    const koreanBoard = this.element.querySelector('#koreanBoard');
    const meaningBoard = this.element.querySelector('#meaningBoard');

    koreanBoard.innerHTML = '';
    meaningBoard.innerHTML = '';

    // 한국어 카드 배열
    const koreanCards = this.currentWords.map((word, index) => ({
      id: `korean-${index}`,
      text: word.korean,
      type: 'korean',
      pairId: index
    }));

    // 영어 카드 배열
    const meaningCards = this.currentWords.map((word, index) => ({
      id: `meaning-${index}`,
      text: word.meaning,
      type: 'meaning',
      pairId: index
    }));

    // 각각 섞기
    const shuffledKorean = this.shuffleArray(koreanCards);
    const shuffledMeaning = this.shuffleArray(meaningCards);

    // 한국어 카드 생성
    shuffledKorean.forEach(card => {
      const cardElement = this.createCardElement(card);
      koreanBoard.appendChild(cardElement);
    });

    // 영어 카드 생성
    shuffledMeaning.forEach(card => {
      const cardElement = this.createCardElement(card);
      meaningBoard.appendChild(cardElement);
    });
  }

  createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = `kla-word-card kla-card-${card.type}`;
    cardElement.dataset.cardId = card.id;
    cardElement.dataset.pairId = card.pairId;
    cardElement.innerHTML = `
      <div class="kla-card-content">
        <span class="kla-card-text">${card.text}</span>
      </div>
    `;

    cardElement.addEventListener('click', () => this.selectCard(cardElement, card));
    return cardElement;
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  selectCard(cardElement, card) {
    // 이미 매칭된 카드나 선택된 카드는 무시
    if (cardElement.classList.contains('kla-card-matched') ||
        cardElement.classList.contains('kla-card-selected')) {
      return;
    }

    // 같은 타입 2개 선택 방지
    if (this.selectedCards.length === 1 &&
        this.selectedCards[0].card.type === card.type) {
      return;
    }

    cardElement.classList.add('kla-card-selected');
    this.selectedCards.push({ element: cardElement, card });

    // 2개 선택되면 매칭 확인
    if (this.selectedCards.length === 2) {
      this.attempts++;
      this.totalAttempts++;
      this.updateStats();
      setTimeout(() => this.checkMatch(), 500);
    }
  }

  checkMatch() {
    const [first, second] = this.selectedCards;

    if (first.card.pairId === second.card.pairId) {
      // 매칭 성공
      first.element.classList.remove('kla-card-selected');
      second.element.classList.remove('kla-card-selected');
      first.element.classList.add('kla-card-matched');
      second.element.classList.add('kla-card-matched');

      this.matchedPairs.push(first.card.pairId);

      // 성공 애니메이션
      this.animateSuccess([first.element, second.element]);

      // 모든 짝을 맞췄는지 확인
      if (this.matchedPairs.length === this.currentWords.length) {
        setTimeout(() => this.completeRound(), 500);
      }
    } else {
      // 매칭 실패
      first.element.classList.add('kla-card-wrong');
      second.element.classList.add('kla-card-wrong');

      setTimeout(() => {
        first.element.classList.remove('kla-card-selected', 'kla-card-wrong');
        second.element.classList.remove('kla-card-selected', 'kla-card-wrong');
      }, 800);
    }

    this.selectedCards = [];
    this.updateStats();
  }

  animateSuccess(elements) {
    elements.forEach(el => {
      el.style.animation = 'none';
      setTimeout(() => {
        el.style.animation = 'kla-match-success 0.6s ease';
      }, 10);
    });
  }

  updateStats() {
    const matchCount = this.element.querySelector('#matchCount');
    const attemptCount = this.element.querySelector('#attemptCount');

    matchCount.textContent = `${this.matchedPairs.length} / ${this.wordsPerRound}`;
    attemptCount.textContent = this.attempts;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      const timeCount = this.element.querySelector('#timeCount');
      if (timeCount) {
        timeCount.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  completeRound() {
    // 마지막 라운드인지 확인
    if (this.currentRound === this.totalRounds) {
      // 최종 결과 표시
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      // 전체 정확도 계산 (전체 단어 수 대비 전체 시도 수)
      const totalWords = this.allWords.length;
      const accuracy = Math.round((totalWords / this.totalAttempts) * 100);

      const resultSection = this.element.querySelector('#resultSection');
      const resultTitle = this.element.querySelector('#resultTitle');
      const finalAttempts = this.element.querySelector('#finalAttempts');
      const finalTime = this.element.querySelector('#finalTime');
      const finalAccuracy = this.element.querySelector('#finalAccuracy');
      const nextRoundButton = this.element.querySelector('#nextRoundButton');
      const playAgainButton = this.element.querySelector('#playAgainButton');

      resultTitle.textContent = '모든 라운드 완료! 🎉';
      finalAttempts.textContent = this.totalAttempts;
      finalTime.textContent = timeString;
      finalAccuracy.textContent = `${accuracy}%`;
      nextRoundButton.style.display = 'none';
      playAgainButton.style.display = 'inline-flex';

      this.stopTimer();
      resultSection.style.display = 'block';

      // 축하 애니메이션
      setTimeout(() => {
        resultSection.querySelector('.kla-completion-badge').style.animation = 'kla-bounce 0.8s ease';
      }, 100);
    } else {
      // 중간 라운드는 결과 표시 없이 바로 다음 라운드로
      setTimeout(() => {
        this.nextRound();
      }, 500);
    }
  }

  nextRound() {
    const resultSection = this.element.querySelector('#resultSection');
    resultSection.style.display = 'none';

    this.currentRound++;
    this.loadRound();
  }

  resetGame() {
    this.stopTimer();

    const resultSection = this.element.querySelector('#resultSection');
    resultSection.style.display = 'none';

    this.initGame();
  }

  destroy() {
    this.stopTimer();
    if (this.element) {
      this.element.remove();
    }
  }
}

export default WordMatch;
