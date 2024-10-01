import { useEffect } from 'react'

export function useBeforeUnload(
  callback: (e: BeforeUnloadEvent) => any,
  deps?: React.DependencyList | undefined,
) {
  useEffect(() => {
    window.addEventListener('beforeunload', callback)
    return () => {
      window.removeEventListener('beforeunload', callback)
    }
  }, deps)
}
