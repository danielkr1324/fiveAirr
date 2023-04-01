<template>
    <section class="gig-explore main-container full">
      <h1 v-if="$route.query.category">{{ $route.query.category }}</h1>
      <h1 v-else-if="$route.query.title">Results for "{{ $route.query.title }}"</h1>
      <h1 v-else-if="$route.query.subCategory">{{ $route.query.subCategory }}</h1>
      <h1 v-else>Explore</h1>
        <main  class=" inner-filter-container main-container full" :class="{ shadow: isShadow }">
          <section @click.self="closeFilterDrop" class="inner-filter">
            <div  class="range-filter ">
                <button class="btn drop-filter"
                   @click.stop="toggleBudget">
                    Budget <i class="fas fa-chevron-down"></i>
                </button>    

                <div  v-show="isBudget" class="budget-filter">
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
          <span class="sort-title"> Sort by </span>
          <el-select @change="setFilter()" id="sortby-select" class="m-2 sortby-select"
            v-model="filterBy.sortBy" value="Best Selling" placeholder="Best Selling" size="large">
            <el-option value="rating" label="Recommended">Recommended</el-option>
            <el-option value="level" label="Best Selling">Best Selling</el-option>
          </el-select>
      </div>
        </div>
        <GigList :gigs="gigs"/>
    </section>
</template>

<script>
import { gigService } from "../services/gig.service.js"
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
    this.$store.commit({ type: "setFilter", filterBy: this.$route.query  }); 
    // this.$store.dispatch({ type: 'loadGigs', filterBy: this.$route.query })
},
computed: {
  gigs() { 
    return this.$store.getters.gigs;
  }
},

  mounted() {
    window.addEventListener("scroll", this.onScroll)
},
 beforeDestroy() {
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
  loadGigs() {
      this.$store.dispatch({ type: 'loadGigs', filterBy: this.$store.getters.filterBy })
  },
  setFilter() {
      this.$store.commit({ type: "setFilter", filterBy: { ...this.filterBy } });    
      this.isBudget = false
      this.isDelivery= false   
      this.$router.push({ name: 'GigExplore', query: { ...this.$store.getters.filterBy } })       
      this.loadGigs()
  },
  clearFilter() {
      this.filterBy = {}
      this.setFilter()
      this.$router.push('/explore')
      // this.$router.go('/explore')
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