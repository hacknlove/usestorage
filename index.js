import browser from 'webextension-polyfill'
import { useState, useEffect } from 'react'
import isDifferent from 'isdifferent'

export var stored = {
  local: {},
  sync: {}
}

export default function useStorage (key, first = null, area = 'sync') {
  first = stored[area][key] || first

  const [value, set] = useState(first)

  stored[area][key] = value

  browser.storage[area].get(key).then(sync => {
    if (isDifferent(value, sync[key])) {
      set(sync[key])
    }
  })

  const storageOnChange = (object, _area) => {
    if (area !== _area) {
      return
    }
    if (!object[key]) {
      return
    }
    if (isDifferent(value, object[key].newValue)) {
      set(object[key].newValue)
    }
  }
  useEffect(() => {
    browser.storage.onChanged.addListener(storageOnChange)
    return () => {
      browser.storage.onChanged.removeListener(storageOnChange)
    }
  })
  return [value, (value) => {
    browser.storage[area].set({
      [key]: value
    })
  }]
}

export async function preStore (keys, area = 'sync') {
  const sync = await browser.storage[area].get(keys)
  keys.forEach(key => {
    stored[area][key] = sync[area]
  })
}
