<template>
  <div
    class="xl:w-[30%] sm:w-full min-h-screen flex items-center justify-center py-6"
  >
    <div class="py-8 px-16 rounded-lg shadow-xl bg-opacity-img">
     <form @submit.prevent="next">
      <div class="items-center mb-4">
        <h2 class="text-[26px] font-bold text-white">Complete Onboarding</h2>
      </div>
      <div class="mt-4 flex gap-3 flex-col">
        <label class="block text-white text-sm font-bold">Full Name ?</label>
        <div class="flex items-center text-sm">
          <input
            type="text"
            id="email"
            class="bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full"
            placeholder="Full Name"
            v-model="onBoarding.fullName"
          />
        </div>
      </div>
      <div class="mt-4 flex gap-3 flex-col">
        <label class="block text-white text-sm font-bold">Phone Number</label>
        <div class="flex items-center text-sm">
          <input
            type="text"
            id="phone"
            class="bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full"
            placeholder="Mobile"
            v-model="onBoarding.mobile"
          />
        </div>
      </div>
      <div class="mt-4 flex gap-3 flex-col">
        <label class="block text-white text-sm font-bold">Website URL</label>
        <div class="flex items-center text-sm">
          <input
            type="text"
            id="website"
            class="bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full mb-3"
            placeholder="url"
            v-model="onBoarding.websiteUrl"
          />
        </div>
      </div>
      <button
        class="bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md"
        :disabled="isLoading"
      >
        <Loader v-if="isLoading" :loading="isLoading"></Loader>
        <span v-else>Next</span>
      </button>
     </form>
    </div>
  </div>
</template>
<script>
import message from "@/static/lang/en.json";
import { mapGetters } from "vuex";
export default {
  props: {
    isLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      onBoarding: {
        fullName: "",
        mobile: "",
        websiteUrl: "",
        onboardingSteps: {
          step1: true,
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
    this.onBoarding.fullName = await this.getUserOnbordingData?.fullName;
    this.onBoarding.mobile = await this.getUserOnbordingData?.mobile;
    this.onBoarding.websiteUrl = await this.getUserOnbordingData?.websiteUrl;
  },
  methods: {
    async next() {
      if (
        this.onBoarding.fullName == "" ||
        this.onBoarding.mobile == "" ||
        this.onBoarding.websiteUrl == ""
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
  },
};
</script>
