<template>
  <div>
    <table class="w-full text-center">
      <thead class="">
        <tr>
          <th
            class="py-4 border-b-2"
            v-for="(item, index) in header"
            :key="index"
          >
            <span
              class="text-[#09347F] font-semibold xl:text-xl xxxl:text-xl xxl:text-xl text-md"
            >
              {{ item }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="" v-for="(item, index) in tableData.slice(0,5)" :key="index">
          <th class="py-2 text-[#000087] font-normal text-xl">
            {{ index + 1 }}.
          </th>
          <th
            class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
          >
            {{ item.productName }}
          </th>
          <th
            class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
          >
            {{ item.sales }}
          </th>
          <th
            class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
          >
            {{ item.totalSales }}
          </th>
          <th
            class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
          >
            {{ item?.variants[0]?.price }}
          </th>
          <th
            class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
          >
          {{ item?.variants[0]?.price }}
        </th>
          <th
            class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
          >
            {{ item.profits }}
          </th>
          <th
            class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
          >
            {{ item.profitMargin }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    header: {
      type: Array,
      required: true,
    },
  },
};
</script>
