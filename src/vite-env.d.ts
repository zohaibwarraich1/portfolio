/// <reference types="vite/client" />

declare module 'gsap/SplitText' {
  export class SplitText {
    constructor(target: any, vars?: any);
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }
}

declare module 'gsap/ScrollSmoother' {
  export class ScrollSmoother {
    static create(vars?: any): ScrollSmoother;
    static get(): ScrollSmoother;
    static refresh(safe?: boolean): void;
    scrollTo(target: any, smooth?: boolean, position?: string): void;
    scrollTop(value?: number): number;
    progress(): number;
    paused(value?: boolean): boolean;
    kill(): void;
  }
}
