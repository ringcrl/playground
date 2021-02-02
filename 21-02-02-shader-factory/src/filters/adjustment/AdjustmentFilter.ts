import PIXI, { Filter } from 'pixi.js';

import vertex from '../vertex.vert';
import fragment from './adjustment.frag';

class AdjustmentFilter extends Filter {
  gamma: number;

  saturation: number;

  contrast: number;

  brightness: number;

  red: number;

  green: number;

  blue: number;

  alpha: number;

  constructor(options: {
    gamma?: number
    saturation?: number
    contrast?: number
    brightness?: number
    red?: number
    green?: number
    blue?: number
    alpha?: number
  }) {
    super(vertex, fragment);

    Object.assign(
      this,
      {
        gamma: 1,
        saturation: 1,
        contrast: 1,
        brightness: 1,
        red: 1,
        green: 1,
        blue: 1,
        alpha: 1,
      },
      options,
    );
  }

  apply(
    filterManager: PIXI.systems.FilterSystem,
    input: PIXI.RenderTexture,
    output: PIXI.RenderTexture,
    clearMode: PIXI.CLEAR_MODES,
  ) {
    this.uniforms.gamma = Math.max(this.gamma, 0.0001);
    this.uniforms.saturation = this.saturation;
    this.uniforms.contrast = this.contrast;
    this.uniforms.brightness = this.brightness;
    this.uniforms.red = this.red;
    this.uniforms.green = this.green;
    this.uniforms.blue = this.blue;
    this.uniforms.alpha = this.alpha;

    filterManager.applyFilter(this, input, output, clearMode);
  }
}

export { AdjustmentFilter };
