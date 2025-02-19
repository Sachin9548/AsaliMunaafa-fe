<template>
  <div class="mx-2 mt-16">
    <!-- Header with a DatePicker as a global filter -->
    <div class="flex justify-between gap-3 flex-col sm:flex-row">
      <p class="font-semibold text-2xl text-[#000087] text-center">Marketing</p>
      <DatePicker v-model="date" range @change="onDateChange" />
    </div>

    <!-- Ads Toggle Buttons -->
    <div class="mt-6 mb-4">
      <div class="mt-6 mb-4 border border-[#4C45E3] w-fit">
        <button
          class="lg:text-xl text-md font-semibold p-2"
          @click="toggleAds('facebookAds')"
          :class="isAds ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
        >
          Facebook Ads
        </button>
        <button
          class="lg:text-xl text-md font-semibold p-2 opacity-50 cursor-not-allowed"
          disabled
        >
          Google Ads
        </button>
      </div>
    </div>

    <!-- Sales Component -->
    <div class="mt-6 mb-4">
      <Sales :sales="facebookAds" />
    </div>

    <!-- Total Collection Cards (dynamic) -->
    <div class="mt-6 mb-3 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      <TotalCollection
        v-for="(item, index) in totalCollection"
        :key="index"
        :item="item"
        :isShow="true"
        class="bg-white p-3 rounded-xl shadow-lg border-gray-200 h-[10.625rem]"
      />
    </div>

    <!-- Amount Spend Cards (dynamic) -->
    <div class="mt-6 mb-3 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
      <TotalCollection
        v-for="(item, index) in amountSpend"
        :key="index"
        :item="item"
        :isShow="true"
        class="bg-white p-3 rounded-xl shadow-lg border-gray-200 h-[10.625rem]"
      />
    </div>

    <!-- Sales & DatePicker Section -->
    <div class="mt-6 mb-4 flex justify-between gap-3 flex-col sm:flex-row">
      <Sales :sales="adsComparison" />
      <DatePicker v-model="date" range @change="onDateChange" />
    </div>

    <!-- Line Chart Section with Revenue Toggle Buttons -->
    <div class="w-full bg-white rounded-xl p-4 mt-6">
      <div class="flex gap-3 justify-between items-center mb-3 flex-col sm:flex-row">
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-base h-10 shadow-sm">
            <li>
              <button
                :class="activeButton === 'Revenue' ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
                @click="toggleRevenue('Revenue')"
                class="flex items-center rounded-sm justify-center px-2 h-10 text-xl font-medium border border-[#4C45E3]"
              >
                Revenue
              </button>
            </li>
            <li>
              <button
                :class="activeButton === 'ROAS' ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
                @click="toggleRevenue('ROAS')"
                class="flex items-center justify-center px-2 h-10 text-xl font-medium border border-[#4C45E3]"
              >
                ROAS
              </button>
            </li>
            <li>
              <button
                :class="activeButton === 'CPP' ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
                @click="toggleRevenue('CPP')"
                class="flex items-center rounded-sm justify-center px-2 h-10 text-xl font-medium border border-[#4C45E3]"
              >
                CPP
              </button>
            </li>
          </ul>
        </nav>
        <div class="flex gap-2 w-full sm:w-auto">
          <DatePicker v-model="date" range @change="onDateChange" />
        </div>
      </div>
      <div>
        <LineChart
          :chartData="hasChartData ? chartData : fallbackChartData"
          :options="chartOptions"
          :key="chartDataKey"
        />
      </div>
    </div>

    <!-- Campaign Button -->
    <div class="mt-6 mb-4">
      <button class="bg-[#4C45E3] text-xl font-semibold text-white py-2 px-5">
        Campaign
      </button>
    </div>

    <!-- Campaign Details Table (dynamic) -->
    <div class="bg-white rounded-xl shadow-lg overflow-x-auto mt-6 mb-4">
      <div v-if="tableData.length > 0">
        <table class="min-w-full border-collapse">
          <thead>
            <tr>
              <th v-for="(header, index) in tableHeaders" :key="index" class="px-4 py-3 bg-gray-200 text-left text-sm font-semibold text-gray-700 border-b">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableData" :key="row.no" class="hover:bg-gray-50 border-b">
              <td class="px-4 py-3 text-sm">{{ row.no }}</td>
              <td class="px-4 py-3 text-sm">{{ row.name }}</td>
              <td class="px-4 py-3 text-sm">{{ row.spend }}</td>
              <td class="px-4 py-3 text-sm">{{ row.orders }}</td>
              <td class="px-4 py-3 text-sm">{{ row.purchase }}</td>
              <td class="px-4 py-3 text-sm">{{ row.sales }}</td>
              <td class="px-4 py-3 text-sm">{{ row.roas }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="p-4 text-center text-gray-500">
        No campaigns to show
      </div>
    </div>

    <!-- Additional Pie Charts Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-4">
      <!-- Revenue Distribution Pie Chart (Campaign Revenue) -->
      <div class="bg-white rounded-xl shadow-lg p-5">
        <h3 class="text-lg font-semibold mb-2">Revenue Distribution (Campaign Revenue)</h3>
        <div class="flex justify-center">
          <PieChart
            :chartData="revenueDistributionData"
            :options="pieChartOptions"
            :key="JSON.stringify(revenueDistributionData.labels) + '-' + JSON.stringify(revenueDistributionData.datasets[0].data)"
            class="w-[70%] h-64"
          />
        </div>
      </div>
      <!-- Orders Distribution Pie Chart (Campaign Orders) -->
      <div class="bg-white rounded-xl shadow-lg p-5">
        <h3 class="text-lg font-semibold mb-2">Orders Distribution (Campaign Orders)</h3>
        <div class="flex justify-center">
          <PieChart
            :chartData="ordersDistributionData"
            :options="pieChartOptions"
            :key="JSON.stringify(ordersDistributionData.labels) + '-' + JSON.stringify(ordersDistributionData.datasets[0].data)"
            class="w-[70%] h-64"
          />
        </div>
      </div>
      <!-- Impressions Distribution Pie Chart -->
      <div class="bg-white rounded-xl shadow-lg p-5">
        <h3 class="text-lg font-semibold mb-2">Impressions Distribution</h3>
        <div class="flex justify-center">
          <PieChart
            :chartData="impressionsDistributionData"
            :options="pieChartOptions"
            :key="JSON.stringify(impressionsDistributionData.labels) + '-' + JSON.stringify(impressionsDistributionData.datasets[0].data)"
            class="w-[70%] h-64"
          />
        </div>
      </div>
      <!-- Clicks Distribution Pie Chart -->
      <div class="bg-white rounded-xl shadow-lg p-5">
        <h3 class="text-lg font-semibold mb-2">Clicks Distribution</h3>
        <div class="flex justify-center">
          <PieChart
            :chartData="clicksDistributionData"
            :options="pieChartOptions"
            :key="JSON.stringify(clicksDistributionData.labels) + '-' + JSON.stringify(clicksDistributionData.datasets[0].data)"
            class="w-[70%] h-64"
          />
        </div>
      </div>
      <!-- Website Purchase Distribution Pie Chart -->
      <div class="bg-white rounded-xl shadow-lg p-5">
        <h3 class="text-lg font-semibold mb-2">Website Purchase Distribution</h3>
        <div class="flex justify-center">
          <PieChart
            :chartData="websitePurchaseDistributionData"
            :options="pieChartOptions"
            :key="JSON.stringify(websitePurchaseDistributionData.labels) + '-' + JSON.stringify(websitePurchaseDistributionData.datasets[0].data)"
            class="w-[70%] h-64"
          />
        </div>
      </div>
    </div>

    <!-- Cost per Website Purchase Info Card -->
    <div class="mt-6 mb-4 bg-white rounded-xl shadow-lg p-5 text-center">
      <h3 class="text-lg font-semibold mb-2">Cost per Website Purchase</h3>
      <p class="text-2xl font-bold">
        {{ costPerWebsitePurchase !== "N/A" ? `₹${costPerWebsitePurchase}` : "N/A" }}
      </p>
    </div>

    <!-- Footer -->
    <div class="mt-16 rounded-xl shadow-lg">
      <Footer />
    </div>
  </div>
</template>

<script>
import $axios from "@/plugins/axios";
import ruppesImage from "@/static/svg/ruppes.svg";

// A helper function to safely stringify objects without circular references.
function safeStringify(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  });
}

