<template>
  <div class="hello">
    <h1>Login</h1>
    <p v-if="msg"> {{ msg }} </p>
    <p>
      Enter login information:
    </p>
    <input v-model="msg" placeholder="Username" />
    <input placeholder="Password" />
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: {
      type: String,
      default: null
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
