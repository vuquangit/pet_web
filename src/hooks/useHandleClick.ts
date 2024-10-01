import { useEffect } from 'react'

export function useHandleClick(
  callback: (e: MouseEvent) => any,
  deps?: React.DependencyList | undefined,
) {
  useEffect(() => {
    window.addEventListener('click', callback)
    return () => {
      window.removeEventListener('click', callback)
    }
  }, deps)
}
