<template>
  <div>
    <div
      class="max-w-fulls xl:mx-8 mx-0 mt-16 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <a>
          <h5
            class="mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white"
          >
            About Business
          </h5>
        </a>
        <p class="mb-3 mt-3 font-medium text-xl text-[#5B638B]">
          Choose your option widely
        </p>
      </div>
      <div
        class="gap-3 mt-3 mb-5 flex flex-col gap-3"
        v-for="(item, key) in aboutBusiness"
        :key="key"
      >
        <p class="text-xl font-medium text-[#5B638B]">
          {{ `${key + 1}).` }} {{ item.question }}
        </p>
        <AboutBusinessDropdown
          :index="key"
          :items="item.items"
          :selectedLabel="item.selectedLabel"
          @getValue="getValue"
        />
      </div>
      <div class="flex gap-3 justify-end flex-column">
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
export default {
  layout: "dashboard",
  data() {
    return {
      isLoading: false,
      aboutBusiness: [
        {
          question: "How much You’re Spending on ads ?",
          selectedLabel: "Select here...",
          items: [
            { label: "50k to 1lac", value: "50k to 1lac" },
            { label: "3lac to 5lac", value: "3lac to 5lac" },
            { label: "1lac to 3lac", value: "1lac to 3lac" },
            { label: "Above 10lac", value: "Above 10lac" },
            { label: "5lac to 10lac", value: "5lac to 10lac" },
          ],
        },
        {
          question: "How much ROAS you're getting?",
          selectedLabel: "Select here...",
          items: [
            { label: "2x to 4x", value: "2x to 4x" },
            { label: "4x to 6x", value: "4x to 6x" },
            { label: "6x to 9x", value: "6x to 9x" },
            { label: "Above 10x", value: "Above 10x" },
          ],
        },
        {
          question: "Your RTO Percentage ?",
          selectedLabel: "Select here...",
          items: [
            { label: "2% to 5%", value: "2% to 5%" },
            { label: "5% to 7%", value: "5% to 7%" },
            { label: "8% to 10%", value: "8% to 10%" },
            { label: "10% to 20%", value: "10% to 20%" },
            { label: "Above 20%", value: "Above 20%" },
          ],
        },
        {
          question: "Your COD/Prepaid Percentage ?",
          selectedLabel: "Select here...",
          items: [
            { label: "5% to 10%", value: "5% to 10%" },
            { label: "10% to 20%", value: "10% to 20%" },
            { label: "20% to 50%", value: "20% to 50% " },
            { label: "60% to 70%", value: "60% to 70%" },
            { label: "Above 70%", value: "Above 70%" },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getUserBusinessData: "bussiness-details/getUserBusinessData",
    }),
    formattedData() {
      return {
        aboutBusiness: this.aboutBusiness.map((item) => ({
          question: item.question,
          answer: item.selectedLabel,
        })),
        businessDetailsSteps: {
          step4: true,
        },
      };
    },
  },
  mounted() {
    if (
      this.getUserBusinessData.aboutBusiness &&
      this.getUserBusinessData.aboutBusiness.length > 0
    ) {
      this.aboutBusiness.forEach((items, index) => {
        items.selectedLabel =
          this.getUserBusinessData?.aboutBusiness[index]?.answer;
      });
    }
  },
  watch: {
    getUserBusinessData: {
      deep: true,
      handler(item) {
        if (item.aboutBusiness && item.aboutBusiness.length > 0) {
          this.aboutBusiness.forEach((items, index) => {
            if (item.aboutBusiness[index]) {
              items.selectedLabel = item.aboutBusiness[index]?.answer;
            }
          });
        }
      },
    },
  },

  methods: {
    ...mapActions({
      MarketingPlatformNext: "bussiness-details/marketingPlatform",
    }),
    getValue(item, index) {
      this.aboutBusiness[index].selectedLabel = item.value;
    },
    back() {
      this.$router.push("/shipping");
    },
    async validForm() {
      const invalidItemFound = this.aboutBusiness.some(
        (item) => item.selectedLabel === "Select here..."
      );
      if (invalidItemFound) {
        this.$toast.open({
          message: message.errorMessage,
          type: "error",
          duration: 2000,
          position: "bottom-right",
        });
        return false;
      }
      return true;
    },
    async handleSubmit() {
      try {
        this.isLoading = true;
        let valid = await this.validForm();
        if (valid) {
          let data = await this.formattedData;
          const response = await this.MarketingPlatformNext(data);
          this.$router.push("/product");
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
