<template>
  <transition>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h1>Login</h1>
        </div>
      </div>
      <b-form @submit="onSubmit" v-if="show">
        <div class="row justify-content-center">
          <div class="col-2-md col-2-sm text-left">
            <label for="user">Username</label>
            <b-form-input
              id="user"
              v-model="form.user"
              type="text"
              required
              placeholder="Your username"
            ></b-form-input>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-2-md col-2-sm text-left">
            <label for="password">Password</label>
            <b-form-input
              id="password"
              v-model="form.pass"
              type="password"
              required
              placeholder="Your password"
            ></b-form-input>
          </div>
        </div>
        <b-button id="loginButton" type="submit" variant="primary">Login</b-button>
      </b-form>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user: '',
        pass: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()

      // Post to login api
      let params = {
        user: this.form.user,
        pass: this.form.pass
      }
      axios.post('http://localhost:4000/users/login', params)
      .then(res => {
        // TODO: Save uuid
        // TODO: Load calendar
        console.log(res.data);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label, button {
  margin-top: 20px;
}
</style>
