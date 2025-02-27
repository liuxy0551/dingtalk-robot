<template>
  <div class="personal-content">
    <div class="top-search">
      <van-tabs v-model="tabSelected" @change="onChange">
        <van-tab v-for="item in tabList" :key="item.value" :title="item.label" :name="item.value" />
      </van-tabs>
    </div>

    <div class="box top-tab" v-if="result[tabSelected] && result[tabSelected].length">
      <div class="item" v-for="(item, idx) in result[tabSelected]" :key="item.code">
        <div class="row">
          <div class="text">{{ item.code }} - {{ item.name }}</div>
          <van-button class="sort-btn up" icon="down" size="mini" :loading="item.loading" type="primary" @click="sortMoneyInfo(idx, 'up')" v-if="idx !== 0" />
          <van-button class="sort-btn" icon="down" size="mini" :loading="item.loading" type="primary" @click="sortMoneyInfo(idx, 'down')" v-if="idx !== result[tabSelected].length - 1" />
          <van-button class="delete-btn" type="warning" size="mini" :loading="item.loading" @click="deleteMoneyInfo(item)">删除</van-button>
        </div>
      </div>
    </div>
    <div class="box top-tab" v-else>
      <van-empty description="暂无数据" />
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue'
  import { Toast, Dialog } from 'vant'
  import axios from '@/utils/axios'

  export default {
    setup() {
      const senderId = localStorage.getItem('senderId')
      const state = reactive({
        tabSelected: 'gupiao',
        tabList: [
          { label: '股票', value: 'gupiao' },
          { label: '基金', value: 'jijin' },
        ],
        result: {
          jijin: [],
          gupiao: []
        }
      })

      onMounted(() => {
        getMoneyInfos()
      })

      const onChange = (val) => {
        state.tabSelected = val
      }

      const getMoneyInfos = () => {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner'
        })
        axios.post(`/api/getMoneyInfos`, { senderId }).then(res => {
          const { jijin, gupiao } = res.data
          localStorage.setItem('moneyInfoCodes', jijin.concat(gupiao).map(item => item.code).join(','))
          state.result = {
            jijin: jijin.map(i => { return { ...i, loading: false } }),
            gupiao: gupiao.map(i => { return { ...i, loading: false } })
          }
        }).finally(() => {
          Toast.clear()
        })
      }

      // 排序
      const sortMoneyInfo = (idx, type) => {
        state.result[state.tabSelected][idx].loading = true
        state.result[state.tabSelected][idx + (type === 'up' ? -1 : 1)].loading = true

        const current = state.result[state.tabSelected][idx]
        const target = state.result[state.tabSelected][idx + (type === 'up' ? -1 : 1)]
        const params = {
          current: {
            moneyInfoId: current.moneyInfoId,
            sort: (idx + 1) + (type === 'up' ? -1 : 1)
          },
          target: {
            moneyInfoId: target.moneyInfoId,
            sort: (idx + 1)
          }
        }

        axios.post('/api/sortMoneyInfo', params).then(() => {
          getMoneyInfos()
          Toast('调整成功')
        }).finally(() => {
        state.result[state.tabSelected][idx].loading = false
        state.result[state.tabSelected][idx + (type === 'up' ? -1 : 1)].loading = false
        })
      }

      // 删除自选
      const deleteMoneyInfo = (item) => {
        item.loading = true
        Dialog.confirm({
          title: '删除自选',
          message: `确认删除该自选理财信息吗？`,
        }).then(() => {
          const params = {
            senderId,
            code: item.code
          }
          axios.post('/api/deleteMoneyInfo', params).then(() => {
            getMoneyInfos()
            Toast('删除成功')
          }).finally(() => {
            item.loading = false
          })
        }).catch(() => {
          item.loading = false
        })
      }

      return {
        ...toRefs(state),
        onChange,
        sortMoneyInfo,
        deleteMoneyInfo,
      }
    }
  }
</script>

<style scoped>
  .personal-content {
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
    flex: 1;
    max-width: 252px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .delete-btn {
    width: 40px;
    margin-left: 8px;
  }
  .sort-btn {
    width: 30px;
  }
  .up {
    transform: rotate(180deg);
  }
</style>
