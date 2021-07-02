<script>
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from '@/utils/axios'

  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const { senderId } = route.query

      onMounted(() => {
        localStorage.setItem('senderId', senderId)
        getMoneyInfos()
        router.push({ name: 'Money' })
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

<style scoped>
</style>
