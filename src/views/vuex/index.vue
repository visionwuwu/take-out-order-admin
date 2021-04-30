<template>
  <div>
    <p>count: {{ count }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <el-button type="primary" @click="handleIncrement">increment</el-button>
  </div>
</template>

<script lang="ts">
import { StoreState } from 'root/src/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore<StoreState>()
    const count = computed(() => store.state.count)
    const doubleCount = computed(() => store.getters.doubleCount)

    const handleIncrement = () => {
      store.dispatch('incrementAction')
    }

    return {
      count,
      doubleCount,
      handleIncrement
    }
  }
})
</script>

<style scoped></style>
