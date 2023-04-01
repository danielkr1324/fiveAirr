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
  
    
    
    // async addGigMsg(gigId) {
    //   try {
    //     await this.$store.dispatch(getActionAddGigMsg(gigId))
    //     showSuccessMsg('Gig msg added')
    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot add gig msg')
    //   }
    // },
    // printGigToConsole(gig) {
    //   console.log('Gig msgs:', gig.msgs)
    // }
  
  components: {
    GigPreview,
  }
};
</script>
