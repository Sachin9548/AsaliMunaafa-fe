<template>
  <div>
    <Hero />
    <Integration />
    <OurImpact />
    <Profit />
    <Work />
    <Blog />
    <TimeSection />
    <TrueProfit />
    <Reports />
    <Carousel />
    <OurClient />
    <Frequently />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import crypto from "crypto";
export default {
  async mounted() {
    // document.body.style.backgroundColor = 'black';
    // const queryParams = new URLSearchParams(window.location.search);
    // const hmac = queryParams.get("hmac");
    // const shop = queryParams.get("shop");
    // const host = queryParams.get("host");
    // if ((hmac, shop)) {
    //   try {
    //     const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
    //     const SHOPIFY_SCOPES = process.env.SHOPIFY_SCOPES;
    //     const SHOPIFY_REDIRECT_URI = process.env.SHOPIFY_REDIRECT_URI;
    //     const state = Buffer.from(
    //       JSON.stringify({ state: crypto.randomBytes(16).toString("hex") })
    //     ).toString("base64");
    //     const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&state=${state}&redirect_uri=${SHOPIFY_REDIRECT_URI}`;
    //     if (window.self === window.top) {
    //       window.location.href = installUrl;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   console.log("HMAC is invalid");
    // }
  },
  beforeDestroy() {
    document.body.style.backgroundColor = '';
  },
  methods: {
    ...mapActions({
      connectShopify: "auth/connectShopify",
    }),
  },
};
</script>
