<template>
  <div>
    <vueper-slides
      autoplay
      duration="7500"
      fade
      :pause-on-hover="false"
      :touchable="false"
      :bullets="false"
      :arrows="false"
      fixed-height="680px"
    >
      <vueper-slide
        class="full"
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"
        :content="slide.content"
      />
    </vueper-slides>
  </div>
</template>
  
  <script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  data() {
    return {
      slides: [
        {
          content: "Andrea, Fashion Designer",
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/zj3dflxnixaytffgqpn9.webp"
        },
        {
          content: "Moon, Marketing Expert",
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/lagjxyakwvonraw1p43m.webp"
        },
        {
          content: "Ritika, Shoemaker and Designer",
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/sfl8xkvbl0ztb1yxehjz.webp"
        },
        {
          content: "Zach, Bar Owner",
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/tbqwagffjw6cxgwnrhmb.webp"
        },
        {
          content: "Gabrielle, Video Editor",
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/idvcmvkhfqjlgpmdubwu.webp"
        },
        {
          content: "Valentina, AI Artist",
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/1b6990afe0934244dda2c9aeed5de8d9-1674663021930/bg-hero-6-1792-x1.png"
        }
      ]
    };
  },
  components: { VueperSlides, VueperSlide }
};
</script>