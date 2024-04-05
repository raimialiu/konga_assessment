export class ApplicationError extends Error {
    /**
     *
     */
    constructor(message: string, private code: number = 400) {
        super(message);
    }

    public get Message(): string { return this.message}
    public get Code() { return this.code}
}