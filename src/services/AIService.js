class AIService {
  constructor(options = {}) {
    this.apiKey = options.apiKey || '';
    this.apiEndpoint = options.apiEndpoint || '';
  }

  async request(endpoint, data) {
    if (!this.apiKey && !this.apiEndpoint) {
      console.warn('API key or endpoint not configured');
      // 데모 모드에서는 목 데이터 반환
      return this.getMockResponse(endpoint, data);
    }

    try {
      const response = await fetch(`${this.apiEndpoint}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  // 발음 평가
  async evaluatePronunciation(audioBlob, targetText) {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('targetText', targetText);

    return this.request('/evaluate-pronunciation', formData);
  }

  // 받아쓰기 평가
  async evaluateDictation(userText, correctText) {
    return this.request('/evaluate-dictation', {
      userText,
      correctText
    });
  }

  // 에세이 첨삭
  async correctEssay(text, level = 'intermediate') {
    return this.request('/correct-essay', {
      text,
      level
    });
  }

  // 텍스트 난이도 분석
  async analyzeDifficulty(text) {
    return this.request('/analyze-difficulty', {
      text
    });
  }

  // 단어 설명
  async explainWord(word, context = '') {
    return this.request('/explain-word', {
      word,
      context
    });
  }

  // 목 데이터 (데모/개발용)
  getMockResponse(endpoint, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockResponses = {
          '/evaluate-pronunciation': {
            score: Math.floor(Math.random() * 30) + 70,
            feedback: '발음이 좋습니다! "ㅓ" 소리를 조금 더 명확하게 발음해보세요.',
            improvements: ['ㅓ 발음 연습', '억양 개선']
          },
          '/evaluate-dictation': {
            accuracy: 85,
            errors: [
              { position: 5, expected: '했', actual: '헀', type: 'spelling' }
            ],
            correctedText: data.correctText
          },
          '/correct-essay': {
            correctedText: data.text,
            suggestions: [
              {
                type: 'grammar',
                original: '먹었어요',
                suggestion: '먹었습니다',
                reason: '격식체가 더 적절합니다',
                position: 10
              },
              {
                type: 'expression',
                original: '아주 좋아요',
                suggestion: '매우 좋습니다',
                reason: '더 자연스러운 표현입니다',
                position: 25
              }
            ],
            overallScore: 78,
            feedback: '전반적으로 문법이 정확합니다. 표현을 더 다양하게 사용해보세요.'
          },
          '/analyze-difficulty': {
            level: 'intermediate',
            score: 65,
            vocabulary: 'intermediate',
            grammar: 'beginner',
            readability: 70
          },
          '/explain-word': {
            word: data.word,
            meaning: '의미 설명',
            examples: ['예문 1', '예문 2'],
            synonyms: ['유의어1', '유의어2']
          }
        };

        resolve(mockResponses[endpoint] || { success: true });
      }, 500);
    });
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }
}

export default AIService;
