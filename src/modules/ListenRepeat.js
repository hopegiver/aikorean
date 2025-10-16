import AIService from '../services/AIService.js';
import TextToSpeechService from '../services/TextToSpeech.js';
import SpeechRecognitionService from '../services/SpeechRecognition.js';
import AudioPlayer from '../ui/AudioPlayer.js';

class ListenRepeat {
  constructor(options = {}) {
    this.options = options;
    this.aiService = new AIService(options);
    this.tts = new TextToSpeechService(options);
    this.stt = null;
    this.element = null;
    this.audioPlayer = null;
    this.isRecording = false;
    this.currentSentence = '안녕하세요. 저는 한국어를 배우고 있습니다.';
    this.audioContext = null;
    this.analyser = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-module kla-listen-repeat';
    this.element.innerHTML = `
      <div class="kla-listen-repeat-content">
        <div class="kla-sentence-display">
          <div class="kla-sentence-text">${this.currentSentence}</div>
        </div>

        <div id="audioPlayerContainer"></div>

        <div class="kla-waveform" id="waveform">
          <canvas id="waveformCanvas"></canvas>
        </div>

        <div class="kla-recording-section">
          <button class="kla-btn kla-btn-record" id="recordButton">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" fill="currentColor"/>
            </svg>
            <span>녹음 시작</span>
          </button>
          <div class="kla-recording-status" id="recordingStatus"></div>
        </div>

        <div class="kla-result-section" id="resultSection" style="display: none;">
          <div class="kla-score-display">
            <div class="kla-score-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                <circle id="scoreCircle" cx="60" cy="60" r="54" fill="none" stroke="#4CAF50" stroke-width="8"
                        stroke-dasharray="339.292" stroke-dashoffset="339.292"
                        transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 1s ease"/>
                <text x="60" y="70" text-anchor="middle" font-size="32" font-weight="bold" fill="#333" id="scoreText">0</text>
              </svg>
            </div>
            <h4>발음 점수</h4>
          </div>

          <div class="kla-feedback" id="feedbackText">
            발음을 분석하고 있습니다...
          </div>

          <div class="kla-improvements" id="improvementsList">
          </div>

          <button class="kla-btn kla-btn-secondary" id="retryButton">
            다시 연습하기
          </button>
        </div>
      </div>
    `;

    // AudioPlayer 추가
    this.audioPlayer = new AudioPlayer({
      onPlay: () => this.playSentence(),
      onStop: () => this.stopPlaying(),
      onReplay: () => this.replaySentence(),
      onSpeedChange: (speed) => this.tts.setRate(speed)
    });
    const playerContainer = this.element.querySelector('#audioPlayerContainer');
    playerContainer.appendChild(this.audioPlayer.render());

    // 캔버스 크기 설정
    this.initCanvas();

    this.attachEventListeners();
    return this.element;
  }

  initCanvas() {
    const canvas = this.element.querySelector('#waveformCanvas');
    const container = this.element.querySelector('.kla-waveform');
    const containerWidth = container.clientWidth - 32; // padding 제외
    canvas.width = containerWidth;
    canvas.height = 100;
  }

  attachEventListeners() {
    const recordButton = this.element.querySelector('#recordButton');
    const retryButton = this.element.querySelector('#retryButton');

    recordButton.addEventListener('click', () => this.toggleRecording());
    retryButton.addEventListener('click', () => this.reset());
  }

  async playSentence() {
    try {
      await this.tts.speak(this.currentSentence);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      this.audioPlayer.setPlaying(false);
    }
  }

  stopPlaying() {
    this.tts.stop();
  }

  async replaySentence() {
    this.audioPlayer.setPlaying(true);
    await this.playSentence();
  }

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.evaluatePronunciation(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start();
      this.isRecording = true;

      // UI 업데이트
      const recordButton = this.element.querySelector('#recordButton');
      recordButton.classList.add('kla-recording');
      recordButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="6" width="12" height="12" fill="currentColor"/>
        </svg>
        <span>녹음 중지</span>
      `;

      const status = this.element.querySelector('#recordingStatus');
      status.textContent = '🔴 녹음 중...';
      status.style.display = 'block';

      // 웨이브폼 시각화
      this.visualizeAudio(stream);

    } catch (error) {
      console.error('Recording error:', error);
      alert('마이크 접근 권한이 필요합니다.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;

      const recordButton = this.element.querySelector('#recordButton');
      recordButton.classList.remove('kla-recording');
      recordButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" fill="currentColor"/>
        </svg>
        <span>녹음 시작</span>
      `;

      const status = this.element.querySelector('#recordingStatus');
      status.style.display = 'none';

      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
      }
    }
  }

  visualizeAudio(stream) {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.analyser.fftSize = 2048;

    const canvas = this.element.querySelector('#waveformCanvas');
    const canvasContext = canvas.getContext('2d');
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!this.isRecording) return;

      requestAnimationFrame(draw);

      this.analyser.getByteTimeDomainData(dataArray);

      canvasContext.fillStyle = '#f5f5f5';
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = '#2196F3';
      canvasContext.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasContext.lineTo(canvas.width, canvas.height / 2);
      canvasContext.stroke();
    };

    draw();
  }

  async evaluatePronunciation(audioBlob) {
    const resultSection = this.element.querySelector('#resultSection');
    resultSection.style.display = 'block';

    const feedbackText = this.element.querySelector('#feedbackText');
    feedbackText.textContent = '발음을 분석하고 있습니다...';

    try {
      const result = await this.aiService.evaluatePronunciation(audioBlob, this.currentSentence);

      // 점수 애니메이션
      this.animateScore(result.score);

      // 피드백 표시
      feedbackText.textContent = result.feedback;

      // 개선사항 표시
      const improvementsList = this.element.querySelector('#improvementsList');
      if (result.improvements && result.improvements.length > 0) {
        improvementsList.innerHTML = `
          <h5>개선 포인트:</h5>
          <ul>
            ${result.improvements.map(item => `<li>${item}</li>`).join('')}
          </ul>
        `;
      }

    } catch (error) {
      console.error('Evaluation error:', error);
      feedbackText.textContent = '평가 중 오류가 발생했습니다.';
    }
  }

  animateScore(score) {
    const scoreCircle = this.element.querySelector('#scoreCircle');
    const scoreText = this.element.querySelector('#scoreText');
    const circumference = 339.292;
    const offset = circumference - (score / 100) * circumference;

    // 색상 설정
    let color = '#4CAF50'; // 초록
    if (score < 50) color = '#F44336'; // 빨강
    else if (score < 70) color = '#FF9800'; // 주황

    scoreCircle.style.stroke = color;
    scoreCircle.style.strokeDashoffset = offset;

    // 숫자 애니메이션
    let currentScore = 0;
    const duration = 1000;
    const increment = score / (duration / 16);

    const animate = () => {
      currentScore += increment;
      if (currentScore >= score) {
        currentScore = score;
        scoreText.textContent = Math.round(score);
      } else {
        scoreText.textContent = Math.round(currentScore);
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  reset() {
    const resultSection = this.element.querySelector('#resultSection');
    resultSection.style.display = 'none';

    const canvas = this.element.querySelector('#waveformCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  destroy() {
    this.tts.stop();
    if (this.isRecording) {
      this.stopRecording();
    }
    if (this.element) {
      this.element.remove();
    }
  }

  setApiKey(apiKey) {
    this.aiService.setApiKey(apiKey);
  }
}

export default ListenRepeat;
