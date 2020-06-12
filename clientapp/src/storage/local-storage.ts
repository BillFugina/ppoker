import { IStorage } from 'storage/types'

export const LocalStorage: IStorage<any> = {
  get: (keys: string[], callback: (items: { [key: string]: any }) => void) => {
    const result: { [key: string]: any } = {}
    keys.forEach((key) => {
      const storedString = window.localStorage.getItem(key) || 'null'
      const value = JSON.parse(storedString)
      result[key] = value
    })
    callback(result)
  },

  set: (items: { [key: string]: any }, callback?: () => void) => {
    Object.keys(items).forEach((k) => {
      window.localStorage.setItem(k, JSON.stringify(items[k]))
      if (callback) {
        callback()
      }
    })
  },

  onChanged: {
    addListener: (callback: (e: StorageEvent) => any) => {
      window.addEventListener('storage', callback)
    },
    removeListener: (callback: (e: StorageEvent) => any) => {
      window.removeEventListener('storage', callback)
    },
  },

  lastError: undefined,
}
