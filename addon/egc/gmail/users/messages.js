/*global gapi*/

import Em from 'ember';
import {
  handleGapiResponse
}
from '../../utils';

export default Em.Object.create({
  DEBUG: true,

  list: function(userId){
    Em.assert("userId is required", userId);

    return this.request('list', {
      userId: userId
    });
  },

  getMany: function(userId, ids){
    Em.assert("ids is required", ids);
    Em.assert("ids must be of type array", Em.isArray(ids));

    //add userId to object
    ids.forEach(function(id){
      id.userId = userId;
    });

    return this.multiRequest('get', ids);
  },

  multiRequest: function(method, paramsArray){

    if (this.get('DEBUG')) {
      console.log('sending gapi multi request', arguments);
    }

    var batch = gapi.client.newBatch();

    paramsArray.forEach(function(params){
      batch.add(
        gapi.client.gmail.users
          .messages[method]
          .call(null, params));
    });

    return new Em.RSVP.Promise(function(resolve, reject) {
          batch.execute(handleGapiResponse(resolve, reject, this.get('DEBUG')));
    }.bind(this));
  },

  request: function(method, rest) {
    if (this.get('DEBUG')) {
      console.log('sending gapi request', arguments);
    }

    return new Em.RSVP.Promise(function(resolve, reject) {
      gapi.client.gmail.users
          .messages[method]
          .call(null, rest)
          .execute(handleGapiResponse(resolve, reject, this.get('DEBUG')));
    }.bind(this));
  }
});
