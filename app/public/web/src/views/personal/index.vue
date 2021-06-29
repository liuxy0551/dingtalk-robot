<template>
  <div class="money-content">
    
    1234
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue'
  import { useRoute } from 'vue-router'
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
        keyword: '长安',
        result: []
      })

      onMounted(() => {
        // console.log(333, senderId)
      })

      const onChange = (val) => {
        console.log(222, val)
      }

      const onSearch = (val) => {
        axios.get(`http://suggest3.sinajs.cn/suggest/key=${ val }&name=${ callbackName }`).then(res => {
          let list = []
          res.split(';').forEach(item => {
            console.log(111, item.split(','))
            item = item.split(',')
            list.push({
              codeA: item[2],
              codeB: item[3],
              name: item[6]
            })
          })
          state.result = list
        })
      }

      return {
        ...toRefs(state),
        onChange,
        onSearch
      }
    }
  }
</script>

<style scoped>
  .money-content {
    padding: 20px 0;
  }
</style>
