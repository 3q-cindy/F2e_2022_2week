<script setup>
import { ref, reactive } from "vue";
import { useFileUpdate } from "@/components/component-api/useFileUpdate.js";
const emits = defineEmits(["imgSelect"]);
const { setFile, previewMap } = useFileUpdate();
const props = defineProps({
  imgCancel: {
    type: Function,
    // required: true,
  },
});

const inputDOM = ref(null);
const image_data = reactive({
  time: "",
  data: "",
});

const fileChange = (e) => {
  setFile(e.target.files);
  image_data.time = Date.parse(new Date());
  image_data.data = previewMap.value[0];
  // console.log(e.target.files)
  // console.log(image_data);
};
const clearFile = () => {
  image_data.time = "";
  image_data.data = "";
};
const handleData = () => {
  emits('imgSelect', image_data);
};
// DRAG...
</script>

<template>
  <div class="model-bg">
    <div class="model-card">
      <div class="model-header">上傳簽名圖檔</div>
      <div class="model-body">
        <label id="uploadArea" for="upload_zone" class="upload_area">
          <div class="preview" v-if="image_data.data">
            <img :src="image_data.data" alt="簽名檔案" />
          </div>
          <input
            id="upload_zone"
            ref="inputDOM"
            type="file"
            @change="fileChange"
          />
          <span>點擊此處上傳 或 直接拖曳檔案</span>
          <img src="@/assets/img_icon.svg" alt="上傳圖片" />
          <span>(限10MB以下JPG、PNG圖檔)</span>
        </label>
      </div>
      <div class="body-footer">
        <button type="button" class="sed-link" @click="clearFile">清除</button>
        <div class="btn-groups right">
          <button type="button" @click="props.imgCancel" class="btn-white">
            取消
          </button>
          <button
            type="button"
            @click="handleData"
            :class="{ 'btn-green': true, disabled: image_data.data === '' }"
          >
            使用圖檔
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
  margin: auto;
  width: 830px;
  height: auto;
  background: #fff;
  border-radius: 35px;
  padding: 15px;
}
.model-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: 16px;
  color: var(--darkgrey);
  padding: 0 8px;
}
#upload_zone {
  display: none;
}
.upload_area {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 260px;
  border: 3px dashed #ddd;
  border-radius: 35px;
  box-sizing: border-box;
  font-size: 16px;
  color: var(--darkgrey);
}
.upload_area .preview {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.upload_area .preview img {
  height: 100%;
  margin: auto;
  width: auto;
}

.upload_area img {
  width: 100px;
}
.model-header {
  text-align: center;
  font-size: 16px;
  color: var(--darkgrey);
}
.body-footer {
  display: flex;
  width: 100%;
  box-sizing: border-box;
}
.body-footer .right {
  margin-left: auto;
}
.sed-link {
  margin-left: 15px;
  line-height: 40px;
  background: transparent;
  border: none;
  outline: none;
}
</style>