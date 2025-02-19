<template>
  <footer class="bg-black mt-5 p-3 rounded-xl">
    <div class="max-w-[1792px] mx-auto px-4 py-3">
      <div class="grid xl:grid-cols-8 sm:grid-cols-2 xl:gap-10 gap-5">
        <div class="max-w-[660px] xl:col-span-4">
          <a href="javascript:void(0)" class="mb-6 inline-block">
            <img
              src="../static/Images/logo.webp"
              class="md:mx-[unset] mx-auto xl:w-[115px] sm:w-[100px] md:w-[100px] lg:w-[100px] w-[80px] h-auto"
              alt
            />
          </a>
          <p class="text-white text-lg mb-6 leading-normal font-normal">
            Asali Munaafa appears to be positioned as a comprehensive tool for
            eCommerce businesses, focusing on profit analysis and optimization.
            By providing clarity into expenses and profit margins, it aims to
            help businesses identify factors impacting profitability and
            optimize their operations accordingly.
          </p>
          <div class="flex gap-2">
            <div
              v-for="(item, key) in profitItems"
              :key="key"
              class="py-2 px-2 rounded-full bg-gradient-to-r from-[#00CACE] to-[#00C3D3] transition-main w-7"
            >
              <img :src="item" alt="image" />
            </div>
          </div>
        </div>
        <div>
          <h2
            class="text-xl text-white font-medium font-PlayfairDisplay mb-5"
          >
            COMPANY
          </h2>
          <ul>
            <li v-for="(item, key) in company" :key="key">
              <a
                href="#"
                class="text-white text-lg font-normal mb-3 inline-block transition-main hover:translate-x-[10px]"
                >{{ item }}</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h2
            class="text-xl text-white font-medium font-PlayfairDisplay mb-5"
          >
            RESOURCES
          </h2>
          <ul>
            <li v-for="(item, key) in resources" :key="key">
              <a
                href="#"
                class="text-white text-lg font-normal mb-3 inline-block transition-main hover:translate-x-[10px]"
                >{{ item }}</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h2
            class="text-xl text-white font-medium font-PlayfairDisplay mb-5"
          >
            PARTNERS
          </h2>
          <ul>
            <li v-for="(item, key) in partners" :key="key">
              <a
                href="#"
                class="text-white text-lg font-normal mb-3 inline-block transition-main hover:translate-x-[10px]"
                >{{ item }}</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h2
            class="text-xl text-white font-medium font-PlayfairDisplay mb-5"
          >
            LEGAL
          </h2>
          <ul>
            <li v-for="(tab, key) in legal" :key="key">
              <Nuxt-link
                :to="tab.href"
                class="text-white text-lg font-normal mb-3 inline-block transition-main hover:translate-x-[10px]"
              >
                {{ tab.name }}
              </Nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-800 p-4 mt-6 flex justify-center">
      <p class="text-white font-medium text-base">
        © 2024 All rights reserved by Asali Munaafa
      </p>
    </div>
  </footer>
</template>

<script>
import instagram from "@/static/svg/instagram.svg";
import facebook from "@/static/svg/facebook.svg";
import twitter from "@/static/svg/twitter.svg";
import linkdin from "@/static/svg/linkedin.svg";
export default {
  data() {
    return {
      profitItems: {
        instagram,
        facebook,
        twitter,
        linkdin,
      },
      company: ["Login", "Pricing", "About Us", "Careers"],
      resources: ["Resorce Center", "Blog", "Community"],
      partners: ["PARTNERS", "Agency Partners", "Partners With Us"],
      legal: [
        {
          name: "Terms & Condition",
          href: "",
        },
        {
          name: "Privacy Policy",
          href: "/privacy-policy",
        },
      ],
    };
  },
};
</script>
