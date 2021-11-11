<template>
  <div class="root">
    <span class="player">{{ player }}</span>
    <div class="score">
      <span>🍬 {{ points }}</span>
      <span>💚 {{ lifes }}</span>
    </div>
    <span>🙌🏼 {{ helps }}</span>
    <Gauge :width="gaugeWidth" :percentage="nextHelp" :color="helpsColor" />
    <span>🦘 {{ jumps }}</span>
    <Gauge :width="gaugeWidth" :percentage="nextJump" :color="jumpsColor" />
    <span>👩🏼‍🏫 {{ translations }}</span>
    <Gauge :width="gaugeWidth" :percentage="nextTranslation" :color="translationsColor" />
  </div>
</template>

<script>
import Gauge from './Gauge.vue';

export default {
  components: {
    Gauge,
  },
  props: [
    'player',
    'lifes',
    'points',
    'helps',
    'jumps',
    'translations',
    'nextHelp',
    'nextJump',
    'nextTranslation',
  ],
  data() {
    return {
      gaugeWidth: '100%',
      helpsColor: '',
      jumpsColor: '',
      translationsColor: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  & > * {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .player,
  .score {
    font-weight: bold;
    border-bottom: 1px solid var(--bgc-alt-1);
  }
  .score {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
