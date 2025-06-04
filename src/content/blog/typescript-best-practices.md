---
title: TypeScript Best Practices in 2025
date: 2025-02-22T00:00:00.000Z
author: Liang-Shih Lin
excerpt: >-
  Learn the current best practices for TypeScript development to improve your
  code quality and productivity.
tags:
  - TypeScript
  - JavaScript
  - Best Practices
---
<!--toc:start-->

- [Use Type Inference When Possible](#use-type-inference-when-possible)
- [Leverage Type Aliases and Interfaces](#leverage-type-aliases-and-interfaces)
- [Use Union Types for Flexibility](#use-union-types-for-flexibility)
- [Null Handling](#null-handling)
- [Discriminated Unions for Complex Types](#discriminated-unions-for-complex-types)
- [Use Readonly for Immutability](#use-readonly-for-immutability)
- [Leverage Utility Types](#leverage-utility-types)
- [Use Generics for Reusable Code](#use-generics-for-reusable-code)

<!--toc:end-->

TypeScript continues to grow in popularity, and for good reason - it adds static typing to JavaScript, making your code more predictable and easier to debug. Here are some best practices for writing TypeScript code in 2025.

## Use Type Inference When Possible

TypeScript's type inference is powerful and can often determine types without explicit annotations:

```typescript
// Instead of this:
const name: string = "Alice";

// Do this:
const name = "Alice"; // TypeScript knows this is a string
```

Let TypeScript do the work for you, but be explicit when the inference isn't clear or when you want to document your code better.

## Leverage Type Aliases and Interfaces

Organize and reuse your types:

```typescript
// Type alias
type User = {
  id: number;
  name: string;
  email: string;
};

// Interface
interface Product {
  id: number;
  name: string;
  price: number;
}
```

Interfaces can be extended and are generally preferred for public APIs, while type aliases are great for union types and more complex type definitions. There have been arguments that went into types vs interfaces, I would say choose whichever one you like.

## Use Union Types for Flexibility

Union types allow you to specify that a value can be one of several types:

```typescript
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.trim();
  }
  return value.toString();
}
```

## Null Handling

Use the `strictNullChecks` compiler option and be explicit about nullable values:

```typescript
function getUser(id: number): User | null {
  // Implementation might return null
}

const user = getUser(1);
// TypeScript forces you to check before using
if (user) {
  console.log(user.name);
}
```

## Discriminated Unions for Complex Types

When you have several related types, use discriminated unions:

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}
```

## Use Readonly for Immutability

When you want to prevent modification of properties:

```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = { apiUrl: "https://api.example.com", timeout: 3000 };
// This would produce a compile error:
// config.apiUrl = 'https://new-api.example.com';
```

## Leverage Utility Types

TypeScript provides built-in utility types that are handy for common transformations:

```typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Extract specific properties
type UserCredentials = Pick<User, "email" | "password">;

// Make all properties required
type RequiredConfig = Required<Config>;
```

## Use Generics for Reusable Code

Generics allow you to write flexible, reusable components:

```typescript
function firstElement<T>(array: T[]): T | undefined {
  return array[0];
}

// TypeScript knows these are different types
const first = firstElement([1, 2, 3]); // number
const name = firstElement(["Alice", "Bob"]); // string
```

By following these best practices, you'll write TypeScript code that's more maintainable, less error-prone, and easier for your team to understand. Happy coding!

