<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Scrapbox Viz</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/detail">Detail</router-link> |
        <router-link to="/viz">Viz</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <v-spacer></v-spacer>
      <span>Powered by <a href="https://github.com/mamezou-tech/sbgraph" target="_blank">sbgraph</a></span>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
