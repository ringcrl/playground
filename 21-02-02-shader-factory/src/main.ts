import './assets/css/index.css';

import ShaderApplication from './ShaderApplication';
import init from './filters/init';

interface IManifestItem {
  name: string;
  url: string;
}

export type IManifest = IManifestItem[];

const app = new ShaderApplication();
const manifest: IManifest = [
  { name: 'overlay', url: require('./assets/images/overlay.png').default },
  { name: 'background', url: require('./assets/images/black.jpg').default },
  { name: 'video', url: require('./assets/videos/video01.mp4').default },
];

app.load(manifest, () => {
  init.call(app);
});
