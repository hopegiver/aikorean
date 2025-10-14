import AIService from '../services/AIService.js';
import TextToSpeechService from '../services/TextToSpeech.js';

class Dictation {
  constructor(options = {}) {
    this.options = options;
    this.aiService = new AIService(options);
    this.tts = new TextToSpeechService(options);
    this.element = null;
    this.correctText = '오늘은 날씨가 정말 좋습니다. 공원에 산책하러 가고 싶어요.';
    this.userText = '';
    this.showHints = false;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-module kla-dictation';
    this.element.innerHTML = `
      <div class="kla-module-header">
        <h3>듣고 쓰기</h3>
        <p class="kla-module-subtitle">한국어 문장을 듣고 정확하게 받아쓰세요</p>
      </div>

      <div class="kla-dictation-content">
        <div class="kla-audio-player">
          <button class="kla-btn kla-btn-primary kla-btn-large" id="playAudio">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
            </svg>
            <span>문장 듣기</span>
          </button>

          <div class="kla-playback-controls">
            <label>재생 속도: <span id="speedValue">1.0</span>x</label>
            <input type="range" id="speedSlider" min="0.5" max="1.5" step="0.1" value="1.0">
          </div>
        </div>

        <div class="kla-dictation-input">
          <label for="userInput">받아쓰기:</label>
          <textarea
            id="userInput"
            placeholder="들은 내용을 여기에 입력하세요..."
            rows="4"
          ></textarea>
          <div class="kla-input-info">
            <span id="charCount">0자</span>
            <button class="kla-btn kla-btn-text" id="toggleHints">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
              </svg>
              힌트 보기
            </button>
          </div>
        </div>

        <div class="kla-hints" id="hintsSection" style="display: none;">
          <h5>힌트:</h5>
          <div class="kla-hint-text" id="hintText"></div>
        </div>

        <div class="kla-action-buttons">
          <button class="kla-btn kla-btn-secondary" id="clearButton">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
            지우기
          </button>
          <button class="kla-btn kla-btn-primary" id="submitButton">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
            </svg>
            확인하기
          </button>
        </div>

        <div class="kla-result-section" id="resultSection" style="display: none;">
          <div class="kla-accuracy-display">
            <div class="kla-accuracy-circle">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                <circle id="accuracyCircle" cx="50" cy="50" r="45" fill="none" stroke="#2196F3" stroke-width="8"
                        stroke-dasharray="282.743" stroke-dashoffset="282.743"
                        transform="rotate(-90 50 50)"/>
                <text x="50" y="58" text-anchor="middle" font-size="24" font-weight="bold" fill="#333" id="accuracyText">0%</text>
              </svg>
            </div>
            <h4>정확도</h4>
          </div>

          <div class="kla-comparison">
            <div class="kla-comparison-section">
              <h5>정답:</h5>
              <div class="kla-text-display kla-correct-text" id="correctTextDisplay"></div>
            </div>

            <div class="kla-comparison-section">
              <h5>작성한 답:</h5>
              <div class="kla-text-display kla-user-text" id="userTextDisplay"></div>
            </div>
          </div>

          <div class="kla-errors-list" id="errorsList">
          </div>

          <button class="kla-btn kla-btn-secondary" id="retryButton">
            다시 도전하기
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
    return this.element;
  }

  attachEventListeners() {
    const playAudio = this.element.querySelector('#playAudio');
    const userInput = this.element.querySelector('#userInput');
    const speedSlider = this.element.querySelector('#speedSlider');
    const speedValue = this.element.querySelector('#speedValue');
    const charCount = this.element.querySelector('#charCount');
    const toggleHints = this.element.querySelector('#toggleHints');
    const clearButton = this.element.querySelector('#clearButton');
    const submitButton = this.element.querySelector('#submitButton');
    const retryButton = this.element.querySelector('#retryButton');

    playAudio.addEventListener('click', () => this.playAudio());

    userInput.addEventListener('input', (e) => {
      this.userText = e.target.value;
      charCount.textContent = `${this.userText.length}자`;
    });

    speedSlider.addEventListener('input', (e) => {
      const speed = parseFloat(e.target.value);
      speedValue.textContent = speed.toFixed(1);
      this.tts.setRate(speed);
    });

    toggleHints.addEventListener('click', () => this.toggleHints());
    clearButton.addEventListener('click', () => this.clearInput());
    submitButton.addEventListener('click', () => this.checkAnswer());
    retryButton.addEventListener('click', () => this.reset());
  }

  async playAudio() {
    const playButton = this.element.querySelector('#playAudio');
    playButton.disabled = true;

    try {
      await this.tts.speak(this.correctText);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      playButton.disabled = false;
    }
  }

  toggleHints() {
    this.showHints = !this.showHints;
    const hintsSection = this.element.querySelector('#hintsSection');
    const hintText = this.element.querySelector('#hintText');

    if (this.showHints) {
      hintsSection.style.display = 'block';
      // 첫 글자 힌트
      const hints = this.correctText.split(' ').map(word =>
        word.charAt(0) + '_'.repeat(word.length - 1)
      ).join(' ');
      hintText.textContent = hints;
    } else {
      hintsSection.style.display = 'none';
    }
  }

  clearInput() {
    const userInput = this.element.querySelector('#userInput');
    userInput.value = '';
    this.userText = '';
    this.element.querySelector('#charCount').textContent = '0자';
  }

  async checkAnswer() {
    if (!this.userText.trim()) {
      alert('답을 입력해주세요.');
      return;
    }

    const resultSection = this.element.querySelector('#resultSection');
    resultSection.style.display = 'block';

    try {
      const result = await this.aiService.evaluateDictation(this.userText, this.correctText);

      // 정확도 애니메이션
      this.animateAccuracy(result.accuracy);

      // 텍스트 비교 표시
      this.displayComparison(result);

      // 오류 목록 표시
      this.displayErrors(result.errors);

    } catch (error) {
      console.error('Evaluation error:', error);
      alert('평가 중 오류가 발생했습니다.');
    }
  }

  animateAccuracy(accuracy) {
    const accuracyCircle = this.element.querySelector('#accuracyCircle');
    const accuracyText = this.element.querySelector('#accuracyText');
    const circumference = 282.743;
    const offset = circumference - (accuracy / 100) * circumference;

    accuracyCircle.style.strokeDashoffset = offset;

    // 숫자 애니메이션
    let current = 0;
    const duration = 1000;
    const increment = accuracy / (duration / 16);

    const animate = () => {
      current += increment;
      if (current >= accuracy) {
        current = accuracy;
        accuracyText.textContent = `${Math.round(accuracy)}%`;
      } else {
        accuracyText.textContent = `${Math.round(current)}%`;
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  displayComparison(result) {
    const correctTextDisplay = this.element.querySelector('#correctTextDisplay');
    const userTextDisplay = this.element.querySelector('#userTextDisplay');

    correctTextDisplay.textContent = this.correctText;

    // 사용자 답변에 오류 표시
    let highlightedText = this.userText;
    if (result.errors && result.errors.length > 0) {
      // 오류 위치에 하이라이트 추가
      result.errors.forEach(error => {
        const before = highlightedText.substring(0, error.position);
        const errorChar = highlightedText.charAt(error.position);
        const after = highlightedText.substring(error.position + 1);
        highlightedText = before + `<span class="kla-error-highlight" title="정답: ${error.expected}">${errorChar}</span>` + after;
      });
    }

    userTextDisplay.innerHTML = highlightedText;
  }

  displayErrors(errors) {
    const errorsList = this.element.querySelector('#errorsList');

    if (!errors || errors.length === 0) {
      errorsList.innerHTML = '<div class="kla-success-message">완벽합니다! 모두 정확하게 작성했어요.</div>';
      return;
    }

    const errorsHTML = `
      <h5>틀린 부분:</h5>
      <ul class="kla-error-items">
        ${errors.map(error => `
          <li>
            <span class="kla-error-type">${this.getErrorTypeName(error.type)}</span>
            <span class="kla-error-detail">
              "<span class="kla-wrong">${error.actual}</span>" →
              "<span class="kla-correct">${error.expected}</span>"
            </span>
          </li>
        `).join('')}
      </ul>
    `;

    errorsList.innerHTML = errorsHTML;
  }

  getErrorTypeName(type) {
    const typeNames = {
      'spelling': '맞춤법',
      'grammar': '문법',
      'spacing': '띄어쓰기',
      'missing': '누락',
      'extra': '추가'
    };
    return typeNames[type] || '오류';
  }

  reset() {
    this.clearInput();
    const resultSection = this.element.querySelector('#resultSection');
    resultSection.style.display = 'none';
    const hintsSection = this.element.querySelector('#hintsSection');
    hintsSection.style.display = 'none';
    this.showHints = false;
  }

  destroy() {
    this.tts.stop();
    if (this.element) {
      this.element.remove();
    }
  }

  setApiKey(apiKey) {
    this.aiService.setApiKey(apiKey);
  }
}

export default Dictation;
