<template>
  <header>
    <span v-if="difficulty == 'easy'">😋 {{ category }}</span>
    <span v-else-if="difficulty == 'medium'">🙄 {{ category }}</span>
    <span v-else>😫 {{ category }}</span>
  </header>
  <section class="question" lang="en">
    <h2><slot></slot></h2>
  </section>
  <section class="translation" lang="pt-BR" v-if="translation">{{ translation }}</section>
  <footer>
    <a class="secondary small" v-if="canUseHelp" @click.prevent="$emit('help')">🙌🏼</a>
    <a class="secondary small" v-if="canUseJump" @click.prevent="$emit('jump')">🦘</a>
    <a class="secondary small" v-if="canUseTranslation" @click.prevent="$emit('translate')">👩🏼‍🏫</a>
    <a class="true" @click.prevent="$emit('answer', true)">👍🏼</a>
    <a class="false" @click.prevent="$emit('answer', false)">👎🏼</a>
  </footer>
</template>

<script>
export default {
  props: ['translation', 'difficulty', 'category', 'canUseHelp', 'canUseJump', 'canUseTranslation'],
  emits: ['answer', 'help', 'jump', 'translate'],
};
</script>

<style lang="scss" scoped>
section.question {
  flex: 3;
  padding: 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    text-align: center;
  }
}

section.translation {
  flex: 1;
  padding: 0 2rem;
  text-align: center;
}
</style>
