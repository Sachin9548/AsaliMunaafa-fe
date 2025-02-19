<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex gap-3 items-center">
        <div
          v-if="isShow"
          class="rounded-full py-2 transition-main w-4 h-4"
          :style="{ backgroundColor: item.bgColor }"
        ></div>
        <p class="text-[#2D375B] font-normal text-sm">{{ item.key }}</p>
      </div>
      <div>
        <p class="text-[#2D375B] font-normal text-sm">{{ item.value }}</p>
      </div>
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
