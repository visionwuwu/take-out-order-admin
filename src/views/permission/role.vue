<template>
  <div class="app-container">
    role-container
    <input v-model="data" type="text" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RolePage',
  setup() {
    const data = ref('')
    
    return {
      data
    }
  }
})


</script>

<style scoped>

</style>
