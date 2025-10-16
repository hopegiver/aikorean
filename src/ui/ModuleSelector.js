class ModuleSelector {
  constructor(options = {}) {
    this.modules = options.modules || [];
    this.onSelect = options.onSelect || (() => {});
    this.element = null;

    this.moduleInfo = {
      'listen-repeat': {
        title: '듣고 따라하기',
        description: '원어민 발음을 듣고 따라하기',
        icon: '🎧'
      },
      'dictation': {
        title: '듣고 쓰기',
        description: '한국어 문장 받아쓰기',
        icon: '✍️'
      },
      'word-match': {
        title: '단어 맞추기',
        description: '단어와 뜻을 매칭하기',
        icon: '🎯'
      },
      'reading': {
        title: '읽기',
        description: '한국어 텍스트 읽기',
        icon: '📖'
      },
      'grammar-quiz': {
        title: '문법 퀴즈',
        description: '퀴즈로 문법 학습하기',
        icon: '📚'
      },
      'sentence-writing': {
        title: '문장 쓰기',
        description: '한국어 문장 작성하기',
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
          <h3 class="kla-module-title">${info.title}</h3>
          <p class="kla-module-description">${info.description}</p>
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
