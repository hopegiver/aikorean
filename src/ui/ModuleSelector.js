class ModuleSelector {
  constructor(options = {}) {
    this.modules = options.modules || [];
    this.onSelect = options.onSelect || (() => {});
    this.element = null;

    this.moduleInfo = {
      'listen-repeat': {
        title: '듣고 따라하기',
        description: '원어민 발음을 듣고 따라 말하며 발음을 교정받으세요',
        icon: '🎧'
      },
      'dictation': {
        title: '듣고 쓰기',
        description: '한국어 문장을 듣고 정확하게 받아쓰기를 연습하세요',
        icon: '✍️'
      },
      'word-match': {
        title: '단어 짝 맞추기',
        description: '단어와 뜻을 연결하며 어휘력을 향상시키세요',
        icon: '🎯'
      },
      'reading': {
        title: '읽기',
        description: '한국어 텍스트를 읽고 이해력을 높이세요',
        icon: '📖'
      },
      'grammar-quiz': {
        title: '문법 퀴즈',
        description: '퀴즈를 풀며 한국어 문법을 마스터하세요',
        icon: '📚'
      },
      'sentence-writing': {
        title: '문장 쓰기',
        description: '영어 문장을 한국어로 번역하며 작문 실력을 키우세요',
        icon: '✏️'
      }
    };
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-module-selector';

    const moduleCards = this.modules.map(moduleName => {
      const info = this.moduleInfo[moduleName];
      if (!info) return '';

      return `
        <div class="kla-module-card" data-module="${moduleName}">
          <div class="kla-module-icon">${info.icon}</div>
          <div class="kla-module-info">
            <h3 class="kla-module-title">${info.title}</h3>
            <p class="kla-module-description">${info.description}</p>
          </div>
          <div class="kla-module-arrow">→</div>
        </div>
      `;
    }).join('');

    this.element.innerHTML = `
      <div class="kla-module-grid">
        ${moduleCards}
      </div>
    `;

    // 이벤트 리스너
    this.element.querySelectorAll('.kla-module-card').forEach(card => {
      card.addEventListener('click', () => {
        const moduleName = card.dataset.module;
        this.onSelect(moduleName);
      });
    });

    return this.element;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

export default ModuleSelector;
