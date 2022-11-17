<script setup>
import TheMain from '@/components/TheMain.vue'
</script>

<template>
  <div class="main">
    <TheMain />
  </div>
</template>

<style scoped>

.main {
  position: relative;
  width: 100%;
  height: calc(100vh - 55px);
  background-color: var(--midgrey);
  box-sizing: border-box;
}
</style>

