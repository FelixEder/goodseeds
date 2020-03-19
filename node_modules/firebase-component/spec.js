'use strict'
import test from 'ava'
import React from 'react'
import Firebase from './index'
import { shallow } from 'enzyme'

test('rerenders on a fresh value', (t) => {
  const fbMock = {
    on: (type, cb) => {
      t.truthy(type === 'value')
      cb({val: () => {
        return {a: 3}
      }})
    }
  }
  shallow(<Firebase fbRef={fbMock} onValue={(val) => {
    t.truthy(val.a === 3)
  }}/>)
})

test.skip('rerender an array on fresh value', (t) => {

})
