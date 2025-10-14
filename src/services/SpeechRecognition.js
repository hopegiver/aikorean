class SpeechRecognitionService {
  constructor(options = {}) {
    this.language = options.language || 'ko-KR';
    this.recognition = null;
    this.isListening = false;
    this.onResult = options.onResult || (() => {});
    this.onError = options.onError || (() => {});

    this.init();
  }

  init() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.language;

      this.recognition.onresult = (event) => {
        const results = Array.from(event.results);
        const transcript = results
          .map(result => result[0].transcript)
          .join('');

        const isFinal = results[results.length - 1].isFinal;

        this.onResult({
          transcript,
          isFinal,
          confidence: results[results.length - 1][0].confidence
        });
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        this.onError(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    } else {
      console.warn('Speech recognition not supported');
    }
  }

  start() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
        this.isListening = true;
        return true;
      } catch (error) {
        console.error('Failed to start recognition:', error);
        return false;
      }
    }
    return false;
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  isSupported() {
    return this.recognition !== null;
  }
}

export default SpeechRecognitionService;
