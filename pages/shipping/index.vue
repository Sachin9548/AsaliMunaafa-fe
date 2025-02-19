<template>
  <div>
    <!-- Shipping Integration Selection -->
    <div
      v-if="isMarketing"
      class="max-w-fulls xl:mx-8 mx-0 mt-16 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <a href="#">
          <h5 class="mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white">
            Shipping 
          </h5>
        </a>
        <p class="mb-3 mt-3 font-medium text-xl text-[#5B638B]">
          Select your Shipping Portal
        </p>
        <p class="mb-3 mt-3 font-medium text-xl text-[#5B638B]">
          ( You can select Multiple options )
        </p>
      </div>
      <div class="mx-5 gap-3 mt-5 mb-5 flex flex-col gap-3">
        <CheckBox
          :label-text="tab.name"
          :checkbox-id="tab.name"
          v-for="(tab, key) in shipping"
          :key="key"
          :selectedValue="selectedValue"
          :checkbox-name="tab.name"
          :checkbox-value="tab.name"
          :imageSrc="tab.image"
          @change="getName"
        />
      </div>
      <div class="flex gap-3 justify-end flex-column">
        <button
          @click="shipingBack"
          class="inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
        >
          Back
        </button>
        <button
          @click="handleShippingNext"
          :disabled="isLoading"
          class="inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
        >
          <Loader v-if="isLoading" :loading="isLoading"></Loader>
          <span v-else> Next</span>
        </button>
      </div>
    </div>

    <!-- Integration Detail Section -->
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
          Connect your ad Shipping to your Asali Munaafa dashboard below.
        </p>
      </div>
      <p class="mt-8 mb-6 font-medium text-xl text-[#5B638B]">Ad Shipping</p>
      <div
        v-for="(platform, key) in selectedPlatform"
        :key="key"
        class="grid lg:grid-cols-2 grid-cols-1 gap-3 w-full"
      >
        <div class="flex justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="py-2 px-2 rounded-full bg-gray-200 transition-main w-7">
              <img :src="platform.image" alt="" />
            </div>
            <div class="text-[#5B638B] font-medium lg:text-xl text-md">
              {{ platform.name }}
            </div>
          </div>
          <!-- When the user clicks Connect, we call handleConnect() -->
          <button
            class="inline-flex items-center justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold lg:py-4 py-3 mt-4 lg:px-7 px-5 text-sm rounded-md"
            @click="handleConnect(platform)"
          >
            Connect
          </button>
        </div>
      </div>

      <div class="flex gap-3 justify-end flex-column">
        <button
          class="inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
          @click="back"
        >
          Back
        </button>
        <button
          @click="handleSubmit"
          class="inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
          :disabled="isLoading"
        >
          <Loader v-if="isLoading" :loading="isLoading"></Loader>
          <span v-else> Next</span>
        </button>
      </div>
    </div>

    <!-- Modal for Shiprocket Connection -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Connect Shiprocket</h2>
        <div class="mb-4">
          <label for="modalEmail" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="modalEmail"
            v-model="modalEmail"
            placeholder="Enter your email"
            class="mt-1 block w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div class="mb-4">
          <label for="modalPassword" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="modalPassword"
            v-model="modalPassword"
            placeholder="Enter your password"
            class="mt-1 block w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div class="flex justify-end gap-3">
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            @click="submitShiprocketCredentials"
            :disabled="modalLoading"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <Loader v-if="modalLoading" :loading="modalLoading" />
            <span v-else>Connect</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import the pre-configured $axios instance instead of plain axios
import $axios from "@/plugins/axios";
import shiprocket from "@/static/svg/shiprocket.svg";
import truck from "@/static/svg/truck.svg";
import packaging from "@/static/svg/packaging.svg";
import { mapActions, mapGetters } from "vuex";
import message from "@/static/lang/en.json";

export default {
  layout: "dashboard",
  data() {
    return {
      selectedValue: [],
      selectedPlatform: [],
      isOpen: false,
      isMarketing: true,
      isLoading: false,
      shipping: [
        {
          name: "Shiprocket",
          image: shiprocket,
        },
        {
          name: "I think logistic",
          image: truck,
        },
        {
          name: "Delhivery",
          image: packaging,
        },
      ],
      // Modal-related state
      isModalOpen: false,
      modalEmail: "",
      modalPassword: "",
      modalLoading: false,
    };
  },
  async mounted() {
    if (this.getUserBusinessData?.shipping) {
      this.selectedValue = await this.getUserBusinessData?.shipping;
    }
  },
  watch: {
    getUserBusinessData: {
      deep: true,
      handler(item) {
        if (item?.shipping) {
          this.selectedValue = item?.shipping;
        }
      },
    },
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
    shipingBack() {
      this.$router.push("/industry");
    },
    async handleShippingNext() {
      try {
        if (this.selectedValue.length === 0) {
          this.$toast.open({
            message: message.errorMessage,
            type: "error",
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          this.isLoading = true;
          this.selectedPlatform = this.shipping.filter((platform) =>
            this.selectedValue.includes(platform.name)
          );
          let data = {
            shipping: this.selectedValue,
            businessDetailsSteps: {
              step3: true,
            },
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
        this.isOpen = true;
        this.isMarketing = false;
      }
    },
    back() {
      this.isMarketing = true;
      this.isOpen = false;
    },
    handleSubmit() {
      this.$router.push("/about-business");
    },
    // Called when the user clicks "Connect" on a platform
    handleConnect(platform) {
      if (platform.name === "Shiprocket") {
        this.isModalOpen = true;
        // Reset modal fields
        this.modalEmail = "";
        this.modalPassword = "";
      } else {
        // For other platforms, show a notice (or add similar modal logic)
        this.$toast.open({
          message: `Integration for ${platform.name} is not available yet.`,
          type: "info",
          duration: 2000,
          position: "bottom-right",
        });
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
    // Submits the Shiprocket credentials to generate the access token
    async submitShiprocketCredentials() {
      if (!this.modalEmail || !this.modalPassword) {
        this.$toast.open({
          message: "Please enter both email and password.",
          type: "error",
          duration: 2000,
          position: "bottom-right",
        });
        return;
      }
      this.modalLoading = true;
      try {
        const response = await $axios.post("/shipping/shiprocket/generateToken", {
          email: this.modalEmail,
          password: this.modalPassword,
        });
        // Check if the response status is 200 before showing the success toast
        if (response && response.status === 200) {
          this.$toast.open({
            message: "Shiprocket connected successfully!",
            type: "success",
            duration: 2000,
            position: "bottom-right",
          });
          // Close the modal and redirect to the next step
          this.isModalOpen = false;
          this.$router.push("/about-business");
        } else {
          this.$toast.open({
            message: "Failed to connect Shiprocket.",
            type: "error",
            duration: 2000,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("Error connecting Shiprocket:", error);
        this.$toast.open({
          message:
            (error.response && error.response.data && error.response.data.msg) ||
            "Failed to connect Shiprocket.",
          type: "error",
          duration: 2000,
          position: "bottom-right",
        });
      } finally {
        this.modalLoading = false;
      }
    },
  },
};
</script>
