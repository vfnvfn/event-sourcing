export type Either<L, R>
    = { kind: 'Left', data: L }
    | { kind: 'Right', data: R }

export const err = <L>(data: L): Either<L, never> => ({ kind: 'Left', data })
export const ok = <R>(data: R): Either<never, R> => ({ kind: 'Right', data })

export const fold = <L, R>(either: Either<L, R>, onError: (data: L) => void, onOk: (data: R) => void) =>
    either.kind === 'Left' 
        ? onError(either.data)
        : onOk(either.data)
