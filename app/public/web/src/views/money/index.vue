<template>
  <div class="money-content">
    <div class="top-search">
      <van-search v-model="keyword" placeholder="请输入简称/拼音/代码" @search="onSearch" @update:model-value="onSearch" />
    </div>

    <div class="box">
      <div class="item" v-for="item in result" :key="item.code">
        <div class="row" v-if="item.code && item.name">
          <div class="text">{{ item.code }} - {{ item.name }}</div>
          <van-button type="primary" size="mini" :loading="item.loading" @click="showConfirm(item)" v-if="!item.selected">添加自选</van-button>
          <van-button type="warning" size="mini" :loading="item.loading" @click="deleteMoneyInfo(item)" v-else>删除自选</van-button>
        </div>
      </div>
    </div>

    <van-action-sheet v-model:show="typeConfirmVisible" :actions="typeActions" cancel-text="取消"
      close-on-click-action @select="createMoneyInfo" title="选择理财类型" />
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue'
  import axios from '@/utils/axios'
  import { Toast } from 'vant'

  export default {
    setup() {
      const senderId = localStorage.getItem('senderId')
      const moneyInfoCodes = localStorage.getItem('moneyInfoCodes')
      const callbackName = 'callbackCode'
      const state = reactive({
        typeConfirmVisible: false,
        typeActions: [
          { name: '基金', value: 'jijin' }, // , color: '#ff0000'
          { name: '股票', value: 'gupiao' }
        ],
        moneyInfo: null,
        keyword: '',
        result: [],
        moneyInfoCodeList: []
      })

      onMounted(() => {
        moneyInfoCodes && (state.moneyInfoCodeList = moneyInfoCodes.split(','))
      })

      const onSearch = (val) => {
        axios.get(`https://suggest3.sinajs.cn/suggest/key=${ encodeURI(val) }&name=${ callbackName }`).then(res => {
          if (res.split(';')[0].length < 25) return Toast('查无结果')
          let list = []
          res.split(';').forEach(item => {
            item = item.split(',')
            list.push({
              code: item[3],
              codeB: item[2],
              name: item[6],
              selected: state.moneyInfoCodeList.includes(item[2]) || state.moneyInfoCodeList.includes(item[3]),
              loading: false
            })
          })
          state.result = list
        })
      }

      // 选择基金、股票
      const showConfirm = (item) => {
        state.moneyInfo = item
        state.typeConfirmVisible = true
      }

      // 添加自选
      const createMoneyInfo = (action) => {
        state.moneyInfo.loading = true
        const params = {
          senderId,
          type: action.value,
          name: state.moneyInfo.name,
          code: state.moneyInfo[action.value === 'jijin' ? 'codeB' : 'code'],
          sort: state.moneyInfoCodeList.length
        }
        axios.post('/api/createMoneyInfo', params).then(() => {
          state.moneyInfoCodeList.push(params.code)
          localStorage.setItem('moneyInfoCodes', state.moneyInfoCodeList.join(','))
          Toast('添加成功')
          state.moneyInfo.selected = true
        }).finally(() => {
          state.moneyInfo.loading = false
        })
      }

      // 删除自选
      const deleteMoneyInfo = (item) => {
        const isCode = state.moneyInfoCodeList.some(i => i === item.code)
        item.loading = true
        const params = {
          senderId,
          code: item[isCode ? 'code' : 'codeB']
        }
        axios.post('/api/deleteMoneyInfo', params).then(() => {
          state.moneyInfoCodeList.splice(state.moneyInfoCodeList.indexOf(item[isCode ? 'code' : 'codeB']), 1)
          localStorage.setItem('moneyInfoCodes', state.moneyInfoCodeList.join(','))
          Toast('删除成功')
          item.selected = false
        }).finally(() => {
          item.loading = false
        })
      }

      return {
        senderId,
        ...toRefs(state),
        onSearch,
        showConfirm,
        createMoneyInfo,
        deleteMoneyInfo
      }
    }
  }
</script>

<style scoped>
  .money-content {
  }
  
  .top-search {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 4px 8px 0px rgba(6,14,26,0.08);
    position: fixed;
    z-index: 1;
  }
  .box {
    padding: 60px 20px 60px;
  }
  .item {
  }
  .row {
    font-size: 14px;
    padding: 6px 0;
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
