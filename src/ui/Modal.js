class Modal {
  constructor(options = {}) {
    this.onClose = options.onClose || (() => {});
    this.element = null;
    this.contentElement = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-modal';
    this.element.innerHTML = `
      <div class="kla-modal-overlay"></div>
      <div class="kla-modal-container">
        <div class="kla-modal-header">
          <h2>한국어 학습 도우미</h2>
          <button class="kla-modal-close" title="닫기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div class="kla-modal-content"></div>
      </div>
    `;

    this.contentElement = this.element.querySelector('.kla-modal-content');

    // 이벤트 리스너
    this.element.querySelector('.kla-modal-close').addEventListener('click', () => {
      this.hide();
      this.onClose();
    });

    this.element.querySelector('.kla-modal-overlay').addEventListener('click', () => {
      this.hide();
      this.onClose();
    });

    return this.element;
  }

  setContent(content) {
    if (this.contentElement) {
      this.contentElement.innerHTML = '';
      if (typeof content === 'string') {
        this.contentElement.innerHTML = content;
      } else {
        this.contentElement.appendChild(content);
      }
    }
  }

  show() {
    if (this.element) {
      this.element.classList.add('kla-modal-active');
      document.body.style.overflow = 'hidden';
    }
  }

  hide() {
    if (this.element) {
      this.element.classList.remove('kla-modal-active');
      document.body.style.overflow = '';
    }
  }

  destroy() {
    this.hide();
    if (this.element) {
      this.element.remove();
    }
  }
}

export default Modal;
