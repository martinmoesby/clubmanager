export interface IUser {
    id?:string,
    username?:string,
    email?:string,
    password?:string,
    name?:string,
    token?:string,
    expiration?: Date,
    roles:string[]
}

export type TLoginValues = {
    username:string,
    password:string
}