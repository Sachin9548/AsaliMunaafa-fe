<template>
  <div
    :style="cardStyle"
    class="review-card sm:mx-0 mx-4 max-w-[340px] p-5 rounded-xl xl:absolute duration-300 ease-in-out transform hover:!scale-110 hover:z-50 hover:!rotate-0"
    :class="[hoverRight ? 'hover:!right-[4rem]' : '', rotateClass]"
  >
    <h1 class="text-white pr-16">{{ review }}</h1>
    <img :src="image" alt="" class="mt-36 rounded-full w-12 h-12" />
    <p class="text-white mt-3">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    right: {
      type: String,
      required: true,
    },
    top: {
      type: String,
      required: true,
    },
    rotate: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      required: true,
    },
    hoverRight: {
      type: String,
      default: "",
    },
  },
  computed: {
    cardStyle() {
      return {
        backgroundColor: this.bgColor,
        right: this.right,
        top: this.top,
      };
    },
    rotateClass() {
      switch (this.rotate) {
        case "2deg":
          return "rotate-2";
        case "20deg":
          return "rotate-20";
        case "-15deg":
          return "-rotate-15";
        case "2deg":
          return "rotate-2";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 1199px) {
  .rotate-2 {
    transform: rotate(2deg);
  }
  .rotate-20 {
    transform: rotate(20deg);
  }
  .-rotate-15 {
    transform: rotate(-15deg);
  }
  .hover\:right-\[var\(--hover-right\)\] {
    right: var(--hover-right) !important;
  }
}
@media screen and (max-width: 1198px) {
  .review-card {
    transform: none !important;
  }
}
</style>
