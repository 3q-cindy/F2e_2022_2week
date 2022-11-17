import { ref } from "vue";

window.URL = window.URL || window.webkitURL;

// 讀取 image 資料
function useImageFilePreview(file) {
  return window.URL.createObjectURL(file);
}

// 本地預覽
function useQueuePreview(fileArr) {
  // 多檔案表示
  const previewMap = {};

  // 排序索引
  let idx = 0;
  for (const file of fileArr) {
    const fileData = useImageFilePreview(file);
    previewMap[idx] = fileData;
    idx++;
  }

  return { previewMap };
}

export function useFileUpdate() {
  // 預覽用檔案
  const previewMap = ref({});

  // 初始化
  const initData = () => {
    previewMap.value = {};
  };

  // 選擇多個檔案
  const setFile = async (file = []) => {
    initData();
    previewMap.value = useQueuePreview(file);
    // console.log(previewMap.value);
  };

  return { setFile, previewMap };
}
