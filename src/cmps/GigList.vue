<template>
  <section class="container home">
    <ul v-if="gigs" class="gig-list">
      <GigPreview v-for="gig in gigs" :gig="gig" :key="gig._id" />
    </ul>
  </section>
</template>

<script>

import GigPreview from "../cmps/GigPreview.vue"

export default {
  props: {gigs: Array},
  data() {
    return {
    };
  },
  components: {
    GigPreview,
  }
};
</script>
