import $axios from "@/plugins/axios"; // Nuxt plugin usage; 
// If in plain Vue, import axios from "axios"

export const state = () => ({
  userOnbordingData: {},
  userData: {},
  modal: {
    isOnBoardingModal: false,
    isAllmostDoneModal: false,
    isLastBarrierModal: false,
    isEcommerceModal: false,
  },
});

export const getters = {
  getUserOnbordingData(state) {
    return state.userOnbordingData;
  },
  getUserData(state) {
    return state.userData;
  },
};

export const mutations = {
  openModal(state, modalName) {
    state.modal[modalName] = true;
  },
  closeModal(state, modalName) {
    state.modal[modalName] = false;
  },
  userOnboarding(state, payload) {
    state.userOnbordingData = payload;
  },
  getuserData(state, payload) {
    state.userData = payload;
  },
};

export const actions = {
  // Example login
  async login(ctx, payload) {
    try {
      const response = await $axios.post(`/user/auth/logIn`, payload);
      sessionStorage.setItem("token", response.data.accessToken);
      ctx.commit("getuserData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Example signup
  async signup(ctx, payload) {
    try {
      const response = await $axios.post("/user/auth/signUp", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Example store action used by "EcommerceModal.vue"
  async addShop(ctx, payload) {
    // Payload is { store, apiKey, apiSecret, accessToken }
    try {
      const response = await $axios.post("/shopify/manual-connect", payload);
      return response;
    } catch (error) {
      throw error;
    } 
  },

  // Another example
  async getProfileData(ctx) {
    try {
      const response = await $axios.get("/user/profile");
      ctx.commit("userOnboarding", response.data);
      ctx.commit("getuserData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  openModal({ commit }, modalName) {
    commit("openModal", modalName);
  },
  closeModal({ commit }, modalName) {
    commit("closeModal", modalName);
  },
};
