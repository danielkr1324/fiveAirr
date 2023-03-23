<template>
  <div class="container home">
    <ul v-if="gigs" class="gig-list">
      <GigPreview v-for="gig in gigs" :gig="gig" :key="gig._id" />
    </ul>
    <!-- <hr />
    <form @submit.prevent="addGig()">
      <h2>Add gig</h2>
      <input type="text" v-model="gigToAdd.title" />
      <button>Save</button>
    </form>-->
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { gigService } from "../services/gig.service.local";
import { getActionRemoveGig, getActionUpdateGig } from "../store/gig.store";
import GigPreview from "../cmps/GigPreview.vue";
export default {
  data() {
    return {
      gigToAdd: gigService.getEmptyGig()
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    gigs() {
      return this.$store.getters.gigs;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadGigs" });
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    async addGig() {
      try {
        await this.$store.dispatch({ type: "addGig", gig: this.gigToAdd });
        showSuccessMsg("Gig added");
        this.gigToAdd = gigService.getEmptyGig();
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add gig");
      }
    },
    async removeGig(gigId) {
      try {
        await this.$store.dispatch(getActionRemoveGig(gigId));
        showSuccessMsg("Gig removed");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot remove gig");
      }
    },
    async updateGig(gig) {
      try {
        gig = { ...gig };
        gig.price = +prompt("New price?", gig.price);
        await this.$store.dispatch(getActionUpdateGig(gig));
        showSuccessMsg("Gig updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot update gig");
      }
    }
    // async addGigMsg(gigId) {
    //   try {
    //     await this.$store.dispatch(getActionAddGigMsg(gigId))
    //     showSuccessMsg('Gig msg added')
    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot add gig msg')
    //   }
    // },
    // printGigToConsole(gig) {
    //   console.log('Gig msgs:', gig.msgs)
    // }
  },
  components: {
    GigPreview
  }
};
</script>
