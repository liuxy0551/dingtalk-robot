<template>
  <div class="container">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/money" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/personal" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { getDevice, changeStyle, appInfo } from '@/utils'
  import { onMounted } from 'vue'

  export default {
    setup() {
      onMounted(() => {
        appInfo()
        if (getDevice() === 'pc') {
          changeStyle()
          // 调试时改变 Element 的尺寸也能保持样式
          window.addEventListener('resize', () => {
            changeStyle()
          })
        }
      })
    }
  }
</script>

<style scoped>
  .container {
    height: 100%;
    overflow: auto;
  }
</style>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fff;
    font-size: 20px;
    color: #333;
    height: 100%;
  }
</style>
