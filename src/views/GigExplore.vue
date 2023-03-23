<template>
    <section class="gig-filter">
        <div @click="toggleBudget" class="range-filter">
            <p>Budget</p>    
        </div>

         <div @click="toggleDelivery" class="range-filter">
            <p>Delivery Time</p>    
        </div>

        <div v-show="isBudget" class="budget-filter">
            <p>MIN.</p>
            <input v-model.number="filter.filterBy.min"> <span>$</span>
            <p>MAX.</p>
            <input v-model.number="filter.filterBy.max"> <span>$</span>

            <div class="apply-changes">
                <button @click.stop="clearFilter">Clear All</button>
                <button @click.stop="setFilter">Apply</button>
            </div>
        </div>

        <div v-show="isDelivery" class="delivery-filter">
            <p>Delivery Time</p>
            <input type="checkbox" id="" v-model="filter.filterBy.delivery">
            <div class="apply-changes">
                <button @click.stop="clearFilter">Clear All</button>
                <button @click.stop="setFilter">Apply</button>
            </div>
        </div>

           
        <GigList :gigs="gigs"/>
    </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { gigService } from "../services/gig.service.local"
import { getActionRemoveGig, getActionUpdateGig } from "../store/gig.store"
import GigList from '../views/GigList.vue'

export default {
name: 'GigExplore',
data() {
    return {
        gigToAdd: gigService.getEmptyGig(),
        isBudget: false,
        isDelivery: false,
        filter: {
            filterBy: {
                min: null,
                max: null,
                delivery: null
            },

            sortBy: {
                by: '',
                desc: 1,
            },
        },
        deliveryOptions: [
        {
          value: 1,
          label: 'Express 24H',
        },
        {
          value: 3,
          label: 'Up to 3 days',
        },
        {
          value: 7,
          label: 'Up to 7 days',
        },
        {
          value: '',
          label: 'Anytime',
        },
      ]
    }
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
    toggleBudget() {
        this.isBudget = !this.isBudget
    },
    toggleDelivery() {
        this
    },
    setFilter() {        
        this.$store.dispatch({ type: 'loadGigs', filter: this.filter })       
    },
    clearFilter() {
        this.filter.filterBy = {
            min: null,
            max: null
        }
        this.setFilter()
    },
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
    },
  },
components: {
    GigList
},
}
</script>

<style>

</style>