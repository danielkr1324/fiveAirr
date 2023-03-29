<template>
  <section class="seller-gig-preview">
    <div class="gig-info flex column space-between">
      <div class="img-container">
        <img ref="img" :src="gig.images[0]"
          onerror="this.onerror=null;this.src='https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670794425/gigs/twojxakjb7tdlrbinkdq.jpg';" />
      </div>
      <div class="preview-title">
        <router-link :to="`/details/${gig._id}`">
          <a>{{ gig.title }}</a>
        </router-link>
      </div>
      <div class="preview-footer">
        <div class="tools">
          <span @click="previewGig" v-html="getSvg('preview')"></span>
          <span @click="editGig" v-html="getSvg('edit')"></span>
          <span @click="removeGig" v-html="getSvg('trash')"></span>
        </div>

        <div class="preview-price-container flex">
          <p>starting at</p>
          <span class="preview-price">${{ gig.price }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { svgService } from "@/services/svg.service.js";

export default {
  props: {
    gig: Object
  },
  methods: {
    removeGig() {
      this.$emit("gigRemoved", this.gig._id);
    },
    editGig() {
      this.$router.push(`/explore/edit/${this.gig._id}`);
    },
    previewGig() {
      this.$router.push(`/details/${this.gig._id}`);
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    }
  }
};
</script>