<template>
  <h1>Tutorial</h1>
  <section>
    <ul>
      <li>Responda com 👍🏼 Verdadeiro ou 👎🏼 Falso</li>
      <li>Acerte para ganhar 🍬 pontuação</li>
      <li>Erre e perca 💚 vidas</li>
    </ul>
    <ul>
      <li>Peça 🙌🏼 ajuda (mas não confie 100%)</li>
      <li>🦘 Pule para não perder vidas</li>
      <li>Use 👩🏼‍🏫 para traduzir a questão</li>
    </ul>
  </section>
  <div>
    <HomeButton @homeClick="$emit('homeClick')" />
    <a @click="$emit('startGame')">▶</a>
  </div>
</template>

<script>
import HomeButton from './HomeButton.vue';

export default {
  emits: ['homeClick', 'startGame'],
  components: {
    HomeButton,
  },
};
</script>

<style lang="scss" scoped>
section {
  font-size: 0.8em;
  display: flex;
}
ul {
  margin: 1em 0;
  list-style-type: '✔ ';

  li {
    margin: 0 1em;
  }
}
</style>
