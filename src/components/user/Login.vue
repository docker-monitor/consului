<template>
  <!-- <div id="login-div">
    <div id="login-div-left">
      <img src="../../assets/david.png" class="image">
    </div>

    <div id="login-div-right">
      <div id="login-form">
        <div id="login-item">
          <input type="text" name="userName" placeholder="账户" v-model="userName">
        </div>
        <div id="login-item">
          <input type="password" name="password" placeholder="密码" v-model="password">
        </div>
        <div id="login-item"><button id="loginBtn" @click="loginFun" class="button">登录</button><button id="registerBtn" @click="registerBtn" class="button">注册</button> </div>
      </div>
    </div>
  </div> -->
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <div class="content">
          Log-in to your account
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="userName" placeholder="Account ID" v-model="userName">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password" v-model="password">
            </div>
          </div>
          <div class="ui fluid large teal submit button" @click="loginFun">Login</div>
        </div>

        <div class="ui error message"></div>

      </form>

<!--       <div class="ui message">
        New to us? <a href="#">Sign Up</a>
      </div> -->
    </div>
  </div>
</template>

<style type="text/css">
  body {
    /*background-color: #DADADA;*/
  }
  body > .grid {
    height: 100%;
  }
  .column {
    max-width: 450px;
    margin-top: 200px;
  }
</style>
<script>
  // import '../../assets/css/from.css';
  import {login, register} from '../../services/loginButtonHandler.js';
  export default {
    name: 'login',
    data () {
      return {
        message: 'Welcome to login..',
        userName: '',
        password: '',
      };
    },
    methods: {
      loginFun: function () {
        console.log(this.userName);
        console.log(this.password);
        login({
          userName: this.userName,
          password: this.password,
          router: this.$router,
        });
      },
      registerBtn: function () {
        register({router: this.$router});
      },
    },
  };
</script>