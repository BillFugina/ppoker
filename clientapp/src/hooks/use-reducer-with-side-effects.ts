import { useReducer, useEffect, useRef, useCallback, Dispatch } from 'react'

// for testing
export const NO_UPDATE_SYMBOL = Symbol('NO_UPDATE_SYMBOL')

export const Update = <S>(state: S) => ({ state, sideEffects: [] })

export const NoUpdate = () => NO_UPDATE_SYMBOL

type Reducer<S, A> = (prevState: S, action: A) => TStateWithEffects<S, A>

export type TSideEffect<S, A> = (state: S, dispatch: Dispatch<A>) => any
export type TStateWithEffects<S, A> = { state: S; sideEffects: TSideEffect<S, A>[] }

export const UpdateWithSideEffect = <S, A>(state: S, sideEffects: TSideEffect<S, A>[]) => ({
  state,
  sideEffects,
})

export const SideEffect = <S, A>(sideEffects: TSideEffect<S, A>[]) => ({ sideEffects })

type TExecuteArgs<S, A> = {
  sideEffects: TSideEffect<S, A>[]
  state: S
  dispatch: Dispatch<A>
}

//for testing
export async function executeSideEffects<S, A>({ sideEffects, state, dispatch }: TExecuteArgs<S, A>) {
  let cancelFuncs = []
  if (sideEffects) {
    while (sideEffects.length) {
      const sideEffect = sideEffects.shift()
      const cancel = sideEffect ? sideEffect(state, dispatch) : undefined
      if (cancel && typeof cancel === 'function') {
        cancelFuncs.push(cancel)
      }
    }
  }
  return Promise.resolve(cancelFuncs)
}
// for testing
export function mergeState<S, A>(
  prevState: TStateWithEffects<S, A>,
  newState: TStateWithEffects<S, A>,
  isUpdate: boolean,
): TStateWithEffects<S, A> {
  const existingEffects = isUpdate ? prevState.sideEffects : []

  const newSideEffects = newState.sideEffects
    ? [...existingEffects, ...(Array.isArray(newState.sideEffects) ? newState.sideEffects : [newState.sideEffects])]
    : prevState.sideEffects

  const hasNewState = typeof newState.hasOwnProperty === 'function' && newState.hasOwnProperty('state')

  let updatedState: S
  if (isUpdate) {
    updatedState = hasNewState ? newState.state : prevState.state
  } else {
    updatedState = newState.state
  }

  return {
    state: updatedState,
    sideEffects: newSideEffects,
  }
}

function finalReducer<S, A>(
  reducer: Reducer<S, A>,
): (state: TStateWithEffects<S, A>, action: A | typeof NO_UPDATE_SYMBOL) => TStateWithEffects<S, A> {
  return function (state: TStateWithEffects<S, A>, action: A | typeof NO_UPDATE_SYMBOL) {
    if (action === NO_UPDATE_SYMBOL) {
      return state
    }
    let newState = reducer(state.state, action)
    return mergeState(state, newState, true)
  }
}

export function useReducerWithEffects<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  init?: (state: S) => S,
): [S, Dispatch<A>] {
  const memoizedReducer = useCallback(finalReducer(reducer), [reducer])

  const [{ state, sideEffects }, dispatch] = useReducer(
    memoizedReducer,
    {
      state: initialState,
      sideEffects: [],
    },
    state => {
      let newState: S | undefined
      if (typeof init === 'function') {
        newState = init(state.state)
      }

      return typeof newState !== 'undefined' ? mergeState(state, { ...state, state: newState }, false) : state
    },
  )

  let cancelFuncs = useRef<any[]>([])

  useEffect(() => {
    if (sideEffects.length) {
      const asyncEffects = async () => {
        async function runSideEffects() {
          const cancels = await executeSideEffects({
            sideEffects,
            state,
            dispatch,
          })
          return cancels
        }

        const cancels = await runSideEffects()
        cancelFuncs.current = cancels
      }

      asyncEffects()
      if (cancelFuncs.current.length) {
        cancelFuncs.current.forEach(func => {
          func(state)
          cancelFuncs.current = []
        })
      }
    }
  }, [sideEffects]) //eslint-disable-line
  return [state, dispatch]
}
