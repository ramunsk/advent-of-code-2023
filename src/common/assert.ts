export function assert(value: boolean, errorMessage: string): void {
    if (!value) {
        throw new Error(errorMessage);
    }
}
