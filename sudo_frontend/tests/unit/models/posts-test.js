import { module, test } from 'qunit';

import { setupTest } from 'sudo-frontend/tests/helpers';

module('Unit | Model | posts', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('posts', {});
    assert.ok(model);
  });
});
