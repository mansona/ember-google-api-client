import Em from 'ember';

export function handleGapiResponse(resolve, reject, DEBUG) {
  return function(res) {
    if (DEBUG) { console.log('gapi response', res); }
    if (res && res.error) { return Em.run(null, reject, res); }
    Em.run(null, resolve, res);
  };
}

function handleGapiResponsePromise(promise, DEBUG) {
  return promise.then(function(res){
    if(DEBUG){
      Em.Logger.debug('gapi success response');
      Em.Logger.debug(res);
    }
  }, function(err){
    //show this regardless of DEBUG status
    Em.Logger.error('gapi error response');
    Em.Logger.error(err);

    throw err;
  });
}

export {handleGapiResponsePromise};
