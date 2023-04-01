<template>
  <header
    class="main-container full"
    :class="{ 'navbar-scroll': isScroll, 'home-navbar': isHomepage, 'other-navbar': isNotHomepage }"
  >
    <!-- MOBILE MENU -->
    <!-- v-clickOutside="openMenu" -->
    <section v-if="isMenuOpen" @click="openMenu" class="side-menu flex">
      <a v-if="!loggedInUser" class="login-link" @click="onSetAuthType('login')">Sign in</a>
      <a v-if="!loggedInUser" class="join" @click="onSetAuthType('signup')">Join</a>
      <div v-if="loggedInUser" class="user-info flex">
        <div class="img-container">
          <img class="header-user-img" v-if="loggedInUser" :src="loggedInUser.imgUrl" alt />
        </div>
        <p v-if="loggedInUser">{{ loggedInUser.fullname }}</p>
      </div>
      <RouterLink @click="resetFilter" to="/explore">Explore</RouterLink>
      <div v-if="(!loggedInUser || !loggedInUser.isSeller)" @click="registerSeller">
        <a>Become a Seller</a>
      </div>
      <router-link v-if="(loggedInUser)" to="/seller/profile">Profile</router-link>
      <!-- <router-link v-if="(loggedInUser && loggedInUser.isSeller)" to="/seller/orders">Dashboard</router-link> -->

      <a v-if="loggedInUser" class="logout-link" @click="doLogout">Logout</a>
    </section>

    <nav class="flex space-between">
      <section class="hamburger-menu far-hamburger flex">
        <button class="hamburger-icon flex" @click="openMenu" v-html="getSvg('hamburger')"></button>
      </section>

      <section class="logo-container flex">
        <section class="hamburger-menu close-hamburger flex">
          <button class="hamburger-icon flex" @click="openMenu" v-html="getSvg('hamburger')"></button>
        </section>
        <RouterLink to="/" @click="goHome">
          <h1 class="logo">fiveairr</h1>
        </RouterLink>
      </section>

      <form
        v-if="isFarScroll || isNotHomepage"
        @submit.prevent="txtFilter(filterBy.title)"
        class="search-bar flex"
      >
        <input
          type="text"
          v-model="filterBy.title"
          placeholder=" What service are you looking for today?"
        />
        <button>
          <span v-html="getSvg('search')"></span>
        </button>
      </form>

      <section class="header-links flex align-center space-between">
        <RouterLink @click="resetFilter" to="/explore">Explore</RouterLink>
        <RouterLink to>Become a Seller</RouterLink>
        <a v-if="!loggedInUser" class="login-link" @click="onSetAuthType('login')">Sign in</a>
        <a v-if="!loggedInUser" class="join" @click="onSetAuthType('signup')">Join</a>
        <a v-if="loggedInUser" class="logout-link" @click="doLogout">Logout</a>
        <RouterLink v-if="loggedInUser" to="/seller/profile" class="seller-img">
          <img class="header-user-img" v-if="loggedInUser" :src="loggedInUser.imgUrl" alt />
        </RouterLink>
        <!-- <RouterLink class="join" to="/login">Join</RouterLink> -->
      </section>
    </nav>
    <LoginSignup :typeOfAuth="type" v-show="showLoginModal" @closeModal="closeModal" />

    <!-- <section v-if="isFarScroll ||isNotHomepage" class="main-container full categories-list"> -->
    <GigFilter
      v-if="isFarScroll || isNotHomepage"
      @filter="filter"
      class="main-container full categories-list"
      :type="'header'"
    />
    <!-- </section> -->
    <!-- <section class="loggedin-user" v-if="loggedInUser">
      <RouterLink :to="`/user/${loggedInUser._id}`">{{ loggedInUser.fullname }}</RouterLink>
      <img :src="loggedInUser.imgUrl" />
    </section>-->
  </header>
</template>
<script>
import { svgService } from "@/services/svg.service.js";
import { stringifyQuery } from "vue-router";
import GigFilter from "../cmps/GigFilter.vue";
import LoginSignup from "./LoginSignup.vue";

export default {
  data() {
    return {
      showLoginModal: false,
      type: null,
      filterBy: {
        category: "",
        title: ""
      },
      isMenuOpen: false,
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
  // created() {
  //   this.$store.dispatch({ type: 'loadGigs', filterBy: this.$route.query })
  // },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    this.filterBy = {};
    // this.filter({});
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
    resetFilter() {
      this.filterBy.category = "";
      this.filter(this.filterBy);
    },
    txtFilter(title) {
      this.filterBy.title = title;
      this.filter(this.filterBy);
      this.filterBy.title = "";
    },
    filter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy: { ...filterBy } });

      this.$router.push({
        name: "GigExplore",
        query: { ...this.$store.getters.filterBy }
      });
        this.$store.dispatch({ type: 'loadGigs', filterBy: this.$store.getters.filterBy})
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    onSetAuthType(type) {
      this.type = type;
      this.showLoginModal = !this.showLoginModal;
    },
    closeModal(ans) {
      this.showLoginModal = ans;
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
    openMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  },
  computed: {
    loggedInUser() {
      console.log(this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
    isHomepage() {
      return this.$route.path === "/";
    },
    isNotHomepage() {
      return this.$route.path !== "/";
    }
  },
  components: {
    GigFilter,
    LoginSignup
  }
};
</script>