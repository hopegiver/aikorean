import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

const isWatch = process.argv.includes('--watch');

// CSS를 JS 문자열로 변환하는 플러그인
const cssPlugin = {
  name: 'css',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await fs.promises.readFile(args.path, 'utf8');

      // CSS를 문자열로 변환하고 스타일 태그로 주입하는 코드 생성
      const contents = `
        const css = ${JSON.stringify(css)};
        if (typeof document !== 'undefined') {
          const style = document.createElement('style');
          style.textContent = css;
          document.head.appendChild(style);
        }
        export default css;
      `;

      return { contents, loader: 'js' };
    });
  },
};

const buildOptions = {
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/korean-learning-assistant.js',
  format: 'iife',
  globalName: 'KoreanLearningAssistant',
  plugins: [cssPlugin],
  minify: true,
  sourcemap: true,
  target: 'es2017',
  banner: {
    js: '/* Korean Learning Assistant v1.0.0 | MIT License */',
  },
  footer: {
    js: 'if (typeof window !== "undefined") { window.KoreanLearningAssistant = KoreanLearningAssistant.default || KoreanLearningAssistant; }',
  },
};

async function build() {
  try {
    if (isWatch) {
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      console.log('👀 Watching for changes...');
    } else {
      await esbuild.build(buildOptions);
      console.log('✅ Build completed successfully!');

      // 파일 크기 출력
      const stats = fs.statSync('dist/korean-learning-assistant.js');
      const sizeInKB = (stats.size / 1024).toFixed(2);
      console.log(`📦 Bundle size: ${sizeInKB} KB`);
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
