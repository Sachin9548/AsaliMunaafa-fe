<template>
  <div class="mx-2 mt-16">
    <!-- Loader Section -->
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <p class="text-xl font-semibold">Loading and analyzing data...</p>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Sales Component -->
      <Sales :sales="product" />

      <!-- Date Option at the Top -->
      <div class="date-option my-4">
        <label class="block text-lg font-semibold mb-2">Select Date Range:</label>
        <DatePicker v-model="date" range />
      </div>

      <!-- Stats Section -->
      <div class="stats-grid grid grid-cols-4 gap-4 my-6">
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Sales</p>
          <p class="text-2xl font-bold">{{ totalSales }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Average Order Value</p>
          <p class="text-2xl font-bold">{{ averageOrderValue }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Orders</p>
          <p class="text-2xl font-bold">{{ totalOrders }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Customers</p>
          <p class="text-2xl font-bold">{{ totalCustomers }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">New Customers</p>
          <p class="text-2xl font-bold">{{ newCustomers }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Returning Customers</p>
          <p class="text-2xl font-bold">{{ returningCustomers }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">New Customer Growth Rate</p>
          <p class="text-2xl font-bold">{{ newCustomerGrowthRate }}%</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Repurchase Rate</p>
          <p class="text-2xl font-bold">{{ repurchaseRate }}%</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4 col-span-4">
          <p class="text-lg font-semibold">Sessions By Devices</p>
          <p>Desktop: {{ sessionsByDevices.Desktop }}</p>
          <p>Mobile: {{ sessionsByDevices.Mobile }}</p>
        </div>
      </div>

      <!-- Profit Toggle Buttons -->
      <div class="mt-6">
        <div class="flex items-center justify-between flex-wrap">
          <div class="border flex">
            <nav aria-label="Page navigation example">
              <ul class="inline-flex -space-x-px text-base h-10 shadow-sm">
                <li>
                  <button
                    :class="activeButton === 'bestSellers' ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
                    @click="toggleProfit('bestSellers')"
                    class="flex items-center rounded-sm justify-center px-2 h-10 font-semibold border border-[#4C45E3]"
                  >
                    Best Sellers
                  </button>
                </li>
                <li>
                  <button
                    :class="activeButton === 'mostProfitable' ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
                    @click="toggleProfit('mostProfitable')"
                    class="flex items-center justify-center px-2 h-10 font-semibold border border-[#4C45E3]"
                  >
                    Most Profitable
                  </button>
                </li>
                <li>
                  <button
                    :class="activeButton === 'leastProfitable' ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
                    @click="toggleProfit('leastProfitable')"
                    class="flex items-center rounded-sm justify-center px-2 h-10 font-semibold border border-[#4C45E3]"
                  >
                    Least Profitable
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <p class="text-center font-medium text-base text-[#6A719A]">1-4 / 12</p>
          </div>
        </div>
      </div>

      <!-- Group By Section -->
      <div class="mt-8 mb-3">
        <div class="flex gap-2 items-center">
          <p class="text-[#000E2F] font-medium text-xl">Group by</p>
          <button
            class="border border-[#4C45E3] font-semibold lg:text-xl text-md p-1 px-2"
            @click="toggleProduct('Product')"
            :class="isProduct ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
          >
            Product
          </button>
          <button
            class="border border-[#4C45E3] font-semibold lg:text-xl text-md p-1 px-2"
            @click="toggleProduct('Category')"
            :class="isProduct ? 'text-[#4C45E3]' : 'bg-[#4C45E3] text-white'"
          >
            Category
          </button>
        </div>
      </div>

      <!-- Orders Over Time Chart (Line Chart) -->
      <div class="mt-6 mb-3 bg-white shadow-lg rounded-xl p-5">
        <div class="flex justify-center">
          <LineChart :chartData="chartData" :options="chartOptions" class="w-full" />
        </div>
      </div>

      <!-- New vs. Returning Customers (Pie Chart) -->
      <div class="mt-6 mb-3 bg-white shadow-lg rounded-xl p-5">
        <h3 class="text-lg font-semibold mb-2">New vs. Returning Customers</h3>
        <div class="flex justify-center">
          <PieChart :chartData="newVsReturningChartData" :options="pieChartOptions" class="w-[70%]" />
        </div>
      </div>
<div class="flex justify-center mt-6 mb-3 gap-4 w-full">

  <!-- Overall Shipment Status (Pie Chart) -->
  <div class="mt-6 mb-3 bg-white shadow-lg rounded-xl p-5 w-[50%]">
    <h3 class="text-lg font-semibold mb-2">Overall Shipment Status</h3>
    <div class="flex justify-center">
      <PieChart :chartData="overallStatusChartData" :options="pieChartOptions" class="w-[70%]" />
    </div>
  </div>
  
  <!-- Total Revenue Distribution (Pie Chart) -->
  <div class="mt-6 mb-3 bg-white shadow-lg rounded-xl p-5 w-[50%]">
    <h3 class="text-lg font-semibold mb-2">Total Revenue Distribution</h3>
    <div class="flex justify-center">
      <PieChart :chartData="revenueChartData" :options="pieChartOptions" class="w-[70%]" />
    </div>
  </div>
  
</div>
      <!-- Product Table Section -->
      <div class="mt-6 mb-3">
        <div class="bg-white rounded-xl shadow-lg py-3 px-2 overflow-x-auto">
          <ProductTable :header="tableHeaders" :tableData="filteredTableData" />
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-6 mb-3">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import productImage from "@/static/svg/product.svg";
import { mapActions } from "vuex";
// Import PieChart component (and assume LineChart, ProductTable, Sales, DatePicker are registered globally or imported as needed)
import PieChart from "@/components/PieChart.vue";

export default {
  layout: "overview",
  components: { PieChart },
  data() {
    return {
      // Date range defaults to past 7 days
      date: [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date()
      ],
      loading: true,
      activeButton: "bestSellers",
      isProduct: true,
      tableHeaders: [
        "No.",
        "Products Name",
        "Sales",
        "Total Sales",
        "Product Prices",
        "Selling Price",
        "Profits",
        "Profits Margin",
      ],
      tableData: [],
      totalSales: 0,
      averageOrderValue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      newCustomers: 0,
      returningCustomers: 0,
      newCustomerGrowthRate: 0,
      repurchaseRate: 0,
      cohortAnalysis: [],
      bestSellers: [],
      mostProfitable: [],
      leastProfitable: [],
      sessionsByDevices: {},
      newVsReturningChartData: {
        labels: ["New Customers", "Returning Customers"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#4C45E3", "#2453FF"],
          },
        ],
      },
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "Orders Over Time",
            borderColor: "#2453FF",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      // Additional Pie Chart data properties (fallback defaults; will update if backend sends data)
      overallStatusChartData: {
        labels: ["In Transit", "Delivered", "RTO", "Cancelled"],
        datasets: [
          {
            data: [0, 0, 0, 0],
            backgroundColor: ["#117899", "#1FC105", "#F16C20", "#ECAA38"],
          },
        ],
      },
      revenueChartData: {
        labels: ["Product A", "Product B", "Product C"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#4C45E3", "#2453FF", "#1FC105"],
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          backgroundColor: "#000000",
          titleFontColor: "#ffffff",
          bodyFontColor: "#ffffff",
          position: "nearest",
          intersect: false,
          bodySpacing: 4,
        },
      },
      pieChartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: "bottom",
        },
      },
      product: {
        image: productImage,
        title: "Products",
        description: "See a breakdown of your most profitable products",
        icon: "",
        left: 0,
      },
    };
  },
  computed: {
    filteredTableData() {
      switch (this.activeButton) {
        case "bestSellers":
          return this.bestSellers;
        case "mostProfitable":
          return this.mostProfitable;
        case "leastProfitable":
          return this.leastProfitable;
        default:
          return this.tableData;
      }
    },
  },
  methods: {
    ...mapActions({
      getProductDetails: "bussiness-details/getProductDetails",
    }),
    toggleProfit(type) {
      this.activeButton = type;
    },
    toggleProduct(type) {
      this.isProduct = type === "Product";
    },
    async prodocuDetails() {
      try {
        this.loading = true;
        const startDate = Array.isArray(this.date)
          ? this.date[0].toISOString()
          : this.date.toISOString();
        const endDate = Array.isArray(this.date)
          ? this.date[1].toISOString()
          : this.date.toISOString();

        let res = await this.getProductDetails({
          start_date: startDate,
          end_date: endDate,
        });
        const data = res.data;
        this.tableData = data.Response || [];
        this.bestSellers = data.bestSellers || [];
        this.mostProfitable = data.mostProfitable || [];
        this.leastProfitable = data.leastProfitable || [];
        this.totalSales = data.totalSales || 0;
        this.averageOrderValue = data.averageOrderValue || 0;
        this.totalOrders = data.totalOrders || 0;
        this.totalCustomers = data.totalCustomers || 0;
        this.newCustomers = data.newCustomers || 0;
        this.returningCustomers = data.returningCustomers || 0;
        this.newCustomerGrowthRate = data.newCustomerGrowthRate || 0;
        this.repurchaseRate = data.repurchaseRate || 0;
        this.cohortAnalysis = data.cohortAnalysis || [];
        this.sessionsByDevices = data.sessionsByDevices || {};
        this.newVsReturningChartData =
          data.newVsReturningChartData || {
            labels: ["New Customers", "Returning Customers"],
            datasets: [
              {
                data: [this.newCustomers, this.returningCustomers],
                backgroundColor: ["#4C45E3", "#2453FF"],
              },
            ],
          };
        this.chartData = data.chartData || this.chartData;
        this.overallStatusChartData = data.overallStatusChartData || this.overallStatusChartData;
        this.revenueChartData = data.revenueChartData || this.revenueChartData;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.prodocuDetails();
  },
  watch: {
    date() {
      this.prodocuDetails();
    },
  },
};
</script>

<style scoped>
.mx-input {
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.stats-grid {
  /* Additional grid styling if needed */
}

.stat-card {
  /* Customize your stat cards (padding, border, etc.) */
}
</style>
