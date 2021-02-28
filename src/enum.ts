class EnumBase<T extends string> implements Iterable<T> {
	#variants: ReadonlySet<string>;

	public constructor(items: T[]) {
		this.#variants = new Set<T>(items);

		for (const item of items) {
			Object.defineProperty(this, item, {
				configurable: false,
				enumerable: true,
				writable: false,
				value: item,
			});
		}
	}

	public is(value: string): value is T {
		return this.#variants.has(value);
	}

	public toString(): string {
		return `Enum<${Array.from(this.#variants).join(' | ')}>`;
	}

	public [Symbol.iterator](): Iterator<T> {
		return this.#variants.values() as Iterator<T>;
	}
}

Object.defineProperty(EnumBase, 'name', {
	configurable: true,
	enumerable: false,
	writable: false,
	value: 'Enum',
});

type EnumVariants<T extends string> = {
	readonly [V in T]: V;
};

export const Enum = EnumBase as new <T extends string>(items: T[]) => EnumBase<T> & EnumVariants<T>;
export type Enum<T extends string> = EnumBase<T> & EnumVariants<T>;
