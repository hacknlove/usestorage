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

returns the value in the storage at `key`

### `preStore(keys, area = 'sync'`)
* `key` **array** of the keys to be cached
* `area` the storage to use.

speed up `useStorage` caching the initial values.

## Example
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import useStorage, { preStore } from '@hacknlove/usestorage'

preStore(['world']) // optional optimization

function Example () {
  const world = useStorage('world') // browser.storage.sync.get('world')

  return (
    <h1>Hello {world}</h1>
  )
}

ReactDOM.render(
  <Example/>,
  document.querySelector('#root')
)
```
