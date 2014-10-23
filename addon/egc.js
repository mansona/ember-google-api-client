import Em from 'ember';
import ReadyMixin from './egc/ready';
import AuthorizationMixin from './egc/authorization';
import DriveMixin from './egc/drive';
import PlusMixin from './egc/plus';
import GmailMixin from './egc/gmail';

var EGC = Em.Object.extend(
  ReadyMixin,
  AuthorizationMixin,
  DriveMixin,
  PlusMixin,
  GmailMixin,
  {
    DEBUG: true,
    getScript: Em.$.getScript
  });

Em.EGC = EGC;
export default EGC;
