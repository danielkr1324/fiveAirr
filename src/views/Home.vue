<template>
  <section class="main-container full home text-center">
    <section class="app-hero full">
      <AppHero />
    </section>

    <section class="hero-search">
      <h1>
        Find the perfect
        <span>freelance</span> services for your business
      </h1>

      <div class="hero-search-input">
        <form class="flex" @submit="txtFilter(filterBy.title)">
          <div class="search-bar-icon flex align-center justify-center" v-html="getSvg('search')"></div>
          <input
            type="search"
            v-model="filterBy.title"
            placeholder="Try &#34;building mobile app&#34;"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div class="popular-categories flex align-center">
        <p class="fs14">Popular:</p>
        <ul class="clean-list flex">
          <li
            class="popular-category fs14"
            v-for="subCategory in popular"
            :key="subCategory"
            @click="popularFilter(subCategory)"
          >
            <a>{{subCategory}}</a>
          </li>
        </ul>
      </div>
    </section>

    <section class="trusted-by full flex align-center justify-center">
      <span>Trusted by:</span>
      <ul class="flex clean-list">
        <li>
          <img src="../assets/images/trusted by/meta.12b5e5c.png" alt />
        </li>
        <li>
          <img src="../assets/images/trusted by/google.61e78c8.png" alt />
        </li>
        <li>
          <img src="../assets/images/trusted by/netflix.96c5e3f.png" alt />
        </li>
        <li>
          <img src="../assets/images/trusted by/pandg.0f4cfc2.png" alt />
        </li>
        <li>
          <img src="../assets/images/trusted by/paypal.305e264.png" alt />
        </li>
      </ul>
    </section>

    <div class="popular-services">
      <p>Popular professional services</p>
      <GigFilter @filter="filter" :type="'carousel'" />
    </div>
    <section class></section>

    <section class="main-container selling-point-container full">
      <div class="selling-points">
        <div class="site-info">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <ul class="clean-list">
            <li v-for="point in getSellingText" :key="point">
              <section class="flex align-center">
                <span v-html="getSvg('circledCheckmark')"></span>
                <h3>{{ point.title }}</h3>
              </section>
              <p>{{ point.text }}</p>
            </li>
          </ul>
        </div>
        <div class="point-image">
          <img
            src="https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793711/gigs/ostlxosopzlu6ccomezg.webp"
          />
        </div>
      </div>
    </section>

    <section class="explore-svgs main-container full">
      <h1 class="marketplace">Explore the marketplace</h1>
      <!-- <ExploreCategories /> -->
      <GigFilter @filter="filter" :type="'svgs'" />
    </section>
  </section>
</template>


<script>
import AppHero from "../cmps/AppHero.vue";
import GigFilter from "../cmps/GigFilter.vue";
import ExploreCategories from "@/cmps/ExploreCategories.vue";
import { svgService } from "@/services/svg.service.js";

export default {
  name: "home",
  data() {
    return {
      filterBy: {
        subCategory: "",
        title: ""
      },
      popular: ["Website Design", "WordPress", "Logo Design", "AI Services"]
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    getSellingText() {
      return [
        {
          title: "The best for every budget",
          text:
            " Find high-quality services at every price point. No hourly rates, just project-based pricing."
        },
        {
          title: "Quality work done quickly",
          text:
            " Find the right freelancer to begin working on your project within minutes."
        },
        {
          title: "Protected payments, every time",
          text:
            " Always know what you'll pay upfront. Your payment isn't released until you approve the work."
        },
        {
          title: "24/7 support",
          text:
            " Questions? Our round-the-clock support team is available to help anytime, anywhere."
        }
      ];
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    txtFilter(title) {
      console.log("title:", title);
      this.filterBy.title = title;
      this.filter(this.filterBy);
    },
    popularFilter(subCategory) {
      console.log("subCategory:", subCategory);
      this.filterBy.subCategory = subCategory;
      this.filter(this.filterBy);
    },
    filter(filterBy) {
      console.log("filterBy:", filterBy);
      this.$store.commit({ type: "setFilter", filterBy: { ...filterBy } });
      this.$router.push({
        name: "GigExplore",
        query: { ...this.$store.getters.filterBy }
      });
    }
  },
  components: {
    AppHero,
    GigFilter,
    ExploreCategories
  }
};
</script>