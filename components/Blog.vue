<template>
  <div class="pb-[60px] pb-[30px] pt-20">
    <div>
      <Slick :options="slickOptions" class="custom-slick">
      <div v-for="(i, key) in items" :key="key" class="slick-slide mt-10">
        <img :src="i.image" alt="Image 1" />
        <div class="pt-5 text">
          <h2
            class="text-white text-center mb-2 xl:!text-[26px] lg:!text-[18px] md:!text-[26px] sm:!text-[26px] text-[22px] font-semibold"
          >
            {{ i.title }}
          </h2>
          <h6
            class="text-gray-400 text-center md:text-xl text-lg font-normal md:mb-10 mb-0"
          >
            {{ i.description }}
          </h6>
        </div>
      </div>
    </Slick>
    </div>
    <div class="text-center">
      <button
        class="py-4 px-12 bg-[#01CACE] mt-20 text-white text-[24px] font-semibold rounded-full"
      >
        Read More
      </button>
    </div>
  </div>
</template>

<script>
import sliderImage from "../static/Images/slider.webp";
export default {
  data() {
    return {
      items: [
      {
        image: sliderImage,
        title: "The Challenge of Profit Tracking:",
        description:
          "E-commerce sellers can feel a bit overwhelmed with all the information coming from different places, like ad results, shipping fees, and taxes. It's tough to keep track of everything, and that makes it hard to make good decisions.",
      },
      {
        image: sliderImage,
        title: "The Challenge of Profit Tracking:",
        description:
          "E-commerce sellers can feel a bit overwhelmed with all the information coming from different places, like ad results, shipping fees, and taxes. It's tough to keep track of everything, and that makes it hard to make good decisions.",
      },
      {
        image: sliderImage,
        title: "The Challenge of Profit Tracking:",
        description:
          "E-commerce sellers can feel a bit overwhelmed with all the information coming from different places, like ad results, shipping fees, and taxes. It's tough to keep track of everything, and that makes it hard to make good decisions.",
      },
      {
        image: sliderImage,
        title: "The Challenge of Profit Tracking:",
        description:
          "E-commerce sellers can feel a bit overwhelmed with all the information coming from different places, like ad results, shipping fees, and taxes. It's tough to keep track of everything, and that makes it hard to make good decisions.",
      },
    ],
      slickOptions: {
        centerMode: true,
        dots:true,
        arrows:false,
        centerPadding: '0px',
        slidesToShow: 3,
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "0px",
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 991,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "80px",
            slidesToShow: 1,
          },
        },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '80px',
              slidesToShow: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 1
            }
          }
        ]
      }
    }
  },
  mounted() {
    document.body.style.backgroundColor = 'black'
  },
  beforeDestroy() {
    document.body.style.backgroundColor = '';
  },
}
</script>


<style scoped>
.custom-slick .slick-center img {
  transform: scale(1.2);
  object-fit: contain; 
  transition: transform 0.3s ease-in-out;
  transform-origin: bottom;
  margin-top: 15px;
}
.custom-slick .slick-slide {
  margin-top:2.5rem;
  }

.custom-slick img {
  width: 100%;
  transition: transform 0.3s ease-in-out;
  padding: 0 30px;
}
.custom-slick .slick-center .text{
  padding-top: 8px !important;
}
.slick-dots {
display: flex;
justify-content: center;
margin: 0;
padding: 1rem 0;
list-style-type: none;
}
@media screen and (min-width:991px) and (max-width:1200px){
  .custom-slick img {
  width: 100%;
  transition: transform 0.3s ease-in-out;
  padding: 0 35px;
}
}

@media screen and (min-width:320px) and (max-width:1500px){
  .custom-slick .slick-center img {
    margin-top: 13px;
  }
}

@media screen and (min-width:900px) and (max-width:990px){
  .custom-slick img {
  width: 100%;
  transition: transform 0.3s ease-in-out;
  padding: 0 70px;
}
}

@media screen and (max-width:767px) {
  .slick-dots {
      padding: 0;
  }
  .custom-slick img{
    padding: 0 40px;
  }
}
</style>
