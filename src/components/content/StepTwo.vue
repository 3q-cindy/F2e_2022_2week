<script setup>
import { ref, reactive } from "vue";
import ModelType from "@/components/content/ModelType.vue";
import ModelImage from "@/components/content/ModelImage.vue";
import ModelCanvas from "@/components/content/ModelCanvas.vue";

const image_data = reactive({
  A123344: {
    file: "data:image/jpeg;base64,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",
  },
});
// -------------DELE----------------- //
const dele_modal = ref(0);
const dele_id = ref(0);
const dele_content = {
  text: {
    content: "是否確定要刪除該簽名?",
    cancel: "取消",
    ok: "刪除",
  },
  funcCancel: function () {
    dele_modal.value = 0;
  },
  funcOk: () => {
    delete image_data[dele_id.value];
    dele_modal.value = 0;
  },
};
const deleImage = (delId) => {
  dele_id.value = delId;
  dele_modal.value = 1;
};
// -------------UPIMG---------------- //
const img_model = ref(0);
const imgOpen = () => {
  img_model.value = 1;
};
const imgCancel = () => {
  img_model.value = 0;
};
const imgAdd = (res) => {
  image_data[res.data] = {
    file: res.data,
  };
  img_model.value = 0;
};
const can_model = ref(0);
const canOpen = () => {
  can_model.value = 1;
};
const canCancel = () => {
  can_model.value = 0;
};
const canAdd = (res) => {
  image_data[res.data] = {
    file: res.data,
  };
  can_model.value = 0;
};
</script >
<template>
  <!-------Delete Model---------->
  <ModelType
    v-show="dele_modal"
    :text="dele_content.text"
    :funcCancel="dele_content.funcCancel"
    :funcOk="dele_content.funcOk"
  />
  <!----------------------------->
  <ModelImage
    v-if="img_model === 1"
    :imgCancel="imgCancel"
    @imgSelect="imgAdd"
  />
  <ModelCanvas
    v-if="can_model === 1"
    :canCancel="canCancel"
    @canSelect="canAdd"
  />

  <!----------------------------->
  <div class="full-container">
    <div class="method-bar">
      <div class="title-text">
        <h4>文件名稱</h4>
        <input type="text" placeholder="請輸入文件名稱" />
      </div>
      <div class="image-area">
        <h4>我的簽名</h4>
        <div
          class="image"
          v-show="image_data !== []"
          v-for="(img, idx) in image_data"
          :key="idx"
        >
          <img :src="img.file" alt="簽名" />
          <button type="button" class="dele" @click="deleImage(idx)">
            <img src="@/assets/del_icon.png" alt="刪除" />
          </button>
        </div>
        <button type="button" class="image ven-icon" @click="canOpen()">
          <span>創建簽名</span>
          <img class="icon" src="@/assets/vertor_icon.png" alt="創建簽名" />
        </button>
        <button type="button" class="image img-icon" @click="imgOpen()">
          <span>上傳圖片</span>
          <img class="icon" src="@/assets/img_icon.png" alt="上傳圖片" />
        </button>
      </div>
    </div>
    <div class="pdf-content">
    </div>
  </div>
</template>

<style scoped>
.full-container {
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
  box-sizing: border-box;
}
.method-bar {
  width: 20%;
  height: 100%;
  max-width: 400px;
  background: #fff;
  color: var(--darkgrey);
}
* {
  /* border: 1px solid red; */
}
h4 {
  font-size: 16px;
  margin: 0;
}
.title-text,
.image-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 25px;
}
.title-text {
  border-bottom: 1px solid var(--midgrey);
}
.title-text input {
  margin: 0;
  width: 100%;
  padding: 5px 2px;
  border: none;
  background: center right 8px no-repeat url("@/assets/pen_icon.png");
  background-size: 15px 15px;
}
.title-text input::placeholder {
  color: var(--darkgrey);
}
.title-text input:active,
.title-text input:focus {
  border: none;
  outline: none;
}
.image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--darkgrey);
  width: 100%;
  height: 60px;
  background: #fff;
  color: var(--darkgrey);
}
.image .dele {
  position: absolute;
  top: calc(50% - 10px);
  right: 17px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
.dele > img {
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
}
.image > img {
  height: 60px;
}
.image span {
  font-size: 15px;
}
.image img.icon {
  height: 17px;
  width: 17px;
  margin-left: 5px;
}
</style>