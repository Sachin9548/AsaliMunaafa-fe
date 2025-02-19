<template>
  <div>
    <div class="flex justify-between items-center border-b-2 py-2">
      <div class="flex gap-2 items-center">
        <div
          v-if="isShow"
          class="rounded-md py-2 transition-main w-6 h-6"
          :style="{ backgroundColor: item.bgColor }"
        ></div>
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
