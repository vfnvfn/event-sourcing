import { type Event, type User } from './domain.ts'

export const userReducer = (events: Event[]): User =>
    events.reduce(
        (acc, event) => {
            switch (event.kind) {
                case 'UserRegistered': {
                    return {
                        ...acc,
                        username: event.username,
                        email: event.email,
                        registered: true,
                    }
                }
                case 'UserDeleted': {
                    return {
                        ...acc,
                        registered: false,
                    }
                }
                case 'RoleAssigned': {
                    return {
                        ...acc,
                        roles: [...acc.roles, event.role]
                    }
                }
                case 'RoleRevoked': {
                    return {
                        ...acc,
                        roles: acc.roles.filter((role: string) => role !== event.role)
                    }
                }
                default:
                    return acc
            }
        }, 
        { username: '', email: '', registered: false, roles: [] } as User
    )
