export type EnumValue = string | number;
export type EnumValues = readonly EnumValue[];
export type Enum = Record<string, EnumValue>;

class EnumExtras {
	values: EnumValues;

	constructor(enumType: Enum) {
		this.values = Object.values(enumType);
	}

	is(value: EnumValue): boolean {
		return this.values.includes(value);
	}
}

const ENUM_EXTRAS = Symbol('EnumExtras');

interface EnumExtrasField {
	readonly [ENUM_EXTRAS]: EnumExtras;
}

function enumExtras<E extends Enum>(enumType: E): EnumExtras {
	let extras = (enumType as Partial<EnumExtrasField>)[ENUM_EXTRAS];

	if (!extras) {
		Object.defineProperty(enumType, ENUM_EXTRAS, {
			value: extras = new EnumExtras(enumType),
			writable: false,
			enumerable: false,
			configurable: false,
		});
	}

	return extras;
}

export function enumValues<E extends Enum>(enumType: E): EnumValues {
	return enumExtras(enumType).values;
}

export function isEnum<E extends Enum>(enumType: E, value: EnumValue): value is E[keyof E] {
	// TODO: use codegen
	return enumExtras(enumType).is(value);
}

export function assertEnum<E extends Enum>(enumType: E, value: EnumValue): asserts value is E[keyof E] {
	// TODO: use codegen
	const extras = enumExtras(enumType);
	if (!extras.is(value)) {
		throw new EnumAssertionError(extras.values, value);
	}
}

class EnumAssertionError extends Error {
	code: 'ERR_ASSERTION';
	expected: EnumValues;
	actual: EnumValue;

	constructor(expected: EnumValues, actual: EnumValue) {
		super(`Invalid enum value: expected [${expected.join(', ')}], got ${actual}`);

		this.name = 'EnumAssertionError';
		this.code = 'ERR_ASSERTION';
		this.expected = expected;
		this.actual = actual;
	}
}
