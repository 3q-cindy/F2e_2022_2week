<script>
import { Ref, ref } from "vue";
import { useReadPDF, usePdfDownloader } from "@/components/component-api/usePdf.js";
import { fabric } from "fabric";

const { PdfReader } = useReadPDF();
const { downloadPDF } = usePdfDownloader();
</script>


<template></template>

<style scoped>
</style>