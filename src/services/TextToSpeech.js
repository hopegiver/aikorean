class TextToSpeechService {
  constructor(options = {}) {
    this.language = options.language || 'ko-KR';
    this.rate = options.rate || 1.0;
    this.pitch = options.pitch || 1.0;
    this.volume = options.volume || 1.0;
    this.voice = null;

    this.init();
  }

  init() {
    if ('speechSynthesis' in window) {
      // 음성 로드
      this.loadVoices();

      // 음성 목록이 변경되면 다시 로드
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    } else {
      console.warn('Text-to-speech not supported');
    }
  }

  loadVoices() {
    const voices = speechSynthesis.getVoices();
    // 한국어 음성 찾기
    this.voice = voices.find(voice => voice.lang.startsWith('ko')) || voices[0];
  }

  speak(text, options = {}) {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not supported');
      return Promise.reject('Not supported');
    }

    return new Promise((resolve, reject) => {
      // 이전 음성 중지
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.language || this.language;
      utterance.rate = options.rate || this.rate;
      utterance.pitch = options.pitch || this.pitch;
      utterance.volume = options.volume || this.volume;

      if (this.voice) {
        utterance.voice = this.voice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      speechSynthesis.speak(utterance);
    });
  }

  stop() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }

  pause() {
    if ('speechSynthesis' in window) {
      speechSynthesis.pause();
    }
  }

  resume() {
    if ('speechSynthesis' in window) {
      speechSynthesis.resume();
    }
  }

  setRate(rate) {
    this.rate = rate;
  }

  setPitch(pitch) {
    this.pitch = pitch;
  }

  setVolume(volume) {
    this.volume = volume;
  }

  isSupported() {
    return 'speechSynthesis' in window;
  }
}

export default TextToSpeechService;
