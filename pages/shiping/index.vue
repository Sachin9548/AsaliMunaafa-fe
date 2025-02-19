<template>
  <div class="mx-2 mt-16">
    <!-- Loading Message -->
    <div v-if="loading" class="text-center py-4">Loading dashboard...</div>
    <div v-else>
      <!-- Top Section: Sales, DatePicker, Portal Switch -->
      <div class="mt-6 mb-4 flex flex-col lg:flex-row gap-3 justify-between">
        <Sales :sales="shippingProtal" />
        <!-- DatePicker bound to "date" (expects an array [fromDate, toDate]) -->
        <!-- <DatePicker v-model="date" range /> -->
      </div>
      <div class="mt-6 mb-4">
        <div class="border border-[#4C45E3] w-fit mt-6 mb-4">
          <button
            class="text-xl font-semibold p-2"
            @click="toggleAds('Shiprocket')"
            :class="isAds ? 'bg-[#4C45E3] text-white' : 'text-[#4C45E3]'"
          >
            Shiprocket
          </button>
          <button
            class="text-xl font-semibold p-2"
            @click="toggleAds('Delhivery')"
            :class="isAds ? 'text-[#4C45E3]' : 'bg-[#4C45E3] text-white'"
          >
            Delhivery
          </button>
        </div>
      </div>
      <!-- Charts & Cards Section -->
      <div class="mt-6 flex gap-3">
        <div class="flex flex-col gap-3">
          <!-- Profit Cards: Now shows Total Sale and Shipping Cost -->
          <ProfitCard
            v-for="(item, index) in profit"
            :key="index"
            :item="item"
            :isShow="isShow"
            :style="{
              height: item.height + 'px',
              width: '300px',
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column'
            }"
          />
        </div>
    
        <!-- Payment Method Pie Chart -->
        <div class="bg-white rounded-xl shadow-lg p-3 py-6 mt-8 mb-3 w-full">
          <div class="flex justify-between px-2 py-2">
            <p class="text-[#000087] font-semibold text-xl">COD Orders V'S Prepaid Orders</p>
          </div>
          <div class="flex justify-center">
            <PieChart
              :chartData="paymentMethodPieData"
              :options="pieChartOptions"
              class="w-[70%] h-64"
            />
          </div>
        </div>
      </div>
      
      <!-- Total Collection Cards (Using Backend Metrics) -->
      <div class="mt-6 mb-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <TotalCollection
          v-for="(item, index) in totalCollection"
          :key="index"
          :item="item"
          :isShow="true"
          class="bg-white p-3 rounded-xl shadow-lg border-gray-200"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-6">
        <!-- Orders vs Sales Pie Chart Section -->
        <div class="bg-white rounded-xl shadow-lg p-3 py-6 mt-8 mb-3">
          <div class="flex justify-between px-2 py-2">
            <p class="text-[#000087] font-semibold text-xl">Orders vs Sales</p>
          </div>
          <div class="flex justify-center">
            <PieChart
              :chartData="ordersSalesPieData"
              :options="pieChartOptions"
              class="w-[70%] h-64"
            />
          </div>
        </div>
        <!-- Shipping Status Pie Chart Section -->
        <div class="bg-white rounded-xl shadow-lg p-3 py-6 mt-8 mb-3">
          <div class="flex justify-between px-2 py-2">
            <p class="text-[#000087] font-semibold text-xl">Shipping Status</p>
          </div>
          <div class="flex justify-center">
            <PieChart
              :chartData="shippingPieData"
              :options="pieChartOptions"
              class="w-[70%] h-64"
            />
          </div>
        </div>
      </div>
      
      <!-- Map & Tiers Section (Unchanged) -->
      <div class="mt-6 mb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="bg-white rounded-xl shadow-lg px-5 py-5 mb-6">
          <div class="flex justify-between px-2 py-2">
            <p class="relative">
              <Dropdown
                :isSvg="isSvg"
                :items="ordersDropDown"
                :selectedLabel="ordersSelectedLabel"
                @getValue="getOrdersValue"
              />
            </p>
            <p class="text-[#2d375b] font-normal text-base">Last 30 days</p>
          </div>
          <!-- Render GeoChart only after mount -->
          <div v-if="isMounted" class="mb-7 mt-3" ref="testChartContainer">
            <GChart
              :type="'GeoChart'"
              :data="chartDatas"
              :options="geoChartOptions"
              :settings="settings"
              @ready="removeBorders"
            />
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg px-5 py-5 mb-6">
          <div class="flex justify-between py-2">
            <p class="text-[#000087] font-semibold text-xl w-[70%]">
              Shipments-Zone Distribution
            </p>
            <p class="text-[#2d375b] font-normal text-base">Last 30 days</p>
          </div>
          <div class="mb-7">
            <Tier
              v-for="(item, index) in tier"
              :key="index"
              :item="item"
              :isShow="isShow"
              class="border-b py-5"
            />
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg px-5 py-5 mb-6">
          <div class="flex justify-between py-2">
            <p class="text-[#000087] font-semibold text-xl">Delivery Performance</p>
            <p class="text-[#2d375b] font-normal text-base">Last 30 days</p>
          </div>
          <div class="mb-7">
            <Tier
              v-for="(item, index) in performance"
              :key="index"
              :item="item"
              :isShow="isShow"
              class="border-b py-5"
            />
          </div>
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
import $axios from "@/plugins/axios";
import ruppesImage from "@/static/svg/ruppes.svg";
import questionIcon from "@/static/svg/question.svg";

