<template>
  <div class="container">
    <router-view v-if="getDevice() === 'pc'" />
    
    <van-tabbar route v-if="getDevice() === 'pc'">
      <van-tabbar-item replace to="/money" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/personal" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { getDevice, changeStyle } from '@/utils/mixins'
  import { onMounted } from 'vue'
  import { Toast } from 'vant'

  export default {
    setup() {
      onMounted(() => {
        if (getDevice() === 'pc') {
          changeStyle()
          // 调试时改变 Element 的尺寸也能保持样式
          window.addEventListener('resize', () => {
            changeStyle()
          })
        } else {
          Toast({ message: '请在电脑端打开', duration: 0 })
        }
      })

      return {
        getDevice
      }
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
