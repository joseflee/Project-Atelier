const axios = require('axios');
const gitToken = require('../config.js');

const postInteractions = (element, widget, time) => {
  const params = {
    element: element,
    widget: widget,
    time: time,
  };

  let options = {
    method: 'POST',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
    headers: { Authorization: gitToken.Token },
    data: params
  };

  return axios(options)
    .then((response) => {
      console.log('back1');
    })
    .catch(err => console.log('ERROR: ', err));
};

module.exports = postInteractions;