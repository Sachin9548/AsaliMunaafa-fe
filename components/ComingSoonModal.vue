<template>
  <div style="z-index: 999" class="fixed top-0 w-full lef-0">
    <div class="fixed inset-0 mt-10" v-if="isComingSoonModal">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity" @click="closeModal">
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div class="max-w-4xl mx-auto z-50">
          <div class="flex justify-between items-center mb-4">
            <div>
              <div
                class="flex overflow-hidden mx-auto max-w-sm xl:max-w-4xl h-[500px] rounded-md"
              >
                <div class="w-full hidden xl:block">
                  <img
                    src="https://marketplace.canva.com/EAE-nuKD9zg/1/0/1131w/canva-blue-and-purple-modern-coming-soon-poster-AhDz1bkPWt0.jpg"
                    class="object-cover"
                  />
                </div>
                <div
                  class="w-full p-3 xxl:w-1/2 bg-white mx-4 my-4 xl:mx-0 xl:my-0"
                >
                  <h2
                    class="xl:text-2xl sm:text-xl xl:py-3 py-1 font-semibold text-center"
                  >
                    Unlocking the Essence of True Benefits: Asli Munaafa
                  </h2>
                  <p class="xl:text-lg text-sm text-center py-1 mt-3">
                    Welcome to the gateway of
                    <span class="text-[#4C0EA6]">Asli Munaafa - </span>where
                    authenticity meets utility. We're crafting something truly
                    exceptional for you, a platform that redefines the very
                    essence of benefit. Stay tuned as we prepare to unveil a
                    realm of genuine value and unparalleled advantage. Join us
                    on this journey towards real, tangible gains. The wait will
                    be worth it. Asli Munfaa is coming soon
                  </p>
                  <span
                    class="text-[#4C0EA6] flex justify-end mt-3 xl:text-lg text-sm"
                  >
                    - Team Asli Munaafa</span
                  >
                  <button
                    class="bg-[#4C0EA6] text-white font-bold py-3 xl:mt-7 mt-6 px-4 w-full rounded-md"
                    @click="handleClick"
                  >
                    Okk !!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isComingSoonModal: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleClick() {
      this.$emit("close");
    },
  },
};
</script>
