<template>
  <div>
    <div class="ui inverted segment">
      <div class="ui inverted secondary pointing menu">
        <a class="item active">
          CONSUL DASHBOARD
        </a>
        <a class="item right">
          <!-- <i>{{userName}}</i> -->
          <i class="spy icon large"></i>
        </a>
      </div>
    </div>
    <!-- <h4 class="ui horizontal divider header">
      <i class="tag icon"></i>
      Description
    </h4>
    <p>Show all registed services about consul.</p> -->
    <h4 class="ui horizontal divider header">
      <i class="bar chart icon"></i>
    </h4>
    <table class="ui celled selectable table">
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Service Address</th>
          <th>Service Port</th>
          <th>Service Tags</th>
          <th class="center aligned">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in projectList" :key="item.ID">
          <td>
            <div class="ui blue ribbon label">{{ item.Service }}</div>
          </td>
          <td>
            {{ item.Address }}
          </td>
          <td>
            {{ item.Port }}
          </td>
          <td>
            <span class="ui tag labels" v-for="tagList in item.Tags">
              <div v-if="tagList == 'docker'" class="ui label" v-bind:class="{ teal: true}">{{ tagList }}</div>
              <div v-if="tagList == 'server'" class="ui label" v-bind:class="{ teal: true}">{{ tagList }}</div>
            </span>
          </td>
          <td class="center aligned">
            <button class="ui floated tiny red labeled icon button" @click="DeleteItem(item.ID)">delete<i class="remove icon"></i></button>
            <button class="ui floated tiny primary labeled icon button" @click="EditService(item)">edit<i class="edit icon"></i></button>
          </td>
        </tr>
      </tbody>
      <tfoot class="full-width">
        <tr>
          <th colspan="5">
            <div class="ui right floated small primary labeled icon button" @click="ChangeModalStatus">
              <i class="plus icon"></i> Add
            </div>
            <i class="ui primary basic button" @click="ReloadServices">Reload Services</i>
          </th>
        </tr>
      </tfoot>
    </table>
    <div class="ui modal small" v-bind:class="{ active: isActive}">
      <i class="close icon"></i>
      <div class="header">
        Register New Services
      </div>
      <div class="image content">
        <div class="ui form">
          <div class="three fields">
            <div class="field">
              <label>Service Name</label>
              <input class="input" placeholder="Service Name" v-model="servicesNames" type="text">
            </div>
            <div class="field">
              <label>Service IP</label>
              <input class="input" placeholder="format(0.0.0.0)" v-model="servicesIp" type="text">
            </div>
            <div class="field">
              <label>Service Port</label>
              <input class="input" placeholder="Service Port" v-model="servicesPort" type="text">
            </div>
          </div>
          <div class="one fields">
            <label>Service Tags: </label>
            <div class="ui tag labels">
              <a class="ui label" v-bind:class="{ teal: dockerFlagSlected}" @click="DockerFlags">
                docker
              </a>
              <a class="ui label" v-bind:class="{ teal: serverFlagSlected}" @click="ServerFlags">
                server
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui red cancel inverted button" @click="ChangeModalStatus('hide')">
          <i class="remove icon"></i>
          No
        </div>
        <div class="ui green ok inverted button" @click="RegisterService">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>
    <div class="ui success message" @click="HideMessage" hidden="true">
      <i class="close icon"></i>
      <div class="header">
        Your action successed.
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import {reloadServices} from '../services/CommonHandler.js';
import {services} from '../store/service.js';
import {post, get} from '../utilities/httpHelper.js';
import {store} from '../store/session.js';
const config = require('../../config');
export default {
  name: 'home',
  data () {
    return {
      projectList: '',
      isActive: false,
      servicesNames: '',
      servicesIp: '',
      servicesPort: '',
      servicesTags: '',
      dockerLabel: '',
      serverLabel: '',
      dockerFlagSlected: false,
      serverFlagSlected: false,
      alertFlag: true,
      Id: '',
      userName: '',
    };
  },
  created: function () {
    this.FetchData();
    this.userName = store.state.userName;
  },
  components: {
    // Alert,
  },
  methods: {
    FetchData: function () {
      var that = this;
      var options = {
        method: 'GET',
        uri: config.dev.api_url + '/api/service/list',
        json: true,
      };
      post(options).then(function (repos) {
        that.projectList = JSON.parse(repos.list);
        services.setMessageAction(that.projectList);
      })
      .catch(function (err) {
        console.log(err);
      });
    },
    // change the modal status
    ChangeModalStatus: function (a) {
      if (a === 'hide') {
        this.HideModal();
      }
      else {
        this.ShowModal();
      }
    },
    // register a service
    RegisterService: function () {
      var that = this;
      var options = {
        method: 'POST',
        uri: config.dev.api_url + '/api/service/register',
        body: {
          id: this.Id,
          name: this.servicesNames,
          tags: [this.dockerLabel, this.serverLabel],
          address: this.servicesIp,
          port: parseInt(this.servicesPort),
        },
        json: true,
      };
      post(options).then(function (res) {
        console.log(res);
        var jsonStr = JSON.parse(res.list);
        that.projectList = jsonStr;
        console.log('done call web service......');
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });
      this.ChangeModalStatus('hide');
      // this.projectList = services.state.projectList;
      this.ShowMessage();
    },
    EditService: function (item) {
      var that = this;
      that.servicesNames = item.Service;
      that.servicesIp = item.Address;
      that.servicesPort = item.Port;
      item.Tags.forEach(function (element, index) {
        if (element === 'docker') {
          that.dockerFlagSlected = true;
        }
        else if (element === 'server') {
          that.serverFlagSlected = true;
        };
      });
      this.ChangeModalStatus();
    },
    DeleteItem: function (ID) {
      this.Id = ID;
      // deleteService({
      //   id: this.Id,
      // });
      var options = {
        method: 'GET',
        uri: config.dev.api_url + '/api/service/delete/' + this.Id,
      };
      get(options).then(function (res) {
        console.log(res);
        // router.push(`/`);
        // return true;
      })
      .catch(function (err) {
        console.log(err);
        // return false;
      });
      this.FetchData();
    },
    DockerFlags: function () {
      if (this.dockerFlagSlected) {
        this.dockerFlagSlected = false;
        this.dockerLabel = '';
      }
      else {
        this.dockerFlagSlected = true;
        this.dockerLabel = 'docker';
      }
    },
    ServerFlags: function () {
      if (this.serverFlagSlected) {
        this.serverFlagSlected = false;
        this.serverLabel = '';
      }
      else {
        this.serverFlagSlected = true;
        this.serverLabel = 'server';
      }
    },
    ReloadServices: function () {
      reloadServices();
      this.FetchData();
    },
    HideMessage: function () {
      $('.message').hide();
    },
    ShowMessage: function () {
      $('.message').show();
    },
    ShowModal: function () {
      $('.ui.modal.small').fadeIn('slow');
    },
    HideModal: function () {
      $('.ui.modal.small').fadeOut('slow');
      $('.input').val('');
    },
    DropDown: function () {
      $('.ui.dropdown').dropdown();
    },
  },
};
</script>
