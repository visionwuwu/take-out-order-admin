<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuItem",
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { title, icon } = props
    const vnodes: any[] = []
    if (icon) {
      vnodes.push(<i class={[icon, 'sub-el-icon']}></i>)
    }

    if (title) {
      vnodes.push(<span>{title}</span>)
    }
    return () => (
      <>
        {vnodes.map(node => node)}
      </>
    )
  }
})
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1rem !important;
  height: 1rem !important;
}
</style>
