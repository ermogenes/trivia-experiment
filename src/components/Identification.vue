<template>
  <h1>Pode me chamar de...</h1>
  <main>
    <input
      ref="playerName"
      type="text"
      name="player"
      :value="modelValue"
      @input="changePlayer($event.target.value)"
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
  props: ['player', 'modelValue'],
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

    this.$refs.playerName.select();
  },
  methods: {
    changePlayer(player) {
      localStorage.triviaxp_player = player;
      this.$emit('update:modelValue', player);
    },
  },
};
</script>

<style scoped lang="scss"></style>
