export type Command
    = { kind: 'RegisterUser', username: string, email: string }
    | { kind: 'DeleteUser', email: string }
    | { kind: 'AssignRole', role: string, username: string }
    | { kind: 'RevokeRole', role: string, username: string }

export type Event
    = { streamId: string, kind: 'UserRegistered', username: string, email: string }
    | { streamId: string, kind: 'UserDeleted' }
    | { streamId: string, kind: 'RoleAssigned', role: string }
    | { streamId: string, kind: 'RoleRevoked', role: string }

//

export type User = {
    username: string
    email: string
    registered: boolean
    roles: string[]
}
