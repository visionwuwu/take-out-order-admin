<script lang="jsx">
import { ref, defineComponent } from "vue";
export default defineComponent({
  setup () {
    const count = ref(0)
    return () => (
      <>
        <h1>Count: {count.value}</h1>
        <button onClick={() => count.value++}>+1</button>
      </>
    )
  }
})

// Vue2的写法，在render函数中使用
// export default {
//   data() {
//     return {
//       count: 0
//     }
//   },
//   render () {
//     return <>
//       <h1>Test</h1>
//       <p onClick={this.onClick}>{this.count}</p>
//     </>
//   },
//   methods: {
//     onClick() {
//       this.count++
//     }
//   }
// }
</script>

<style>

</style>
