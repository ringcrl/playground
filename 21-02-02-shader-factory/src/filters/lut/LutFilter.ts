import { Filter, Loader, Texture } from 'pixi.js';
import * as PIXI from 'pixi.js';
import fragment from './lut.frag';
import vertex from '../vertex.vert';

const lutImage = require('./lut-image.png').default;

class LutFilter extends Filter {
  _lutTuxture: Texture;

  constructor() {
    super(vertex, fragment);
    const loader = new Loader();
    loader
      .add('lutImage', lutImage)
      .load((_loader, resources) => {
        this.lutTuxture = resources.lutImage.texture;
      });
  }

  set lutTuxture(lutTuxture: Texture) {
    lutTuxture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    lutTuxture.baseTexture.mipmap = PIXI.MIPMAP_MODES.OFF;

    this._lutTuxture = lutTuxture;
    this.uniforms.lut = lutTuxture;
  }

  apply(
    filterManager: PIXI.systems.FilterSystem,
    input: PIXI.RenderTexture,
    output: PIXI.RenderTexture,
    clearMode?: PIXI.CLEAR_MODES,
  ) {
    filterManager.applyFilter(this, input, output, clearMode);
  }

  destroy(destroyBase: boolean) {
    if (this._lutTuxture) {
      this._lutTuxture.destroy(destroyBase);
    }
  }
}

export { LutFilter };
