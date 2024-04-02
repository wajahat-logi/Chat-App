
export interface userMessages {
    receiver: string,
    sender: string,
    message: string,
    joinedAt: string
}

export interface GlobalState {
    userMessages: any,
    sender: string,
    receiver: string,
    selectionType: string,
}