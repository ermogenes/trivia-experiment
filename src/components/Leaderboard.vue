<template>
  <h1>Leaderboard</h1>
  <main>placares</main>
  <HomeButton @homeClick="$emit('homeClick')" />
</template>

<script>
import HomeButton from './HomeButton.vue';

export default {
  emits: ['homeClick'],
  components: {
    HomeButton,
  },
};
</script>

<style scoped lang="scss"></style>
