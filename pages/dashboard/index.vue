<template>
  <div class="mt-16 mx-2">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <p class="text-xl font-semibold">Loading... Analyzing the data</p>
    </div>
    <!-- Main Content (Rendered once loading is false) -->
    <div v-else>
      <!-- Header & Date Picker -->
      <div class="max-w-fulls py-4 pl-5">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold text-[#09347F]">Dashboard</h1>
          <div class="flex gap-3">
            <DatePicker v-model="date" range @change="onDateChange" />
          </div>
        </div>
      </div>

      <!-- Total Sales Cards -->
      <div class="max-w-fulls py-4 pl-5 grid xxxl:grid-cols-5 xxl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-10 items-center bg-white border border-gray-200 rounded-2xl shadow-lg">
        <TotalSales v-for="(item, key) in totalSales" :key="key" :item="item" />
      </div>

      <!-- Profits Summary -->
      <div class="mt-6 mb-4">
        <Sales :sales="protal" />
      </div>

      <!-- Profit Cards & Gross Profit vs Net Profit Chart -->
      <div class="mt-6 flex gap-3 mb-3 flex-col xl:flex-row w-full">
        <div class="flex flex-col gap-6">
          <ProfitCard
            v-for="(item, key) in profit"
            :key="key"
            :item="item"
            :isShow="true"
            :style="{ height: item.height + 'px', width:'300px' }"
            class="bg-white p-3 rounded-xl shadow-lg border-gray-200"
          />
        </div>
        <div class="mb-3 bg-white shadow-lg rounded-xl p-5 w-full">
          <h3 class="text-2xl font-bold">Gross Profit vs Net Profit</h3>
          <div class="flex justify-center">
            <PieChart :chartData="grossProfitnetProfit" :options="pieChartOptions" class="w-[70%]" />
          </div>
        </div>
      </div>

      <!-- Overview Summary -->
      <div class="mt-6 mb-4">
        <Sales :sales="overview" />
      </div>

      <!-- Total Collection Cards -->
      <div class="mt-6 mb-3 grid xl:grid-cols-4 xxl:grid-cols-4 xxxl:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6">
        <TotalCollection
          class="max-w-fulls bg-white p-3 rounded-xl shadow-lg border-gray-200 w-auto h-[10.625rem]"
          v-for="(item, key) in totalCollection"
          :key="key"
          :item="item"
          :isShow="isShow"
        />
      </div>

      <!-- Expense Breakdown & New vs Returning Customers Section -->
      <div class="mt-6 mb-4">
        <Sales :sales="expenseBreakdown" />
      </div>
      <div class="mt-6 flex gap-3 mb-3 flex-col xl:flex-row w-full">
        <!-- New vs Returning Customers Chart -->
        <div class="mb-3 bg-white shadow-lg rounded-xl p-5 w-full">
          <h3 class="text-2xl font-bold">New vs Returning Customers</h3>
          <div class="flex justify-center">
            <PieChart :chartData="newVsReturningChartData" :options="pieChartOptions" class="w-[70%]" />
          </div>
        </div>
        <!-- Expense Breakdown Pie Chart -->
        <div class="mb-3 bg-white shadow-lg rounded-xl p-5 w-full">
          <h3 class="text-2xl font-bold">Expense Breakdown</h3>
          <div class="flex justify-center">
            <PieChart :chartData="expenseBreakdownChartData" :options="pieChartOptions" class="w-[70%]" />
          </div>
        </div>
      </div>

      <!-- Orders Section -->
      <div class="mt-6 mb-4">
        <Sales :sales="product" />
      </div>
      <div class="mt-6 flex gap-3 mb-3 flex-col xl:flex-row w-full">
        <!-- Orders Chart -->
        <div class="mb-3 bg-white shadow-lg rounded-xl p-5 w-full">
          <h3 class="text-2xl font-bold">Orders</h3>
          <div class="flex justify-center">
            <PieChart :chartData="ordersChartData" :options="pieChartOptions" class="w-[70%]" />
          </div>
        </div>
      </div>

      <!-- Summary Stat Cards -->
      <!-- <div class="stats-grid grid grid-cols-4 gap-4 my-6">
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Sales</p>
          <p class="text-2xl font-bold">{{ totalSales[0]?.value || '₹0' }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Average Order Value</p>
          <p class="text-2xl font-bold">{{ avgOrderValue || 'N/A' }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Orders</p>
          <p class="text-2xl font-bold">{{ totalSales[1]?.value || '0' }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Profit</p>
          <p class="text-2xl font-bold">{{ totalProfit || '₹0' }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Marketing Spend</p>
          <p class="text-2xl font-bold">{{ marketingSpend || '₹0' }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Shipping Spend</p>
          <p class="text-2xl font-bold">{{ shippingSpend || '₹0' }}</p>
        </div>
        <div class="stat-card bg-white shadow-lg rounded-xl p-4">
          <p class="text-lg font-semibold">Total Net Sales</p>
          <p class="text-2xl font-bold">{{ netSales || '₹0' }}</p>
        </div>
      </div> -->

      <div class="mt-3 rounded-xl shadow-lg">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $axios from "@/plugins/axios";
import ruppesImage from "@/static/svg/ruppes.svg";
import questionIcon from "@/static/svg/question.svg";
import profitImage from "@/static/svg/profit.svg";

// Import child components
import TotalSales from "@/components/TotalSales.vue";
import Sales from "@/components/Sales.vue";
import ProfitCard from "@/components/ProfitCard.vue";
import PieChart from "@/components/PieChart.vue";
import TotalCollection from "@/components/TotalCollection.vue";
import Footer from "@/components/Footer.vue";

export default {
  layout: "overview",
  components: {
    TotalSales,
    Sales,
    ProfitCard,
    PieChart,
    TotalCollection,
    Footer,
  },
  data() {
    return {
      // UI state properties
      isShow: false,
      isDropdown: false,
      isGross: true,
      isAds: true,
      isSvg: true,
      activeButton: "Revenue",
      date: new Date(),
      loading: true,
      borderClass: "border-r border-[#5B638B] rounded-none",
      borderDailyClass: "border-none",
      // Chart options
      pieChartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        legend: { position: "bottom" },
      },
      // Data objects to be populated from the backend
      grossProfitnetProfit: {},
      expenseBreakdownChartData: {},
      newVsReturningChartData: {},
      ordersChartData: {},
      totalSales: [
        { key: "Total Sales", value: "₹0" },
        { key: "Orders No.", value: "0" },
        { key: "Marketing Spend", value: "₹310.05" },
        { key: "Shipping Spend", value: "₹0" },
        { key: "Profit Margin", value: "0%" },
      ],
      totalCollection: [
        { bgColor: "#390083", title: "Total Sales", ruppes: "₹10k" },
        { bgColor: "#00848E", title: "Total Orders", ruppes: "No. - 10" },
        { bgColor: "#F49342", title: "Order Cancellation", ruppes: "No. - 10" },
        { bgColor: "#4489C8", title: "RTO", ruppes: "No. - 10" },
        { bgColor: "#FDC00F", title: "Gross Profit", ruppes: "₹8k" },
        { bgColor: "#FD6AC6", title: "Marketing", ruppes: "₹1k" },
        { bgColor: "#09347F", title: "Shipping", ruppes: "₹1k" },
        { bgColor: "#B391CC", title: "Net Sales", ruppes: "₹1k" },
      ],
      
      profit: [
        {
          image: profitImage,
          title: "Gross Profit",
          icon: questionIcon,
          ruppes: "₹967.45",
          description: "Gross Margin",
          percentage: "64.1%",
          height: 310,
        },
        {
          image: profitImage,
          title: "Net Profit",
          icon: questionIcon,
          ruppes: "₹967.45",
          description: "Gross Margin",
          percentage: "64.1%",
          height: 310,
        },
      ],
      protal: {
        image: ruppesImage,
        title: "Profits",
        description: "Track your profits at a glance and monitor your store’s progress",
        icon: questionIcon,
        left: 160,
      },
      marketing: {
        image: ruppesImage,
        title: "Marketing",
        description: "Track your marketing at me place",
        icon: "",
        left: 0,
      },
      overview: {
        image: ruppesImage,
        title: "Overview",
        description: "Track your Store’s metrics and monitor your performance",
        icon: "",
      },
      expenseBreakdown: {
        image: ruppesImage,
        title: "Profit & Expense Breakdown",
        description: "Track your Store’s metrics and monitor your performance",
        icon: questionIcon,
        left: 380,
      },
      product: {
        image: ruppesImage,
        title: "Products",
        description: "See the breckdown if your products",
        icon: "",
        left: 0,
      },
      avgOrderValue: "",
      totalProfit: "",
      marketingSpend: "",
      shippingSpend: "",
      netSales: "",
    };
  },
  methods: {
    ...mapActions({
      getProductDetails: "bussiness-details/getProductDetails",
    }),
    onDateChange(newDate) {
      this.date = newDate;
    },
    // New method to fetch overall dashboard data from the backend
    async fetchOverallData() {
      try {
        const response = await $axios.get("/shopify/dashboard");
        console.log("Overall data fetched:", response.data);
        if (response.data || response.data.data) {
          const data = response.data;
          this.totalSales = data.totalSales;
          this.totalCollection = data.totalCollection;
          this.profit = data.profit;
          this.grossProfitnetProfit = data.grossProfitnetProfit;
          this.expenseBreakdownChartData = data.expenseBreakdownChartData;
          this.newVsReturningChartData = data.newVsReturningChartData;
          this.ordersChartData = data.ordersChartData;
          this.avgOrderValue = data.avgOrderValue;
          this.totalProfit = data.totalProfit;
          this.marketingSpend = data.marketingSpend;
          this.shippingSpend = data.shippingSpend;
          this.netSales = data.netSales;
          // Optionally update additional objects if returned
          this.protal = data.protal || this.protal;
          this.overview = data.overview || this.overview;
          this.marketing = data.marketing || this.marketing;
          this.expenseBreakdown = data.expenseBreakdown || this.expenseBreakdown;
          this.product = data.product || this.product;
        }
      } catch (error) {
        console.error("Error fetching overall data:", error);
      }
    },
  },
  async mounted() {
    try {
      // Fetch all dashboard data from the backend endpoint
      await this.fetchOverallData();
    } catch (error) {
      console.error("Error during data fetching:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.mx-input {
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
@media (max-width: 375px) {
  .mx-datepicker-range {
    width: 100%;
  }
}
</style>
