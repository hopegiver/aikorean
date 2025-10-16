import './styles/main.js';
import FloatingButton from './ui/FloatingButton.js';
import Modal from './ui/Modal.js';
import ModuleSelector from './ui/ModuleSelector.js';
import ListenRepeat from './modules/ListenRepeat.js';
import Dictation from './modules/Dictation.js';
import WordMatch from './modules/WordMatch.js';
import Reading from './modules/Reading.js';
import GrammarQuiz from './modules/GrammarQuiz.js';
import SentenceWriting from './modules/SentenceWriting.js';

class KoreanLearningAssistant {
  constructor(options = {}) {
    this.options = {
      container: options.container || 'body',
      apiKey: options.apiKey || '',
      apiEndpoint: options.apiEndpoint || '',
      modules: options.modules || ['listen-repeat', 'dictation', 'word-match', 'reading', 'grammar-quiz', 'sentence-writing'],
      theme: options.theme || 'light',
      language: options.language || 'ko',
      floatingButton: options.floatingButton !== false,
      position: options.position || 'bottom-right',
      ...options
    };

    this.container = null;
    this.floatingButton = null;
    this.modal = null;
    this.moduleSelector = null;
    this.currentModule = null;
    this.modules = {};

    this.init();
  }

  init() {
    // 컨테이너 설정
    if (typeof this.options.container === 'string') {
      this.container = document.querySelector(this.options.container);
    } else {
      this.container = this.options.container;
    }

    if (!this.container) {
      console.error('Container not found');
      return;
    }

    // 테마 적용
    this.applyTheme();

    // 모듈 초기화
    this.initModules();

    // UI 생성
    if (this.options.floatingButton) {
      this.createFloatingButton();
    } else {
      this.createEmbedded();
    }
  }

  applyTheme() {
    document.documentElement.setAttribute('data-kla-theme', this.options.theme);
  }

  initModules() {
    const moduleMap = {
      'listen-repeat': ListenRepeat,
      'dictation': Dictation,
      'word-match': WordMatch,
      'reading': Reading,
      'grammar-quiz': GrammarQuiz,
      'sentence-writing': SentenceWriting
    };

    this.options.modules.forEach(moduleName => {
      if (moduleMap[moduleName]) {
        this.modules[moduleName] = new moduleMap[moduleName](this.options);
      }
    });
  }

  createFloatingButton() {
    this.floatingButton = new FloatingButton({
      position: this.options.position,
      onClick: () => this.openModal()
    });
    this.container.appendChild(this.floatingButton.render());
  }

  createEmbedded() {
    this.moduleSelector = new ModuleSelector({
      modules: this.options.modules,
      onSelect: (moduleName) => this.loadModule(moduleName)
    });
    this.container.appendChild(this.moduleSelector.render());
  }

  openModal() {
    if (!this.modal) {
      this.modal = new Modal({
        onClose: () => this.closeModal()
      });
      document.body.appendChild(this.modal.render());
    }

    this.moduleSelector = new ModuleSelector({
      modules: this.options.modules,
      onSelect: (moduleName) => this.loadModule(moduleName)
    });

    this.modal.setContent(this.moduleSelector.render());
    this.modal.show();
  }

  closeModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }

  loadModule(moduleName) {
    if (this.currentModule) {
      this.currentModule.destroy();
    }

    const module = this.modules[moduleName];
    if (module) {
      this.currentModule = module;

      if (this.modal) {
        this.modal.setContent(module.render());
      } else {
        // 임베디드 모드
        this.container.innerHTML = '';
        this.container.classList.add('has-module');

        // 헤더 업데이트
        this.updateHeader(moduleName);

        this.container.appendChild(module.render());
      }
    }
  }

  updateHeader(moduleName) {
    const moduleTitles = {
      'listen-repeat': '듣고 따라하기',
      'dictation': '받아쓰기',
      'word-match': '단어 맞추기',
      'reading': '읽기 연습',
      'grammar-quiz': '문법 퀴즈',
      'sentence-writing': '문장 쓰기'
    };

    const titleElement = document.getElementById('ai-assistant-title');
    const backButton = document.getElementById('ai-assistant-back');

    if (titleElement) {
      titleElement.textContent = moduleTitles[moduleName] || '학습';
    }

    if (backButton) {
      backButton.style.display = 'flex';
      backButton.onclick = () => this.goBack();
    }
  }

  goBack() {
    if (this.currentModule) {
      this.currentModule.destroy();
      this.currentModule = null;
    }
    this.container.innerHTML = '';
    this.container.classList.remove('has-module');

    // 헤더 원래대로 복원
    const titleElement = document.getElementById('ai-assistant-title');
    const backButton = document.getElementById('ai-assistant-back');

    if (titleElement) {
      titleElement.textContent = '🇰🇷 AI Assistant';
    }

    if (backButton) {
      backButton.style.display = 'none';
    }

    this.createEmbedded();
  }

  destroy() {
    if (this.currentModule) {
      this.currentModule.destroy();
    }
    if (this.floatingButton) {
      this.floatingButton.destroy();
    }
    if (this.modal) {
      this.modal.destroy();
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  // Public API
  selectModule(moduleName) {
    this.loadModule(moduleName);
  }

  getModule(moduleName) {
    return this.modules[moduleName];
  }

  setApiKey(apiKey) {
    this.options.apiKey = apiKey;
    Object.values(this.modules).forEach(module => {
      if (module.setApiKey) {
        module.setApiKey(apiKey);
      }
    });
  }
}

// Export as default and also assign to window for global access
export default KoreanLearningAssistant;
window.KoreanLearningAssistant = KoreanLearningAssistant;
