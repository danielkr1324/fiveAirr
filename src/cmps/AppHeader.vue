<template>
  <header
    class="main-container full"
    :class="{ 'navbar-scroll': isScroll, 'home-navbar': isHomepage, 'other-navbar': isNotHomepage }"
  >
    <nav class="flex align-center space-between">
      <RouterLink to="/" @click="goHome">
        <h1 class="logo">fiveairr</h1>
      </RouterLink>

      <form
        v-if="isFarScroll ||isNotHomepage"
        @submit="txtFilter(filterBy.txt)"
        class="search-bar flex"
      >
        <input
          type="text"
          v-model="filterBy.txt"
          placeholder=" What service are you looking for today?"
        />
        <button>
          <span v-html="getSvg('search')"></span>
        </button>
      </form>

      <section class="header-links flex align-center space-between">
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/explore">Become a Seller</RouterLink>
        <RouterLink to="/explore">Sign in</RouterLink>
        <RouterLink to="/login">Join</RouterLink>
      </section>
    </nav>
    <section v-if="isFarScroll ||isNotHomepage" class="main-container full categories-list">
      <GigFilter @filter="filter" class="flex align-center" :type="'header'" />
      <!-- <ul class="flex align-center clean-list">
        <li
          v-for="category in categories"
          :key="category"
          @click="categoryFilter(`${category.name}`)"
        >
          <routerLink to="/explore">{{ category.name }}</routerLink>
        </li>
      </ul>-->
    </section>
    <!-- <section class="loggedin-user" v-if="loggedInUser">
      <RouterLink :to="`/user/${loggedInUser._id}`">{{ loggedInUser.fullname }}</RouterLink>
      <img :src="loggedInUser.imgUrl" />
    </section>-->
  </header>
</template>
<script>
import { svgService } from "@/services/svg.service.js";
import GigFilter from "../cmps/GigFilter.vue";
export default {
  data() {
    return {
      filterBy: {
        category: "",
        txt: ""
      },
      isScroll: false,
      isFarScroll: false,
      categories: [
        { name: "Graphics & Design" },
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
    goHome() {
      window.scrollTo(0, 0);
      this.isScroll = false;
      this.isFarScroll = false;
    },
    // categoryFilter(category) {
    //   this.filterBy.category = category;
    //   this.filter();
    // },
    txtFilter(txt) {
      this.filterBy.txt = txt;
      this.filter();
    },
    filter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy: { ...filterBy } });
      this.$router.push({
        name: "GigExplore",
        query: { ...this.$store.getters.filterBy }
      });
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
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
  },
  components: { GigFilter }
};
</script>