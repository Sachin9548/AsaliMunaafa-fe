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
          <tr class="" v-for="(item, index) in tableData" :key="index">
            <th class="py-2 text-[#000087] font-normal text-xl">
              {{ index + 1 }}.
            </th>
            <th
              class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
            >
              {{ item.name }}
            </th>
            <th
              class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
            >
              {{ item.spend }}
            </th>
            <th
              class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
            >
              {{ item.orders }}
            </th>
            <th
              class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
            >
              {{ item.purchase }}
            </th>
            <th
              class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
            >
              {{ item.sales }}
            </th>
            <th
              class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
            >
              {{ item.roas }}
            </th>
            <th
              class="py-2 text-[#000087] font-normal xl:text-xl xxxl:text-xl xxl:text-xl text-md"
            >
              {{ item.profit }}
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
  