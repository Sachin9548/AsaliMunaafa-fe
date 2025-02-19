<template>
  <div
    class="bg-cover bg-center bg-fixed bg-black"
  >
    <div class="min-h-screen flex justify-center gap-10 items-center bg-world-img">
      <slot name="content"></slot>

      <div class="w-1/2 xl:block md:hidden lg:block hidden mt-7 py-6">
        <img src="@/static/Images/frame.webp" alt="Frame Image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blank",
};
</script>
