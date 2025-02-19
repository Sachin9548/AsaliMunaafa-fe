<template>
  <div>
    <div class="border-r-2">
      <p class="font-normal text-base text-[#5B638B]">{{ item.key }}</p>
      <p class="font-semibold text-2xl text-[#000087]">
        {{ item.value }}
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
  },
};
</script>
