<template>
  <h1>Pode me chamar de...</h1>
  <main>
    <input
      ref="playerName"
      type="text"
      name="player"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </main>
  <div>
    <HomeButton @homeClick="$emit('homeClick')" />
    <a @click="$emit('gameClick')">▶</a>
  </div>
</template>

<script>
import HomeButton from './HomeButton.vue';

export default {
  props: ['modelValue'],
  emits: ['update:modelValue', 'homeClick', 'gameClick'],
  components: {
    HomeButton,
  },
  mounted() {
    this.$refs.playerName.select();
  },
};
</script>

<style scoped lang="scss"></style>
