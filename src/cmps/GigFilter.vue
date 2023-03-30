<template>
  <div class="filters">
    <component :is="type" @filter="filter" />
  </div>
</template>
  
  <script>
import Header from "./GigFilterHeader.vue";
import Svgs from "./GigFilterSvgs.vue";
import Carousel from "./GigFilterCarousel.vue";

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    filter(filterBy) {
      this.$emit("filter", { ...filterBy });
    }
  },
  components: { Carousel, Svgs, Header }
};
</script>