export default {
  layout: "overview",
  data() {
    return {
      loading: false,
      error: null,
      // The backend now returns a metrics object directly.
      dashboardData: {},
      isShow: false,
      isAds: true,
      // Date picker model: set default to today's date for both start and end.
      date: [new Date(), new Date()],
      isSvg: true,
      // Flag so that GChart renders only after mount.
      isMounted: false,
      logisticsDropDown: [
        { label: "logistics" },
        { label: "Earnings" },
        { label: "Log out" }
      ],
      regionDropDown: [
        { label: "Region" },
        { label: "Earnings" },
        { label: "Log out" }
      ],
      ordersDropDown: [
        { label: "Orders" },
        { label: "Earnings" },
        { label: "Week" }
      ],
      ordersSelectedLabel: "Orders",
      logisticsSelectedLabel: "logistics",
      regionSelectedLabel: "Region",
      borderClass: "border-r border-[#5B638B] rounded-none",
      borderDailyClass: "border-none",
      shippingProtal: {
        image: ruppesImage,
        title: "Shipping Portal",
        description: "Select your Shipping Portal",
        icon: "",
        left: 0
      },
      settings: { packages: ["geochart"] },
      // GeoChart data and options.
      chartDatas: [
        ["State", "Population"],
        ["IN-AP", 0],
        ["IN-AR", 10],
        ["IN-AS", 20]
      ],
      geoChartOptions: {
        region: "IN",
        displayMode: "regions",
        resolution: "provinces",
        colorAxis: { colors: ["#BBBFEB", "#8592E0", "#7275D2"] },
        backgroundColor: "transparent",
        datalessRegionColor: "transparent",
        defaultColor: "#FFFFFF"
      },
      tier: [
        { bgColor: "#B0AFB4", key: "Tier 1", value: "15 (6.9%)" },
        { bgColor: "#3CBB00", key: "Tier 2", value: "8 (3.7%)" },
        { bgColor: "#FF462E", key: "Tier 3", value: "14 (6.4%)" },
        { bgColor: "#444444", key: "Tier 4", value: "155 (71.1%)" },
        { bgColor: "#FFC107", key: "Tier 5", value: "26 (11.9%)" }
      ],
      performance: [
        { bgColor: "", key: "Last 90 Days", value: "₹11,994" },
        { bgColor: "", key: "This Week", value: "₹0" },
        { bgColor: "", key: "This Month", value: "₹2,30,622" },
        { bgColor: "", key: "This Quarter", value: "₹5,40,802" }
      ],
      // Updated Profit Cards: now used to display Total Sale and Shipping Cost.
      profit: [
        {
          image: "",
          title: "Total Sale",
          icon: "",
          ruppes: "₹0",
          description: "",
          percentage: "",
          height: 269
        },
        {
          image: "",
          title: "Shipping Cost",
          icon: questionIcon,
          ruppes: "₹0",
          description: "",
          percentage: "",
          height: 269
        }
      ],
      // Example LineChart data.
      chartData: {
        labels: [2015, 2016, 2017, 2018, 2019, 2020],
        datasets: [
          {
            data: [40, 34, 40, 60, 40, 60],
            label: "",
            borderColor: "#2453FF",
            borderWidth: 2,
            fill: false
          }
        ]
      },
      // Options for the LineChart.
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
          bodySpacing: 4
        }
      },
      // Pie chart options.
      pieChartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        legend: { position: "bottom" }
      },
      // Total Collection cards updated with only available metrics.
      totalCollection: [
        { bgColor: "#02747C", title: "Total Orders", ruppes: "N/A" },
        { bgColor: "#F49342", title: "COD Orders", ruppes: "N/A" },
        { bgColor: "#AB55FF", title: "Prepaid Orders", ruppes: "N/A" },
        { bgColor: "", title: "Delivered", ruppes: "N/A" },
        { bgColor: "#A4A1FC", title: "RTO", ruppes: "N/A" },
        { bgColor: "#FF0000", title: "Total Sales", ruppes: "N/A" },
        { bgColor: "#FF1000", title: "Shipping Cost", ruppes: "N/A" }
      ]
    };
  },
  computed: {
    // Generate pie chart data for Payment Method (COD vs Prepaid)
    paymentMethodPieData() {
      if (
        this.dashboardData &&
        this.dashboardData.codOrders !== undefined &&
        this.dashboardData.prepaidOrders !== undefined
      ) {
        return {
          labels: ["COD Orders", "Prepaid Orders"],
          datasets: [
            {
              data: [
                this.dashboardData.codOrders,
                this.dashboardData.prepaidOrders
              ],
              backgroundColor: ["#F49342", "#AB55FF"]
            }
          ]
        };
      }
      return { labels: [], datasets: [{ data: [] }] };
    },
    // Pie chart for Orders vs Sales: Comparing Shipping Cost vs Total Sale
    ordersSalesPieData() {
      if (
        this.dashboardData &&
        this.dashboardData.totalShippingCost !== undefined &&
        this.dashboardData.totalSale !== undefined
      ) {
        return {
          labels: ["Shipping Cost", "Total Sale"],
          datasets: [
            {
              data: [
                this.dashboardData.totalShippingCost,
                this.dashboardData.totalSale
              ],
              backgroundColor: ["#02747C", "#FF0000"]
            }
          ]
        };
      }
      return { labels: [], datasets: [{ data: [] }] };
    },
    // Pie chart for Shipping: Delivered vs Undelivered orders
    shippingPieData() {
      if (
        this.dashboardData &&
        this.dashboardData.totalOrders !== undefined &&
        this.dashboardData.deliveredOrders !== undefined
      ) {
        return {
          labels: ["Delivered Orders", "Undelivered Orders"],
          datasets: [
            {
              data: [
                this.dashboardData.deliveredOrders,
                this.dashboardData.totalOrders - this.dashboardData.deliveredOrders
              ],
              backgroundColor: ["#09347F", "#F49342"]
            }
          ]
        };
      }
      return { labels: [], datasets: [{ data: [] }] };
    },
    chartDataKey() {
      return JSON.stringify(this.chartData);
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
            fill: false
          }
        ]
      };
    }
  },
  mounted() {
    this.fetchDashboardData();
    // Delay rendering GeoChart until component mount.
    this.$nextTick(() => {
      this.isMounted = true;
    });
  },
  watch: {
    // When the date range changes, re-fetch the dashboard data.
    date(newVal) {
      if (newVal && Array.isArray(newVal) && newVal.length === 2) {
        this.fetchDashboardData();
      }
    }
  },
  methods: {
    // Helper function to format Date objects as YYYY-MM-DD
    formatDate(dateObj) {
      const d = new Date(dateObj);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    async fetchDashboardData() {
      this.loading = true;
      try {
        const response = await $axios.get("/shipping/shiprocket/dashboard");
        // Use response.data since Axios wraps the payload in the data property.
        this.dashboardData = response || {};
        console.log("Dashboard data fetched:", this.dashboardData);
        // Update Total Collection cards using backend metrics.
        this.totalCollection = [
          { bgColor: "#02747C", title: "Total Orders", ruppes: this.dashboardData.totalOrders || "N/A" },
          { bgColor: "#F49342", title: "COD Orders", ruppes: this.dashboardData.codOrders || "N/A" },
          { bgColor: "#AB55FF", title: "Prepaid Orders", ruppes: this.dashboardData.prepaidOrders || "N/A" },
          { bgColor: "", title: "Delivered", ruppes: this.dashboardData.deliveredOrders || "N/A" },
          { bgColor: "#A4A1FC", title: "RTO", ruppes: this.dashboardData.rtoOrders || "N/A" },
          { bgColor: "#FF0000", title: "Total Sales", ruppes: this.dashboardData.totalSale || "N/A" },
          { bgColor: "#FF1000", title: "Shipping Cost", ruppes: this.dashboardData.totalShippingCost || "N/A" }
        ];
        // Update Profit Cards to show Total Sale and Shipping Cost
        this.profit = [
          {
            image: "",
            title: "Total Sale",
            icon: "",
            ruppes: this.dashboardData.totalSale || "N/A",
            description: "",
            percentage: "",
            height: 269
          },
          {
            image: "",
            title: "Shipping Cost",
            icon: questionIcon,
            ruppes: this.dashboardData.totalShippingCost || "N/A",
            description: "",
            percentage: "",
            height: 269
          }
        ];
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        this.loading = false;
      }
    },
    toggleAds(type) {
      this.isAds = type === "Shiprocket";
    },
    getLogisticsValue(item) {
      this.logisticsSelectedLabel = item.label;
    },
    getRegionValue(item) {
      this.regionSelectedLabel = item.label;
    },
    getOrdersValue(item) {
      this.ordersSelectedLabel = item.label;
    },
    removeBorders() {
      this.$nextTick(() => {
        const container = this.$refs.testChartContainer;
        if (container) {
          const svg = container.querySelector("svg");
          if (svg) {
            const paths = svg.querySelectorAll("path");
            paths.forEach((path) => {
              if (path.getAttribute("stroke") === "#e6e6e6") {
                path.style.stroke = "none";
                path.style.fill = "none";
              }
            });
          }
        } else {
          console.log("GChart container not found");
        }
      });
    }
  }
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
