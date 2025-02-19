<template>
  <div>
    <!-- Marketing Platform Selection -->
    <div
      v-if="isMarketing"
      class="max-w-fulls xl:mx-8 mx-0 mt-16 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <a href="#">
          <h5 class="mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white">
            Marketing Platform
          </h5>
        </a>
        <p class="mb-3 mt-3 font-medium text-xl text-[#5B638B]">
          Which Platform do you advertise and select the Platform
        </p>
      </div>
      <div class="grid lg:grid-cols-2 grid-cols-1 mx-5 gap-3 mt-5 mb-5">
        <CheckBox
          v-for="(tab, key) in marketingPlatform"
          :key="key"
          :label-text="tab.name"
          :checkbox-id="tab.name"
          :imageSrc="tab.image"
          :selectedValue="selectedValue"
          :checkbox-name="tab.name"
          :checkbox-value="tab.name"
          @change="getName"
        />
      </div>
      <div class="flex gap-3 justify-end">
        <button
          class="inline-flex items-center justify-center width-100 bg-[#2B0064] transition-main hover:to-[#EA69FF] text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
          @click="marketingPlatformNext"
          :disabled="isLoading"
        >
          <Loader v-if="isLoading" :loading="isLoading"></Loader>
          <span v-else> Next</span>
        </button>
      </div>
    </div>

    <!-- Available Integration Section -->
    <div
      v-if="isOpen"
      class="max-w-fulls mt-16 my-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <a>
          <h5 class="mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white">
            Available Integration
          </h5>
        </a>
        <p class="mb-3 mt-3 font-medium text-xl text-[#5B638B]">
          Connect your ad Platform to your Asali Munaafa dashboard below.
        </p>
      </div>
      <p class="mt-8 mb-6 font-medium text-xl text-[#5B638B]">Ad Platform</p>
      <div
        v-for="(platform, key) in selectedPlatform"
        :key="key"
        class="mb-6"
      >
      
        <!-- Platform Row -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="py-2 px-2 rounded-full bg-gray-200 transition-main w-7">
              <img :src="platform.image" alt="" />
            </div>
            <div class="text-[#5B638B] font-medium lg:text-xl text-md">
              {{ platform.name }}
            </div>
                  <!-- Meta Ads: Ad Account ID Input on a Separate Line -->
                  <div
                          v-if="platform.name === 'Meta ads'"
                          class=""
                        >
                          <input
                            v-model="adAccountId"
                            type="text"
                            placeholder="Enter Ad Account ID"
                            class="border p-2 rounded w-full"
                            required
                          />
                        </div>
          </div>

         

          <button
            @click="connect(platform)"
            :disabled="platform.connected || platform.isConnecting"
            class="inline-flex items-center justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] text-white font-bold lg:py-4 py-3 lg:px-7 mt-4 px-4 text-sm rounded-md"
          >
            <Loader
              v-if="platform.isConnecting"
              :loading="platform.isConnecting"
            ></Loader>
            <span v-else>
              {{ platform.connected ? "Connected" : "Connect" }}
            </span>
          </button>
        </div>
       
      </div>

      <div class="flex gap-3 justify-end flex-column">
        <button
          class="inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
          @click="back"
        >
          Back
        </button>
        <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
        >
          <Loader v-if="isLoading" :loading="isLoading"></Loader>
          <span v-else> Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import meta from "@/static/svg/meta.svg";
import googleAds from "@/static/svg/googleAds.svg";
import tiktok from "@/static/svg/tiktok.svg";
import snapchat from "@/static/svg/snapchat.svg";
import { mapActions, mapGetters } from "vuex";
import message from "@/static/lang/en.json";

