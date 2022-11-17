<script setup>
const props = defineProps({
  text: {
    type: Object,
    default: {
      content: "",
      cancel: "",
      ok: "",
    },
  },
  funcCancel: {
    type: Function,
  },
  funcOk: {
    type: Function,
  },
});
</script>

<template>
  <div class="model-bg">
    <div class="model-card">
      <div class="model-body">
        <div>{{ props.text.content }}</div>
      </div>
      <div class="body-footer">
        <div class="btn-groups right">
          <button
            v-if="props.text.cancel !== ''"
            type="button" 
            @click="props.funcCancel()"
            class="btn-white"
          >
            {{ props.text.cancel }}
          </button>
          <button
            v-if="props.text.ok !== ''"
            type="button"
            @click="props.funcOk()"
            class="btn-green"
          >
            {{ props.text.ok }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.model-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: rgba(0, 0, 0, 0.2);
}
.model-bg > .model-card {
  position: relative;
  margin: auto;
  width: 830px;
  height: auto;
  background: #fff;
  border-radius: 35px;
  padding: 20px;
}
.model-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: 16px;
  color: var(--darkgrey);
}
.body-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.body-footer .right {
  margin-left: auto;
}
</style>