<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <div class="main d-flex-between">
    <div class="container d-flex-between">
      <div class="col-half"></div>
      <div class="col-half loadin">
        <div class="logo">
          <img src="@/assets/logo.png" alt="">
        </div>
        <RouterLink to="/main" class="btn">簽署新文件</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: calc(100vh - 55px);
  background-image: url("@/assets/home_bg.png");
  background-size: cover;
  background-position: center center;
  background-color: #f9f8f6;
}
.col-half {
  width: 50%;
}
.loadin{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
}
.logo{
  margin-bottom: 100px;
}
.logo img,
.logo{
  width: 100%;
}
.btn{
  width: 100%;
  line-height: 80px;
  background: var(--lightmain);
  box-shadow: 0 4px 4px rgba(0,0,0,.25);
  text-align: center;
  text-decoration: none;
  color: #000;
  transition: all .1s ease-in;
}
.btn:hover{
  background: var(--lightmain-hover);
}
</style>

