<template>
  <header class="main-container full" :class="{ 'navbar-scroll': isScroll, 'home-navbar': isHomepage, 'other-navbar': isNotHomepage }">
    <nav class="flex align-center space-between">
      <RouterLink to="/">
        <h1 class="logo">fiveairr</h1>
      </RouterLink>
      <section class="header-links">
        <RouterLink to="/explore">Explore</RouterLink>
        <!-- <RouterLink to="/review">Reviews</RouterLink> -->
        <!-- <RouterLink to="/chat">Chat</RouterLink> -->
        <RouterLink to="/login">Login / Signup</RouterLink>
      </section>
    </nav>
    <section class="loggedin-user" v-if="loggedInUser">
      <RouterLink :to="`/user/${loggedInUser._id}`">{{ loggedInUser.fullname }}</RouterLink>
      <!-- <span>{{ loggedInUser.score.toLocaleString() }}</span> -->
      <img :src="loggedInUser.imgUrl" />
    </section>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isScroll: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      console.log("this.$route.path:", this.$route.path);
      if (this.$route.path !== "/") return;
      if (window.scrollY > 0) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    isHomepage() {
      return this.$route.path === "/";
    },
    isNotHomepage() {
      return this.$route.path !== "/";
    }
  }
};
</script>