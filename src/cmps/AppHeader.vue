<template>
  <header>
    <nav class="flex full align-center space-between" :class="{'navbar-scroll': isScroll}">
      <RouterLink to="/">
        <h1 class="logo">FiveAir</h1>
      </RouterLink>
      <section>
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/details/gPYQr">Gig details</RouterLink>
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
    }
  }
};
</script>