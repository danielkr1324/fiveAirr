<template>
  <section v-if="user" class="profile main-container full">
    <main class="main-grid">
      <section class="seller-details">
        <div class="user-profile flex column">
          <img class="user-img" :src="user.imgUrl" alt srcset />
          <h2>{{ user.fullname }}</h2>
          <hr />
          <ul>
            <li class="flex space-between">
              <div>
                <span v-html="getSvg('location')"></span>
                Country
              </div>
              <span>{{ user.country }}</span>
            </li>
            <li class="flex space-between">
              <div>
                <span v-html="getSvg('member')"></span>
                Member Since
              </div>
              <span>{{ user.joinedAt }}</span>
            </li>
            <li class="flex space-between">
              <RouterLink to="/seller/dashboard">
                Seller Dashboard
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="user-description">
          <h3>Description</h3>
          <p>{{ user.description }}</p>
        </div>
      </section>

      <section class="orders">
        <p class="active-gigs">Active Gigs</p>
        <section class="seller-gig-list flex">
          <div @click="editGig" class="add-gig flex justify-center align-center">
            <div class="flex column align-center">
              <span class="add-gig-btn">+</span>
              <p>Create a new Gig</p>
            </div>
          </div>
          <SellerGigPreview v-for="gig in gigs" :key="gig._id" :gig="gig" />
        </section>
      </section>
    </main>
  </section>
</template>

<script>
import SellerGigPreview from "@/cmps/SellerGigPreview.vue";
import { svgService } from "@/services/svg.service.js";

export default {
  name: "",
  data() {
    return {
      user: null,
      gigs: []
    };
  },
  async created() {
    window.scrollTo(0, 0);
    var loggedinUser = this.$store.getters.loggedinUser;
    await this.$store.dispatch({ type: "loadUser", userId: loggedinUser._id });
    this.user = this.$store.getters.user;
    await this.$store.dispatch({ type: "loadGigs", query: { ...this.loggedUser } });
    this.gigs = this.$store.getters.gigsByUser;
  },
  methods: {
    editGig() {
      this.$store.dispatch({type: 'addGig'})
      this.$router.push({ name: "GigEdit", query: { ...this.loggedinUser } });
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    }
  },
  computed: {},
  components: { SellerGigPreview }
};
</script>