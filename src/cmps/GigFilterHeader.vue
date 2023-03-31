<template>
  <section class="filter-header">
    <vueper-slides
      v-if="windowWidth < 1400"
      class="header-slides no-shadow"
      ref="vueperslides2"
      :slide-ratio="1 / 8"
      :bullets="false"
      :touchable="false"
      :breakpoints="breakpointsCategories"
      :visible-slides="7"
      fixed-height="40px"
      disable-arrows-on-edges
    >
      <vueper-slide
        v-for="category in categories"
        :key="category"
        @click="categoryFilter(`${category.name}`)"
        :style="'width: ' + 'fit-content'"
      >
        <template #content>
          <div class="vueperslide__content-wrapper">
            <router-link to="/explore">{{ category.name }}</router-link>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>

    <ul v-else class="flex space-between align-center clean-list">
      <li
        v-for="category in categories"
        :key="category"
        @click="categoryFilter(`${category.name}`)"
      >{{ category.name }}</li>
    </ul>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  data() {
    return {
      filterBy: { category: "" },
      categories: [
        { name: "Graphics & Design", svg: "graphics" },
        { name: "Digital Marketing", svg: "digital" },
        { name: "Writing & Translation", svg: "writing" },
        { name: "Video & Animation", svg: "video" },
        { name: "Music & Audio", svg: "music" },
        { name: "Programming & Tech", svg: "programming" },
        { name: "Photography", svg: "photography" },
        { name: "Business", svg: "business" },
        // { name: "Lifestyle", svg: "lifestyle" },
        { name: "AI Services", svg: "data" },
      ],
     breakpointsCategories: {
        1200: {
          visibleSlides: 6
        },
        1050: {
          visibleSlides: 5
        },
        900: {
          visibleSlides: 4
        },
        700: {
          visibleSlides: 3
        }
      },
      windowWidth: window.innerWidth
    };
  },
  methods: {
    categoryFilter(category) {
      this.filterBy.category = category;
      this.filter();
    },
    filter() {
      this.$emit("filter", { ...this.filterBy });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  components: { VueperSlides, VueperSlide }
};
</script>

<style>
</style>