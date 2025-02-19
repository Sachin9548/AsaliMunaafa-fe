<template>
  <div>
    <div class="flex justify-between items-center border-b-2 py-2">
      <div class="flex gap-2 items-center">
        <div
          v-if="isShow"
          class="rounded-md bg-[#343aeb] py-2 transition-main w-10 h-10 flex justify-center"
        >
          <img :src="item.image" alt="" class="" />
        </div>
        <p class="text-[#09347F] font-semibold text-xl">{{ item.title }}</p>
      </div>
      <div>
        <img :src="item.icon" alt="" />
      </div>
    </div>

    <div class="py-2">
      <p class="font-semibold text-[#000087] text-2xl">
        {{ item.ruppes }}
      </p>
      <p class="text-[#5B638B] font-normal text-sm py-1">
        {{ item.description }}
      </p>
      <p class="text-[#2D375B] text-xl font-normal">{{ item.percentage }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    isShow: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
