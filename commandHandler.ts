import { type Either, err, ok } from './either.ts'

import { type DomainError } from './errors.ts'
import { type Command, type Event, type User } from './domain.ts'

export const handleCommand = (streamId: string, command: Command, currentState: User): Either<DomainError, Event> => {
    if (command.kind === 'RegisterUser') {
        if (currentState.registered) return err({ kind: 'UserAlreadyExists', username: currentState.username })
        return ok({ streamId, kind: 'UserRegistered', username: command.username, email: command.email })
    }

    if (command.kind === 'DeleteUser') {
        if (!currentState.registered) return err({ kind: 'UserDoesNotExist', username: currentState.username })
        return ok({ streamId, kind: 'UserDeleted' })
    }

    if (command.kind === 'AssignRole') {
        if (!currentState.registered) return err({ kind: 'UserDoesNotExist', username: currentState.username })
        return ok({ streamId, kind: 'RoleAssigned', role: command.role })
    }

    if (command.kind === 'RevokeRole') {
        if (!currentState.registered) return err({ kind: 'UserDoesNotExist', username: currentState.username })
        return ok({ streamId, kind: 'RoleRevoked', role: command.role })
    }

    return err({ kind: 'UnknownCommand' })
}
