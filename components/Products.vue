<template>
  <div>
    <div
      class="bg-white xl:col-span-2 xl:p-[20px] w-full md:p-[26px] p-[18px] rounded-xl shadow-lg"
    >
      <div
        class="flex justify-between items-center mb-5 border-b-2 py-3 xl:flex-row gap-3 flex-col"
      >
        <div class="flex gap-4">
          <button
            type="button"
            :class="
              activeButton === 'bestSellers'
                ? ' bg-[#4C45E3] text-white'
                : 'text-[#4C45E3]'
            "
            @click="toggleProfit('bestSellers')"
            class="border border-[#4C45E3] font-semibold xxl:text-xl xxxl:text-xl xl:text-xl lg:text-lg sm:text-md p-1"
          >
            Best Seller
          </button>
          <button
            type="button"
            :class="
              activeButton === 'mostProfitable'
                ? 'bg-[#4C45E3] text-white'
                : 'text-[#4C45E3]'
            "
            @click="toggleProfit('mostProfitable')"
            class="border border-[#4C45E3] font-semibold xxl:text-xl xxxl:text-xl xl:text-xl lg:text-lg sm:text-md p-1"
          >
            Most Profitable
          </button>
          <button
            type="button"
            :class="
              activeButton === 'leastProfitable'
                ? ' bg-[#4C45E3] text-white'
                : ' text-[#4C45E3]'
            "
            @click="toggleProfit('leastProfitable')"
            class="border border-[#4C45E3] font-semibold xxl:text-xl xxxl:text-xl xl:text-xl lg:text-lg sm:text-md p-1"
          >
            Least Profitable
          </button>
        </div>
        <div class="flex gap-2">
          <nav aria-label="Page navigation example">
            <div class="flex items-center gap-3">
              <div>
                <p class="text-[#6A719A] font-medium text-base">
                  1 / No. if Page
                </p>
              </div>
              <ul class="flex items-center gap-3 -space-x-px h-10 text-base">
                <li>
                  <a
                    @click="previous"
                    class="cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span class="sr-only">Previous</span>
                    <svg
                      class="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    @click="next"
                    class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div class="flex gap-2 items-center">
        <p class="text-[#5B638B] font-medium text-xl">Group by</p>
        <button
          class="text-[#5B638B] border border-[#5B638B] font-semibold text-xl p-1 px-2"
        >
          Product
        </button>
        <button
          class="text-[#5B638B] border border-[#5B638B] font-semibold text-xl p-1 px-2"
        >
          Type
        </button>
      </div>
      <div
        class="grid xl:grid-cols-4 xxxl:grid-cols-4 xxl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-5"
      >
        <ProductCard
          v-for="(item, key) in productCard.slice(0,4)"
          :key="key"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productCard: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeButton: "bestSellers",
    };
  },
  methods: {
    previous() {
      this.$emit("previous");
    },
    next() {
      this.$emit("next");
    },
    toggleProfit(type) {
      this.activeButton = type;
    },
  },
};
</script>
