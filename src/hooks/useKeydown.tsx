import { useEffect } from 'react'

export function useKeydown(
  callback: (e: KeyboardEvent) => void,
  deps?: React.DependencyList | undefined,
) {
  useEffect(() => {
    window.addEventListener('keydown', callback)
    return () => {
      window.removeEventListener('keydown', callback)
    }
  }, deps)
}
