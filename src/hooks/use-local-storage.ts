export type Storage<T> = {
  setItem: (value: T) => void
  getItem: () => T | null
  removeItem: () => void
}

export function useLocalStorage<T>(key: string): Storage<T> {
  return {
    getItem: () => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : undefined
      } catch (error) {
        console.error(error)
      }
    },
    setItem: (value) => {
      try {
        return localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(error)
      }
    },
    removeItem: () => {
      try {
        return localStorage.removeItem(key)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
