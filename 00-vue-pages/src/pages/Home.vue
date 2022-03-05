<template>
  <div class="home">
    <ul>
      <li v-for="route in allRoute" :key="route.name">
        <a @click="routeTo(route.name)">{{route.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import router from '../router';

@Options({
  components: {
  },
})
export default class HomeView extends Vue {
  get allRoute() {
    return router.options.routes;
  }

  routeTo(name: string) {
    this.$router.push({
      name,
    });
  }
}
</script>
