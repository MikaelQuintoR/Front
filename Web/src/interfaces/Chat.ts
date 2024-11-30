export interface User{
    id?:number
    firstName: string
    lastName: string
    email:string
    password:string
}

export interface Chat{
    id?:number
    userId: number
    chatName: string
    dateCreation: number
}

export interface Message{
    id?: number
    chatId: number
    Sender: "USER" | "AI"
    Content: string;
    Timestamp: number
    aiModel: "GPT_3" | "GPT_4" | "OTHER"
}