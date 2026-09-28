import { type Event } from './domain.ts'

export const eventStore: Event[] = []
export const getStream = (streamId: string): Event[] => eventStore.filter(e => e.streamId === streamId)
export const appendEvent = (event: Event) => eventStore.push(event)
