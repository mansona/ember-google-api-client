/*global gapi*/
import Em from 'ember';
import messagesProxy from './gmail/users/messages';

export default Em.Mixin.create({

  gmailVersion: 'v1',
  apiKeySetOnGapi: false,
  gmailReady: false,

  loadGmail: function() {
    if (!this.get('apiKeySetOnGapi')) {
      return;
    }
    console.log('loading gmail');
    gapi.client.load('gmail', this.get('gmailVersion'), function() {
      this.set('gmailReady', true);
    }.bind(this));
  }.observes('apiKeySetOnGapi'),

  gmail: {
    users: {
      messages: messagesProxy
    }
  },

});
