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
        <form class="flex" onsubmit="filterBy">
          <div class="search-bar-icon flex align-center justify-center" v-html="getSvg('search')"></div>
          <input type="search" placeholder="Try &#34;building mobile app&#34;" />
          <button>Search</button>
        </form>
      </div>

      <div class="popular-categories flex align-center">
        <p class="fs14">Popular:</p>
        <ul class="clean-list flex">
          <li class="popular-category fs14" v-for="category in popular" :key="category">
            <a href="/#/explore">{{category}}</a>
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
      <PopularCarousel />
    </div>
    <section class></section>

    <section class="main-container selling-point-container full">
      <div class="selling-points">
        <div class="site-info">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <ul class="clean-list">
            <li v-for="point in getSellingText" :key="point">
              <section class="flex align-center">
                <h3>
                  <span v-html="getSvg('circledCheckmark')"></span>
                  {{ point.title }}
                </h3>
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
      <ExploreCategories />
    </section>
  </section>
</template>


<script>
import AppHero from "../cmps/AppHero.vue";
import PopularCarousel from "../cmps/PopularCarousel.vue";
import ExploreCategories from "@/cmps/ExploreCategories.vue";
import { svgService } from "@/services/svg.service.js";

export default {
  name: "home",
  data() {
    return {
      popular: ["Website Design", "WordPress", "Logo Design", "Video Editing"]
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
    }
  },
  components: {
    AppHero,
    PopularCarousel,
    ExploreCategories
  }
};
</script>