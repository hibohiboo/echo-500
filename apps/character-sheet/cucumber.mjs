export default {
  paths: ['**/features/*.feature'],
  import: ['**/steps/*.steps.ts'],
  loader: ['ts-node/esm'],
  format: [
    'summary',
    'progress-bar',
    'html:./dist/cucumber-report/index.html',
  ],
};
