<template>
  <div>
    <table class="ui celled selectable table">
      <thead>
        <tr><th>Service Name</th>
        <th>Service Address</th>
        <th>Service Port</th>
        <th>Service Tags</th>
        <th class="center aligned">Action</th>
      </tr></thead>
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
              <i class="plus icon"></i> Register New Services
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
const config = require('../../config');
export default {
  data () {
    return {
      projectList: "",
    }
  },
  created: function () {
    this.FetchData();
  },
  method: {
    FetchData: function () {
      var that = this;
      var options = {
        method: 'GET',
        uri: config.dev.api_url + '/list',
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
    ChangeModalStatus: function (a) {
      if (a === 'hide') {
        this.HideModal();
      }
      else {
        this.ShowModal();
      }
      // if (this.isActive) {
      //   this.isActive = false;
      // }
      // else {
      //   this.isActive = true;
      // }
    },
  }
}
</script>