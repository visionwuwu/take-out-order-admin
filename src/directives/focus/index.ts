/**
 * @Description 自动聚焦的指令
 * @Author Visionwuwu
 * @Date 2021-05-13 15:24:00
 * @LastEditor Visionwuwu
 * @LastEditTime 2021-05-13 15:24:00
 */
import { Directive } from 'vue'

export const focus: Directive = {
  mounted: (el: Element) => {
    if (el && el.tagName === 'INPUT') {
      (el as any).focus()
    } else {
      const inputEl = el.querySelector('input')
      console.log(inputEl)
      if (inputEl) {
        inputEl.focus()
      }
    }
  },
}