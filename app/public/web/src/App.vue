<template>
  <div class="container">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/money" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/personal" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<style scoped>
  .container {
    min-height: 100vh;
  }
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
  color: #333;
}
</style>
