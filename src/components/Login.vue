<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <h1>Login</h1>
      </div>
    </div>
    <b-form @submit="onSubmit" v-if="show">
      <div class="row justify-content-center">
        <div class="col-4 text-left">
          <label for="email">Email Address</label>
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Your email"
          ></b-form-input>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4 text-left">
          <label for="password">Password</label>
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Your password"
          ></b-form-input>
        </div>
      </div>
      <b-button id="loginButton" type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
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
