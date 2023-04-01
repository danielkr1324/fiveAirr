<template>
  <vueper-slides
    class="no-shadow"
    :bullets="false"
    :visible-slides="5"
    :fixedHeight="'345px'"
    slide-multiple
    :gap="3"
    :slide-ratio="1 / 4"
    :dragging-distance="200"
    :breakpoints="{1240:{visibleSlides: 4, slideRatio:2 / 5 } ,
    1060: { visibleSlides: 3, slideRatio:2 / 5 },
    800: { visibleSlides: 2, slideRatio:1},
    600: { visibleSlides: 1}}"
  >
    <vueper-slide
      v-for="(slide, i) in slides"
      @click="categoryFilter(`${slide.category}`)"
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
      filterBy: { category: "" },
      slides: [
        {
          title: "AI Artists",
          content: "Add talent to AI",
          category: "AI",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/f27bec553efc12cc60baed89b8f2223e-1674661140708/ai-artists-2x.png"
        },
        {
          title: "Logo Design",
          content: "Build your brand",
          category: "Graphics & Design",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png"
        },
        {
          title: "WordPress",
          content: "Customize your site",
          category: "Writing & Translation",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png"
        },
        {
          title: "Voice Over",
          content: "Share your message",
          category: "Music & Audio",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png"
        },
        {
          title: "Video Explainer",
          content: "Engage your audience",
          category: "Video & Animation",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png"
        },
        {
          title: "Social Media",
          content: "Reach more customers",
          category: "Lifestyle",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png"
        },
        {
          title: "SEO",
          content: "Unlock growth online",
          category: "Digital Marketing",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png"
        },
        {
          title: "Illustration",
          content: "Color your dreams",
          category: "Graphics & Design",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png"
        },
        {
          title: "Translation",
          content: "Go global",
          category: "Data",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png"
        },
        {
          title: "Data Entry",
          content: "Learn your business",
          category: "Data",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png"
        },
        {
          title: "Book Covers",
          content: "Showcase your story",
          category: "Graphics & Design",
          image:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png"
        }
      ]
    };
  },
  methods: {
    categoryFilter(category) {
      this.filterBy.category = category;
      this.filter();
    },
    filter() {
      this.$emit("filter", { ...this.filterBy });
    }
  },
  components: { VueperSlides, VueperSlide }
};
</script>

