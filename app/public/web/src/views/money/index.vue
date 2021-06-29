<template>
  <div class="money-content">
    <div class="top-search">
      <van-tabs type="card" v-model="tabSelected" @change="onChange">
        <van-tab v-for="item in tabList" :key="item.value" :title="item.label" :name="item.value" />
      </van-tabs>
      <van-search v-model="keyword" placeholder="请输入简称/拼音/代码" @search="onSearch" />
    </div>

    <div class="box">
      <div class="item" v-for="item in result" :key="item.code">
        <div class="row" v-if="item.code && item.name">
          <div class="text">{{ item.code }} - {{ item.name }}</div>
          <van-button type="primary" size="mini" :loading="item.loading" @click="createMoneyInfo(item)">添加自选</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue'
  import { useRoute } from 'vue-router'
  import { Toast } from 'vant'
  import axios from '@/utils/axios'

  export default {
    setup() {
      const route = useRoute()
      const { senderId } = route.query
      const callbackName = 'callbackCode'
      const state = reactive({
        tabSelected: 'jijin',
        tabList: [
          { label: '基金', value: 'jijin' }, { label: '股票', value: 'gupiao' }
        ],
        keyword: '',
        result: []
      })

      onMounted(() => {
        // console.log('senderId', senderId)
      })

      const onChange = (val) => {
        state.keyword = ''
        state.result = []
        state.tabSelected = val
      }

      const onSearch = (val) => {
        axios.get(`http://suggest3.sinajs.cn/suggest/key=${ val }&name=${ callbackName }`).then(res => {
          let list = []
          res.split(';').forEach(item => {
            item = item.split(',')
            list.push({
              code: item[state.tabSelected === "jijin" ? 2 : 3],
              name: item[6],
              loading: false
            })
          })
          state.result = list
        })
      }

      // 添加自选
      const createMoneyInfo = (item) => {
        item.loading = true
        const params = {
          senderId,
          type: state.tabSelected,
          name: item.name,
          code: item.code
        }
        axios.post('/api/createMoneyInfo', params).then(res => {
          console.log(222, res)
        })

        setTimeout(() => {
          Toast('添加成功')
          item.loading = false
        }, 500)
      }

      return {
        ...toRefs(state),
        onChange,
        onSearch,
        createMoneyInfo
      }
    }
  }
</script>

<style scoped>
  .money-content {
    /* padding: 20px 0; */
  }
  
  .top-search {
    width: 100%;
    padding-top: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0px rgba(6,14,26,0.08);
    position: fixed;
    z-index: 1;
  }

  .box {
    padding: 110px 20px 60px;
  }
  .item {
  }
  .row {
    font-size: 14px;
    padding: 4px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .text {
    max-width: 252px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .van-button {
    width: 70px;
  }
</style>
