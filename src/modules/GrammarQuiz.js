import AIService from '../services/AIService.js';

class GrammarQuiz {
  constructor(options = {}) {
    this.options = options;
    this.aiService = new AIService(options);
    this.element = null;
    this.currentQuestion = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.totalQuestions = 5;

    this.questions = [
      {
        question: '다음 중 올바른 문장은?',
        options: [
          '저는 학교에 갑니다.',
          '저는 학교를 갑니다.',
          '저는 학교에서 갑니다.',
          '저는 학교로 갑니다.'
        ],
        correct: 0,
        explanation: '"~에 가다"는 목적지를 나타낼 때 사용합니다.'
      },
      {
        question: '빈칸에 알맞은 조사는? "친구___ 전화했어요."',
        options: ['을', '를', '에게', '한테서'],
        correct: 2,
        explanation: '"~에게"는 동작의 대상을 나타낼 때 사용합니다.'
      },
      {
        question: '다음 문장의 시제가 올바른 것은?',
        options: [
          '어제 영화를 봤어요.',
          '어제 영화를 볼 거예요.',
          '어제 영화를 봐요.',
          '어제 영화를 보고 있어요.'
        ],
        correct: 0,
        explanation: '"어제"는 과거를 나타내므로 과거형 "봤어요"를 사용해야 합니다.'
      },
      {
        question: '존댓말로 올바른 표현은?',
        options: [
          '선생님, 이거 뭐야?',
          '선생님, 이것은 무엇이에요?',
          '선생님, 이것은 무엇입니까?',
          '선생님, 이게 뭐지?'
        ],
        correct: 2,
        explanation: '선생님께는 가장 높은 존댓말인 "~ㅂ니까"를 사용하는 것이 적절합니다.'
      },
      {
        question: '"~고 싶다"의 올바른 사용은?',
        options: [
          '저는 한국어 배우고 싶어요.',
          '저는 한국어를 배우고 싶어요.',
          '저는 한국어에 배우고 싶어요.',
          '저는 한국어로 배우고 싶어요.'
        ],
        correct: 1,
        explanation: '동사 앞에는 목적격 조사 "를/을"을 사용합니다.'
      }
    ];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'kla-module kla-grammar-quiz';
    this.element.innerHTML = `
      <div class="kla-module-header">
        <h3>문법 퀴즈</h3>
        <p class="kla-module-subtitle">한국어 문법 실력을 테스트해보세요</p>
      </div>

      <div class="kla-quiz-content">
        <div class="kla-quiz-progress">
          <div class="kla-progress-bar">
            <div class="kla-progress-fill" id="progressFill" style="width: 0%"></div>
          </div>
          <div class="kla-progress-text">
            <span id="currentQuestion">1</span> / <span id="totalQuestions">${this.totalQuestions}</span>
          </div>
        </div>

        <div class="kla-quiz-score">
          점수: <span id="scoreDisplay">0</span> / ${this.totalQuestions}
        </div>

        <div class="kla-question-container" id="questionContainer">
          <!-- 질문이 여기에 표시됩니다 -->
        </div>

        <div class="kla-quiz-result" id="quizResult" style="display: none;">
          <div class="kla-result-header">
            <h3>퀴즈 완료! 🎉</h3>
          </div>
          <div class="kla-final-score">
            <div class="kla-score-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                <circle id="finalScoreCircle" cx="60" cy="60" r="54" fill="none" stroke="#4CAF50" stroke-width="8"
                        stroke-dasharray="339.292" stroke-dashoffset="339.292"
                        transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 1s ease"/>
                <text x="60" y="70" text-anchor="middle" font-size="32" font-weight="bold" fill="#333" id="finalScoreText">0</text>
              </svg>
            </div>
            <p id="finalMessage">수고하셨습니다!</p>
          </div>
          <button class="kla-btn kla-btn-primary" id="restartBtn">다시 시작하기</button>
        </div>
      </div>
    `;

    this.attachEventListeners();
    this.loadQuestion();
    return this.element;
  }

  attachEventListeners() {
    // 다시 시작하기 버튼
    const restartBtn = this.element.querySelector('#restartBtn');
    restartBtn?.addEventListener('click', () => this.restart());
  }

  loadQuestion() {
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.showResults();
      return;
    }

    this.currentQuestion = this.questions[this.currentQuestionIndex];
    const container = this.element.querySelector('#questionContainer');

