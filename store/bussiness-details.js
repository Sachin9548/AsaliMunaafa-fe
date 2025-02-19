import $axios from "@/plugins/axios";

export const state = () => ({
  userBusinessData: {},
});

export const getters = {
  getUserBusinessData(state) {
    return state.userBusinessData;
  },
};

export const mutations = {
  userBusinessDetails(state, payload) {
    state.userBusinessData = payload;
  },
};

export const actions = {
  async marketingPlatform(ctx, payload) {
    try {
      const response = await $axios.post("/user/businessDetails", payload);
      ctx.commit("userBusinessDetails", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getBusinessDetail(ctx, payload) {
    try {
      const response = await $axios.get("/user/businessDetails");
      ctx.commit("userBusinessDetails", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getProductDetails (ctx,payload){
    try {
      const response = await $axios.get("/shopify/products");
      return response;
    } catch (error) {
      throw error;
    }
  }
};
