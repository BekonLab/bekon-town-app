export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected value to be string, but received ' + value);
  }
}

export function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Expected value to be number, but received ' + value);
  }
}

export function assertIsBoolean(value: unknown): asserts value is boolean {
  if (typeof value !== 'boolean') {
    throw new Error('Expected value to be boolean, but received ' + value);
  }
}

export function assertIsDate(value: unknown): asserts value is Date {
  if (!(value instanceof Date)) {
    throw new Error('Expected value to be Date, but received ' + value);
  }
}

export function assertIsArray<T>(value: unknown): asserts value is T[] {
  if (!Array.isArray(value)) {
    throw new Error('Expected value to be array, but received ' + value);
  }
}

export function assertNever(x: unknown): never {
  throw new Error('Unexpected object: ' + x);
}
