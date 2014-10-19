/*global gapi*/
import Em from 'ember';
import peopleProxy from './plus/people';

export default Em.Mixin.create({

  plusVersion: 'v1',
  apiKeySetOnGapi: false,
  plusReady: false,

  loadPlus: function() {
    if (!this.get('apiKeySetOnGapi')) {
      return;
    }
    console.log('loading plus');
    gapi.client.load('plus', this.get('plusVersion'), function() {
      this.set('plusReady', true);
    }.bind(this));
  }.observes('apiKeySetOnGapi'),

  plus: this,

  people: peopleProxy

});
