# useKeyDown [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Listen%20to%20key%20down%20events%20with%20React%20hooks!&url=https://github.com/CharlesStover/use-key-down&via=CharlesStover&hashtags=javascript,react,reactjs,typescript,webdev,webdevelopment) [![version](https://img.shields.io/npm/v/use-key-down.svg)](https://www.npmjs.com/package/use-key-down) [![minzipped size](https://img.shields.io/bundlephobia/minzip/use-key-down.svg)](https://www.npmjs.com/package/use-key-down) [![downloads](https://img.shields.io/npm/dt/use-key-down.svg)](https://www.npmjs.com/package/use-key-down) [![build](https://api.travis-ci.com/CharlesStover/use-key-down.svg)](https://travis-ci.com/CharlesStover/use-key-down/)

Listen to key down events with React hooks.

- [Install](#install)
- [Use](#use)
- [API](#api)
- [Sponsor](#sponsor)

## Install

- `npm install use-key-down` or
- `yarn add use-key-down`

## Use

```javascript
import useKeyDown from 'use-key-down';

function App() {
  const isEnterKeyDown = useKeyDown('Enter');
  return <p>The Enter key is {isEnterKeyDown ? 'down' : 'up'}.</p>;
}
```

## API

`useKeyDown` only takes one parameter, a string representing the key to which
you want to listen to key down events.

## Sponsor 💗

If you are a fan of this project, you may
[become a sponsor](https://github.com/sponsors/CharlesStover)
via GitHub's Sponsors Program.
