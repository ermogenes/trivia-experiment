<template>
  <div class="container" :style="{ width: width }">
    <div class="progress" :style="{ width: percentage, backgroundColor: color }">
      {{ showPercentage ? `${percentage}` : '' }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['width', 'percentage', 'color', 'showPercentage'],
};
</script>

<style lang="scss" scoped>
.container {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  height: 1em;
  justify-content: start !important;

  .progress {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--gauge);
    color: #fff;
    border-radius: 9999px;
  }
}
</style>
