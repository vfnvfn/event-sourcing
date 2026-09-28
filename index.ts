import util from 'node:util'

import { type Either, fold } from './either.js'

import { type Command, type Event, type User } from './domain.ts'
import { eventStore, getStream, appendEvent } from './eventStore.ts'
import { userReducer } from './reducers.ts'

import { handleCommand } from './commandHandler.ts'

//

const dispatch = (streamId: string) => (command: Command) => {
    const stream = getStream(streamId)
    const currentState = userReducer(stream)

    fold(handleCommand(streamId, command, currentState),
         (err) => console.error(err),
         (event) => appendEvent(event))
}

//

let commands: Command[] = [
    { kind: 'RegisterUser', username: 'vfnvfn', email: 'me@vfnvfn.net' },
    { kind: 'AssignRole', role: 'computer enjoyer', username: 'vfnvfn' },
    { kind: 'AssignRole', role: 'computer hater', username: 'vfnvfn' },
    { kind: 'AssignRole', role: 'likes to play bass', username: 'vfnvfn' },
    { kind: 'RevokeRole', role: 'computer hater', username: 'vfnvfn' },
    { kind: 'DeleteUser', email: 'me@vfnvfn.net' },
]

commands.forEach(dispatch('123'))

//

console.info('event history:')
eventStore.forEach(e => console.info(util.inspect(e, { breakLength: Infinity })))

console.info()

console.info('current state:')
console.info(util.inspect(userReducer(getStream('123'))))
