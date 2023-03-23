<template>
  <section class="main-container full home text-center">
    <section class="app-hero full">
      <AppHero />
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
    </div>
  </section>
</template>


<script>
import AppHero from "../cmps/AppHero.vue";

export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  components: {
    AppHero
  }
};
</script>