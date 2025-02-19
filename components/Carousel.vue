<template>
    <div class="pb-[60px] pb-[30px] pt-24">
      <div class="mx-2">
        <VueSlickCarousel v-bind="settings">
            <ReviewCarousel v-for="(item, key) in beautyItems" :key="key" :item="item"></ReviewCarousel>
        </VueSlickCarousel>
      </div>
      <div class="mx-2 mt-3">
        <VueSlickCarousel v-bind="settings">
            <ReviewCarousel v-for="(item, key) in dirtyItems" :key="key" :item="item"></ReviewCarousel>
        </VueSlickCarousel>
      </div>
    </div>
  </template>
  
  <script>
  import VueSlickCarousel from "vue-slick-carousel";
  import "vue-slick-carousel/dist/vue-slick-carousel.css";
  import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
  import carouselImage from "../static/Images/carousel-image.webp";
  
  export default {
    components: {
      VueSlickCarousel,
    },
    data() {
      return {
        settings: {
        focusOnSelect: true,
        speed: 4000,
        slidesToShow: 4,
        slidesToScroll: 4,
        touchThreshold: 5,
          dots: false,
          centerMode: false,
          // cssEase: 'linear',
          centerPadding: "0px",
          infinite: true,
          arrows: false,
          autoplay:true,
          autoplaySpeed:2000,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 991,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "0",
                slidesToShow: 1,
              },
            },
          ],
        },
        beautyItems: [
          {
            image: carouselImage,
            title: "Rocky Mountain Oils",
            description:
              "We're pumped to crush our goals now that we've got Polar.",
          },
          {
            image: carouselImage,
            title: "ANISA Beauty",
            description:
              "It has been an essential tool in serving as a central source of truth for our DTC brands.",
          },
          {
            image: carouselImage,
            title: "bloon Paris",
            description:
              "Polar Analytics is the best eCom analytics tool!",
          },
          {
            image: carouselImage,
            title: "Rocky Mountain Oils",
            description:
              "We're pumped to crush our goals now that we've got Polar.",
          },
          {
            image: carouselImage,
            title: "Rocky Mountain Oils",
            description:
              "We're pumped to crush our goals now that we've got Polar.",
          },
        ],
        dirtyItems: [
          {
            image: carouselImage,
            title: "Rocky Mountain Oils",
            description:
              "We're pumped to crush our goals now that we've got Polar.",
          },
          {
            image: carouselImage,
            title: "Dirty Labs",
            description:
              "Polar was the only one that felt like it was designed for our business.",
          },
          {
            image: carouselImage,
            title: "Water and Wines",
            description:
              "What really sets it apart is the exceptional support and onboarding team.",
          },
          {
            image: carouselImage,
            title: "Quad Lock® Australia",
            description:
              "Think it up, and you can probably exceptional support and onboarding tool.",
          },
          {
            image: carouselImage,
            title: "Rocky Mountain Oils",
            description:
              "We're pumped to crush our goals now that we've got Polar.",
          },
        ],
      };
    },
  };
  </script>
<style scoped>

</style>
  