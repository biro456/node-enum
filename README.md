# @biro456/enum

[![build status](https://github.com/biro456/node-enum/actions/workflows/build.yml/badge.svg)](https://github.com/biro456/node-enum/actions/workflows/build.yml)
[![npm package](https://img.shields.io/npm/v/@biro456/enum?label=npm%20package)](https://www.npmjs.com/package/@biro456/enum)

A typed enum for TypeScript.

Ever wanted to check if a value was a variant of an enum:
```typescript
enum MyEnum {
	First = 'first',
	Second = 'seconds',
}

const value = MyEnum.First;

if (value instanceof MyEnum) { // error
	console.info('magic');
}
```

Now you can:
```typescript
import { Enum } from '@biro456/enum';

type MyEnum = typeof MyEnum;
const MyEnum = Enum.create([
	'First',
	'Second',
]);

const value = MyEnum.First;

if (MyEnum.is(value)) { // works
	console.info('magic');
}
```

## But why?

Mainly because I wanted to see if I could make something ergonomic to use in my projects. So I took several tips from other similar projects.
