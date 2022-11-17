<script setup>
import { ref, reactive, onMounted } from "vue";
import { useFileUpdate } from "@/components/component-api/useFileUpdate.js";

const emits = defineEmits(["canSelect"]);
const props = defineProps({
  canCancel: {
    type: Function,
    // required: true,
  },
});

const inputDOM = ref(null);
const image_data = reactive({
  time: "",
  data: "",
});

const handleData = () => {
  emits("canSelect", image_data);
};

const canvas_empty = ref();
const canvas_node = ref();
const canvas_start = ref(false);
const canvas_color = reactive(["#000000", "#0038A6", "#FF0000"]);

onMounted(() => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const clearBtn = document.querySelector(".clear");
  const colorBtns = document.querySelectorAll("[data-color]");
  // 初始值設定
  canvas_empty.value = canvas.toDataURL();
  canvas_node.value = document.querySelector("#canvas");
  // 設定線條的相關數值
  ctx.lineWidth = 2;
  ctx.strokeStyle = canvas_color[0];
  ctx.lineCap = "round";

  // 設置狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
  let isPainting = false;

  // 取得滑鼠 / 手指在畫布上的位置
  function getPaintPosition(e) {
    const canvasSize = canvas.getBoundingClientRect();

    if (e.type === "mousemove") {
      return {
        x: e.clientX - canvasSize.left,
        y: e.clientY - canvasSize.top,
      };
    } else {
      return {
        x: e.touches[0].clientX - canvasSize.left,
        y: e.touches[0].clientY - canvasSize.top,
      };
    }
  }

  // 開始繪圖時，將狀態開啟
  function startPosition(e) {
    e.preventDefault();
    isPainting = true;
  }

  // 結束繪圖時，將狀態關閉，並產生新路徑
  function finishedPosition() {
    isPainting = false;
    ctx.beginPath();
    const newImg = canvas.toDataURL("image/png");
    image_data.data = newImg;
    image_data.time = Date.parse(new Date());
    if (canvas_empty.value !== image_data.data) {
      canvas_start.value = true;
    }
  }

  // 繪圖過程
  function draw(e) {
    // 滑鼠移動過程中，若非繪圖狀態，則跳出
    if (!isPainting) return;

    // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
    const paintPosition = getPaintPosition(e);

    // 移動滑鼠位置並產生圖案
    ctx.lineTo(paintPosition.x, paintPosition.y);
    ctx.stroke();
  }

  // 重新設定畫布
  function reset() {
    image_data.data = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas_start.value = false;
    console.log(image_data);
  }
  function changeColor(colorStyle) {
    ctx.strokeStyle = colosStyle;
  }

  // event listener 電腦板
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mouseleave", finishedPosition);
  canvas.addEventListener("mousemove", draw);

  // event listener 手機板
  canvas.addEventListener("touchstart", startPosition);
  canvas.addEventListener("touchend", finishedPosition);
  canvas.addEventListener("touchcancel", finishedPosition);
  canvas.addEventListener("touchmove", draw);

  clearBtn.addEventListener("click", reset);
  colorBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const color = e.target.dataset.color;
      ctx.strokeStyle = color;
    });
  });
});
</script>

<template>
  <div class="model-bg">
    <div class="model-card">
      <div class="model-header">在匡格內簽下大名</div>
      <div class="model-body">
        <label id="uploadArea" for="upload_zone" class="upload_area">
          <canvas id="canvas" width="800" height="250"></canvas>
        </label>
      </div>
      <div class="body-footer">
        <div class="groups">
          <button type="button" class="sed-link clear">清除</button>
          <button
            v-for="item in canvas_color"
            :key="item"
            type="button"
            :data-color="item"
            class="btn-color"
            :style="{ background: item }"
          ></button>
        </div>
        <div class="btn-groups right">
          <button type="button" class="btn-white" @click="props.canCancel">
            取消
          </button>
          <button
            type="button"
            @click="handleData"
            :class="{ 'btn-green': true, disabled: !canvas_start }"
          >
            簽好了
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
.groups {
  display: flex;
  gap: 10px;
}
.btn-color {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 2.5px solid #fff;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 6px;
}
</style>