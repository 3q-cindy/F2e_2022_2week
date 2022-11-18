<script setup>
import { ref, reactive } from "vue";
import { readPdf } from "@/components/component-api/usePdf.js";

const props = defineProps({
  dataSelect: {
    type: Function,
    // required: true,
  },
  dataChange: {
    type: Function,
  },
  data_list: {
    type: Array,
    default: [
      {
        name: "廠商合約",
        file: "asdasdadsaxasz",
        addtime: "2022/10/20 23:45",
        uptime: "2022/10/30 23:45",
        select: true,
      },
    ],
  },
});
const update_canvas = ref(true);
const update_pdf = reactive(null);
const dataChangeEvent = (e) => {
  let file = event.target.files[0];
  readPdf(file, "#updatePdf");
  update_canvas.value = false;
  props.dataChange(e);
};
const page_type = ref(1);
const handleChangePage = (number) => {
  page_type.value = number;
  return;
};
const pdf_data = reactive(props.data_list);
</script>

<template>
  <div class="container card-grid">
    <div class="card-body">
      <div class="card-btns">
        <button type="button" data-page="1" @click="handleChangePage(1)" :class="{ active: page_type === 1 }">
          上傳新文件
        </button>
        <button type="button" data-page="2" @click="handleChangePage(2)" :class="{ active: page_type === 2 }">
          選擇已上傳文件
        </button>
      </div>
      <div class="card-majors">
        <div :class="{ 'card-sub': true, active: page_type === 1 }" data-page="1">
          <label for="file-pdf" class="d-flex-between">
            <input type="file" id="file-pdf" accept=".pdf" single class="input-update"
              @change="dataChangeEvent($event)" />
            <span>點擊此處上傳 或 直接拖曳檔案</span>
            <div class="icon">
              <img src="@/assets/pdf_icon.svg" alt="pdf上傳" />
            </div>
            <span>限10MB以下PDF檔</span>
            <canvas id="updatePdf" :class="{'none': update_canvas.value}"></canvas>
          </label>
        </div>
        <div :class="{ 'card-sub': true, active: page_type === 2 }" data-page="2">
          <input type="text" class="search" placeholder="搜尋文件名稱" />
          <table class="table">
            <thead>
              <tr>
                <th>名稱</th>
                <th>上傳時間</th>
                <th>上次開啟</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pdf_data" :key="item.file" @click="props.dataSelect(item.file)"
                :class="{ active: item.select }">
                <td>{{ item.name }}</td>
                <td>{{ item.addtime }}</td>
                <td>{{ item.uptime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-grid {
  display: flex;
  align-items: center;
  height: calc(100% - 100px);
  box-sizing: border-box;
}

.card-body {
  background: #fff;
  border-radius: 35px;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
}

.card-btns {
  display: flex;
  height: 60px;
  overflow: hidden;
  background: var(--lightmain);
}

.card-btns button {
  width: 50%;
  height: 60px;
  border: none;
  color: var(--secondary);
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  background: transparent;
  cursor: pointer;
}

.card-btns button.active {
  background: #fff;
  color: var(--primary);
  box-shadow: 0 4px 4px var(--midgrey);
}

/* -------------------------------- */
.card-majors {
  display: flex;
  padding: 50px;
  height: calc(100% - 60px);
  box-sizing: border-box;
}

.card-sub {
  display: none;
  opacity: 0;
  width: 100%;
}

.card-sub.active {
  display: unset;
  opacity: 1;
}

.card-sub[data-page="1"] {
  width: 100%;
  height: 100%;
  border: 6px dashed #ddd;
  border-radius: 35px;
  box-sizing: border-box;
}

.card-sub[data-page="1"] label {
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  transform: translate(-3px, -3px);
  background: #fff;
  border-radius: 34px;
  box-sizing: border-box;
  transition: all 0.2s ease-in;
}
canvas.none{
  display: none;
  opacity: 0;
  
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.card-sub[data-page="1"] label .icon {
  width: 60px;
  height: 60px;
}

label .icon img {
  width: 100%;
}

.card-sub[data-page="1"] label span {
  font-size: 20px;
  color: var(--dark);
}

.card-sub[data-page="1"] label:hover {
  background: var(--lightmain);
}

#file-pdf {
  display: none;
}

/* ================================ */
.search {
  width: 100%;
  border: 1px solid var(--darkgrey);
  border-radius: 30px;
  line-height: 30px;
  padding: 5px 15px;
  height: 40px;
  box-sizing: border-box;
  background-image: url("@/assets/step1_icon.png");
  background-repeat: no-repeat;
  background-position: center right 20px;
  background-size: 20px 20px;
}

.search::placeholder {
  color: #d9d9d9;
}

.table {
  margin: 15px 0;
  width: 100%;
  color: var(--darkgrey);
  text-align: left;
  background: transparent;
  border-spacing: 0;
}

.table tr.active {
  z-index: -1;
  width: 100%;
  background: var(--lightmain);
}

.table td,
.table th {
  font-size: 14px;
  font-weight: 300;
  padding: 0 20px;
  height: 50px;
}

.table td:first-child,
.table th:first-child {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}

.table td:last-child,
.table th:last-child {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

tr td:first-child,
tr th:first-child {
  width: 45%;
}
</style>