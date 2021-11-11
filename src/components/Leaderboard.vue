<template>
  <h1>Leaderboard</h1>
  <main>
    <div class="score" v-for="score in board" :key="score">
      <div class="player">{{ score.player }}</div>
      <div class="points">{{ score.points }}</div>
    </div>
  </main>
  <HomeButton @homeClick="$emit('homeClick')" />
</template>

<script>
import HomeButton from './HomeButton.vue';

export default {
  emits: ['homeClick'],
  props: ['board'],
  components: {
    HomeButton,
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  .score {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 5em;

    & > * {
      flex: 1;
      text-align: center;
    }

    .player {
      font-weight: bold;
    }
  }
}
</style>
