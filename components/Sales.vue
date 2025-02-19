<template>
  <div>
    <div class="max-w-fulls border-gray-200 flex gap-6">
      <div class="w-14 h-14">
        <div
          class="rounded-full bg-[#6514DD] transition-main w-14 h-14 flex justify-center"
        >
          <img :src="sales.image" alt="" class="w-6" />
        </div>
      </div>
      <div class="flex relative">
        <div>
          <p class="text-2xl font-semibold text-[#000087]">{{ sales.title }}</p>
          <p class="text-[#5B638B] text-base font-normal">
            {{ sales.description }}
          </p>
        </div>
        <div class="absolute mt-1" :style="{ left: sales.left + 'px' }">
          <img :src="sales.icon" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sales: {
      type: Object,
      required: true,
    },
  },
};
</script>
