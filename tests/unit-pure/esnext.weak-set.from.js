import { createIterable } from '../helpers/helpers.js';

import WeakSet from 'core-js-pure/full/weak-set';

QUnit.test('WeakSet.from', assert => {
  const { from } = WeakSet;
  assert.isFunction(from);
  assert.arity(from, 1);
  assert.true(WeakSet.from() instanceof WeakSet);
  const array = [];
  assert.true(WeakSet.from([array]).has(array));
  assert.true(WeakSet.from(createIterable([array])).has(array));
  const object = {};
  const context = {};
  WeakSet.from([object], function (element, index) {
    assert.same(element, object);
    assert.same(index, 0);
    assert.same(this, context);
    return element;
  }, context);
  assert.throws(() => from({}));
  let arg = null;
  function F(it) {
    return arg = it;
  }
  from.call(F, createIterable([1, 2, 3]), it => it ** 2);
  assert.deepEqual(arg, [1, 4, 9]);
});
