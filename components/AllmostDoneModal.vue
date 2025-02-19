<template>
  <div
    class="xl:w-[30%] sm:w-full min-h-screen flex items-center justify-center py-6"
  >
    <div class="py-8 px-16 rounded-lg shadow-xl bg-opacity-img">
     <form @submit.prevent="next">
      <div class="items-center mb-4">
        <h2 class="text-[26px] font-bold text-white text-center">
          Almost Done !
        </h2>
      </div>
      <div class="mt-4 flex gap-3 flex-col">
        <label class="block text-white text-sm font-bold"
          >How did you hear about Asali Munafaa ?</label
        >
        <div class="flex items-center text-sm">
          <input
            type="text"
            id="name"
            class="bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full"
            placeholder="Enter Here ..."
            v-model="onBoarding.aboutAsaliMunafaa"
          />
        </div>
      </div>
      <div class="mt-4 flex gap-3 flex-col">
        <label class="block text-white text-sm font-bold"
          >Which type of Product Your selling ?</label
        >
        <div class="flex items-center text-sm">
          <input
            type="text"
            id="selling"
            class="bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full"
            placeholder="Enter Here ..."
            v-model="onBoarding.sellingProduct"
          />
        </div>
      </div>
      <div class="mt-4 flex gap-3 flex-col">
        <label class="block text-white text-sm font-bold"
          >Your Monthly Revenue ?</label
        >
        <div class="flex items-center text-sm">
          <input
            type="text"
            id="website"
            class="bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full mb-3"
            placeholder="Enter Here ..."
            v-model="onBoarding.monthlyRevenue"
          />
        </div>
      </div>
      <div class="flex gap-3 lg:flex-row flex-col">
        <button
        type="button"
          class="bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md"
          @click="back"
        >
          Back
        </button>
        <button
          class="bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md"
          :disabled="isLoading"
        >
          <Loader v-if="isLoading" :loading="isLoading"></Loader>
          <span v-else>Next</span>
        </button>
      </div>
     </form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import message from "@/static/lang/en.json";
export default {
  props: {
    isLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      onBoarding: {
        aboutAsaliMunafaa: "",
        sellingProduct: "",
        monthlyRevenue: "",
        onboardingSteps: {
          step2: true,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      getUserOnbordingData: "auth/getUserOnbordingData",
    }),
  },

  async mounted() {
    this.onBoarding.aboutAsaliMunafaa = await this.getUserOnbordingData
      ?.aboutAsaliMunafaa;
    this.onBoarding.sellingProduct = await this.getUserOnbordingData
      ?.sellingProduct;
    this.onBoarding.monthlyRevenue = await this.getUserOnbordingData
      ?.monthlyRevenue;
  },

  methods: {
    async next() {
      if (
        !this.onBoarding.aboutAsaliMunafaa ||
        !this.onBoarding.sellingProduct ||
        !this.onBoarding.monthlyRevenue
      ) {
        this.$toast.open({
          message: message.errorMessage,
          type: "error",
          duration: 2000,
          position: "bottom-right",
        });
      } else {
        await this.$emit("next", this.onBoarding);
      }
    },
    async back() {
      await this.$emit("back");
    },
  },
};
</script>
