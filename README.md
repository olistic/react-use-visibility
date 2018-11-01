# react-use-visibility

React hook for tracking components visibility.

[![Travis][build-badge]][build] [![Codecov][codecov-badge]][codecov]

![Demo](https://user-images.githubusercontent.com/5600126/47879786-42fc5700-de00-11e8-8ffc-70ff651b4a8b.gif)

> _Electrons becoming excited as they enter the screen._

## Installation

```sh
$ npm install --save react-use-visibility
```

Additionally, you'll need to install version `16.7.0-alpha.0` of `react` and
`react-dom` since this package relies on
[React Hooks](https://reactjs.org/hooks):

```sh
$ npm install --save react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0
```

> **DISCLAIMER:** React Hooks are an experimental proposal. The Hooks API, as
> well as this library's, are unstable and subject to change.

## Usage

```js
import React, { useRef } from 'react';
import useVisibility from 'react-use-visibility';

function Electron() {
  // Use a ref to attach to the element whose visibility you want to keep track of.
  const imgRef = useRef();

  // `current` points to the mounted img element.
  const isVisible = useVisibility(imgRef.current);

  return (
    <img
      ref={imgRef}
      src={electron}
      className={isVisible ? 'excited' : ''}
      alt="an electron"
    />
  );
}
```

## API Reference

### `useVisibility`

```js
const isVisible = useVisibility(el, options);
```

Accepts a React element as the first argument (`el`) and returns whether it is
on the screen or not.

Optionally, you can pass a second argument to `useVisibility` that is an object
with the following properties:

- `partial` (_boolean_): Whether to consider the element visible when only a
  part of it is on the screen. Defaults to `false`.

## Next Steps

- [ ] Allow to pass a custom element to add the scroll event listener to instead
      of the `window` object. Useful when there's a parent element with
      `overflow: auto` triggering the scroll event.

[build-badge]:
  https://img.shields.io/travis/olistic/react-use-visibility/master.svg
[build]: https://travis-ci.org/olistic/react-use-visibility
[codecov-badge]:
  https://img.shields.io/codecov/c/github/olistic/react-use-visibility/master.svg
[codecov]: https://codecov.io/gh/olistic/react-use-visibility
