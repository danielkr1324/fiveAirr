<template>
  <section class="category-svgs">
    <span v-for="category in categories" :key="category">
      <div @click="categoryFilter(`${category.name}`)">
        <span v-html="getSvg(category.svg)"></span>
        <h4 class="regular">{{ category.name }}</h4>
      </div>
    </span>
  </section>
</template>

<script>
import { svgService } from "@/services/svg.service.js";

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
        { name: "Business", svg: "business" },
        { name: "Lifestyle", svg: "lifestyle" },
        { name: "Data", svg: "data" },
        { name: "Photography", svg: "photography" }
      ]
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
    getSvg(iconName) {
      // console.log("iconName: ", iconName);
      return svgService.getSvg(iconName);
    }
  }
};
</script>

<style>
</style>