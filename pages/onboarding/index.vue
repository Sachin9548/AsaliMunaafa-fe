<template>
  <div>
    <!-- The Modal component wraps your modal content -->
    <Modal>
      <template #modalContent>
        <OnBoardingModal
          v-if="isOnBoardingModal"
          @next="onBoardingNext"
          :isLoading="isLoading"
        />
        <AllmostDoneModal
          v-if="isAllmostDoneModal"
          @next="allmostNext"
          @back="allMostBack"
          :isLoading="isLoading"
        />
        <LastBarrierModal
          v-if="isLastBarrierModal"
          @next="lastBarrierNext"
          @back="lastBarrierBack"
          :isLoading="isLoading"
        />
        <EcommerceModal
          v-if="isEcommerceModal"
          @next="ecommerceNext"
          :isLoading="isLoading"
        />
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import message from "@/static/lang/en.json";
import OnBoardingModal from "@/components/OnBoardingModal.vue";
import AllmostDoneModal from "@/components/AllmostDoneModal.vue";
import LastBarrierModal from "@/components/LastBarrierModal.vue";
import EcommerceModal from "@/components/EcommerceModal.vue";

export default {
  name: "OnboardingModals",
  layout: "blank",
  components: {
    OnBoardingModal,
    AllmostDoneModal,
    LastBarrierModal,
    EcommerceModal,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState("auth", {
      isOnBoardingModal: (state) => state.modal.isOnBoardingModal,
      isAllmostDoneModal: (state) => state.modal.isAllmostDoneModal,
      isLastBarrierModal: (state) => state.modal.isLastBarrierModal,
      isEcommerceModal: (state) => state.modal.isEcommerceModal,
    }),
    ...mapGetters({
      getUserData: "auth/getUserData",
    }),
  },
  async mounted() {
    try {
      // Retrieve the user's profile data
      const response = await this.getProfileData();
      const shopifyAppInstalled = this.getUserData?.shopifyAppInstalled;
      const onboardingSteps = response.data.onboardingSteps;

      // Close the OnBoardingModal (if open) then open the next modal based on steps
      this.closeModal("isOnBoardingModal");
      if (onboardingSteps.step1) {
        this.openModal("isAllmostDoneModal");
      } else if (onboardingSteps.step2) {
        this.openModal("isLastBarrierModal");
      } else if (onboardingSteps.step3) {
        if (shopifyAppInstalled) {
          await this.ecommerceNext();
        } else {
          this.openModal("isEcommerceModal");
        }
      } else if (onboardingSteps.step4) {
        try {
          if (shopifyAppInstalled) {
            const businessResponse = await this.getBusinessDetail();
            if (
              businessResponse.data &&
              Object.keys(businessResponse.data).length > 0
            ) {
              const businessSteps = businessResponse.data.businessDetailsSteps;
              if (businessSteps.step1) {
                this.$router.push("/industry");
              } else if (businessSteps.step2) {
                this.$router.push("/shipping");
              } else if (businessSteps.step3) {
                this.$router.push("/about-business");
              } else if (businessSteps.step4) {
                this.$router.push("/product");
              } else if (businessSteps.step5) {
                this.$router.push("/dashboard");
              } else {
                this.$router.push("/marketing-platform");
              }
            } else {
              this.$router.push("/marketing-platform");
            }
          } else {
            this.openModal("isEcommerceModal");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.openModal("isOnBoardingModal");
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions({
      addProfileData: "auth/addProfileData",
      getProfileData: "auth/getProfileData",
      getBusinessDetail: "bussiness-details/getBusinessDetail",
      openModal: "auth/openModal",
      closeModal: "auth/closeModal",
    }),
    async onBoardingNext(payload) {
      try {
        this.isLoading = true;
        await this.addProfileData(payload);
        this.$toast.open({
          message: message.dataUpdateMessage,
          type: "success",
          duration: 2000,
          position: "bottom-right",
        });
        this.openModal("isAllmostDoneModal");
        this.closeModal("isOnBoardingModal");
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
    async allmostNext(payload) {
      try {
        this.isLoading = true;
        await this.addProfileData(payload);
        this.$toast.open({
          message: message.dataUpdateMessage,
          type: "success",
          duration: 2000,
          position: "bottom-right",
        });
        this.openModal("isLastBarrierModal");
        this.closeModal("isAllmostDoneModal");
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
    allMostBack() {
      this.openModal("isOnBoardingModal");
      this.closeModal("isAllmostDoneModal");
    },
    async ecommerceNext() {
      try {
        this.isLoading = true;
        const data = {
          onboardingSteps: {
            step4: true,
          },
        };
        await this.addProfileData(data);
        // Close the Ecommerce modal using Vuex before redirecting
        this.closeModal("isEcommerceModal");
        // Force a full page reload by assigning the new URL directly
        window.location.assign("/marketing-platform");
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
    lastBarrierBack() {
      this.openModal("isAllmostDoneModal");
      this.closeModal("isLastBarrierModal");
    },
    async lastBarrierNext(payload) {
      try {
        this.isLoading = true;
        await this.addProfileData(payload);
        this.$toast.open({
          message: message.dataUpdateMessage,
          type: "success",
          duration: 2000,
          position: "bottom-right",
        });
        this.closeModal("isLastBarrierModal");
        const shopifyAppInstalled = this.getUserData?.shopifyAppInstalled;
        if (shopifyAppInstalled) {
          await this.ecommerceNext();
        } else {
          this.openModal("isEcommerceModal");
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
