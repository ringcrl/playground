// Load in dependencies
const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const cacheDir = path.resolve(__dirname, './cache');
let sprites = fs.readdirSync(path.resolve(__dirname, './cache'));
sprites = sprites.map((spriteName) => path.resolve(cacheDir, spriteName));

// Generate our spritesheet
// const sprites = ['fork.png', 'github.png', 'twitter.png'];
Spritesmith.run({ src: sprites, algorithm: 'top-down' }, (err, result) => {
  result.image; // Buffer representation of image
  result.coordinates; // Object mapping filename to {x, y, width, height} of image
  result.properties; // Object with metadata about spritesheet {width, height}
  fs.writeFileSync(`${__dirname}/sprite.png`, result.image);
});
