<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="notification-preview">
      <p class="notification-preview__text">
        This is a preview mode. Some data may not be available.
      </p>
    </div>
    <Header class="mainView" />
    <router-view />
    <Notification />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Notification from "@/components/Notification.vue";

export default {
  components: {
    Header,
    Notification,
  },
};
</script>

<style lang="scss">
body {
  margin: 0 !important;
}
#app {
  font-family: var(--font-family-secondary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 18px solid var(--c-black);
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
.mainView {
  margin-top: 0.95rem;
}
.notification-preview {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background-color: #f0ad4e;
  color: #90682f;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #90682f;
  &__text {
    margin: 0;
    font-weight: 500;
    font-size: 0.875rem;
  }
}
</style>
