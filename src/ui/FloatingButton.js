class FloatingButton {
  constructor(options = {}) {
    this.position = options.position || 'bottom-right';
    this.onClick = options.onClick || (() => {});
    this.element = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = `kla-floating-button kla-position-${this.position}`;
    this.element.innerHTML = `
      <button class="kla-fab" title="한국어 학습 도우미">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
        </svg>
        <span class="kla-fab-text">학습</span>
      </button>
    `;

    this.element.querySelector('.kla-fab').addEventListener('click', this.onClick);

    return this.element;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

export default FloatingButton;
