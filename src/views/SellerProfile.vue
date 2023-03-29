<template>
  <section v-if="user" class="profile main-container full">
    <main class="main-grid">
      <section class="seller-details">
        <h1>Details</h1>
        <img class="user-img" :src="user.imgUrl" alt srcset />
        <p>{{ user.fullname }}</p>
        <p>{{ user.country }}</p>
        <p>{{user.joinedAt}}</p>
        <p>{{user.description}}</p>
      </section>

      <section class="orders">
        <h1>Active Gigs</h1>
        <section>
          <div @click="editGig" class="add-gig flex justify-center align-center">
            <div class="flex column align-center">
              <span class="add-gig-btn">+</span>
              <p>Create a new Gig</p>
            </div>
          </div>
          <SellerGigPreview v-for="gig in gigs" :key="gig._id" :gig="gig" />
        </section>
      </section>

      <section class="statistics">Description</section>
    </main>
  </section>
</template>

<script>
import SellerGigPreview from "@/cmps/SellerGigPreview.vue";

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
    await this.$store.dispatch({ type: "loadUser", userId: "u101" });
    this.user = this.$store.getters.user;
    await this.$store.dispatch({ type: "loadGigs" });
    this.gigs = this.$store.getters.gigsByUser;
  },
  methods: {
    editGig() {
      this.$router.push({ name: "gig-edit", query: { ...this.loggedUser } });
    }
  },
  computed: {},
  components: { SellerGigPreview }
};
</script>