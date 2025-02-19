<template>
  <div>
    <!-- Modal Structure -->
    <div class="fixed inset-0 flex items-center justify-center min-h-screen">
      <!-- Modal Backdrop -->
      <div class="fixed inset-0 bg-black opacity-50" @click="handleCancel"></div>
      <!-- Modal Content -->
      <div class="bg-white p-8 rounded-md w-full max-w-lg relative z-10">
        <!-- Provider Selection Buttons -->
        <div class="flex gap-4 mb-6">
          <button 
            class="bg-gradient-to-r from-[#3CBB00] to-[#05E852] hover:bg-gradient-to-r hover:from-[#05E852] transition-main hover:to-[#3CBB00] text-white font-bold py-3 px-4 w-full text-sm rounded-md"
            @click="selectProvider('shopify')"
            :class="{'ring-2 ring-white': selectedProvider === 'shopify'}">
            Shopify
          </button>
          <button 
            class="bg-[#2E0A93] text-white font-bold py-3 px-4 w-full text-sm rounded-md opacity-50 cursor-not-allowed"
            disabled>
            WordPress (Coming Soon)
          </button>
        </div>
        <!-- Conditionally show the Shopify connection form -->
        <div v-if="selectedProvider === 'shopify'">
          <h2 class="text-2xl font-bold mb-4">Connect your Shopify store</h2>
          <p class="text-gray-600 mb-6">
            Enter your Shopify store details below:
          </p>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block font-medium mb-1">Store URL</label>
              <input
                v-model="store"
                placeholder="example.myshopify.com"
                class="border p-2 rounded w-full"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block font-medium mb-1">Shopify API Key</label>
              <input
                v-model="apiKey"
                placeholder="Your Shopify app key"
                class="border p-2 rounded w-full"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block font-medium mb-1">Shopify API Secret</label>
              <input
                v-model="apiSecret"
                placeholder="Your Shopify app secret"
                class="border p-2 rounded w-full"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block font-medium mb-1">Shopify Access Token</label>
              <input
                v-model="accessToken"
                placeholder="Your Shopify access token"
                class="border p-2 rounded w-full"
                required
              />
            </div>
            <div class="flex justify-end gap-3">
              <button
                type="submit"
                class="bg-green-600 text-white px-4 py-2 rounded"
                :disabled="isLoading"
              >
                Connect Shopify
              </button>
              <button
                type="button"
                class="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                @click="handleCancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $axios from "@/plugins/axios";
export default {
  name: "EcommerceModal",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      store: "",
      apiKey: "",
      apiSecret: "",
      accessToken: "",
      selectedProvider: "shopify", // default provider
    };
  },
  methods: {
    selectProvider(provider) {
      this.selectedProvider = provider;
    },
    async handleSubmit() {
      // Validate that all required fields are filled
      if (!this.store || !this.apiKey || !this.apiSecret || !this.accessToken) {
        console.log("Please fill all fields");
        return;
      }
      console.log("EcommerceModal handleSubmit invoked");
      try {
        const response = await $axios.post("/shopify/manual-connect", {
          store: this.store,
          apiKey: this.apiKey,
          apiSecret: this.apiSecret,
          accessToken: this.accessToken,
        });
        console.log("Response from server:", response);
        // Check if the response indicates success
        if (response.data && response.data.status === 200) {
          console.log("Shopify store connected successfully in EcommerceModal.");
          // Emit the "next" event so that the parent can close the modal and navigate
          this.$emit("next");
        } else {
          console.log("Connection unsuccessful. Response data:", response.data);
        }
      } catch (error) {
        console.error("Error connecting Shopify store:", error);
      }
    },
    handleCancel() {
      // Emit a "back" event so the parent can handle cancellation if needed
      this.$emit("back");
    },
  },
};
</script>
