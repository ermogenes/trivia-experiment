<template>
  <Start
    v-if="state == 'home'"
    @leaderboardClick="state = 'leaderboard'"
    @identificationClick="state = 'identification'"
  />
  <Leaderboard v-if="state == 'leaderboard'" @homeClick="state = 'home'" />
  <Identification
    v-if="state == 'identification'"
    @homeClick="state = 'home'"
    v-model="player"
    @gameClick="state = 'game'"
  />
  <Game v-if="state == 'game'" @homeClick="state = 'home'" :player="player" />
</template>

<script>
import '@/assets/global.scss';

import Start from './components/Start.vue';
import Leaderboard from './components/Leaderboard.vue';
import Identification from './components/Identification.vue';
import Game from './components/Game.vue';

export default {
  name: 'App',
  components: {
    Start,
    Leaderboard,
    Identification,
    Game,
  },
  data() {
    return {
      state: 'home',
      player: 'p1',
    };
  },
};
</script>

<style lang="scss">
#app {
  border: 1px solid var(--bgc-alt-1);
  border-radius: 3px;
  box-shadow: 15px 15px 0px 0px var(--bgc-alt-1);
  box-sizing: border-box;
  padding: 2rem;

  width: 50rem;
  min-height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
}
</style>
