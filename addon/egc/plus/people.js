/*global gapi*/

import Em from 'ember';
import {
  handleGapiResponse
}
from '../utils';

export default Em.Object.create({
  DEBUG: true,

  getReq: function(userId, fields) {
    Em.assert("userId is required", userId);

    var query = {
      userId: userId
    };

    if(fields){
      query.fields = encodeURIComponent(fields.join(','));
    }

    return this.request('get', query);
  },

  list: function() {
    Em.assert("list function not implemented");
  },

  listByActivity: function() {
    Em.assert("listByActivity function not implemented");
  },

  search: function() {
    Em.assert("search function not implemented");
  },

  request: function(method, rest) {
    if (this.get('DEBUG')) {
      console.log('sending gapi request', arguments);
    }

    return new Em.RSVP.Promise(function(resolve, reject) {
      gapi.client.plus
          .people[method]
          .call(null, rest)
          .execute(handleGapiResponse(resolve, reject, this.get('DEBUG')));
    }.bind(this));
  }
});
