<template>
  <section class="profile main-container full">
    <main class="main-grid">
      <section class="seller-details">
        <h1>Details</h1>
        <img class="user-img" :src="user.imgUrl" alt srcset />
        <p>{{ user.fullname }}</p>
        <p>{{ user.country }}</p>
        <p>{{user.joinedAt}}</p>
        <p>{{user.description}}</p>
        <!-- <pre>{{ user }}</pre> -->
        <button @click="check"></button>
      </section>

      <section class="orders">
        <h1>Active Gigs</h1>
        <SellerGigPreview v-for="gig in gigs" :key="gig._id" :gig="gig" />
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
      //   user: null,
      user: {
        _id: "u101",
        fullname: "Test Seller",
        imgUrl:
          "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        country: "United States",
        joinedAt: "April 2020",
        description:
          "Hello, this is the Test Seller,Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
        username: "user",
        password: 1234,
        level: "basic/premium",
        reviews: [
          {
            id: "madeId",
            gig: "{optional-mini-gig}",
            txt: "Very kind and works fast",
            rate: 4,
            by: {
              _id: "u102",
              fullname: "user2",
              imgUrl: "/img/img2.jpg"
            }
          }
        ]
      },
      gigs: []
    };
  },
  async created() {
    window.scrollTo(0, 0);
    await this.$store.dispatch({ type: "loadUser", userId: "u101" });
    // this.user = this.$store.getters.user;
    await this.$store.dispatch({ type: "loadGigs" });
    // this.gigs = storeGigs;
    this.gigs = this.$store.getters.gigsByUser;
  },
  methods: {
    check() {
      console.log("this.$store.getters.user:", this.$store.getters.user);
      console.log(
        "this.$store.getters.gigsByUser:",
        this.$store.getters.gigsByUser
      );
    }
    // async loadGig() {
    //   try {
    //     const { gigId } = this.$route.params;
    //     const gig = await gigService.getById(gigId);
    //     this.gig = gig;
    //   } catch {
    //     console.log("Could Not load gig");
    //   }
    // }
  },
  computed: {},
  components: { SellerGigPreview }
};
</script>