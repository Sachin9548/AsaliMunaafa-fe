import createApp from "@shopify/app-bridge";
import { Redirect } from "@shopify/app-bridge/actions";

export default ({ app }, inject) => {
  const queryParams = new URLSearchParams(window.location.search);
  const hmac = queryParams.get("hmac");
  const shop = queryParams.get("shop");
  const host = queryParams.get("host");
  if ((hmac, shop)) {
    const appBridge = createApp({
      apiKey: process.env.SHOPIFY_API_KEY,
      shopOrigin: shop,
      host: host,
      forceRedirect: true,
    });

    const redirect = Redirect.create(appBridge);

    inject("appBridge", appBridge);
    inject("redirect", redirect);
  }
};
