<template>
  <div>
    <div
      class="max-w-fulls xl:mx-8 mx-0 mt-16 px-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="border-b py-6">
        <a href="#">
          <h5
            class="mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white"
          >
            Products
          </h5>
        </a>
        <p class="mb-3 mt-3 font-medium text-xl text-[#5B638B]">
          Please add your Products Cost
        </p>
        <p class="mb-7 mt-3 font-medium text-xl text-[#5B638B]">
          (Px Show products that are listed in shopify )
        </p>
        <div class="mx-7 mt-7">
          <p class="text-lg text-[#8C93BE] font-semibold mb-1">Products name</p>
          <input
            type="email"
            id="email"
            class="bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full border border-[#8C93BE]"
            placeholder="Products name"
            v-model="product.name"
          />
          <p class="text-lg text-[#8C93BE] font-semibold mt-4">Selling Price</p>
          <input
            type="number"
            id="email"
            class="bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full border border-[#8C93BE]"
            placeholder="Products name"
            v-model="product.sellingPrice"
          />
        </div>
      </div>
      <div class="mx-5 gap-3 mt-5 mb-5 flex flex-col gap-3">
        <div class="flex gap-3">
          <p class="text-[#5B638B] text-lg font-semibold">
            What is your Product Manufacturing Cost?
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="Edit"
            width="22"
            height="22"
            class="cursor-pointer"
          >
            <path
              d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"
              fill="#5b638b"
              class="color000000 svgShape"
            ></path>
            <path
              d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"
              fill="#5b638b"
              class="color000000 svgShape"
            ></path>
          </svg>
        </div>
        <div class="grid xl:grid-cols-2 sm:grid-cols-1">
          <textarea
            class="rounded-lg p-3 xl:w-[83%] sm:w-full h-36 border border-[#8C93BE]"
            placeholder="Text Here"
            v-model="product.ManufacturingCost"
          ></textarea>
        </div>
      </div>
      <div class="flex gap-3 justify-end flex-column mb-6">
        <button
          @click="back"
          class="inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
        >
          Back
        </button>
        <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md"
        >
          <Loader v-if="isLoading" :loading="isLoading"></Loader>
          <span v-else> Next</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import message from "@/static/lang/en.json";
export default {
  layout: "dashboard",
  data() {
    return {
      isLoading: false,
      product: {
        name: "",
        sellingPrice: "",
        ManufacturingCost: "",
      },
    };
  },
  async mounted() {
    if (this.getUserBusinessData?.product) {
      this.product.name = await this.getUserBusinessData?.product?.name;
      this.product.sellingPrice = await this.getUserBusinessData?.product
        ?.sellingPrice;
      this.product.ManufacturingCost = await this.getUserBusinessData?.product
        ?.ManufacturingCost;
    }
  },
  watch: {
    getUserBusinessData: {
      deep: true,
      handler(item) {
        if (item?.product) {
          this.product.name = item.product?.name;
          this.product.sellingPrice = item.product?.sellingPrice;
          this.product.ManufacturingCost = item.product?.ManufacturingCost;
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
    back() {
      this.$router.push("/about-business");
    },
    async handleSubmit() {
      try {
        if (
          this.product.name == "" ||
          this.product.sellingPrice == "" ||
          this.product.ManufacturingCost == ""
        ) {
          this.$toast.open({
            message: message.errorMessage,
            type: "error",
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          this.isLoading = true;
          let data = {
            product: this.product,
            businessDetailsSteps: {
              step5: true,
            },
          };
          const response = await this.MarketingPlatformNext(data);
          this.$router.push("/dashboard");
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
      }
    },
  },
};
</script>
