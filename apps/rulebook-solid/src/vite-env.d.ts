/// <reference types="vite/client" />

declare const BASE_PATH: string;

declare module '*.css' {
  const content: string;
  export default content;
}
