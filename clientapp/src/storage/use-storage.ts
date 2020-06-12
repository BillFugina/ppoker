import { useEffect, useReducer, useRef } from 'react'
import { IStorageState, IStorageHookResult } from 'storage/types'

import fastDeepEqual from 'fast-deep-equal'
import { assertNever } from 'system/assert-never'
import { LocalStorage } from 'storage/local-storage'

interface IStorageAction {
  type:
    | 'initialize'
    | 'set'
    | 'get'
    | 'get-succeeded'
    | 'get-failed'
    | 'value-not-in-storage'
    | 'save'
    | 'save-succeeded'
    | 'save-failed'
    | 'storage-changed'
    | 'error'
  payload?: any
}

type IStorageReducer<T> = (
  state: IStorageState<T>,
  action: IStorageAction,
) => IStorageState<T>

const reducer: IStorageReducer<any> = <T>(
  state: IStorageState<T>,
  action: IStorageAction,
) => {
  let result: IStorageState<T> = state

  switch (action.type) {
    case 'initialize':
      result = { ...state, data: action.payload, storageValue: undefined }
      break
    case 'set':
      result = { ...state, data: action.payload }
      break
    case 'get':
      result = { ...state, isLoading: true }
      break
    case 'get-succeeded':
      result = {
        ...state,
        data: action.payload,
        storageValue: action.payload,
        isLoading: false,
      }
      break
    case 'get-failed':
      result = {
        ...state,
        isLoading: false,
        storageValue: null,
        error: action.payload,
      }
      break
    case 'value-not-in-storage':
      result = { ...state, storageValue: null, isLoading: false }
      break
    case 'save':
      result = { ...state, isSaving: true }
      break
    case 'save-succeeded':
      result = { ...state, isSaving: false, storageValue: action.payload }
      break
    case 'save-failed':
      result = { ...state, isSaving: false, error: action.payload }
      break
    case 'storage-changed':
      result = { ...state, data: action.payload, storageValue: action.payload }
      break
    case 'error':
      result = { ...state, error: action.payload }
      break
    default:
      assertNever(action.type)
  }
  console.debug(
    `%c${action.type}`,
    'background: green; color: white; display: block;',
    {
      previousState: state,
      action,
      newState: result,
    },
  )

  return result
}

export const useStorage = <TEntity>(
  storageKey: string,
  initialEntity: TEntity,
) => {
  const initialData = useRef<IStorageState<TEntity>>({
    data: initialEntity,
    storageValue: undefined,
    isLoading: false,
    isSaving: false,
    error: false,
  })

  const [state, dispatch] = useReducer(reducer, initialData.current)

  useEffect(() => {
    dispatch({ type: 'initialize', payload: initialEntity })
  }, [initialEntity])

  useEffect(() => {
    dispatch({ type: 'get' })

    LocalStorage.get([storageKey], (result) => {
      if (!LocalStorage.lastError) {
        const newData = result[storageKey]
        if (newData && !fastDeepEqual(state.data, newData)) {
          dispatch({ type: 'get-succeeded', payload: newData })
        } else {
          dispatch({ type: 'value-not-in-storage' })
        }
      } else {
        dispatch({ type: 'get-failed', payload: LocalStorage.lastError })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      state.storageValue !== undefined &&
      !fastDeepEqual(state.data, state.storageValue)
    ) {
      dispatch({ type: 'save' })

      LocalStorage.set({ [storageKey]: state.data }, () => {
        if (!LocalStorage.lastError) {
          dispatch({ type: 'save-succeeded', payload: state.data })
        } else {
          dispatch({ type: 'save-failed', payload: LocalStorage.lastError })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data])

  const storageCallback = (e: StorageEvent) => {
    if (!fastDeepEqual(state.data, e.newValue)) {
      dispatch({ type: 'storage-changed', payload: e.newValue })
    }
  }

  useEffect(() => {
    LocalStorage.onChanged.addListener(storageCallback)
    return () => {
      LocalStorage.onChanged.removeListener(storageCallback)
    }
  })

  const setData = (data: TEntity) => {
    dispatch({ type: 'set', payload: data })
  }

  const result: IStorageHookResult<TEntity> = { ...state, setData }

  return result
}
