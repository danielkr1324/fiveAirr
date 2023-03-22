<template>
  <header>
    <nav class="flex align-center space-between">
      <RouterLink to="/">
        <h1 class='logo'>FiveAir</h1>
      </RouterLink>
      <section>
        <RouterLink to="/explore">Explore</RouterLink>
        <!-- <RouterLink to="/review">Reviews</RouterLink> -->
        <!-- <RouterLink to="/chat">Chat</RouterLink> -->
        <RouterLink to="/login">Login / Signup</RouterLink>
      </section>
    </nav>
    <section class="loggedin-user" v-if="loggedInUser">
      <RouterLink :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </RouterLink>
      <!-- <span>{{ loggedInUser.score.toLocaleString() }}</span> -->
      <img :src="loggedInUser.imgUrl" />
    </section>
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>