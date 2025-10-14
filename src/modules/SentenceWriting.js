import AIService from '../services/AIService.js';

class SentenceWriting {
  constructor(options = {}) {
    this.options = options;
    this.aiService = new AIService(options);
    this.element = null;
    this.currentSentenceIndex = 0;
    this.userAnswer = '';
    this.isChecked = false;

    this.sentences = [
      {
        english: 'Hello, nice to meet you.',
        korean: '안녕하세요, 만나서 반갑습니다.',
        hints: ['안녕하세요', '만나다', '반갑다']
      },
      {
        english: 'I want to learn Korean.',
        korean: '저는 한국어를 배우고 싶어요.',
        hints: ['배우다', '싶다', '한국어']
      },
      {
        english: 'What did you do yesterday?',
        korean: '어제 무엇을 했어요?',
        hints: ['어제', '무엇', '하다']
      },
      {
        english: 'The weather is very nice today.',
        korean: '오늘 날씨가 정말 좋아요.',
        hints: ['오늘', '날씨', '좋다']
      },
      {
        english: 'I like Korean food.',
        korean: '저는 한국 음식을 좋아해요.',
        hints: ['음식', '좋아하다', '한국']
      }
    ];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-module kla-sentence-writing';
    this.element.innerHTML = `
      <div class="kla-sentence-writing-content">
        <div class="kla-sentence-progress">
          <span id="sentenceNum">1</span> / ${this.sentences.length}
        </div>

        <div class="kla-sentence-card">
          <div class="kla-sentence-english">
            <div class="kla-label">🇺🇸 영어 문장</div>
            <div class="kla-english-text" id="englishText"></div>
          </div>

          <div class="kla-arrow-down">↓</div>

          <div class="kla-sentence-korean">
            <div class="kla-label">🇰🇷 한국어로 번역</div>
            <textarea
              class="kla-korean-input"
              id="koreanInput"
              placeholder="여기에 한국어 번역을 입력하세요..."
              rows="3"
            ></textarea>
          </div>

          <div class="kla-hints" id="hintsContainer">
            <div class="kla-hints-label">💡 힌트</div>
            <div class="kla-hints-list" id="hintsList"></div>
          </div>

          <div class="kla-action-buttons">
            <button class="kla-btn kla-btn-secondary" id="showHintBtn">
              힌트 보기
            </button>
            <button class="kla-btn kla-btn-primary" id="checkBtn">
              정답 확인
            </button>
          </div>
        </div>

        <div class="kla-result-section" id="resultSection" style="display: none;">
          <div class="kla-result-card" id="resultCard">
            <div class="kla-result-icon" id="resultIcon"></div>
            <div class="kla-result-title" id="resultTitle"></div>

            <div class="kla-comparison">
              <div class="kla-user-answer">
                <div class="kla-comparison-label">당신의 답변</div>
                <div class="kla-comparison-text" id="userAnswerText"></div>
              </div>

              <div class="kla-correct-answer">
                <div class="kla-comparison-label">정답</div>
                <div class="kla-comparison-text" id="correctAnswerText"></div>
              </div>
            </div>

            <div class="kla-feedback" id="feedbackText"></div>

            <div class="kla-result-buttons">
              <button class="kla-btn kla-btn-secondary" id="tryAgainBtn">
                다시 시도
              </button>
              <button class="kla-btn kla-btn-primary" id="nextBtn">
                다음 문장
              </button>
            </div>
          </div>
        </div>

        <div class="kla-completion-section" id="completionSection" style="display: none;">
          <div class="kla-completion-card">
            <div class="kla-completion-icon">🎉</div>
            <h3>모든 문장을 완료했습니다!</h3>
            <p>수고하셨습니다. 계속해서 연습하면 실력이 더 향상될 거예요!</p>
            <button class="kla-btn kla-btn-primary" id="restartBtn">
              처음부터 다시 시작
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    this.loadSentence();
    return this.element;
  }

  attachEventListeners() {
    const showHintBtn = this.element.querySelector('#showHintBtn');
    const checkBtn = this.element.querySelector('#checkBtn');
    const tryAgainBtn = this.element.querySelector('#tryAgainBtn');
    const nextBtn = this.element.querySelector('#nextBtn');
    const restartBtn = this.element.querySelector('#restartBtn');
    const koreanInput = this.element.querySelector('#koreanInput');

    showHintBtn.addEventListener('click', () => this.showHints());
    checkBtn.addEventListener('click', () => this.checkAnswer());
    tryAgainBtn.addEventListener('click', () => this.tryAgain());
    nextBtn.addEventListener('click', () => this.nextSentence());
    restartBtn.addEventListener('click', () => this.restart());

    // Enter 키로 정답 확인 (Shift+Enter는 줄바꿈)
    koreanInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !this.isChecked) {
        e.preventDefault();
        this.checkAnswer();
      }
    });
  }

  loadSentence() {
    if (this.currentSentenceIndex >= this.sentences.length) {
      this.showCompletion();
      return;
    }

    const sentence = this.sentences[this.currentSentenceIndex];
    const englishText = this.element.querySelector('#englishText');
    const koreanInput = this.element.querySelector('#koreanInput');
    const sentenceNum = this.element.querySelector('#sentenceNum');
    const hintsContainer = this.element.querySelector('#hintsContainer');
    const resultSection = this.element.querySelector('#resultSection');

    englishText.textContent = sentence.english;
    koreanInput.value = '';
    koreanInput.disabled = false;
    sentenceNum.textContent = this.currentSentenceIndex + 1;
    hintsContainer.style.display = 'none';
    resultSection.style.display = 'none';

    this.isChecked = false;
    this.userAnswer = '';
  }

  showHints() {
    const hintsContainer = this.element.querySelector('#hintsContainer');
    const hintsList = this.element.querySelector('#hintsList');
    const sentence = this.sentences[this.currentSentenceIndex];

    hintsList.innerHTML = sentence.hints.map(hint =>
      `<span class="kla-hint-item">${hint}</span>`
    ).join('');

    hintsContainer.style.display = 'block';
  }

  async checkAnswer() {
    const koreanInput = this.element.querySelector('#koreanInput');
    this.userAnswer = koreanInput.value.trim();

    if (!this.userAnswer) {
      alert('번역을 입력해주세요.');
      return;
    }

    this.isChecked = true;
    koreanInput.disabled = true;

    const sentence = this.sentences[this.currentSentenceIndex];
    const resultSection = this.element.querySelector('#resultSection');
    const resultCard = this.element.querySelector('#resultCard');
    const resultIcon = this.element.querySelector('#resultIcon');
    const resultTitle = this.element.querySelector('#resultTitle');
    const userAnswerText = this.element.querySelector('#userAnswerText');
    const correctAnswerText = this.element.querySelector('#correctAnswerText');
    const feedbackText = this.element.querySelector('#feedbackText');

    resultSection.style.display = 'block';
    userAnswerText.textContent = this.userAnswer;
    correctAnswerText.textContent = sentence.korean;

    // 정답 비교 (간단한 유사도 체크)
    const similarity = this.calculateSimilarity(this.userAnswer, sentence.korean);

    if (similarity > 0.8) {
      resultCard.className = 'kla-result-card kla-correct';
      resultIcon.textContent = '✅';
      resultTitle.textContent = '정답입니다!';
      feedbackText.textContent = '훌륭해요! 완벽한 번역입니다.';
    } else if (similarity > 0.5) {
      resultCard.className = 'kla-result-card kla-partial';
      resultIcon.textContent = '⚠️';
      resultTitle.textContent = '거의 맞았어요!';
      feedbackText.textContent = '좋은 시도입니다. 정답과 비교해보세요.';
    } else {
      resultCard.className = 'kla-result-card kla-wrong';
      resultIcon.textContent = '❌';
      resultTitle.textContent = '다시 한번 시도해보세요';
      feedbackText.textContent = '정답을 확인하고 다시 시도해보세요.';
    }

    // 스크롤
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  calculateSimilarity(str1, str2) {
    // 공백 제거 후 비교
    const s1 = str1.replace(/\s/g, '');
    const s2 = str2.replace(/\s/g, '');

    if (s1 === s2) return 1.0;

    // Levenshtein distance 기반 유사도
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;

    if (longer.length === 0) return 1.0;

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  tryAgain() {
    const koreanInput = this.element.querySelector('#koreanInput');
    const resultSection = this.element.querySelector('#resultSection');

    koreanInput.disabled = false;
    koreanInput.focus();
    resultSection.style.display = 'none';
    this.isChecked = false;
  }

  nextSentence() {
    this.currentSentenceIndex++;
    this.loadSentence();
  }

  showCompletion() {
    const completionSection = this.element.querySelector('#completionSection');
    const sentenceCard = this.element.querySelector('.kla-sentence-card');

    sentenceCard.style.display = 'none';
    completionSection.style.display = 'block';
  }

  restart() {
    this.currentSentenceIndex = 0;
    const completionSection = this.element.querySelector('#completionSection');
    const sentenceCard = this.element.querySelector('.kla-sentence-card');

    completionSection.style.display = 'none';
    sentenceCard.style.display = 'block';

    this.loadSentence();
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }

  setApiKey(apiKey) {
    this.aiService.setApiKey(apiKey);
  }
}

export default SentenceWriting;
