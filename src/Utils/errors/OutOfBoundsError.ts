class OutOfBoundsError extends Error {
    constructor(message?: string) {
        super(message ?? "Out of bounds");
    }
}

export default OutOfBoundsError