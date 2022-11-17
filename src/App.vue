<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="container d-flex-between">
      <RouterLink to="/" class="logo"><img src="@/assets/logo2.png" alt="點點簽"></RouterLink>
      <nav>
        <a href="javascript:;" class="sed-link disabled">邀請他人簽署</a>
        <a href="javascript:;" class="sed-link disabled">簽署新文件</a>
        <a href="javscript:;" class="sed-link disabled">登入</a>
      </nav>
    </div>
  </header>
  <RouterView />

</template>

<style scoped>
  header{
    width: 100%;
    height: 55px;
    background: var(--lightmain);
    /* background: #fffaf4; */
    box-sizing: border-box;
    padding: 15px 0;
  }
  header .logo{
    height: 25px;
    aspect-ratio: 4;
  }
  .logo>img{
    width: 100%;
  }
  nav{
    display: flex;
    gap: 30px
  }
  nav a{
    text-decoration: none;
  }
</style>