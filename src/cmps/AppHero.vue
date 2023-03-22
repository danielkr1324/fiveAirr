<template>
  <div>
    <vueper-slides
      autoplay
      duration="4000"
      fade
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
      <template #content>
      <div class="vueperslide__content-wrapper" style="flex-direction: row">
        <span>{{ slide.content }}</span>
        <span>TEST</span>
      </div>
    </template>
    </vueper-slides>
  </div>
</template>
  
  <script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  data() {
    return {
      // i:vueper-slide.i,
      slides: [
        {
          name: "Andrea, Fashion Designer",
          content: "Andrea, Fashion Designer",
          // You can also provide a URL for the image.
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/zj3dflxnixaytffgqpn9.webp"
        },
        {
          name: "Moon, Marketing Expert",
          content: "Moon, Marketing Expert",
          // You can also provide a URL for the image.
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/lagjxyakwvonraw1p43m.webp"
        },
        {
          name: "Ritika, Shoemaker and Designer",
          content: "Ritika, Shoemaker and Designer",
          // You can also provide a URL for the image.
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/sfl8xkvbl0ztb1yxehjz.webp"
        },
        {
          name: "Zach, Bar Owner",
          content: "Zach, Bar Owner",
          // You can also provide a URL for the image.
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/tbqwagffjw6cxgwnrhmb.webp"
        },
        {
          name: "Gabrielle, Video Editor",
          content: "Gabrielle, Video Editor",
          // You can also provide a URL for the image.
          image:
            "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/idvcmvkhfqjlgpmdubwu.webp"
        },
        {
          name: "Valentina, AI Artist",
          content: "Valentina, AI Artist",
          // You can also provide a URL for the image.
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/1b6990afe0934244dda2c9aeed5de8d9-1674663021930/bg-hero-6-1792-x1.png"
        }
      ]
    };
  },
  components: { VueperSlides, VueperSlide }
};
</script>