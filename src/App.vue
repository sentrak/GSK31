<template>
  <v-app id="inspire">

      <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Muli+Vernon+Adams");
@import url('https://fonts.googleapis.com/css2?family=Muli:wght@800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Muli:wght@300;800&display=swap');
#inspire{
  background: #121D3C;
  margin: auto;
}
</style>