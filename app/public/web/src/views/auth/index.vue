<script>
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from '@/utils/axios'
  import { Dialog } from 'vant'

  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const { senderId, senderNick } = route.query

      onMounted(() => {
          localStorage.setItem('senderId', senderId)
          getMoneyInfos()

          Dialog.alert({
            message: `【${ senderNick }】的理财信息`,
          }).then(() => {
            router.push({ name: 'Money' })
          })
      })
      
      const getMoneyInfos = () => {
        axios.get(`/api/getMoneyInfos?senderId=${ senderId }`).then(res => {
          const { jijin, gupiao } = res.data
          localStorage.setItem('moneyInfoCodes', jijin.concat(gupiao).map(item => item.code).join(','))
        })
      }
    }
  }
</script>
