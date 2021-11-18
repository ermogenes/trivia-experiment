<template>
  <a class="secondary" @click.prevent="$emit('homeClick')">{{ text || '🏠' }}</a>
</template>

<script>
export default {
  props: ['text'],
  emits: ['homeClick'],
};
</script>

<style lang="scss" scoped></style>
