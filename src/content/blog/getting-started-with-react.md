---
title: Getting Started with React
date: 2025-03-15T00:00:00.000Z
author: Liang-Shih Lin
excerpt: A beginner's guide to setting up and understanding the basics of React.
tags:
  - React
  - JavaScript
  - Frontend
---
<!--toc:start-->

- [Why React?](#why-react)
- [Setting Up Your First React App](#setting-up-your-first-react-app)
- [Creating Your First Component](#creating-your-first-component)
- [Understanding State and Props](#understanding-state-and-props)
- [Next Steps](#next-steps)

<!--toc:end-->

React is a popular JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer in web and mobile apps, and it allows you to design simple views for each state in your application.

## Why React?

React has several benefits:

- **Component-Based Architecture**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Declarative Views**: Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
- **Learn Once, Write Anywhere**: You can develop new features in React without rewriting existing code, and React can also render on the server using Node.

## Setting Up Your First React App

The easiest way to get started with React is to use Create React App:

```bash
npx create-react-app my-app
cd my-app
npm start
```

This sets up a new React application with a development server, hot-reloading, and other features to make development easier.

## Creating Your First Component

Here's a simple React component:

```jsx
import React from "react";

function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to React</p>
    </div>
  );
}

export default HelloWorld;
```

This component returns a heading and paragraph wrapped in a div. The syntax used here is JSX, which allows you to write HTML-like code in your JavaScript.

## Understanding State and Props

Two key concepts in React:

1. **Props**: These are like function arguments. They allow you to pass data from a parent component to a child component.

2. **State**: This is like a component's memory. It allows a component to keep track of information between renders.

Here's a simple example using both:

```jsx
import React, { useState } from "react";

function Counter() {
  // Using useState to create a state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## Next Steps

After mastering these basics, you can explore:

- React Router for handling navigation
- State management libraries like Redux or Context API
- Hooks for functional components
- Server-side rendering with Next.js

Happy coding!

