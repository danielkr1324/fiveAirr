<template>
  <li class="gig-preview">
   
    <div class="preview-preview-img">
      <vueper-slides ref="vueperslides1" :touchable="false" :autoplay="false" :bullets="false"
            :slide-ratio="(48 / 67)">
            <vueper-slide v-for="(image) in gig.images" :key="image" :image="image" style="cursor: pointer">
            </vueper-slide>
        </vueper-slides>
    </div>
    <UserPreview :gig="gig" :type="'listUserPreview'" />

    <div class="gig-preview-title">
      <router-link :to="`/details/${gig._id}`">
        <a>{{ gig.title }}</a>
      </router-link>
      <i class="fa-solid fa-star" style="color: #ffd43b;">&nbsp;{{ fixedRating }}</i>
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

    },
    computed: {
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