// Auto-generated from main.css
// This file injects CSS styles into the document

const css = `/* ========================================
   Korean Learning Assistant - Main Styles
   ======================================== */

/* CSS Variables */
:root {
  --kla-primary: #2196F3;
  --kla-primary-dark: #1976D2;
  --kla-secondary: #4CAF50;
  --kla-error: #F44336;
  --kla-warning: #FF9800;
  --kla-success: #4CAF50;
  --kla-text: #333;
  --kla-text-light: #666;
  --kla-border: #ddd;
  --kla-bg: #fff;
  --kla-bg-light: #f5f5f5;
  --kla-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --kla-shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);
  --kla-radius: 8px;
  --kla-radius-lg: 12px;
  --kla-transition: all 0.3s ease;
}

[data-kla-theme="dark"] {
  --kla-text: #e0e0e0;
  --kla-text-light: #b0b0b0;
  --kla-border: #444;
  --kla-bg: #1e1e1e;
  --kla-bg-light: #2a2a2a;
}

/* Reset and Base */
.kla-module *,
.kla-modal *,
.kla-floating-button * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ========================================
   Floating Button
   ======================================== */
.kla-floating-button {
  position: fixed;
  z-index: 9999;
}

.kla-position-bottom-right {
  bottom: 20px;
  right: 20px;
}

.kla-position-bottom-left {
  bottom: 20px;
  left: 20px;
}

.kla-position-top-right {
  top: 20px;
  right: 20px;
}

.kla-position-top-left {
  top: 20px;
  left: 20px;
}

.kla-fab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  background: var(--kla-primary);
  color: white;
  border: none;
  border-radius: 50px;
  box-shadow: var(--kla-shadow-lg);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: var(--kla-transition);
}

.kla-fab:hover {
  background: var(--kla-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.kla-fab:active {
  transform: translateY(0);
}

/* ========================================
   Modal
   ======================================== */
.kla-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.kla-modal-active {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.kla-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.kla-modal-container {
  position: relative;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  background: var(--kla-bg);
  border-radius: var(--kla-radius-lg);
  box-shadow: var(--kla-shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.kla-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--kla-border);
}

.kla-modal-header h2 {
  font-size: 24px;
  color: var(--kla-text);
  font-weight: 700;
}

.kla-modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: var(--kla-transition);
  color: var(--kla-text-light);
}

.kla-modal-close:hover {
  background: var(--kla-bg-light);
}

.kla-modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

/* ========================================
   Module Selector
   ======================================== */
.kla-module-selector {
  width: 100%;
}

.kla-module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 8px;
}

.kla-module-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 16px 12px;
  background: var(--kla-bg);
  border: 1px solid var(--kla-border);
  border-radius: var(--kla-radius);
  cursor: pointer;
  transition: var(--kla-transition);
}

.kla-module-card:hover {
  border-color: var(--kla-primary);
  box-shadow: var(--kla-shadow);
  transform: translateY(-2px);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.kla-module-icon {
  font-size: 48px;
  margin-bottom: 4px;
}

.kla-module-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--kla-text);
  margin-bottom: 4px;
}

.kla-module-description {
  font-size: 11px;
  color: var(--kla-text-light);
  line-height: 1.4;
  padding: 0 4px;
}

/* ========================================
   Common Module Styles
   ======================================== */
.kla-module {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--kla-text);
  line-height: 1.6;
}

.kla-module-header {
  margin-bottom: 24px;
}

.kla-module-header h3 {
  font-size: 28px;
  font-weight: 700;
  color: var(--kla-text);
  margin-bottom: 8px;
}

.kla-module-subtitle {
  font-size: 16px;
  color: var(--kla-text-light);
}

/* Back Button */
.kla-back-button {
  margin-bottom: 16px;
  padding: 10px 16px;
  background: var(--kla-bg-light);
  border: 1px solid var(--kla-border);
  border-radius: var(--kla-radius);
  cursor: pointer;
  font-size: 14px;
  color: var(--kla-text);
  transition: var(--kla-transition);
}

.kla-back-button:hover {
  background: var(--kla-border);
}

/* Buttons */
.kla-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: var(--kla-radius);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--kla-transition);
}

.kla-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.kla-btn-primary {
  background: var(--kla-primary);
  color: white;
}

.kla-btn-primary:hover:not(:disabled) {
  background: var(--kla-primary-dark);
}

.kla-btn-secondary {
  background: var(--kla-bg-light);
  color: var(--kla-text);
  border: 1px solid var(--kla-border);
}

.kla-btn-secondary:hover:not(:disabled) {
  background: var(--kla-border);
}

.kla-btn-text {
  background: none;
  color: var(--kla-primary);
  padding: 8px 12px;
}

.kla-btn-text:hover:not(:disabled) {
  background: rgba(33, 150, 243, 0.1);
}

.kla-btn-large {
  padding: 16px 32px;
  font-size: 18px;
}

.kla-btn-record {
  background: var(--kla-error);
  color: white;
}

.kla-btn-record:hover:not(:disabled) {
  background: #d32f2f;
}

.kla-btn-record.kla-recording {
  background: var(--kla-error);
  animation: kla-pulse 1.5s infinite;
}

/* ========================================
   Listen & Repeat Module
   ======================================== */
.kla-listen-repeat-content {
  max-width: 100%;
  margin: 0 auto;
}

.kla-sentence-display {
  background: var(--kla-bg-light);
  padding: 32px;
  border-radius: var(--kla-radius);
  text-align: center;
  margin-bottom: 24px;
}

.kla-sentence-text {
  font-size: 24px;
  font-weight: 500;
  color: var(--kla-text);
  line-height: 1.6;
}

.kla-audio-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.kla-speed-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.kla-speed-control label {
  font-size: 14px;
  color: var(--kla-text-light);
}

.kla-speed-select {
  padding: 6px 12px;
  border: 1px solid var(--kla-border);
  border-radius: var(--kla-radius);
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: var(--kla-transition);
}

.kla-speed-select:hover {
  border-color: var(--kla-primary);
}

.kla-speed-select:focus {
  outline: none;
  border-color: var(--kla-primary);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.kla-speed-control input[type="range"] {
  width: 150px;
}

.kla-waveform {
  background: var(--kla-bg-light);
  border-radius: var(--kla-radius);
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
  overflow: hidden;
}

.kla-waveform canvas {
  max-width: 100%;
  height: auto;
}

.kla-recording-section {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.kla-recording-status {
  margin-top: 12px;
  font-size: 16px;
  color: var(--kla-error);
  font-weight: 600;
}

.kla-result-section {
  background: var(--kla-bg-light);
  padding: 32px;
  border-radius: var(--kla-radius);
  text-align: center;
}

.kla-score-display,
.kla-accuracy-display {
  margin-bottom: 24px;
}

.kla-score-circle,
.kla-accuracy-circle {
  margin: 0 auto 16px;
  width: 120px;
  height: 120px;
}

.kla-score-display h4,
.kla-accuracy-display h4 {
  font-size: 18px;
  color: var(--kla-text-light);
}

.kla-feedback {
  background: white;
  padding: 20px;
  border-radius: var(--kla-radius);
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.6;
}

.kla-improvements {
  background: white;
  padding: 20px;
  border-radius: var(--kla-radius);
  margin-bottom: 20px;
  text-align: left;
}

.kla-improvements h5 {
  margin-bottom: 12px;
  color: var(--kla-text);
}

.kla-improvements ul {
  list-style: none;
  padding: 0;
}

.kla-improvements li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
}

.kla-improvements li:before {
  content: "•";
  position: absolute;
  left: 8px;
  color: var(--kla-primary);
  font-weight: bold;
}

/* ========================================
   Dictation Module
   ======================================== */
.kla-dictation-content {
  max-width: 800px;
  margin: 0 auto;
}

.kla-audio-player {
  text-align: center;
  padding: 32px;
  background: var(--kla-bg-light);
  border-radius: var(--kla-radius);
  margin-bottom: 24px;
}

.kla-playback-controls {
  margin-top: 20px;
}

.kla-dictation-input {
  margin-bottom: 24px;
}

.kla-dictation-input label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--kla-text);
}

.kla-dictation-input textarea {
  width: 100%;
  padding: 16px;
  border: 2px solid var(--kla-border);
  border-radius: var(--kla-radius);
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  transition: var(--kla-transition);
}

.kla-dictation-input textarea:focus {
  outline: none;
  border-color: var(--kla-primary);
}

.kla-input-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.kla-char-count {
  font-size: 14px;
  color: var(--kla-text-light);
}

.kla-hints {
  background: #FFF3E0;
  padding: 16px;
  border-radius: var(--kla-radius);
  margin-bottom: 24px;
  border-left: 4px solid var(--kla-warning);
}

.kla-hints h5 {
  margin-bottom: 8px;
  color: var(--kla-text);
}

.kla-hint-text {
  font-family: monospace;
  font-size: 16px;
  letter-spacing: 2px;
}

.kla-action-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.kla-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.kla-comparison-section h5 {
  margin-bottom: 12px;
  color: var(--kla-text);
}

.kla-text-display {
  background: white;
  padding: 16px;
  border-radius: var(--kla-radius);
  min-height: 100px;
  line-height: 1.8;
}

.kla-error-highlight {
  background: #FFCDD2;
  padding: 2px 4px;
  border-radius: 3px;
  cursor: help;
}

.kla-errors-list {
  background: white;
  padding: 20px;
  border-radius: var(--kla-radius);
  margin-bottom: 20px;
  text-align: left;
}

.kla-errors-list h5 {
  margin-bottom: 12px;
}

.kla-error-items {
  list-style: none;
  padding: 0;
}

.kla-error-items li {
  padding: 12px;
  margin-bottom: 8px;
  background: var(--kla-bg-light);
  border-radius: var(--kla-radius);
  display: flex;
  align-items: center;
  gap: 12px;
}

.kla-error-type {
  background: var(--kla-error);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.kla-wrong {
  color: var(--kla-error);
  text-decoration: line-through;
}

.kla-correct {
  color: var(--kla-success);
  font-weight: 600;
}

.kla-success-message {
  background: #C8E6C9;
  color: #2E7D32;
  padding: 16px;
  border-radius: var(--kla-radius);
  text-align: center;
  font-weight: 600;
}

/* ========================================
   Word Match Module
   ======================================== */
.kla-word-match-content {
  max-width: 900px;
  margin: 0 auto;
}

.kla-round-info {
  text-align: center;
  margin-bottom: 16px;
}

.kla-round-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--kla-primary);
  background: var(--kla-bg-light);
  padding: 8px 20px;
  border-radius: 20px;
  display: inline-block;
}

.kla-game-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--kla-bg-light);
  border-radius: var(--kla-radius);
}

.kla-stat {
  text-align: center;
}

.kla-stat-label {
  display: block;
  font-size: 14px;
  color: var(--kla-text-light);
  margin-bottom: 4px;
}

.kla-stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--kla-primary);
}

.kla-game-board-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.kla-game-column {
  display: flex;
  flex-direction: column;
}

.kla-column-header {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--kla-text);
  padding: 12px;
  background: var(--kla-bg-light);
  border-radius: var(--kla-radius);
  margin-bottom: 12px;
}

.kla-game-board {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 768px) {
  .kla-game-board-container {
    grid-template-columns: 1fr;
  }

  .kla-game-board {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}

.kla-word-card {
  background: var(--kla-bg);
  border: 2px solid var(--kla-border);
  border-radius: var(--kla-radius);
  padding: 14px;
  text-align: center;
  cursor: pointer;
  transition: var(--kla-transition);
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kla-word-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--kla-shadow);
}

.kla-card-korean {
  background: #E3F2FD;
  border-color: #2196F3;
}

.kla-card-meaning {
  background: #F3E5F5;
  border-color: #9C27B0;
}

.kla-card-selected {
  border-width: 3px;
  transform: scale(1.05);
}

.kla-card-matched {
  background: #C8E6C9;
  border-color: var(--kla-success);
  opacity: 0.7;
  cursor: default;
}

.kla-card-wrong {
  animation: kla-shake 0.5s;
  border-color: var(--kla-error);
}

.kla-card-text {
  font-size: 18px;
  font-weight: 600;
  word-break: break-word;
}

.kla-game-actions {
  text-align: center;
  margin-bottom: 24px;
}

.kla-completion-badge {
  text-align: center;
  margin-bottom: 24px;
}

.kla-completion-badge h3 {
  font-size: 32px;
  color: var(--kla-success);
  margin-top: 16px;
}

.kla-final-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 32px;
}

.kla-final-stat {
  text-align: center;
}

.kla-stat-number {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: var(--kla-primary);
  margin-bottom: 8px;
}

.kla-stat-text {
  font-size: 16px;
  color: var(--kla-text-light);
}

/* ========================================
   Reading Module
   ======================================== */
.kla-reading-content {
  max-width: 900px;
  margin: 0 auto;
}

.kla-reading-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--kla-bg-light);
  border-radius: var(--kla-radius);
  flex-wrap: wrap;
}

.kla-reading-text {
  background: white;
  padding: 32px;
  border-radius: var(--kla-radius);
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 2;
  border: 2px solid var(--kla-border);
}

.kla-reading-text p {
  margin-bottom: 16px;
}

.kla-readable-word {
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 3px;
  transition: var(--kla-transition);
}

.kla-readable-word:hover {
  background: #E3F2FD;
}

.kla-word-selected {
  background: #2196F3;
  color: white;
}

.kla-reading-features {
  background: var(--kla-bg-light);
  border-radius: var(--kla-radius);
  overflow: hidden;
}

.kla-feature-tabs {
  display: flex;
  background: white;
  border-bottom: 2px solid var(--kla-border);
}

.kla-tab-button {
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--kla-text-light);
  transition: var(--kla-transition);
  border-bottom: 3px solid transparent;
}

.kla-tab-button:hover {
  background: var(--kla-bg-light);
}

.kla-tab-button.kla-tab-active {
  color: var(--kla-primary);
  border-bottom-color: var(--kla-primary);
}

.kla-tab-content {
  padding: 24px;
}

.kla-tab-panel {
  display: none;
}

.kla-tab-panel.kla-tab-active {
  display: block;
}

.kla-dictionary-placeholder {
  text-align: center;
  padding: 48px 24px;
  color: var(--kla-text-light);
}

.kla-dictionary-content h4 {
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--kla-primary);
}

.kla-word-info {
  line-height: 1.8;
}

.kla-meaning {
  margin-bottom: 16px;
}

.kla-examples h5 {
  margin-bottom: 8px;
}

.kla-examples ul {
  list-style: none;
  padding: 0;
}

.kla-examples li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
}

.kla-examples li:before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--kla-primary);
}

.kla-questions-list {
  max-width: 600px;
}

.kla-question-item {
  background: white;
  padding: 20px;
  border-radius: var(--kla-radius);
  margin-bottom: 16px;
}

.kla-question-item h5 {
  margin-bottom: 12px;
  color: var(--kla-text);
}

.kla-question-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kla-question-options label {
  padding: 12px;
  background: var(--kla-bg-light);
  border-radius: var(--kla-radius);
  cursor: pointer;
  transition: var(--kla-transition);
}

.kla-question-options label:hover {
  background: var(--kla-border);
}

.kla-score-badge {
  padding: 32px;
  border-radius: var(--kla-radius);
  text-align: center;
  margin-bottom: 24px;
}

.kla-pass {
  background: #C8E6C9;
}

.kla-fail {
  background: #FFCDD2;
}

.kla-answer-explanation {
  background: white;
  padding: 20px;
  border-radius: var(--kla-radius);
  line-height: 1.8;
}

.kla-answer-explanation h5 {
  margin-bottom: 12px;
}

.kla-answer-explanation p {
  margin-bottom: 12px;
}

.kla-summary-content {
  max-width: 700px;
}

.kla-summary-content h5 {
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--kla-text);
}

.kla-summary-content p {
  margin-bottom: 16px;
  line-height: 1.8;
}

.kla-vocabulary-list {
  list-style: none;
  padding: 0;
}

.kla-vocabulary-list li {
  padding: 12px;
  background: white;
  border-radius: var(--kla-radius);
  margin-bottom: 8px;
}

.kla-difficulty-bar {
  background: var(--kla-border);
  height: 40px;
  border-radius: var(--kla-radius);
  overflow: hidden;
  margin-top: 8px;
}

.kla-difficulty-fill {
  background: var(--kla-primary);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  transition: width 1s ease;
}

/* ========================================
   Essay Correction Module
   ======================================== */
.kla-essay-correction-content {
  max-width: 1000px;
  margin: 0 auto;
}

.kla-editor-section {
  margin-bottom: 24px;
}

.kla-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.kla-editor-header h4 {
  font-size: 20px;
  color: var(--kla-text);
}

.kla-editor-controls {
  display: flex;
  gap: 12px;
}

.kla-select {
  padding: 8px 16px;
  border: 1px solid var(--kla-border);
  border-radius: var(--kla-radius);
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.kla-essay-editor {
  width: 100%;
  padding: 20px;
  border: 2px solid var(--kla-border);
  border-radius: var(--kla-radius);
  font-size: 16px;
  font-family: inherit;
  line-height: 1.8;
  resize: vertical;
  min-height: 200px;
  transition: var(--kla-transition);
}

.kla-essay-editor:focus {
  outline: none;
  border-color: var(--kla-primary);
}

.kla-editor-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.kla-char-count.kla-limit-exceeded {
  color: var(--kla-error);
  font-weight: 600;
}

.kla-correction-summary {
  background: var(--kla-bg-light);
  padding: 24px;
  border-radius: var(--kla-radius);
  margin-bottom: 24px;
}

.kla-correction-summary h4 {
  font-size: 22px;
  margin-bottom: 16px;
}

.kla-summary-stats {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.kla-stat-card {
  background: white;
  padding: 24px;
  border-radius: var(--kla-radius);
  text-align: center;
  flex: 1;
  max-width: 200px;
}

.kla-stat-card .kla-stat-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--kla-primary);
  margin-bottom: 8px;
}

.kla-stat-card .kla-stat-label {
  font-size: 14px;
  color: var(--kla-text-light);
}

.kla-view-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.kla-toggle-button {
  flex: 1;
  padding: 12px;
  background: var(--kla-bg-light);
  border: 2px solid var(--kla-border);
  border-radius: var(--kla-radius);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--kla-text-light);
  transition: var(--kla-transition);
}

.kla-toggle-button.kla-active {
  background: var(--kla-primary);
  color: white;
  border-color: var(--kla-primary);
}

.kla-suggestions-list {
  margin-bottom: 24px;
}

.kla-suggestion-card {
  background: white;
  border-left: 4px solid;
  border-radius: var(--kla-radius);
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: var(--kla-shadow);
}

.kla-suggestion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.kla-suggestion-type {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: white;
}

.kla-suggestion-number {
  font-size: 14px;
  color: var(--kla-text-light);
}

.kla-suggestion-change {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.kla-original {
  padding: 8px 12px;
  background: #FFEBEE;
  border-radius: var(--kla-radius);
  font-weight: 600;
}

.kla-suggested {
  padding: 8px 12px;
  background: #E8F5E9;
  border-radius: var(--kla-radius);
  font-weight: 600;
}

.kla-suggestion-reason {
  color: var(--kla-text-light);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.kla-apply-button {
  font-size: 14px;
}

.kla-apply-button.kla-applied {
  background: var(--kla-success);
  color: white;
}

.kla-no-suggestions {
  text-align: center;
  padding: 48px 24px;
}

.kla-no-suggestions h4 {
  font-size: 24px;
  color: var(--kla-success);
  margin: 16px 0 8px;
}

.kla-overall-feedback {
  background: white;
  padding: 24px;
  border-radius: var(--kla-radius);
  box-shadow: var(--kla-shadow);
}

.kla-overall-feedback h5 {
  margin-bottom: 12px;
  color: var(--kla-text);
}

.kla-overall-feedback p {
  line-height: 1.8;
  color: var(--kla-text-light);
}

.kla-text-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .kla-text-comparison {
    grid-template-columns: 1fr;
  }
}

.kla-comparison-column h5 {
  margin-bottom: 12px;
  color: var(--kla-text);
}

.kla-text-box {
  background: white;
  padding: 20px;
  border-radius: var(--kla-radius);
  min-height: 200px;
  line-height: 1.8;
  box-shadow: var(--kla-shadow);
}

.kla-highlight {
  background: #FFEB3B;
  padding: 2px 4px;
  border-radius: 3px;
}

/* ========================================
   Grammar Quiz Module
   ======================================== */
.kla-grammar-quiz .kla-quiz-content {
  max-width: 800px;
  margin: 0 auto;
}

.kla-quiz-header {
  background: var(--kla-bg-light);
  padding: 20px;
  border-radius: var(--kla-radius);
  margin-bottom: 24px;
}

.kla-quiz-progress {
  margin: 0;
}

.kla-progress-bar {
  background: var(--kla-border);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.kla-progress-fill {
  background: var(--kla-primary);
  height: 100%;
  transition: width 0.3s ease;
}

.kla-progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kla-progress-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--kla-text);
}

.kla-quiz-score {
  font-size: 16px;
  font-weight: 600;
  color: var(--kla-primary);
}

.kla-question-container {
  background: white;
  padding: 32px;
  border-radius: var(--kla-radius);
  box-shadow: var(--kla-shadow);
  margin-bottom: 24px;
}

.kla-question h4 {
  font-size: 22px;
  color: var(--kla-text);
  margin-bottom: 24px;
  line-height: 1.6;
}

.kla-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.kla-option-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--kla-bg-light);
  border: 2px solid var(--kla-border);
  border-radius: var(--kla-radius);
  cursor: pointer;
  transition: var(--kla-transition);
  font-size: 16px;
  text-align: left;
  width: 100%;
}

.kla-option-btn:hover:not(:disabled) {
  border-color: var(--kla-primary);
  background: #E3F2FD;
  transform: translateX(4px);
}

.kla-option-btn:disabled {
  cursor: not-allowed;
}

.kla-option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: white;
  border: 2px solid var(--kla-border);
  border-radius: 50%;
  font-weight: 700;
  color: var(--kla-text);
  flex-shrink: 0;
}

.kla-option-text {
  flex: 1;
  color: var(--kla-text);
}

.kla-option-btn.kla-correct {
  background: #C8E6C9;
  border-color: var(--kla-success);
}

.kla-option-btn.kla-correct .kla-option-letter {
  background: var(--kla-success);
  border-color: var(--kla-success);
  color: white;
}

.kla-option-btn.kla-wrong {
  background: #FFCDD2;
  border-color: var(--kla-error);
  animation: kla-shake 0.5s;
}

.kla-option-btn.kla-wrong .kla-option-letter {
  background: var(--kla-error);
  border-color: var(--kla-error);
  color: white;
}

.kla-explanation {
  padding: 16px 20px;
  border-radius: var(--kla-radius);
  margin-top: 16px;
}

.kla-explanation.kla-correct {
  background: #C8E6C9;
  border-left: 4px solid var(--kla-success);
}

.kla-explanation.kla-wrong {
  background: #FFCDD2;
  border-left: 4px solid var(--kla-error);
}

.kla-explanation-content {
  color: var(--kla-text);
  line-height: 1.6;
}

.kla-quiz-result {
  text-align: center;
}

.kla-result-header h3 {
  font-size: 32px;
  color: var(--kla-text);
  margin-bottom: 24px;
}

.kla-final-score {
  margin-bottom: 32px;
}

.kla-final-score p {
  font-size: 18px;
  color: var(--kla-text-light);
  margin-top: 16px;
}

/* ========================================
   Sentence Writing Module
   ======================================== */
.kla-sentence-writing .kla-sentence-writing-content {
  max-width: 900px;
  margin: 0 auto;
}

.kla-writing-header {
  background: var(--kla-bg-light);
  padding: 20px;
  border-radius: var(--kla-radius);
  margin-bottom: 24px;
}

.kla-writing-progress {
  margin: 0;
}

.kla-writing-progress .kla-progress-bar {
  background: var(--kla-border);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.kla-writing-progress .kla-progress-fill {
  background: var(--kla-primary);
  height: 100%;
  transition: width 0.3s ease;
}

.kla-writing-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kla-writing-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--kla-text);
}

.kla-writing-score {
  font-size: 16px;
  font-weight: 600;
  color: var(--kla-primary);
}

.kla-sentence-card {
  background: white;
  padding: 32px;
  border-radius: var(--kla-radius);
  box-shadow: var(--kla-shadow);
  margin-bottom: 24px;
}

.kla-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--kla-text-light);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kla-sentence-english {
  margin-bottom: 24px;
}

.kla-english-text {
  font-size: 20px;
  color: var(--kla-text);
  line-height: 1.8;
  padding: 20px;
  background: #E3F2FD;
  border-radius: var(--kla-radius);
  border-left: 4px solid var(--kla-primary);
}

.kla-arrow-down {
  text-align: center;
  font-size: 32px;
  color: var(--kla-primary);
  margin: 16px 0;
}

.kla-sentence-korean {
  margin-bottom: 24px;
}

.kla-korean-input {
  width: 100%;
  padding: 16px;
  border: 2px solid var(--kla-border);
  border-radius: var(--kla-radius);
  font-size: 18px;
  font-family: inherit;
  resize: vertical;
  transition: var(--kla-transition);
  line-height: 1.6;
}

.kla-korean-input:focus {
  outline: none;
  border-color: var(--kla-primary);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.kla-korean-input:disabled {
  background: var(--kla-bg-light);
  cursor: not-allowed;
}

.kla-hints {
  margin-bottom: 24px;
  display: none;
  animation: kla-slideIn 0.3s ease;
}

.kla-hints-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--kla-warning);
  margin-bottom: 12px;
}

.kla-hints-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.kla-hint-item {
  padding: 8px 16px;
  background: #FFF3E0;
  border: 1px solid #FFB74D;
  border-radius: 20px;
  font-size: 14px;
  color: var(--kla-text);
  font-weight: 500;
}

.kla-result-card {
  padding: 32px;
  border-radius: var(--kla-radius);
  box-shadow: var(--kla-shadow);
  margin-bottom: 24px;
}

.kla-result-card.kla-correct {
  background: linear-gradient(135deg, #C8E6C9 0%, #A5D6A7 100%);
}

.kla-result-card.kla-partial {
  background: linear-gradient(135deg, #FFE082 0%, #FFD54F 100%);
}

.kla-result-card.kla-wrong {
  background: linear-gradient(135deg, #FFCDD2 0%, #EF9A9A 100%);
}

.kla-result-icon {
  font-size: 64px;
  text-align: center;
  margin-bottom: 16px;
}

.kla-result-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--kla-text);
  text-align: center;
  margin-bottom: 24px;
}

.kla-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.kla-comparison-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--kla-text-light);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kla-user-answer,
.kla-correct-answer {
  background: white;
  padding: 16px;
  border-radius: var(--kla-radius);
}

.kla-comparison-text {
  font-size: 18px;
  color: var(--kla-text);
  line-height: 1.8;
}

.kla-feedback {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: var(--kla-radius);
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  color: var(--kla-text);
}

.kla-result-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.kla-completion-section {
  text-align: center;
}

.kla-completion-card {
  background: white;
  padding: 48px 32px;
  border-radius: var(--kla-radius);
  box-shadow: var(--kla-shadow);
}

.kla-completion-icon {
  font-size: 80px;
  margin-bottom: 24px;
}

.kla-completion-card h3 {
  font-size: 32px;
  color: var(--kla-text);
  margin-bottom: 16px;
}

.kla-completion-card p {
  font-size: 18px;
  color: var(--kla-text-light);
  line-height: 1.8;
  margin-bottom: 32px;
}

@keyframes kla-slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   Animations
   ======================================== */
@keyframes kla-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes kla-shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

@keyframes kla-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes kla-match-success {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.kla-spinner {
  animation: kla-spin 1s linear infinite;
}

@keyframes kla-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.kla-loading {
  opacity: 0.7;
  font-style: italic;
}

.kla-error {
  color: var(--kla-error);
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 768px) {
  .kla-module-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .kla-comparison {
    grid-template-columns: 1fr;
  }

  .kla-final-stats {
    flex-direction: column;
    gap: 24px;
  }

  .kla-summary-stats {
    flex-direction: column;
  }

  .kla-stat-card {
    max-width: 100%;
  }

  .kla-result-buttons {
    flex-direction: column;
  }

  .kla-action-buttons {
    flex-direction: column;
  }
}

/* ========================================
   Audio Player Component
   ======================================== */
.kla-audio-player {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 16px;
  margin: 20px 0;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);
}

.kla-audio-controls {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: nowrap;
}

.kla-audio-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 70px;
  width: 70px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.kla-audio-btn svg {
  width: 22px;
  height: 22px;
}

.kla-audio-btn-primary {
  background: white;
  color: #667eea;
}

.kla-audio-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.kla-audio-btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.kla-audio-btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.kla-audio-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.kla-audio-btn-speed {
  position: relative;
  background: white;
  color: #667eea;
  height: 70px;
  display: flex;
  justify-content: space-between;
}

.kla-audio-btn-speed:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.kla-speed-icon {
  width: 22px;
  height: 22px;
}

.kla-audio-speed-select {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 6px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  min-width: 55px;
}

.kla-audio-speed-select:hover {
  background: white;
  transform: translateX(-50%) scale(1.05);
}

.kla-audio-speed-select:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
}

/* 모바일 최적화 */
@media (max-width: 600px) {
  .kla-audio-player {
    padding: 20px;
  }

  .kla-audio-controls {
    gap: 8px;
  }

  .kla-audio-btn {
    min-width: 70px;
    padding: 12px 14px;
  }

  .kla-audio-btn svg {
    width: 24px;
    height: 24px;
  }

  .kla-audio-btn span {
    font-size: 12px;
  }
}
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.setAttribute('data-source', 'korean-learning-assistant');
  style.textContent = css;
  document.head.appendChild(style);
}

export default css;
