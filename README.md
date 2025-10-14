# 🇰🇷 Korean Learning Assistant

LMS 통합을 위한 AI 기반 한국어 학습 도우미입니다. 간단한 자바스크립트 코드로 LMS에 쉽게 통합하여 학습자들에게 인터랙티브한 한국어 학습 경험을 제공합니다.

## ✨ 주요 기능

### 5가지 학습 모듈

1. **🎧 듣고 따라하기 (Listen & Repeat)**
   - 원어민 발음 재생
   - 사용자 발음 녹음 및 분석
   - 실시간 발음 점수 제공
   - 개선 포인트 제안

2. **✍️ 듣고 쓰기 (Dictation)**
   - 한국어 문장 듣기
   - 받아쓰기 연습
   - 정확도 측정
   - 오류 분석 및 피드백

3. **🎯 단어 짝 맞추기 (Word Matching)**
   - 게이미피케이션 방식의 어휘 학습
   - 단어-의미 매칭 게임
   - 시간 및 점수 추적
   - 즉각적인 피드백

4. **📖 읽기 (Reading)**
   - 한국어 텍스트 읽기
   - 단어 클릭 시 사전 기능
   - 이해도 확인 퀴즈
   - TTS로 텍스트 읽어주기

5. **📝 에세이 첨삭 교정 (Essay Correction)**
   - AI 기반 문법 교정
   - 표현 개선 제안
   - 실시간 피드백
   - 수정 전후 비교

## 🚀 설치 방법

### 1. NPM을 통한 설치

```bash
npm install
npm run build
```

빌드 후 `dist/korean-learning-assistant.js` 파일이 생성됩니다.

### 2. CDN 사용 (권장)

```html
<script src="https://your-cdn.com/korean-learning-assistant.js"></script>
```

## 💡 사용 방법

### 방법 1: 플로팅 버튼 모드 (기본)

화면 우측 하단에 플로팅 버튼이 나타나며, 클릭 시 모달로 학습 모듈이 표시됩니다.

```html
<!DOCTYPE html>
<html>
<head>
  <title>My LMS</title>
</head>
<body>
  <!-- LMS 콘텐츠 -->

  <!-- Korean Learning Assistant -->
  <script src="dist/korean-learning-assistant.js"></script>
  <script>
    const assistant = new KoreanLearningAssistant({
      container: 'body',
      apiKey: 'YOUR_API_KEY',
      apiEndpoint: 'https://your-api.com',
      modules: ['listen-repeat', 'dictation', 'word-match', 'reading', 'essay-correction'],
      theme: 'light',
      position: 'bottom-right'
    });
  </script>
</body>
</html>
```

### 방법 2: 임베디드 모드

LMS 페이지의 특정 영역에 직접 삽입합니다.

```html
<div id="learning-area"></div>

<script src="dist/korean-learning-assistant.js"></script>
<script>
  const assistant = new KoreanLearningAssistant({
    container: '#learning-area',
    apiKey: 'YOUR_API_KEY',
    apiEndpoint: 'https://your-api.com',
    modules: ['listen-repeat', 'dictation'],
    floatingButton: false  // 플로팅 버튼 비활성화
  });
</script>
```

## ⚙️ 설정 옵션

```javascript
new KoreanLearningAssistant({
  // 필수 옵션
  container: 'body',              // 컨테이너 selector 또는 DOM element

  // API 설정 (선택사항, 미설정 시 데모 모드)
  apiKey: 'YOUR_API_KEY',         // AI 서비스 API 키
  apiEndpoint: 'https://...',     // AI 서비스 엔드포인트

  // 모듈 설정
  modules: [                      // 사용할 모듈 선택
    'listen-repeat',
    'dictation',
    'word-match',
    'reading',
    'essay-correction'
  ],

  // UI 설정
  theme: 'light',                 // 'light' 또는 'dark'
  floatingButton: true,           // 플로팅 버튼 사용 여부
  position: 'bottom-right',       // 플로팅 버튼 위치
                                  // 'bottom-right', 'bottom-left',
                                  // 'top-right', 'top-left'

  // 언어 설정
  language: 'ko'                  // 기본 언어 (한국어)
});
```

## 🎨 커스터마이징

### 테마 변경

```javascript
// 라이트 테마
const assistant = new KoreanLearningAssistant({
  theme: 'light'
});

// 다크 테마
const assistant = new KoreanLearningAssistant({
  theme: 'dark'
});
```

### 특정 모듈만 사용

```javascript
// 듣고 따라하기와 받아쓰기만 사용
const assistant = new KoreanLearningAssistant({
  modules: ['listen-repeat', 'dictation']
});
```

### 프로그래매틱 제어

```javascript
const assistant = new KoreanLearningAssistant({...});

// 특정 모듈 열기
assistant.selectModule('listen-repeat');

// 모듈 가져오기
const module = assistant.getModule('dictation');

// API 키 변경
assistant.setApiKey('NEW_API_KEY');

// 종료
assistant.destroy();
```

