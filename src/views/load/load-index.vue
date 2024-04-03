<template>
  <div>loading</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const init = () => {
  router.push('/home-index')
}
init()
</script>