export default {
  layout: "dashboard",
  data() {
    return {
      selectedValue: [],
      isOpen: false,
      isMarketing: true,
      isLoading: false,
      // List of available marketing platforms
      marketingPlatform: [
        { name: "Meta ads", image: meta },
        { name: "Google ads", image: googleAds },
        { name: "TikTok ads", image: tiktok },
        { name: "Snapchat", image: snapchat },
      ],
      // Will hold the platforms selected by the user
      selectedPlatform: [],
      // New property for the ad account id required for Meta ads
      adAccountId: "",
    };
  },
  async mounted() {
    // If the user already has marketingPlatform data connected, redirect.
    if (this.getUserBusinessData?.marketingPlatform?.length) {
      this.$router.push("/industry");
      return;
    }

    // Pre-fill selection if available.
    if (this.getUserBusinessData?.marketingPlatform) {
      this.selectedValue = this.getUserBusinessData.marketingPlatform;
    }
    this.boundHandleMessage = this.handleMessage.bind(this);
    window.addEventListener("message", this.boundHandleMessage, false);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.boundHandleMessage);
  },
  computed: {
    ...mapGetters({
      getUserBusinessData: "bussiness-details/getUserBusinessData",
    }),
  },
  methods: {
    ...mapActions({
      MarketingPlatformNext: "bussiness-details/marketingPlatform",
    }),
    async getName(value) {
      this.selectedValue = value;
    },
    /**
     * Initiates the Meta (Facebook) OAuth flow.
     * Before opening the OAuth popup, validates that a valid Ad Account ID is entered.
     */
    async connect(platform) {
      if (platform.name === "Meta ads") {
        // Validate adAccountId (required and must be numeric)
        if (!this.adAccountId || !/^\d+$/.test(this.adAccountId)) {
          this.$toast.open({
            message: "Please enter a valid Ad Account ID",
            type: "error",
            duration: 2000,
            position: "bottom-right",
          });
          return;
        }
        this.$set(platform, "isConnecting", true);
        const parentOrigin = window.location.origin;
        let token = sessionStorage.getItem("token");
        if (!token) {
          this.$toast.open({
            message: "User not authenticated.",
            type: "error",
            duration: 2000,
            position: "bottom-right",
          });
          return;
        }
        if (!token.startsWith("Bearer ")) {
          token = "Bearer " + token;
        }
        // Build OAuth URL including the adAccountId as a query parameter.
        const oauthUrl = `http://localhost:8080/marketing/metaauth/facebook?origin=${encodeURIComponent(
          parentOrigin
        )}&token=${encodeURIComponent(
          token
        )}&adAccountId=${encodeURIComponent(this.adAccountId)}`;
        window.open(oauthUrl, "facebookOAuth", "width=600,height=600");
      } else {
        console.log(`Connect clicked for ${platform.name}`);
      }
    },
    /**
     * Handler for postMessage events from the OAuth popup.
     */
    async handleMessage(event) {
      if (event.data && event.data.type === "fb_connected") {
        this.selectedPlatform = this.selectedPlatform.map((item) => {
          if (item.name === "Meta ads") {
            return { ...item, connected: true, isConnecting: false };
          }
          return item;
        });
        this.$toast.open({
          message: "Meta connected successfully!",
          type: "success",
          duration: 2000,
          position: "bottom-right",
        });
        setTimeout(() => {
          this.$router.push("/industry");
        }, 1000);
      }
    },
    /**
     * Handles the Next button on the marketing platform selection screen.
     */
    async marketingPlatformNext() {
      try {
        if (!this.selectedValue || this.selectedValue.length === 0) {
          this.$toast.open({
            message: message.errorMessage,
            type: "error",
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          this.isLoading = true;
          // Filter and extend selected platforms with connection flags.
          this.selectedPlatform = this.marketingPlatform
            .filter((platform) => this.selectedValue.includes(platform.name))
            .map((platform) => ({
              ...platform,
              connected: false,
              isConnecting: false,
            }));
          let data = {
            marketingPlatform: this.selectedValue,
            businessDetailsSteps: { step1: true },
          };
          await this.MarketingPlatformNext(data);
        }
      } catch (error) {
        this.$toast.open({
          message: error,
          type: "error",
          duration: 2000,
          position: "bottom-right",
        });
      } finally {
        this.isLoading = false;
        this.isMarketing = false;
        this.isOpen = true;
      }
    },
    // Return to the previous view.
    back() {
      this.isMarketing = true;
      this.isOpen = false;
    },
    // Proceed to the next step.
    handleSubmit() {
      this.$router.push("/industry");
    },
  },
};
</script>
