<template>
  <h1>Trivia XP</h1>
  <footer>by Ermogenes Palacio</footer>
  <div>
    <a class="secondary" @click.prevent="$emit('leaderboardClick')">🏆</a>
    <a @click.prevent="$emit('identificationClick')">▶</a>
  </div>
</template>

<script>
export default {
  emits: ['identificationClick', 'leaderboardClick'],
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 8rem;
  margin-top: 1.5rem;
}

footer {
  flex: 1;
}
</style>
