# usestorage
react state hook for using browser extension storage

## Install
```
npm i @hacknlove/usestorage
```

## API

### `useStorage(key, first = null, area = 'sync')`
* `key` **string**: the key to be retrieved
* `first` **any** the initial value to be returned before get the actual one.
* `area` **'sync' or 'local'** the storage to use.

returns `[value, set]` with the value in the storage at `key` and a function to update the key in the storage

### `preStore(keys, area = 'sync'`)
* `key` **array** of the keys to be cached
* `area` the storage to use.

speed up `useStorage` caching the actual values for the first use.

## Example
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import useStorage, { preStore } from '@hacknlove/usestorage'

preStore(['world']) // optional optimization

function Example () {
  const [world, setWorld] = useStorage('world')


  return (
    <h1>Hello {world}</h1>
    <button onClick={() => setWorld('earth')}>World's name</button>
  )
}

ReactDOM.render(
  <Example/>,
  document.querySelector('#root')
)
```
