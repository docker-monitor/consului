import {post, get} from '../utilities/httpHelper.js';
import {services} from '../store/service.js';
const config = require('../../config');

export const list = async () => {
  console.log('CALL API ...');
  var jsonStr;
  var options = {
    method: 'GET',
    uri: config.dev.api_url + '/api/service/list',
    json: true,
  };
  post(options).then(function (repos) {
    console.log(JSON.parse(repos.list));
    jsonStr = JSON.parse(repos.list);
    services.setMessageAction(jsonStr);
  })
  .catch(function (err) {
    console.log(err);
  });
};

export const register = ({id, name, tags, address, port, router}) => {
  var options = {
    method: 'POST',
    uri: config.dev.api_url + '/api/service/register',
    body: {
      id: id,
      name: name,
      tags: tags,
      address: address,
      port: port,
    },
    json: true,
  };
  post(options).then(function (res) {
    console.log(res);
    list();
  })
  .catch(function (err) {
    console.log(err);
    return false;
  });
};

export const deleteService = ({id}) => {
  var options = {
    method: 'GET',
    uri: config.dev.api_url + '/api/service/delete/' + id,
  };
  get(options).then(function (res) {
    console.log(res);
    // router.push(`/`);
    return true;
  })
  .catch(function (err) {
    console.log(err);
    return false;
  });
};

export const reloadServices = async () => {
  var options = {
    method: 'GET',
    uri: config.dev.api_url + '/api/service/reload',
    json: true,
  };
  get(options).then(function (repos) {
    console.log(repos.StatusCode);
  })
  .catch(function (err) {
    console.log(err);
  });
};
