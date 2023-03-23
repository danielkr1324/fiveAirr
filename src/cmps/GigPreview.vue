<template>
  <li class="gig-preview">
    <div class="preview-preview-img">
      <img :src="gig.imgUrl" />
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
        UserPreview
    },
}
</script>

<style></style>