<template>
  <div>loading</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const init = () => {
  // router.push('/login')
  router.push('/home')
}
init()
</script>
