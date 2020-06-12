export interface IStorage<T = any> {
  get: (
    keys: string[],
    callback: (items: { [key: string]: any }) => void,
  ) => void
  set: (items: { [key: string]: any }, callback?: () => void) => void

  onChanged: IStorageEvent
  lastError: ILastError | undefined
}

export type StorageHandler = (e: StorageEvent) => any

export interface IStorageEvent {
  addListener(callback: StorageHandler): void
  removeListener(callback: StorageHandler): void
}

export interface IStorageChange<T = any> {
  newValue?: T
  oldValue?: T
}

export interface ILastError {
  message?: string
}

export type StorageEventChanges<T = any> = { [key: string]: IStorageChange<T> }

export interface IStorageState<T> {
  data: T
  storageValue: T | null | undefined
  isLoading: boolean
  isSaving: boolean
  error: any
}

export interface IStorageHookResult<T> extends IStorageState<T> {
  setData: (data: T) => void
}

export type StorageHook<T> = (
  storageKey: string,
  initialEntity: T,
) => IStorageHookResult<T>
