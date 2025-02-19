<template>
  <div>
    <div class="xl:pb-[120px] md:pb-[100px] pb-[50px] mt-28">
      <div class="xl:max-w-[1798px] max-w-[1500px] mx-auto">
        <div class="flex flex-wrap justify-center gap-10 px-3">
          <div
            style="box-shadow:-2px 2px 7px 7px hsla(0, 0%, 100%, .25);"
            class="text-center md:p-10 p-4 rounded-2xl border border-gray-900"
            v-for="(item, key) in profitItems"
            :key="key"
          >
            <img :src="item.image" alt="image" />
            <div class="pt-5">
              <h2
                class="text-white md:mb-2 md:text-[26px] text-[22px] font-semibold"
              >
                {{ item.title }}
              </h2>
              <h6
                class="text-gray-400 max-w-[450px] mx-auto text-xl md:mb-10 mb-5"
              >
                {{ item.description }}
              </h6>
              <a
                href="#"
                class="inline-flex items-center text-white text-lg font-normal gap-2"
                >Learn More
                <svg
                  width="8"
                  height="13"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 1.5L6.5 6.5L1.5 11.5"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="xl:pb-[110px] md:pb-[100px] pb-[50px] pt-20">
      <div class="max-w-[1448px] mx-auto px-3">
        <h2
          class="lg:text-[50px] md:text-[35px] text-[25px] font-semibold md:mb-[40px] mb-[25px] text-white text-center"
        >
          Why You’re Not <span class="text-[#01CACE]">Profitable in Your Online Store?</span>
        </h2>
        <p
          class="xl:text-3xl md:text-2xl text-xl text-center mx-auto font-medium !leading-10 text-gray-400"
        >
          Because you don’t know the matrix, you don’t know how much money you
          have spent on marketing, websites, shipping, labour, products and
          other small expenses.You also don’t know what’s your cost for acquiring one customer, your
          REAL ROAS, and your RTO, but we have a solution for you that can solve
          your solve in JUST 60 Sec
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import profit1 from "@/static/Images/profit1.webp";
import profit2 from "@/static/Images/profit2.webp";
import profit3 from "@/static/Images/profit3.webp";
import profit4 from "@/static/Images/profit4.webp";
import profit5 from "@/static/Images/profit5.webp";

export default {
  data() {
    return {
      profitItems: [
        {
          image: profit1,
          title: "Order Profit Analysis",
          description: "See exactlywhat’s eating your orders' profitability.",
        },
        {
          image: profit2,
          title: "Products Profit Analysis",
          description:
            "See exactly Know your exact profit and costs per product, vendor, type, and collection",
        },
        {
          image: profit3,
          title: "Live Profit & Loss Report",
          description:
            "See exactly Have your Profit & Loss report ready and updated for you, 24/7.",
        },
        {
          image: profit4,
          title: "Retention & Lifetime Profit Analysis",
          description:
            " See exactly See exactly what’s eating  your orders' profitability.",
        },
        {
          image: profit5,
          title: "Order Profit Analysis",
          description:
            "Discover the elements that build trust and their role in your profit growth.",
        },
      ],
    };
  },
};
</script>
