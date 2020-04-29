<template>
  <div id="app">
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item v-show="!token"><router-link to="/login">Login</router-link></b-nav-item>
        <b-nav-item v-show="iCalStr"><router-link to="/calendar">Calendar</router-link></b-nav-item> 
        <b-nav-item v-show="token" @click="logout"><router-link to="/">Logout</router-link></b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-alert
      class="alert-fixed"
      :show="dismissCountDown"
      dismissible
      fade
      variant="info"
      @dismiss-count-down="countDownChanged"
    >
      Logged in
    </b-alert>

    <transition name="slide" mode="out-in">
      <router-view v-if="show" v-bind:iCalStr="iCalStr" @userCal="updateUserCal"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      token: '',
      iCalStr: ''
    }
  },
  mounted() {
    this.show = true;
  },
  methods : {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    // Update variables from child emit
    updateUserCal(token, iCalStr) {
      this.token = token
      this.iCalStr = iCalStr;
      this.$router.push("/calendar");
      this.showAlert();
    },
    logout() {
      this.token = '';
      this.iCalStr = '';
    }
  }
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  margin-bottom: 50px;
}
.alert-fixed {
    position: fixed; 
    top: 0px; 
    left: 0px; 
    width: 100%;
    z-index: 10; 
}
</style>
