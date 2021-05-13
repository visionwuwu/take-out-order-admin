<template>
  <detail :isEdit="false"></detail>    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Detail from './components/detail.vue'

export default defineComponent({
  components: {
    Detail
  }
})
</script>
