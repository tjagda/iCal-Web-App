<template>
  <transition>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <h1>iCal Editor</h1>
          <h4>by Josh Agda</h4>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
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
