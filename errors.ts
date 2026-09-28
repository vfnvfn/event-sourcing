export type DomainError
    = { kind: 'UnknownCommand' }
    | { kind: 'UserDoesNotExist', username: string }
    | { kind: 'UserAlreadyExists', username: string }
