export interface MatchingResultMessage {
    chatRoomId?: string,
    sessionId: string,
    responseResult: 'SUCCESS'|'CANCEL'|'TIMEOUT',
}

export interface StompMessage {
    senderSessionId: string,
    message: string,
    messageType: 'CHAT'|'DISCONNECTED',
}