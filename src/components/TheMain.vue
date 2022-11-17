<script setup>
import FooterBar from "@/components/FooterBar.vue"
import StepOne from "@/components/content/StepOne.vue"
import StepTwo from "@/components/content/StepTwo.vue"
import { reactive, ref } from 'vue'

const foot_step = ref(1);
// FOOTER
const foot_fun = () => {
  let a = 1;
  return a++;
};
// STEPS ONE
const data_current = {
        name: "",
        file: "",
        addtime: "",
        uptime: "",
      };
const data_list = reactive([
      {
        name: "廠商合約",
        file: "asdasdadsaxasz",
        addtime: "2022/10/20 23:45",
        uptime: "2022/10/30 23:45",
        select: true,
      },
    ]);
const dataChange = (e) => {
  // 上傳新的資料
  console.log('偶是上傳檔案', e);
};
const dataSelect = (files) => {
  // 選擇既有的資料
  // let datas = data_list;
  data_list.map(item => {
    if(item.file === files){
      item.select = true;
    }else{
      item.select = false;
    }
  });
  // data_list = datas;
};
// STEPS TWO
const current_pdf = {};
// const image_data = reactive([{
//   id: "123123",
//   file: "123123",
// }]);

</script>
<template>
  <!-- <div class="content"> -->
    <StepOne v-if="foot_step < 2" 
             @dataChange="dataChange()" 
             :dataSelect="dataSelect()"
             :data_list="data_list" />
    <StepTwo />
    <FooterBar :foot_step="foot_step" 
               :foot_fun="foot_fun" />
  <!-- </div> -->
</template>
