<template>
  <div>
    <h1>Pag 测试</h1>
    <canvas class="canvas" id="pag"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { PAGInit } from 'libpag';

@Options({
  components: {
  },
})
export default class HomeView extends Vue {
  mounted() {
    PAGInit({
      locateFile: (file: string) => `//libs.com/${file}`,
    }).then((PAG: any) => {
      const url = './static/kuailejiaqi.pag';
      fetch(url)
        .then((response) => response.blob())
        .then(async (blob) => {
          const file = new window.File([blob], url.replace(/(.*\/)*([^.]+)/i, '$2'));
          const pagFile = await PAG.PAGFile.load(file);
          const pagCanvas = document.getElementById('pag') as HTMLCanvasElement;
          pagCanvas.width = pagFile.width();
          pagCanvas.height = pagFile.height();
          const pagView = await PAG.PAGView.init(pagFile, '#pag');
          pagView.setRepeatCount(0);
          await pagView.play();
        });
    });
  }
}
</script>
