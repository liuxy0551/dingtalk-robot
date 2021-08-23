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

    <div class="refresh-box" :class="{ 'loading': refreshing }" @click="refreshAPP" v-if="showRefresh">
      <van-icon name="replay" />
    </div>

    <van-action-sheet v-model:show="typeConfirmVisible" :actions="typeActions" cancel-text="取消"
      close-on-click-action @select="createMoneyInfo" title="选择理财类型" />
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue'
  import { Toast, Dialog } from 'vant'
  import { getVersion } from '@/utils'
  import axios from '@/utils/axios'

  export default {
    setup() {
      const senderId = localStorage.getItem('senderId')
      const moneyInfoCodes = localStorage.getItem('moneyInfoCodes')
      const state = reactive({
        typeConfirmVisible: false,
        typeActions: [
          { name: '基金', value: 'jijin' }, // , color: '#ff0000'
          { name: '股票', value: 'gupiao' }
        ],
        moneyInfo: null,
        keyword: '',
        result: [],
        moneyInfoCodeList: [],
        showRefresh: false,
        refreshing: false
      })

      onMounted(() => {
        moneyInfoCodes && (state.moneyInfoCodeList = moneyInfoCodes.split(','))
        showVersion()
      })

      const showVersion = () => {
        const version = getVersion()
        if (localStorage.getItem('version') !== version) {
          localStorage.setItem('version', version)
          Toast(`当前版本：${ version }`)
        }
      }

      const onSearch = (key) => {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner'
        })
        axios.post(`/api/getMoneyInfoBySina`, { key }).then(res => {
          if (res.data.split(';')[0].length < 25) {
            state.result = []
            Toast('查无结果')
          }
          let list = []
          res.data.split(';').forEach(item => {
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
        }).finally(() => {
          Toast.clear()
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
        item.loading = true
        Dialog.confirm({
          title: '删除自选',
          message: `确认删除该自选理财信息吗？`,
        }).then(() => {
          const isCode = state.moneyInfoCodeList.some(i => i === item.code)
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
        }).catch(() => {
          item.loading = false
        })
      }

      // 刷新应用
      const refreshAPP = () => {
        state.refreshing = true
        localStorage.removeItem('version')
        location.reload()
        setTimeout(() => {
          state.refreshing = false
        }, 2500)
      }

      return {
        senderId,
        ...toRefs(state),
        onSearch,
        showConfirm,
        createMoneyInfo,
        deleteMoneyInfo,
        refreshAPP
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

  .refresh-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.28);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 80px;
    right: 20px;
  }
  .loading {
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(359deg)
    }
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
