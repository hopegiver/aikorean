class AudioPlayer {
  constructor(options = {}) {
    this.options = options;
    this.onPlay = options.onPlay || (() => {});
    this.onStop = options.onStop || (() => {});
    this.onReplay = options.onReplay || (() => {});
    this.onSpeedChange = options.onSpeedChange || (() => {});
    this.element = null;
    this.isPlaying = false;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-audio-player';
    this.element.innerHTML = `
      <div class="kla-audio-controls">
        <button class="kla-audio-btn kla-audio-btn-primary" id="playBtn" title="듣기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
          </svg>
          <span>듣기</span>
        </button>

        <button class="kla-audio-btn kla-audio-btn-secondary" id="stopBtn" title="중지" disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="6" width="12" height="12" fill="currentColor"/>
          </svg>
          <span>중지</span>
        </button>

        <button class="kla-audio-btn kla-audio-btn-secondary" id="replayBtn" title="다시">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5Z" fill="currentColor"/>
          </svg>
          <span>다시</span>
        </button>

        <div class="kla-audio-btn kla-audio-btn-speed">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="kla-speed-icon">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <select id="audioSpeed" class="kla-audio-speed-select">
            <option value="0.4">0.4x</option>
            <option value="0.6">0.6x</option>
            <option value="0.8">0.8x</option>
            <option value="1.0" selected>1.0x</option>
            <option value="1.2">1.2x</option>
            <option value="1.4">1.4x</option>
            <option value="1.6">1.6x</option>
            <option value="1.8">1.8x</option>
            <option value="2.0">2.0x</option>
          </select>
        </div>
      </div>
    `;

    this.attachEventListeners();
    return this.element;
  }

  attachEventListeners() {
    const playBtn = this.element.querySelector('#playBtn');
    const stopBtn = this.element.querySelector('#stopBtn');
    const replayBtn = this.element.querySelector('#replayBtn');
    const speedSelect = this.element.querySelector('#audioSpeed');

    playBtn.addEventListener('click', () => {
      this.setPlaying(true);
      this.onPlay();
    });

    stopBtn.addEventListener('click', () => {
      this.setPlaying(false);
      this.onStop();
    });

    replayBtn.addEventListener('click', () => {
      this.onReplay();
    });

    speedSelect.addEventListener('change', (e) => {
      const speed = parseFloat(e.target.value);
      this.onSpeedChange(speed);
    });
  }

  setPlaying(playing) {
    this.isPlaying = playing;
    const playBtn = this.element.querySelector('#playBtn');
    const stopBtn = this.element.querySelector('#stopBtn');

    if (playing) {
      playBtn.disabled = true;
      stopBtn.disabled = false;
    } else {
      playBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }

  reset() {
    this.setPlaying(false);
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

export default AudioPlayer;
