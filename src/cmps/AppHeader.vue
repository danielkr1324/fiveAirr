<template>
  <header
    class="main-container full"
    :class="{ 'navbar-scroll': isScroll, 'home-navbar': isHomepage, 'other-navbar': isNotHomepage }"
  >
    <nav class="flex align-center space-between">
      <RouterLink to="/">
        <h1 class="logo">fiveairr</h1>
      </RouterLink>
      <section class="header-links">
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/login">Login / Signup</RouterLink>
      </section>
    </nav>
    <section v-if="isFarScroll ||isNotHomepage" class="main-container full categories-list">
      <nav>
        <ul class="flex align-center clean-list">
          <li
            v-for="category in categories"
            :key="category"
            @click="categoryFilter(`${category.name}`)"
          >
            <routerLink to="/explore">{{ category.name }}</routerLink>
          </li>
        </ul>
      </nav>
    </section>
    <!-- <section class="loggedin-user" v-if="loggedInUser">
      <RouterLink :to="`/user/${loggedInUser._id}`">{{ loggedInUser.fullname }}</RouterLink>
      <img :src="loggedInUser.imgUrl" />
    </section>-->
  </header>
</template>
<script>
export default {
  data() {
    return {
      filterBy: {
        category: ""
      },
      isScroll: false,
      isFarScroll: false,
      categories: [
        { name: "Graphics&Design" },
        { name: "Digital Marketing" },
        { name: "Writing & Translation" },
        { name: "Video & Animation" },
        { name: "Music & Audio" },
        { name: "Programming & Tech" },
        { name: "Photography" },
        { name: "Business" },
        { name: "AI Services" }
      ]
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (this.$route.path !== "/") return;
      if (window.scrollY > 0) {
        this.isScroll = true;
        if (window.scrollY > 150) {
          this.isFarScroll = true;
        } else this.isFarScroll = false;
      } else {
        this.isScroll = false;
      }
    },
    categoryFilter(category) {
      this.filterBy.category = category;
      this.filter();
    },
    filter() {
      this.$emit("filter", { ...this.filterBy });
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