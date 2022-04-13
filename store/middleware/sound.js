const sound = store => next => action => {
  // console.log(store.getState().entities.sound)
  // console.log(store.getState().entities.sound.audioText)
  next(action);
  // if (action.type === 'sound/setSound') {
  //   clearTimeout(store.getState().entities.sound.timeout);
  //   const timeout = setTimeout(() => next({ ...action, payload: '' }), 5000);
  //   next({ type: 'sound/setTimeout', payload: timeout })
  // }
};

export default sound;