import AIService from '../services/AIService.js';

class EssayCorrection {
  constructor(options = {}) {
    this.options = options;
    this.aiService = new AIService(options);
    this.element = null;
    this.originalText = '';
    this.correctedText = '';
    this.suggestions = [];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-module kla-essay-correction';
    this.element.innerHTML = `
      <div class="kla-module-header">
        <h3>에세이 첨삭 교정</h3>
        <p class="kla-module-subtitle">AI가 작성한 글을 교정해드립니다</p>
      </div>

      <div class="kla-essay-correction-content">
        <div class="kla-editor-section">
          <div class="kla-editor-header">
            <h4>작성한 글</h4>
            <div class="kla-editor-controls">
              <select id="levelSelect" class="kla-select">
                <option value="beginner">초급</option>
                <option value="intermediate" selected>중급</option>
                <option value="advanced">고급</option>
              </select>
              <button class="kla-btn kla-btn-secondary" id="clearButton">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
                지우기
              </button>
            </div>
          </div>

          <textarea
            id="essayInput"
            class="kla-essay-editor"
            placeholder="한국어로 글을 작성해주세요. 일기, 에세이, 편지 등 자유롭게 작성하실 수 있습니다.

예시:
오늘은 친구와 함께 영화를 봤어요. 영화가 아주 재미있었어요. 영화를 본 후에 맛있는 식사를 먹었어요. 정말 좋은 하루였어요."
            rows="10"
          ></textarea>

          <div class="kla-editor-footer">
            <span class="kla-char-count" id="charCount">0 / 1000자</span>
            <button class="kla-btn kla-btn-primary" id="correctButton">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
              </svg>
              교정 시작
            </button>
          </div>
        </div>

        <div class="kla-result-section" id="resultSection" style="display: none;">
          <div class="kla-correction-summary">
            <h4>교정 결과</h4>
            <div class="kla-summary-stats">
              <div class="kla-stat-card">
                <div class="kla-stat-value" id="overallScore">0</div>
                <div class="kla-stat-label">종합 점수</div>
              </div>
              <div class="kla-stat-card">
                <div class="kla-stat-value" id="suggestionCount">0</div>
                <div class="kla-stat-label">제안사항</div>
              </div>
            </div>
          </div>

          <div class="kla-view-toggle">
            <button class="kla-toggle-button kla-active" data-view="suggestions">제안사항</button>
            <button class="kla-toggle-button" data-view="comparison">비교</button>
          </div>

          <div class="kla-suggestions-view" id="suggestionsView">
            <div class="kla-suggestions-list" id="suggestionsList">
            </div>

            <div class="kla-overall-feedback">
              <h5>전반적인 피드백</h5>
              <p id="feedbackText"></p>
            </div>
          </div>

          <div class="kla-comparison-view" id="comparisonView" style="display: none;">
            <div class="kla-text-comparison">
              <div class="kla-comparison-column">
                <h5>원본</h5>
                <div class="kla-text-box" id="originalTextBox"></div>
              </div>
              <div class="kla-comparison-column">
                <h5>교정본</h5>
                <div class="kla-text-box kla-corrected" id="correctedTextBox"></div>
              </div>
            </div>
          </div>

          <button class="kla-btn kla-btn-secondary" id="newEssayButton">
            새 글 작성하기
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
    return this.element;
  }

  attachEventListeners() {
    const essayInput = this.element.querySelector('#essayInput');
    const charCount = this.element.querySelector('#charCount');
    const clearButton = this.element.querySelector('#clearButton');
    const correctButton = this.element.querySelector('#correctButton');
    const newEssayButton = this.element.querySelector('#newEssayButton');

    essayInput.addEventListener('input', (e) => {
      const length = e.target.value.length;
      charCount.textContent = `${length} / 1000자`;

      if (length > 1000) {
        charCount.classList.add('kla-limit-exceeded');
      } else {
        charCount.classList.remove('kla-limit-exceeded');
      }
    });

    clearButton.addEventListener('click', () => this.clearEditor());
    correctButton.addEventListener('click', () => this.correctEssay());
    newEssayButton.addEventListener('click', () => this.reset());

    // 뷰 토글
    this.element.querySelectorAll('.kla-toggle-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const view = e.target.dataset.view;
        this.switchView(view);
      });
    });
  }

  clearEditor() {
    const essayInput = this.element.querySelector('#essayInput');
    essayInput.value = '';
    this.element.querySelector('#charCount').textContent = '0 / 1000자';
  }

  async correctEssay() {
    const essayInput = this.element.querySelector('#essayInput');
    const text = essayInput.value.trim();

    if (!text) {
      alert('글을 작성해주세요.');
      return;
    }

    if (text.length > 1000) {
      alert('1000자 이하로 작성해주세요.');
      return;
    }

    this.originalText = text;

    const correctButton = this.element.querySelector('#correctButton');
    correctButton.disabled = true;
    correctButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="kla-spinner">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/>
        <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" stroke-width="3" fill="none"/>
      </svg>
      <span>교정 중...</span>
    `;

    try {
      const levelSelect = this.element.querySelector('#levelSelect');
      const level = levelSelect.value;

      const result = await this.aiService.correctEssay(text, level);

      this.correctedText = result.correctedText;
      this.suggestions = result.suggestions || [];

      this.displayResults(result);

    } catch (error) {
      console.error('Correction error:', error);
      alert('교정 중 오류가 발생했습니다.');
    } finally {
      correctButton.disabled = false;
      correctButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
        </svg>
        교정 시작
      `;
    }
  }

  displayResults(result) {
    const resultSection = this.element.querySelector('#resultSection');
    resultSection.style.display = 'block';

    // 점수 표시
    const overallScore = this.element.querySelector('#overallScore');
    const suggestionCount = this.element.querySelector('#suggestionCount');

    overallScore.textContent = result.overallScore || 0;
    suggestionCount.textContent = this.suggestions.length;

    // 제안사항 표시
    this.displaySuggestions(this.suggestions);

    // 피드백 표시
    const feedbackText = this.element.querySelector('#feedbackText');
    feedbackText.textContent = result.feedback || '좋은 글입니다!';

    // 비교 뷰 준비
    this.prepareComparisonView();

    // 스크롤
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  displaySuggestions(suggestions) {
    const suggestionsList = this.element.querySelector('#suggestionsList');

    if (!suggestions || suggestions.length === 0) {
      suggestionsList.innerHTML = `
        <div class="kla-no-suggestions">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#4CAF50"/>
          </svg>
          <h4>완벽합니다!</h4>
          <p>수정할 부분이 없습니다.</p>
        </div>
      `;
      return;
    }

    const typeColors = {
      'grammar': '#F44336',
      'spelling': '#FF9800',
      'expression': '#2196F3',
      'style': '#9C27B0'
    };

    const typeNames = {
      'grammar': '문법',
      'spelling': '맞춤법',
      'expression': '표현',
      'style': '스타일'
    };

    const suggestionsHTML = suggestions.map((suggestion, index) => `
      <div class="kla-suggestion-card" style="border-left-color: ${typeColors[suggestion.type] || '#999'}">
        <div class="kla-suggestion-header">
          <span class="kla-suggestion-type" style="background: ${typeColors[suggestion.type] || '#999'}">
            ${typeNames[suggestion.type] || '기타'}
          </span>
          <span class="kla-suggestion-number">#${index + 1}</span>
        </div>
        <div class="kla-suggestion-body">
          <div class="kla-suggestion-change">
            <span class="kla-original">${suggestion.original}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#666"/>
            </svg>
            <span class="kla-suggested">${suggestion.suggestion}</span>
          </div>
          <p class="kla-suggestion-reason">${suggestion.reason}</p>
        </div>
        <button class="kla-btn kla-btn-text kla-apply-button" data-index="${index}">
          적용하기
        </button>
      </div>
    `).join('');

    suggestionsList.innerHTML = suggestionsHTML;

    // 적용 버튼 이벤트
    suggestionsList.querySelectorAll('.kla-apply-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.applySuggestion(index);
      });
    });
  }

  applySuggestion(index) {
    const suggestion = this.suggestions[index];
    if (!suggestion) return;

    const essayInput = this.element.querySelector('#essayInput');
    const currentText = essayInput.value;

    // 텍스트에서 원본을 찾아 제안으로 교체
    const newText = currentText.replace(suggestion.original, suggestion.suggestion);
    essayInput.value = newText;

    // 버튼 변경
    const button = this.element.querySelector(`[data-index="${index}"]`);
    if (button) {
      button.textContent = '✓ 적용됨';
      button.classList.add('kla-applied');
      button.disabled = true;
    }
  }

  prepareComparisonView() {
    const originalTextBox = this.element.querySelector('#originalTextBox');
    const correctedTextBox = this.element.querySelector('#correctedTextBox');

    // 원본 텍스트
    originalTextBox.textContent = this.originalText;

    // 교정본 텍스트 (변경사항 하이라이트)
    let highlightedText = this.correctedText;

    this.suggestions.forEach(suggestion => {
      const regex = new RegExp(suggestion.suggestion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      highlightedText = highlightedText.replace(
        regex,
        `<mark class="kla-highlight">${suggestion.suggestion}</mark>`
      );
    });

    correctedTextBox.innerHTML = highlightedText;
  }

  switchView(viewName) {
    // 토글 버튼
    this.element.querySelectorAll('.kla-toggle-button').forEach(button => {
      button.classList.remove('kla-active');
      if (button.dataset.view === viewName) {
        button.classList.add('kla-active');
      }
    });

    // 뷰 전환
    const suggestionsView = this.element.querySelector('#suggestionsView');
    const comparisonView = this.element.querySelector('#comparisonView');

    if (viewName === 'suggestions') {
      suggestionsView.style.display = 'block';
      comparisonView.style.display = 'none';
    } else {
      suggestionsView.style.display = 'none';
      comparisonView.style.display = 'block';
    }
  }

  reset() {
    this.clearEditor();
    const resultSection = this.element.querySelector('#resultSection');
    resultSection.style.display = 'none';
    this.originalText = '';
    this.correctedText = '';
    this.suggestions = [];

    // 뷰 초기화
    this.switchView('suggestions');
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

export default EssayCorrection;
