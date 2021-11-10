<template>
  <a class="secondary" @click.prevent="$emit('homeClick')">{{ text || '◀' }}</a>
</template>

<script>
export default {
  props: ['text'],
};
</script>

<style lang="scss" scoped></style>
