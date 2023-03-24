<template>
  <vueper-slides
    class="no-shadow"
    style="cursor: default"
    :bullets="false"
    :visible-slides="5"
    slide-multiple
    :gap="3"
    :slide-ratio="1 / 4"
    :dragging-distance="200"
    :breakpoints="{1240:{visibleSlides: 4, slideRatio:2 / 5 , fixedHeight: '345px'} ,
    1060: { visibleSlides: 3, slideRatio:2 / 5 ,fixedHeight: '345px'},
    800: { visibleSlides: 2 },slideRatio:1, }"
  >
    <vueper-slide
      v-for="(slide, i) in slides"
      :key="i"
      :image="slide.image"
      :content="slide.content"
      :title="slide.title"
      style="cursor: pointer"
    />
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  data() {
    return {
      slides: [
        {
          title: "AI Artists",
          content: "Add talent to AI",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/f27bec553efc12cc60baed89b8f2223e-1674661140708/ai-artists-2x.png"
        },
        {
          title: "Logo Design",
          content: "Build your brand",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png"
        },
        {
          title: "WordPress",
          content: "Customize your site",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png"
        },
        {
          title: "Voice Over",
          content: "Share your message",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png"
        },
        {
          title: "Video Explainer",
          content: "Engage your audience",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png"
        },
        {
          title: "Social Media",
          content: "Reach more customers",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png"
        },
        {
          title: "SEO",
          content: "Unlock growth online",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png"
        },
        {
          title: "Illustration",
          content: "Color your dreams",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png"
        },
        {
          title: "Translation",
          content: "Go global",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png"
        },
        {
          title: "Data Entry",
          content: "Learn your business",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png"
        },
        {
          title: "Book Covers",
          content: "Showcase your story",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png"
        }
      ]
    };
  },
  components: { VueperSlides, VueperSlide }
};
</script>