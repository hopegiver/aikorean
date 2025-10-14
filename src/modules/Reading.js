import AIService from '../services/AIService.js';
import TextToSpeechService from '../services/TextToSpeech.js';

class Reading {
  constructor(options = {}) {
    this.options = options;
    this.aiService = new AIService(options);
    this.tts = new TextToSpeechService(options);
    this.element = null;
    this.readingText = `한국은 아름다운 나라입니다. 사계절이 뚜렷하고, 역사와 문화가 풍부합니다.

서울은 한국의 수도이며, 전통과 현대가 조화를 이루는 도시입니다. 경복궁과 같은 역사적인 장소와 현대적인 고층 건물들이 함께 존재합니다.

한국 음식은 세계적으로 유명합니다. 김치, 불고기, 비빔밥 등은 많은 사람들이 좋아하는 음식입니다. 한국 음식은 건강에도 좋고 맛있습니다.`;

    this.selectedWord = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-module kla-reading';
    this.element.innerHTML = `
      <div class="kla-reading-content">
        <div class="kla-reading-controls">
          <button class="kla-btn kla-btn-primary" id="readButton">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
            </svg>
            전체 읽기
          </button>

          <div class="kla-speed-control">
            <label>읽기 속도: <span id="speedValue">1.0</span>x</label>
            <input type="range" id="speedSlider" min="0.5" max="1.5" step="0.1" value="1.0">
          </div>

          <button class="kla-btn kla-btn-secondary" id="stopButton">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="6" width="12" height="12" fill="currentColor"/>
            </svg>
            정지
          </button>
        </div>

        <div class="kla-reading-text" id="readingText">
          ${this.formatTextForReading(this.readingText)}
        </div>

        <div class="kla-reading-features">
          <div class="kla-feature-tabs">
            <button class="kla-tab-button kla-tab-active" data-tab="dictionary">단어 사전</button>
            <button class="kla-tab-button" data-tab="questions">이해도 확인</button>
            <button class="kla-tab-button" data-tab="summary">요약</button>
          </div>

          <div class="kla-tab-content">
            <div class="kla-tab-panel kla-tab-active" id="dictionaryTab">
              <div class="kla-dictionary-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM18 20H6V4H18V20ZM8 6H16V8H8V6ZM8 10H16V12H8V10ZM8 14H16V16H8V14Z" fill="#ccc"/>
                </svg>
                <p>텍스트에서 단어를 클릭하면 뜻을 볼 수 있습니다</p>
              </div>
              <div class="kla-dictionary-content" id="dictionaryContent" style="display: none;">
                <h4 id="wordTitle"></h4>
                <div class="kla-word-info">
                  <div class="kla-meaning" id="wordMeaning"></div>
                  <div class="kla-examples" id="wordExamples"></div>
                </div>
              </div>
            </div>

            <div class="kla-tab-panel" id="questionsTab">
              <div class="kla-questions-list">
                <div class="kla-question-item">
                  <h5>1. 이 글의 주제는 무엇입니까?</h5>
                  <div class="kla-question-options">
                    <label><input type="radio" name="q1" value="a"> 한국의 역사</label>
                    <label><input type="radio" name="q1" value="b"> 한국의 문화와 특징</label>
                    <label><input type="radio" name="q1" value="c"> 한국의 경제</label>
                    <label><input type="radio" name="q1" value="d"> 한국의 정치</label>
                  </div>
                </div>
                <div class="kla-question-item">
                  <h5>2. 글에서 언급된 한국 음식이 아닌 것은?</h5>
                  <div class="kla-question-options">
                    <label><input type="radio" name="q2" value="a"> 김치</label>
                    <label><input type="radio" name="q2" value="b"> 불고기</label>
                    <label><input type="radio" name="q2" value="c"> 비빔밥</label>
                    <label><input type="radio" name="q2" value="d"> 초밥</label>
                  </div>
                </div>
                <button class="kla-btn kla-btn-primary" id="checkAnswersButton">답안 확인</button>
              </div>
              <div class="kla-question-result" id="questionResult" style="display: none;"></div>
            </div>

            <div class="kla-tab-panel" id="summaryTab">
              <div class="kla-summary-content">
                <h5>글의 요약</h5>
                <p>이 글은 한국의 자연, 역사, 문화, 음식에 대해 설명합니다. 특히 한국의 사계절과 수도 서울, 그리고 세계적으로 유명한 한국 음식에 대해 소개하고 있습니다.</p>

                <h5>주요 어휘</h5>
                <ul class="kla-vocabulary-list">
                  <li><strong>사계절</strong>: 봄, 여름, 가을, 겨울의 네 계절</li>
                  <li><strong>수도</strong>: 나라의 중심이 되는 도시</li>
                  <li><strong>조화</strong>: 잘 어울림</li>
                  <li><strong>풍부하다</strong>: 많고 넉넉하다</li>
                </ul>

                <h5>글의 난이도</h5>
                <div class="kla-difficulty-bar">
                  <div class="kla-difficulty-fill" style="width: 60%">중급</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    return this.element;
  }

  formatTextForReading(text) {
    // 텍스트를 단어 단위로 클릭 가능하게 만듦
    const paragraphs = text.split('\n').filter(p => p.trim());

    return paragraphs.map(paragraph => {
      const words = paragraph.split(' ');
      const formattedWords = words.map(word =>
        `<span class="kla-readable-word">${word}</span>`
      ).join(' ');
      return `<p>${formattedWords}</p>`;
    }).join('');
  }

  attachEventListeners() {
    const readButton = this.element.querySelector('#readButton');
    const stopButton = this.element.querySelector('#stopButton');
    const speedSlider = this.element.querySelector('#speedSlider');
    const speedValue = this.element.querySelector('#speedValue');
    const checkAnswersButton = this.element.querySelector('#checkAnswersButton');

    readButton.addEventListener('click', () => this.readText());
    stopButton.addEventListener('click', () => this.stopReading());

    speedSlider.addEventListener('input', (e) => {
      const speed = parseFloat(e.target.value);
      speedValue.textContent = speed.toFixed(1);
      this.tts.setRate(speed);
    });

    // 탭 전환
    this.element.querySelectorAll('.kla-tab-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        this.switchTab(tabName);
      });
    });

    // 단어 클릭
    this.element.querySelectorAll('.kla-readable-word').forEach(wordElement => {
      wordElement.addEventListener('click', (e) => {
        const word = e.target.textContent.trim();
        this.showWordDefinition(word);

        // 선택된 단어 하이라이트
        this.element.querySelectorAll('.kla-readable-word').forEach(el => {
          el.classList.remove('kla-word-selected');
        });
        e.target.classList.add('kla-word-selected');
      });
    });

    // 이해도 확인
    if (checkAnswersButton) {
      checkAnswersButton.addEventListener('click', () => this.checkAnswers());
    }
  }

  async readText() {
    const readButton = this.element.querySelector('#readButton');
    readButton.disabled = true;

    try {
      await this.tts.speak(this.readingText);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      readButton.disabled = false;
    }
  }

  stopReading() {
    this.tts.stop();
  }

  switchTab(tabName) {
    // 탭 버튼 활성화
    this.element.querySelectorAll('.kla-tab-button').forEach(button => {
      button.classList.remove('kla-tab-active');
      if (button.dataset.tab === tabName) {
        button.classList.add('kla-tab-active');
      }
    });

    // 탭 패널 표시
    this.element.querySelectorAll('.kla-tab-panel').forEach(panel => {
      panel.classList.remove('kla-tab-active');
    });

    const targetPanel = this.element.querySelector(`#${tabName}Tab`);
    if (targetPanel) {
      targetPanel.classList.add('kla-tab-active');
    }
  }

