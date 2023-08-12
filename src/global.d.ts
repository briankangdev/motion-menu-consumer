// global.d.ts

export {};

declare global {
  interface Window {
    onGoogleSignIn: (response: any) => void;
  }
}