export default {
  layout: "overview",
  data() {
    return {
      date: [],
      activeButton: "Revenue",
      isAds: true,
      facebookAds: {
        image: ruppesImage,
        title: "Facebook Ads",
        description: "Facebook & Instagram Overview",
        icon: "",
        left: 0,
      },
      adsComparison: {
        image: ruppesImage,
        title: "Ads Comparison",
        description: "Track your marketing at meta",
        icon: "",
        left: 0,
      },
      totalCollection: [],
      amountSpend: [],
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "Spend",
            borderColor: "#2453FF",
            borderWidth: 2,
            fill: false,
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
          node: "nearest",
          intersect: 0,
          bodySpacing: 4,
        },
      },
      tableHeaders: [
        "No.",
        "Campaign Name",
        "Amount Spend",
        "Total Orders",
        "Cost per Purchase",
        "Total Sales",
        "ROAS",
      ],
      tableData: [],
      // Default pie chart data objects (will be overwritten by API data).
      revenueDistributionData: {
        labels: ["Campaign A", "Campaign B", "Campaign C"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#4C45E3", "#2453FF", "#1FC105"],
          },
        ],
      },
      ordersDistributionData: {
        labels: ["Campaign A", "Campaign B", "Campaign C"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#FDC00F", "#7700D2", "#117899"],
          },
        ],
      },
      impressionsDistributionData: {
        labels: ["High Impressions", "Moderate Impressions", "Low Impressions"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#F16C20", "#ECAA38", "#7700D2"],
          },
        ],
      },
      clicksDistributionData: {
        labels: ["High Clicks", "Moderate Clicks", "Low Clicks"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#117899", "#0F5B78", "#1FC105"],
          },
        ],
      },
      websitePurchaseDistributionData: {
        labels: ["Campaign A", "Campaign B", "Campaign C"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#4C45E3", "#2453FF", "#1FC105"],
          },
        ],
      },
      costPerWebsitePurchase: "N/A",
      pieChartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: "bottom",
        },
      },
      loading: true,
    };
  },
  computed: {
    chartDataKey() {
      return safeStringify(this.chartData);
    },
    hasChartData() {
      return (
        this.chartData &&
        Array.isArray(this.chartData.labels) &&
        this.chartData.labels.length > 0
      );
    },
    fallbackChartData() {
      return {
        labels: ["No Data"],
        datasets: [
          {
            data: [0],
            label: "Spend",
            borderColor: "#2453FF",
            borderWidth: 2,
            fill: false,
          },
        ],
      };
    },
  },
  watch: {
    date(newVal) {
      if (newVal && newVal.length === 2) {
        this.fetchMetaData();
      }
    },
  },
  methods: {
    toggleAds(type) {
      this.isAds = type === "facebookAds";
    },
    toggleRevenue(type) {
      this.activeButton = type;
    },
    onDateChange() {
      if (this.date && Array.isArray(this.date) && this.date.length === 2) {
        this.fetchMetaData();
      }
    },
    formatDate(dateObj) {
      const d = new Date(dateObj);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    async fetchMetaData() {
      try {
        const [start, end] = this.date;
        const startDate = this.formatDate(start);
        const endDate = this.formatDate(end);
        const response = await $axios.get("/marketing/meta/metadata", {
          params: { start: startDate, end: endDate },
        });
        console.log("Meta data response:", response.data);
        const apiData = response.data.data || response.data;
        // Map total collection and amount spend.
        this.totalCollection = (apiData.totalCollection || []).map((item) => ({
          ...item,
          ruppes: item.rupees || item.ruppes,
        }));
        this.amountSpend = (apiData.amountSpend || []).map((item) => ({
          ...item,
          ruppes: item.rupees || item.ruppes,
        }));
        this.chartData = apiData.chartData || { labels: [], datasets: [{ data: [] }] };
        this.tableData = (apiData.campaigns || []).map((campaign, index) => ({
          no: index + 1,
          name: campaign.name,
          spend: campaign.spend,
          orders: campaign.orders,
          purchase: campaign.purchase,
          sales: campaign.sales,
          roas: campaign.roas,
        }));
        // Update pie chart data.
        this.revenueDistributionData = apiData.revenueDistribution || this.revenueDistributionData;
        this.ordersDistributionData = apiData.ordersDistribution || this.ordersDistributionData;
        this.impressionsDistributionData = apiData.impressionsDistribution || this.impressionsDistributionData;
        this.clicksDistributionData = apiData.clicksDistribution || this.clicksDistributionData;
        this.websitePurchaseDistributionData = apiData.websitePurchaseDistribution || this.websitePurchaseDistributionData;
        this.costPerWebsitePurchase = apiData.costPerWebsitePurchase || this.costPerWebsitePurchase;
        console.log("Mapped tableData:", this.tableData);
      } catch (error) {
        console.error("Error fetching meta data:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    this.date = [lastWeek, today];
    this.fetchMetaData();
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