  async showWordDefinition(word) {
    const placeholder = this.element.querySelector('.kla-dictionary-placeholder');
    const content = this.element.querySelector('.kla-dictionary-content');
    const wordTitle = this.element.querySelector('#wordTitle');
    const wordMeaning = this.element.querySelector('#wordMeaning');
    const wordExamples = this.element.querySelector('#wordExamples');

    placeholder.style.display = 'none';
    content.style.display = 'block';

    wordTitle.textContent = word;
    wordMeaning.innerHTML = '<p class="kla-loading">의미를 찾고 있습니다...</p>';
    wordExamples.innerHTML = '';

    try {
      const result = await this.aiService.explainWord(word, this.readingText);

      wordMeaning.innerHTML = `<p>${result.meaning}</p>`;

      if (result.examples && result.examples.length > 0) {
        wordExamples.innerHTML = `
          <h5>예문:</h5>
          <ul>
            ${result.examples.map(ex => `<li>${ex}</li>`).join('')}
          </ul>
        `;
      }

      if (result.synonyms && result.synonyms.length > 0) {
        wordExamples.innerHTML += `
          <h5>유의어:</h5>
          <p>${result.synonyms.join(', ')}</p>
        `;
      }

    } catch (error) {
      console.error('Word lookup error:', error);
      wordMeaning.innerHTML = '<p class="kla-error">단어 정보를 가져올 수 없습니다.</p>';
    }
  }

  checkAnswers() {
    const q1 = this.element.querySelector('input[name="q1"]:checked');
    const q2 = this.element.querySelector('input[name="q2"]:checked');

    if (!q1 || !q2) {
      alert('모든 문제에 답해주세요.');
      return;
    }

    const correctAnswers = {
      q1: 'b',
      q2: 'd'
    };

    let score = 0;
    if (q1.value === correctAnswers.q1) score++;
    if (q2.value === correctAnswers.q2) score++;

    const resultDiv = this.element.querySelector('#questionResult');
    const percentage = (score / 2) * 100;

    resultDiv.innerHTML = `
      <div class="kla-score-badge ${percentage >= 50 ? 'kla-pass' : 'kla-fail'}">
        <h4>${score} / 2 정답</h4>
        <p>${percentage}%</p>
      </div>
      <div class="kla-answer-explanation">
        <h5>정답 해설:</h5>
        <p><strong>1번:</strong> 정답은 "한국의 문화와 특징"입니다. 글은 한국의 다양한 특징들을 소개하고 있습니다.</p>
        <p><strong>2번:</strong> 정답은 "초밥"입니다. 초밥은 일본 음식이며, 글에서 언급되지 않았습니다.</p>
      </div>
    `;
    resultDiv.style.display = 'block';
  }

  destroy() {
    this.stopReading();
    if (this.element) {
      this.element.remove();
    }
  }

  setApiKey(apiKey) {
    this.aiService.setApiKey(apiKey);
  }
}

export default Reading;
