<template>
  <h1>Aqui vai o jogo</h1>
  <main>jog jogo jog jogo</main>
  <div>😎 {{ this.player }}</div>
  <HomeButton @homeClick="$emit('homeClick')" />
</template>

<script>
import HomeButton from './HomeButton.vue';

export default {
  emits: ['homeClick'],
  props: ['player'],
  components: {
    HomeButton,
  },
};
</script>

<style lang="scss" scoped></style>
