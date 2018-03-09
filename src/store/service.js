var services = {
  debug: true,
  state: {
    userName: 'Hello!',
    projectList: '',
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue);
    this.state.projectList = newValue;
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered');
    this.state.projectList = '';
  },
};

export {
  services,
};
