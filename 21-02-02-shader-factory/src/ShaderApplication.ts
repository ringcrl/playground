import {
  Application,
  settings,
  Container,
  Rectangle,
  Sprite,
  TilingSprite,
  utils,
  Texture,
  Filter,
  PRECISION,
  Ticker,
} from 'pixi.js';
import * as dat from 'dat.gui';
import * as filters from './filters';
import { IManifest } from './main';

const { EventEmitter } = utils;

export default class ShaderApplication extends Application {
  containerEl: HTMLElement;

  initWidth: number;

  initHeight: number;

  animating: boolean;

  rendering: boolean;

  gui: dat.GUI;

  events: utils.EventEmitter;

  animateTimer: number;

  pond: Container|null;

  bg: Sprite|null;

  overlay: TilingSprite|null;

  videoFilters: Filter[];

  filterArea: Rectangle;

  padding: number;

  bounds: Rectangle;

  videoEl: HTMLVideoElement;

  videoSprite: Sprite;

  playing: boolean;

  constructor() {
    const gui = new dat.GUI();
    gui.useLocalStorage = false;

    const containerEl = document.querySelector('#container') as HTMLElement;
    const initWidth = containerEl.offsetWidth;
    const initHeight = containerEl.offsetHeight;

    super({
      view: document.querySelector('#stage'),
      width: initWidth,
      height: initHeight,
      autoStart: false,
      backgroundColor: 0x000000,
    });

    this.containerEl = containerEl;

    settings.PRECISION_FRAGMENT = PRECISION.HIGH;

    this.initWidth = initWidth;
    this.initHeight = initHeight;
    this.animating = true;
    this.rendering = false;
    this.events = new EventEmitter();
    this.animateTimer = 0;
    this.bg = null;
    this.pond = null;
    this.videoFilters = [];
    this.filterArea = new Rectangle();
    this.padding = 100;
    this.bounds = new Rectangle(
      -this.padding,
      -this.padding,
      initWidth + this.padding * 2,
      initHeight + this.padding * 2,
    );

    const app = this;

    this.gui = gui;
    this.gui.add(this, 'rendering')
      .name('Play&Stop')
      .onChange((value) => {
        if (!value) {
          app.appStop();
        } else {
          app.appPlay();
        }
      });
  }

  load(manifest: IManifest, callback: Function) {
    this.loader.add(manifest).load(() => {
      callback();
      this.init();
    });
  }

  appPlay() {
    this.videoEl.play();
    this.addTicker();
    this.playing = true;
  }

  appStop() {
    if (this.playing) {
      this.playing = false;
      this.removeTicker();
      if (this.videoEl) {
        this.videoEl.pause();
      }
    }
  }

  addTicker() {
    Ticker.shared.add(this.update, this);
  }

  removeTicker() {
    Ticker.shared.remove(this.update, this);
  }

  update(delta: number) {
    this.animate(delta);
    this.renderer.render(this.stage);
  }

  init() {
    const { resources } = this.loader;
    const { initWidth, initHeight } = this;

    this.pond = new Container();
    this.stage.addChild(this.pond);

    this.bg = new Sprite(resources.background.texture);
    this.pond.addChild(this.bg);

    this.overlay = new TilingSprite(
      resources.overlay.texture,
      initWidth,
      initHeight,
    );
    this.pond.addChild(this.overlay);

    const videoSprite = this.initVideoSprite();
    this.pond.addChild(videoSprite);

    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  initVideoSprite() {
    const { resources } = this.loader;
    const video = resources.video.data;
    this.videoEl = video;
    const texture = Texture.from(video);
    video.loop = true;
    const videoSprite = Sprite.from(texture);
    const ratio = texture.baseTexture.width / texture.baseTexture.height;
    videoSprite.width = window.innerWidth / 2;
    videoSprite.height = videoSprite.width / ratio;
    videoSprite.x = window.innerWidth / 2;
    videoSprite.y = window.innerHeight / 2;
    videoSprite.anchor.set(0.5);
    this.videoSprite = videoSprite;
    this.videoSprite.filters = this.videoFilters;
    this.videoSprite.filters.forEach((filter: any) => { filter.applySprite = this.videoSprite; });
    return videoSprite;
  }

  handleResize() {
    const {
      padding, bg, overlay, filterArea, bounds,
    } = this;

    const width = this.containerEl.offsetWidth;
    const height = this.containerEl.offsetHeight;
    const filterAreaPadding = 0;

    const bgAspect = bg.texture.width / bg.texture.height;
    const winAspect = width / height;

    if (winAspect > bgAspect) {
      bg.width = width;
      bg.height = width / bgAspect;
    } else {
      bg.height = height;
      bg.width = height * bgAspect;
    }

    bg.x = (width - bg.width) / 2;
    bg.y = (height - bg.height) / 2;

    overlay.width = width;
    overlay.height = height;

    bounds.x = -padding;
    bounds.y = -padding;
    bounds.width = width + padding * 2;
    bounds.height = height + padding * 2;

    filterArea.x = filterAreaPadding;
    filterArea.y = filterAreaPadding;
    filterArea.width = width - filterAreaPadding * 2;
    filterArea.height = height - filterAreaPadding * 2;

    this.events.emit('resize', width, height);

    this.renderer.resize(width, height);
  }

  animate(delta: number) {
    this.animateTimer += delta;

    const { animateTimer, overlay } = this;

    this.events.emit('animate', delta, animateTimer);

    if (!this.animating) {
      return;
    }

    overlay.tilePosition.x = animateTimer * -1;
    overlay.tilePosition.y = animateTimer * -1;
  }

  addFilter(id: string, options: {
    name?: string
    id: string
    global: boolean
    args: any[]
    enabled: boolean
    opened: boolean
    oncreate: Function
  }) {
    options = {
      name: id,
      enabled: false,
      opened: false,
      args: null,
      global: false,
      oncreate: null,
      ...options,
    };

    if (options.global) {
      options.name += ' (pixi.js)';
    }

    const app = this;
    const folder = this.gui.addFolder(options.name);
    const ClassRef = (filters as any)[id];

    if (!ClassRef) {
      throw new Error(`Unable to find class name with "${id}"`);
    }

    let filter;
    if (options.args) {
      filter = new ClassRef(...options.args);
    } else {
      filter = new ClassRef({ applySprite: this.videoSprite });
    }

    filter.enabled = options.enabled;

    folder.add(filter, 'enabled').onChange((enabled) => {
      app.events.emit('enable', enabled);
      if (enabled) {
        folder.domElement.className += ' enabled';
      } else {
        folder.domElement.className = folder.domElement.className.replace(' enabled', '');
      }
    });

    if (options.opened) {
      folder.open();
    }

    if (options.enabled) {
      folder.domElement.className += ' enabled';
    }

    if (options.oncreate) {
      options.oncreate.call(filter, folder);
    }

    this.videoFilters.push(filter);

    return filter as Filter;
  }
}