## 🔌 API 연동

AI 기능을 사용하려면 백엔드 API가 필요합니다. API는 다음 엔드포인트를 제공해야 합니다:

### 엔드포인트

#### POST `/evaluate-pronunciation`
발음 평가

**요청:**
```json
{
  "audio": "blob",
  "targetText": "안녕하세요"
}
```

**응답:**
```json
{
  "score": 85,
  "feedback": "발음이 좋습니다!",
  "improvements": ["ㅓ 발음 연습"]
}
```

#### POST `/evaluate-dictation`
받아쓰기 평가

**요청:**
```json
{
  "userText": "사용자가 입력한 텍스트",
  "correctText": "정답 텍스트"
}
```

**응답:**
```json
{
  "accuracy": 85,
  "errors": [{
    "position": 5,
    "expected": "했",
    "actual": "헀",
    "type": "spelling"
  }],
  "correctedText": "정답 텍스트"
}
```

#### POST `/correct-essay`
에세이 교정

**요청:**
```json
{
  "text": "작성한 에세이 내용",
  "level": "intermediate"
}
```

**응답:**
```json
{
  "correctedText": "교정된 텍스트",
  "suggestions": [{
    "type": "grammar",
    "original": "먹었어요",
    "suggestion": "먹었습니다",
    "reason": "격식체가 더 적절합니다",
    "position": 10
  }],
  "overallScore": 78,
  "feedback": "전반적으로 좋습니다"
}
```

### 데모 모드

API 키를 설정하지 않으면 자동으로 데모 모드로 실행되며, 목(mock) 데이터를 사용합니다.

```javascript
// 데모 모드 (API 없이 테스트)
const assistant = new KoreanLearningAssistant({
  container: 'body',
  modules: ['listen-repeat', 'dictation']
  // apiKey 설정 안 함
});
```

## 🎯 사용 예시

### LMS 강의 페이지에 통합

```html
<!-- 강의 콘텐츠 -->
<div class="lecture-content">
  <h1>한국어 초급 - 1강</h1>
  <video src="lecture.mp4"></video>
</div>

<!-- 학습 도우미 영역 -->
<div class="practice-area">
  <h2>연습하기</h2>
  <div id="korean-assistant"></div>
</div>

<script src="dist/korean-learning-assistant.js"></script>
<script>
  new KoreanLearningAssistant({
    container: '#korean-assistant',
    apiKey: 'YOUR_API_KEY',
    apiEndpoint: 'https://api.yourlms.com',
    modules: ['listen-repeat', 'dictation'],
    floatingButton: false
  });
</script>
```

### 독립 실행형 학습 페이지

```html
<!DOCTYPE html>
<html>
<head>
  <title>한국어 학습</title>
</head>
<body>
  <script src="dist/korean-learning-assistant.js"></script>
  <script>
    // 전체 페이지를 학습 도구로 사용
    new KoreanLearningAssistant({
      container: 'body',
      apiKey: 'YOUR_API_KEY',
      modules: ['listen-repeat', 'dictation', 'word-match', 'reading', 'essay-correction'],
      floatingButton: true,
      position: 'bottom-right'
    });
  </script>
</body>
</html>
```

## 🌐 브라우저 지원

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 모바일 브라우저 지원

### 필요한 브라우저 기능

- Web Speech API (음성 인식)
- Speech Synthesis API (TTS)
- MediaRecorder API (녹음)

## 📱 반응형 디자인

모든 모듈은 데스크톱, 태블릿, 모바일에서 최적화되어 작동합니다.

## 🛠️ 개발

### 프로젝트 구조

```
korean-learning-assistant/
├── src/
│   ├── index.js                 # 메인 클래스
│   ├── ui/
│   │   ├── FloatingButton.js
│   │   ├── Modal.js
│   │   └── ModuleSelector.js
│   ├── modules/
│   │   ├── ListenRepeat.js
│   │   ├── Dictation.js
│   │   ├── WordMatch.js
│   │   ├── Reading.js
│   │   └── EssayCorrection.js
│   ├── services/
│   │   ├── AIService.js
│   │   ├── SpeechRecognition.js
│   │   └── TextToSpeech.js
│   └── styles/
│       └── main.css
├── dist/                        # 빌드 결과물
├── demo.html                    # 데모 페이지
├── webpack.config.js
├── package.json
└── README.md
```

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 모드 (watch)
npm run dev

# 프로덕션 빌드
npm run build

# 데모 실행
npm run serve
# 브라우저에서 http://localhost:3000/demo.html 열기
```

## 📄 라이선스

MIT License

## 🤝 기여

이슈와 PR을 환영합니다!

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해주세요.

---

Made with ❤️ for Korean learners