    container.innerHTML = `
      <div class="kla-question">
        <h4>${this.currentQuestion.question}</h4>
      </div>
      <div class="kla-options">
        ${this.currentQuestion.options.map((option, index) => `
          <button class="kla-option-btn" data-index="${index}">
            <span class="kla-option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="kla-option-text">${option}</span>
          </button>
        `).join('')}
      </div>
      <div class="kla-explanation" id="explanation" style="display: none;">
        <div class="kla-explanation-content">
          <strong>설명:</strong> <span id="explanationText"></span>
        </div>
      </div>
    `;

    // 옵션 버튼 이벤트 리스너
    const optionBtns = container.querySelectorAll('.kla-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedIndex = parseInt(e.currentTarget.dataset.index);
        this.checkAnswer(selectedIndex, optionBtns);
      });
    });

    // 진행률 업데이트
    this.updateProgress();
  }

  checkAnswer(selectedIndex, optionBtns) {
    const isCorrect = selectedIndex === this.currentQuestion.correct;

    // 모든 버튼 비활성화
    optionBtns.forEach(btn => btn.disabled = true);

    // 정답/오답 표시
    optionBtns.forEach((btn, index) => {
      if (index === this.currentQuestion.correct) {
        btn.classList.add('kla-correct');
      } else if (index === selectedIndex && !isCorrect) {
        btn.classList.add('kla-wrong');
      }
    });

    // 점수 업데이트
    if (isCorrect) {
      this.score++;
      this.updateScore();
    }

    // 설명 표시
    const explanation = this.element.querySelector('#explanation');
    const explanationText = this.element.querySelector('#explanationText');
    explanationText.textContent = this.currentQuestion.explanation;
    explanation.style.display = 'block';

    if (isCorrect) {
      explanation.classList.add('kla-correct');
      explanation.classList.remove('kla-wrong');
    } else {
      explanation.classList.add('kla-wrong');
      explanation.classList.remove('kla-correct');
    }

    // 2초 후 다음 문제로
    setTimeout(() => {
      this.currentQuestionIndex++;
      this.loadQuestion();
    }, 2500);
  }

  updateProgress() {
    const progressFill = this.element.querySelector('#progressFill');
    const currentQuestion = this.element.querySelector('#currentQuestion');

    const progress = ((this.currentQuestionIndex) / this.totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
    currentQuestion.textContent = this.currentQuestionIndex + 1;
  }

  updateScore() {
    const scoreDisplay = this.element.querySelector('#scoreDisplay');
    scoreDisplay.textContent = this.score;
  }

  showResults() {
    const questionContainer = this.element.querySelector('#questionContainer');
    const quizResult = this.element.querySelector('#quizResult');
    const progressBar = this.element.querySelector('.kla-quiz-progress');

    questionContainer.style.display = 'none';
    progressBar.style.display = 'none';
    quizResult.style.display = 'block';

    // 점수 애니메이션
    const percentage = (this.score / this.totalQuestions) * 100;
    this.animateFinalScore(percentage);

    // 메시지 설정
    const finalMessage = this.element.querySelector('#finalMessage');
    if (percentage >= 80) {
      finalMessage.textContent = '훌륭합니다! 🌟';
    } else if (percentage >= 60) {
      finalMessage.textContent = '잘하셨어요! 👍';
    } else {
      finalMessage.textContent = '다시 도전해보세요! 💪';
    }
  }

  animateFinalScore(percentage) {
    const scoreCircle = this.element.querySelector('#finalScoreCircle');
    const scoreText = this.element.querySelector('#finalScoreText');
    const circumference = 339.292;
    const offset = circumference - (percentage / 100) * circumference;

    // 색상 설정
    let color = '#4CAF50'; // 초록
    if (percentage < 60) color = '#F44336'; // 빨강
    else if (percentage < 80) color = '#FF9800'; // 주황

    scoreCircle.style.stroke = color;
    scoreCircle.style.strokeDashoffset = offset;

    // 숫자 애니메이션
    let currentScore = 0;
    const duration = 1000;
    const increment = this.score / (duration / 16);

    const animate = () => {
      currentScore += increment;
      if (currentScore >= this.score) {
        currentScore = this.score;
        scoreText.textContent = `${this.score}/${this.totalQuestions}`;
      } else {
        scoreText.textContent = `${Math.round(currentScore)}/${this.totalQuestions}`;
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  restart() {
    this.currentQuestionIndex = 0;
    this.score = 0;

    const questionContainer = this.element.querySelector('#questionContainer');
    const quizResult = this.element.querySelector('#quizResult');
    const progressBar = this.element.querySelector('.kla-quiz-progress');

    questionContainer.style.display = 'block';
    progressBar.style.display = 'block';
    quizResult.style.display = 'none';

    this.updateScore();
    this.loadQuestion();
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

export default GrammarQuiz;
