/** Wrapper around a return value that indicates operation success */
export interface OkResult<TValue> {
    /** Returns `true` if operation was successful */
    isOk: () => this is OkResult<TValue>;

    /** Returns `false` if operation failed */
    isFailure: () => this is FailureResult<unknown>;

    /** Value of successful operation */
    readonly value: TValue;
}

/** Wrapper around a return value that indicates operation failure */
export interface FailureResult<TError> {
    /** Returns `true` if operation was successful */
    isOk: () => this is OkResult<unknown>;

    /** Returns `false` if operation failed */
    isFailure: () => this is FailureResult<TError>;

    /** Error of failed operation */
    readonly error: TError;
}

/**
 * Result of operation that wraps a `value` in case of successful operation or `error` in case of failure
 * @description
 * Usually operations return a value or throw an error. But exception driven programming is not a good practice.
 * Instead `Result` type can be used as a wrapper for operation result that can be either success or failure.
 * This way code has a natural way to handle both cases without a need to write try/catch blocks. Although try/catch blocks are
 * inevitable, they should not be used as application logic "driver" and Result type should be used instead.
 *
 * @example
 * imagine simple function that divides two numbers:
 * ```typescript
 * function divide(dividend: number, divisor: number): number {
 *    return dividend / divisor;
 * }
 * ```
 * This function can throw an error if divisor is zero. This is not a good practice. Instead, we can use Result type:
 * ```typescript
 * function divide(dividend: number, divisor: number): Result<number, string> {
 *   if (divisor === 0) {
 *     return failure('Cannot divide by zero');
 *   }
 *   return ok(dividend / divisor);
 * }
 * ```
 * Now, the caller of this function can handle both cases:
 * ```typescript
 * const result = divide(10, 0);
 * if (result.isOk()) {
 *  console.log('Result is:', result.value);
 * } else {
 *  console.error('Error is:', result.error);
 * }
 * ```
 */
export type Result<TValue = void, TError = void> = OkResult<TValue> | FailureResult<TError>;

const returnTrue = () => true;
const returnFalse = () => false;

/** Creates an empty `Result<void, void>` that indicates success*/
export function ok(): OkResult<void>;
/** Creates a `Result<TValue, void>` that indicates success*/
export function ok<TValue>(value: TValue): OkResult<TValue>;
export function ok<TValue>(value?: TValue): OkResult<TValue> {
    return { isOk: returnTrue, isFailure: returnFalse, value: value as TValue };
}

/** Creates an empty `Result<void, void>` that indicates failure*/
export function failure(): FailureResult<void>;
/** Creates a `Result<void, TError>` that indicates failure*/
export function failure<TError>(failure: TError): FailureResult<TError>;
export function failure<TError>(failure?: TError): FailureResult<TError> {
    return { isOk: returnFalse, isFailure: returnTrue, error: failure as TError };
}
