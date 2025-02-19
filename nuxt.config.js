export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
 server: {
    host: '0.0.0.0', // Listen on all IP addresses
    port: 3000       // Port that Nuxt will run on
  },
  // router: {
  //   middleware: "auth",
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Asali-Munafaa | track real profit",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Poppins",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/tailwind.css",
    "@/assets/css/global.css",
    "vue-toast-notification/dist/theme-bootstrap.css",
    'slick-carousel/slick/slick.css',
    'slick-carousel/slick/slick-theme.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/toast-notification.js", mode: "client" },
    { src: "~/plugins/v-click-outside.js", mode: "client" },
    { src: "~/plugins/vue2-datepicker.js", mode: "client" },
    { src: "~/plugins/vuejs-progress-bar.js", ssr: false },
    { src: "~/plugins/vue-avatar.js", mode: "client" },
    { src: "~/plugins/vue-spinner.js", mode: "client" },
    { src: "~/plugins/vue-google-charts.js", ssr: false },
    { src: '~/plugins/vue-slick.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: "~/components/", pathPrefix: false }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vue-echarts", "resize-detector"],
    postcss: {
      postcssOptions: {
        plugins: {
          // Add Tailwind CSS and Autoprefixer as plugins
          tailwindcss: {},
          autoprefixer: {},
          // You can add other PostCSS plugins here if needed
        },
      },
    },
  },
};
