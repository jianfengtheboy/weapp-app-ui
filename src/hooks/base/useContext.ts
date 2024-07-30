import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

export default function useContext<T>(contextName: 'context') {
  const injectKey: InjectionKey<T> = Symbol(contextName)

  const useProvide = (context: T) => {
    provide(injectKey, context)
  }

  const useInject = () => {
    return inject(injectKey) as T
  }

  return {
    useProvide,
    useInject
  }
}
