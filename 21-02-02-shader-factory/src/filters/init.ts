import * as dat from 'dat.gui';

function initFilterGui() {
  this.addFilter('AdjustmentFilter', {
    oncreate(folder: dat.GUI) {
      folder.add(this, 'gamma', 0, 5);
      folder.add(this, 'saturation', 0, 5);
      folder.add(this, 'contrast', 0, 5);
      folder.add(this, 'brightness', 0, 5);
      folder.add(this, 'red', 0, 5);
      folder.add(this, 'green', 0, 5);
      folder.add(this, 'blue', 0, 5);
      folder.add(this, 'alpha', 0, 1);
    },
  });

  this.addFilter('LutFilter', {
    enabled: false,
    oncreate() {
    },
  });
}

export default initFilterGui;
