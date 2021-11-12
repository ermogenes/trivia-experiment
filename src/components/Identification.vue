<template>
  <h1>Pode me chamar de...</h1>
  <main>
    <input ref="playerName" type="text" name="player" :value="modelValue" @input="changePlayer" />
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
    const previousPlayer = localStorage.triviaxp_player;
    if (!previousPlayer) {
      localStorage.triviaxp_player = this.$refs.playerName.value;
    } else {
      this.$refs.playerName.value = previousPlayer;
    }
    this.$emit('update:modelValue', this.$refs.playerName.value);
    this.$refs.playerName.select();
  },
  methods: {
    changePlayer(e) {
      localStorage.triviaxp_player = e.target.value;
      this.$emit('update:modelValue', e.target.value);
    },
  },
};
</script>

<style scoped lang="scss"></style>
