declare module "hover-effect" {
  export interface HoverEffectOptions {
    parent: HTMLElement;
    intensity?: number;
    speedIn?: number;
    speedOut?: number;
    easing?: string;
    hover?: boolean;
    image1: string;
    image2: string;
    displacementImage: string;
    /** height / width ratio of the images */
    imagesRatio?: number;
    autoplay?: boolean;
    autoplayDuration?: number;
    autoplayDelay?: number;
  }

  export default class HoverEffect {
    constructor(options: HoverEffectOptions);
    next(): void;
    previous(): void;
  }
}
