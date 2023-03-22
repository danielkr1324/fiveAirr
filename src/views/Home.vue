<template>
  <section class="main-container full home text-center">
    <section class="app-hero full">
      <AppHero />
    </section>
  </section>
</template>


<script>
import AppHero from "../cmps/AppHero.vue";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  created() {},
  components: {
    AppHero
  }
};
</script>
