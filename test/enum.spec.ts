import { beforeAll, describe, expect, it } from '@jest/globals';

import { Enum } from '../src/enum.js';

describe('Enum', () => {
	it('is called Enum', () => {
		expect(Enum.name).toBe('Enum');
	});

	describe('', () => {
		type MyEnum = typeof MyEnum;
		let MyEnum: Enum<'First' | 'Second'>;

		beforeAll(() => {
			MyEnum = new Enum([
				'First',
				'Second',
			]);
		});

		it('is Enum', () => {
			expect(MyEnum).toBeDefined();
			expect(MyEnum).toBeInstanceOf(Enum);
		});

		it('has variants', () => {
			expect(MyEnum.First).toBe('First');
			expect(MyEnum.Second).toBe('Second');
		});

		it('is Iterable', () => {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			expect(MyEnum.is).toBeDefined();
			expect(MyEnum.is('First')).toBe(true);
			expect(MyEnum.is('Second')).toBe(true);
			expect(MyEnum.is('Third')).toBe(false);
		});

		it('has toString()', () => {
			expect(MyEnum.toString).toBeDefined();
			expect(MyEnum.toString()).toBe('Enum<First | Second>');
		});

		it('is Iterable', () => {
			expect(MyEnum[Symbol.iterator]).toBeDefined();
			expect(Array.from(MyEnum)).toEqual(['First', 'Second']);
		});

		it('has entries', () => {
			expect(Object.entries(MyEnum)).toEqual([
				['First', 'First'],
				['Second', 'Second'],
			]);
		});
	});
});
