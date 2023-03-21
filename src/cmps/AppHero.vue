<template>
  <vueper-slides autoplay fade :touchable="false">
    <vueper-slide
      v-for="(slide, i) in slides"
      :key="i"
      :image="slide.image"
      :name="slide.title"
      :content="slide.content"
    />
  </vueper-slides>
</template>
  
  <script>
export default {
//   import { VueperSlides, VueperSlide } from "vueperslides";
// import "vueperslides/dist/vueperslides.css";
  data() {
    return {
      slides: [
        {
          name: "Andrea, Fashion Designer",
          content: "Photo by Max Rive",
          // You can also provide a URL for the image.
          image: ("../assets/images/hero/hero1")
        },
        {
          name: "Moon, Marketing Expert",
          content: "Photo by Max Rive",
          // You can also provide a URL for the image.
          image: ("../assets/images/hero/hero2")
        },
        {
          name: "Ritika,Shoemaker and Designer",
          content: "Photo by Max Rive",
          // You can also provide a URL for the image.
          image: ("../assets/images/hero/hero3")
        },
        {
          name: "Zach,Bar Owner",
          content: "Photo by Max Rive",
          // You can also provide a URL for the image.
          image: ("../assets/images/hero/hero4")
        },
        {
          name: "Gabrielle,Video Editor",
          content: "Photo by Max Rive",
          // You can also provide a URL for the image.
          image: ("../assets/images/hero/hero5")
        },
        {
          name: "Valentina, AI Artist",
          content: "Photo by Max Rive",
          // You can also provide a URL for the image.
          image: ("../assets/images/hero/hero6")
        }
      ]
    };
  }
};
</script>
  
  <style>
</style>