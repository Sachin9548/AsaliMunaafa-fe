<template>
  <div>
    <PulseLoader :loading="loading" :color="color" :size="size" />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    size: {
      type: String,
      default: "12px",
    },
  },
};
</script>
