export class InvalidRequest extends Error {
    constructor(public code: number, message: string) {
        super(message);
    }
}
