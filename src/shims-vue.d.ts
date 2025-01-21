declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  import type { Ref, ComputedRef } from '@vue/reactivity'
  export { ref, computed, onMounted, onUnmounted } from '@vue/runtime-core'
  export type { Ref, ComputedRef }
}
