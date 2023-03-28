<template>
  <li class="gig-preview">

    <div class="preview-preview-img">
      <vueper-slides transition-speed="250" :touchable="false" :autoplay="false" :bullets="true" :slide-ratio="(48 / 67)">
        <vueper-slide @click="goToDetails(`/details/${gig._id}`)" v-for="(image) in gig.images" :key="image"
          :image="image" style="cursor: pointer">
        </vueper-slide>
      </vueper-slides>
    </div>
    <UserPreview :gig="gig" :type="'listUserPreview'" />

    <div class="gig-preview-title">
      <a @click="goToDetails(`/details/${gig._id}`)">{{ gig.title }}</a>
      <div class="raiting">
        <i class="fa-solid fa-star" style="color: #ffbe5b;"></i>
        <span style="color: #ffbe5b;">{{ fixedRating }}</span>
        <span class="rate-num">({{ numOfRates }})</span>
      </div>
    </div>

    <footer class="gig-footer">
      <i class="fa-solid fa-heart" style="color: #b5b6ba;"></i>
      <p>
        STARTING AT
        <span class="gig-preview-price">&nbsp;${{ gig.price }}</span>
      </p>
    </footer>
  </li>
</template>

<script>

import { utilService } from '../services/util.service.js'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import UserPreview from "./UserPreview.vue";

export default {
  name: 'GigPreview',
  props: { gig: Object },
  data() {
    return {

    }
  },
  methods: {
    goToDetails(gig) {
      this.$router.push({ path: gig })
    },
  },
  computed: {
    numOfRates() {
      return utilService.getRandomIntInclusive(150, 500)
    },
    fixedRating() {
      return this.gig.owner.rate.toFixed(1)
    }
  },
  created() {

  },
  components: {
    UserPreview,
    VueperSlides,
    VueperSlide,
  },
}
</script>

<style></style>