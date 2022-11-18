
<script setup>
import { RouterLink, RouterView } from "vue-router";
const props = defineProps({
  foot_step: {
    type: Number,
    required: true
  },
  footStep: {
    type: Function,
    required: true
  },
  foor_con: {
    type: Function,
    default: function(){
      return false;
    }
  }
});
</script>

<template>
  <div class="footer-bar">
    <div class="container d-flex-between">
      <div class="step-group d-flex-between">
        <span :class="{'step': true, 'active': props.foot_step < 2}">上傳文件</span>
        <span :class="{'step': true, 'active': props.foot_step=== 2}">進行簽署</span>
        <span :class="{'step': true, 'active': props.foot_step=== 3}">下載文件</span>
      </div>
      <!---------------->
      <div class="btn-groups" v-if="props.foot_step < 3">
        <RouterLink to="/main" class="btn-white">取消 </RouterLink>
        <button type="button" v-if="props.foot_step !== 1 && props.foot_step !== 2" @click="props.footStep(2)"
                class="btn-green">開啟文件</button>
        <button type="button" v-if="props.foot_step === 1 || props.foot_step === 2"  @click="props.footStep(2)"
                :class="{'btn-green':true, 'disabled': props.foot_step == 1}">
            創建文件</button>
      </div>
      <div class="btn-groups" v-if="props.foot_step === 3">
        <RouterLink to="/main" class="btn-white">回首頁</RouterLink>
        <button type="button" class="btn-white">返回編輯</button>
        <button type="button" class="btn-green">下載文件</button>
      </div>
      <!---------------->
    </div>
  </div>
</template>

<style scoped>
.footer-bar{
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  height: 100px;
  width: 100%;
  background: var(--lightmain);
  box-sizing: border-box;
}
.step-group{
  display: flex;
  align-items: center;
  color: var(--darkgrey);
  font-weight: 400;
  width: 300px;
  padding: 0 0 30px 0;
  /* border: 1px solid red; */
}
.step{
  position: relative;
  width: 33.33%;
  color: var(--secondary);
}
.step.active{
  color: var(--primary);
}
.step.active ~ .step{
  color: var(--darkgrey);
}
.step:after{
  content: "";
  position: absolute;
  top: 25px;
  left: 15px;
  z-index: 3;
  width: 12px;
  height: 12px;
  border: 4px solid #fff;
  border-radius: 50%;
  box-shadow: 0px 4px 4px #EEEDE8;
}
.step:after{
  background: var(--secondary);
}
.step.active ~ .step:after{
  background: #fff;
}
.step.active::after{
  background: var(--primary);
}
.step+.step:before{
  content: '';
  position: absolute;
  top: 32px;
  left: calc(-100% + 30px);
  width: calc(100% - 5px);
  height: 3px;
  border: 2px solid #fff;
  box-shadow: 0px 4px 4px #EEEDE8;
  background-color: var(--secondary);
}
.step.active ~ .step:before{
  background: #fff;
}
.step+.step.active:before{
  background-color: var(--primary);
}
</style>