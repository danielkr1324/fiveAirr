<template>
    <section class="gig-explore main-container full">
      <h1 v-if="$route.query.category">{{ $route.query.category }}</h1>
      <h1 v-else-if="$route.query.title">Results for "{{ $route.query.title }}"</h1>
      <h1 v-else-if="$route.query.subCategory">{{ $route.query.subCategory }}</h1>
      <h1 v-else>Explore</h1>
        <main class=" inner-filter-container main-container full" :class="{ shadow: isShadow }">
          <section class="inner-filter">
            <div class="range-filter ">
                <button class="btn drop-filter"
                   @click.stop="toggleBudget">
                    Budget <i class="fas fa-chevron-down"></i>
                </button>    

                <div v-show="isBudget" class="budget-filter">
                  <div class="price">
                    <div>
                      <p>MIN.</p>
                      <div class="price-input">
                        <input v-model.number="filterBy.min" placeholder="ANY"> <span>$</span>
                      </div>
                    </div>
                    
                    <div>
                      <p>MAX.</p>
                      <div class="price-input">
                        <input v-model.number="filterBy.max"  placeholder="ANY"> <span>$</span>
                      </div>
                    </div>
                  </div>

                  <div class="apply-changes">
                      <button @click.stop="clearFilter">Clear All</button>
                      <button @click.stop="setFilter">Apply</button>
                  </div>
                </div>
              </div>

              <div class="range-filter">
                <button class="btn drop-filter"
                  @click.stop="toggleDelivery">
                  Delivery Time <i class="fas fa-chevron-down"></i>
                 </button>   

                <div v-show="isDelivery" class="delivery-filter">
                  <div class="delivery-options">
                    <div class="delivery-option">
                      <input type="radio" id="one" value="1" v-model.number="filterBy.delivery" />
                      <label for="one">Express 24H</label>
                      <span class="checkmark"></span>
                    </div>

                    <div class="delivery-option">
                      <input type="radio" id="three" value="3" v-model.number="filterBy.delivery" />
                      <label for="three">Up to 3 days</label>
                      <span class="checkmark"></span>
                    </div>  

                    <div class="delivery-option">
                      <input type="radio" id="seven" value="7" v-model.number="filterBy.delivery" />
                      <label for="seven">Up to 7 days</label>
                      <span class="checkmark"></span>
                    </div>

                    <div class="delivery-option">
                      <input type="radio" id="anytime" value="" v-model="filterBy.delivery" />
                      <label for="anytime">Anytime</label>
                      <span class="checkmark"></span>
                    </div>
                  </div>
                  <div class="apply-changes">
                    <button @click.stop="clearFilter">Clear All</button>
                    <button @click.stop="setFilter">Apply</button>
                </div>
              </div> 
            </div>
          </section>
        </main>
        
        <div class="inner-sort">
          <p>{{gigs.length}} services available</p>
          <div class="sort-input light">
          <span> Sort by </span>
          <el-select @change="setFilter()" id="sortby-select" class="m-2 sortby-select"
            v-model="filterBy.sortBy" value="Relevance" placeholder="Relevance" size="large">
            <el-option value="rating" label="Recommended">Recommended</el-option>
            <el-option value="level" label="Best Selling">Best Selling</el-option>
          </el-select>
      </div>
        </div>
        <GigList :gigs="gigs"/>
    </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { gigService } from "../services/gig.service.local"
import { getActionRemoveGig, getActionUpdateGig } from "../store/gig.store"
import GigList from '../cmps/GigList.vue'

export default {
name: 'GigExplore',
data() {
    return {
        gigToAdd: gigService.getEmptyGig(),
        windowTop: window.top.scrollY,
        isShadow: false,
        isBudget: false,
        isDelivery: false,
        filterBy: {},
    }
},
created() {  
    this.$store.dispatch({ type: "loadGigs" });
    const filterBy = this.$store.getters.filterBy    
    this.filterBy = {
      sortBy: filterBy.sortBy ,
      min: filterBy.min ,
      max: filterBy.max ,
      delivery: filterBy.delivery 
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

  mounted() {
    window.addEventListener("scroll", this.onScroll)
},
 beforeDestroy() {
    this.clearFilter()
  },
methods: {
  toggleBudget() {
      this.isDelivery = false
      this.isBudget = !this.isBudget
  },
  toggleDelivery() {
      this.isBudget = false
      this.isDelivery = !this.isDelivery
  },
  closeFilterDrop() {
    this.isBudget = false
    this.isDelivery = false
  },
  setFilter() {    
    
      this.isBudget = false
      this.isDelivery= false   
      this.$store.commit({ type: 'setFilter', filterBy: { ...this.filterBy } })
      this.$router.push({ name: 'GigExplore', query: { ...this.$store.getters.filterBy } })       
  },
  clearFilter() {
      this.filterBy = {}
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
    onScroll(e) {
    this.windowTop = window.top.scrollY
    this.isShadow = this.windowTop > 180 ? true : false
  },
},
components: {
    GigList
},
}
</script>

<style>

</style>