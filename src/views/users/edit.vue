<template>
  <detail :isEdit="true"></detail>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import Detail from './components/detail.vue'

export default defineComponent({
  components: {
    Detail
  },
  mounted() {
    console.log('edit')
  },
  setup() {
    const router = useRouter()
    return {
    }
  }
})
</script>

<style lang="scss" scoped>

</style>