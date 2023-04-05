import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'sudo-frontend/config/environment';

export default JSONAPIAdapter.extend({
  session: service(),
  host: ENV.APP.API_HOST,
  namespace: `${ENV.APP.API_NAMESPACE}/${ENV.APP.API_VERSION}`,
  headers: computed('session.data.authenticated.jwt', function () {
    return {
      Authorization: `Bearer ${this.get('session.data.authenticated.jwt')}`,
      'Content-Type': 'application/vnd.api+json',
    };
  }),
});
