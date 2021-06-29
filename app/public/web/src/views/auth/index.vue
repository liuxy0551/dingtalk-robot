<script>
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const { senderId } = route.query
      onMounted(() => {
        router.push({ name: 'Money', query: { senderId } })
      })
    }
  }
</script>

<style scoped>
</style>
