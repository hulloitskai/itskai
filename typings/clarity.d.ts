type Clarity = (...args: any[]) => void;

declare global {
  const clarity: Clarity | undefined;

  interface Window {
    clarity: Clarity | undefined;
  }
}

export {};
