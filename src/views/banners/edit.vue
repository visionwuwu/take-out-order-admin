<template>
  <detail :isEdit="true"></detail>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Detail from './components/detail.vue'

export default defineComponent({
  components: {
    Detail
  },
  mounted() {
    console.log('edit')
  }
})
</script>

<style lang="scss" scoped>

</style>