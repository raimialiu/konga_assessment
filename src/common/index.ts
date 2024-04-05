import { ApplicationError } from "../errors/application.error";

export function Panic(errorMessage: string, code: number = 400) {
    throw new ApplicationError(errorMessage, code)
}