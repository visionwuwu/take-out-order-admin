<template>
  <component :is="type" v-bind="linkProps">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isExternal } from 'utils/validate'

export default defineComponent({
  name: 'AppLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isExernalVal = computed(() => {
      return isExternal(props.to)
    })

    const type = computed(() => {
      return isExernalVal.value ? 'a' : 'router-link'
    })

    const linkProps = computed(() => {
      if (isExernalVal.value) {
        return {
          href: props.to,
          target: '_blank',
          rel: 'noopener'
        }
      } else {
        return {
          to: props.to
        }
      }
    })
    return {
      type,
      linkProps,
    }
  }
})
</script>
