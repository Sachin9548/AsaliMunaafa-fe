<template>
  <div>
    <header>
      <nav class="w-full bg-[#F1F1FF] !fixed z-50">
        <div class="flex items-center">
          <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center ms-3 hidden display-block text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div
            class="flex w-full flex-wrap items-center justify-between px-4 py-2"
          >
            <Nuxt-link to="/">
              <img
                src="@/static/Images/footer-logo.webp"
                alt="Asli munfa"
                class="w-24 ml-5"
              />
            </Nuxt-link>
            <img
              src="@/static/Images/user.webp"
              @click="isDropdown = !isDropdown"
              alt=""
              class="w-7 cursor-pointer"
            />
            <div
              v-if="isDropdown"
              v-click-outside="closeDropdown"
              class="z-50 absolute right-2 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                aria-labelledby="dropdownHoverButton"
                @click="closeDropdown"
              >
                <li>
                  <a
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    @click="logOut"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Log out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <aside
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      class="fixed top-0 left-0 z-40 xl:w-[19rem] w-[17rem] width-17 mt-[52px] h-screen transition-transform sm:translate-x-0 bg-black"
      aria-label="Sidebar"
    >
      <div class="bg-dashboard-img h-full py-4 dark:bg-gray-800">
        <div class="mt-6 mb-5">
          <form class="max-w-sm mx-4">
            <div
              @click="isShow = !isShow"
              class="cursor-pointer flex items-center justify-between bg-transparent border border-gray-300 text-white text-sm rounded-lg block w-full p-2.5"
            >
              <div class="flex items-center gap-2">
                <avatar
                  :username="userName"
                  background-color="#7562FF"
                  :size="46"
                  color="#fffff"
                ></avatar>

                <div
                  class="relative inline-block"
                  @mouseover="showTooltip"
                  @mouseleave="hideTooltip"
                >
                  <slot
                    ><span class="text-base font-medium">{{
                      username.length > 10
                        ? username.substring(0, 10) + "..."
                        : username
                    }}</span></slot
                  >
                  <div
                    v-if="visible"
                    class="absolute left-1/2 transform inline-block -translate-x-1/2 transition-opacity -top-8 px-3 py-2 text-black mb-2 p-2 bg-white text-sm rounded shadow-lg z-10"
                  >
                    {{ username }}
                  </div>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  id="Downarrow"
                  width="20"
                  height="20"
                >
                  <path
                    d="M16 22a2 2 0 0 1-1.41-.59l-10-10a2 2 0 0 1 2.82-2.82L16 17.17l8.59-8.58a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 16 22Z"
                    fill="#ffffff"
                    class="color000000 svgShape"
                  ></path>
                </svg>
              </div>
            </div>
          </form>
          <div class="flex justify-center mt-9">
            <ul
              class="flex flex-col gap-y-7 text-white text-xl font-medium cursor-pointer w-full justify-center"
            >
              <li
                v-for="(tab, key) in sideBarItems"
                :key="key"
                @click="toggle()"
                :class="activeTab == tab.href ? 'bg-[#AB55FF] p-2' : ''"
              >
                <Nuxt-link
                  :to="tab.href"
                  class="flex items-center gap-4 justify-center"
                  >{{ tab.name }}
                </Nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
    <transition name="fade">
      <div
        v-click-outside="closeModal"
        v-if="isShow"
        class="mt-16 slide-in-right block fixed z-50 w-[32%] p-6 bg-white border border-gray-200 rounded-lg shadow ml-[19.5rem] margin-10"
      >
        <div class="flex justify-between items-center">
          <p
            class="font-semibold text-lg text-[#1F2DC6] border-b-2 border-[#1F2DC6]"
          >
            {{ username }} Workspace
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="Setting"
            width="27"
            height="27"
            class="cursor-pointer"
          >
            <path
              d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"
              fill="#2d375b"
              class="color000000 svgShape"
            ></path>
          </svg>
        </div>
        <div
          class="mt-4 bg-[#C7FFC3] p-2 rounded-md flex justify-between items-center"
        >
          <div class="flex items-center gap-2 mx-1">
            <avatar
              :username="userName"
              background-color="#7562FF"
              :size="30"
              color="#fffff"
            ></avatar>
            <p class="text-base font-medium text-[#0C8D00]">
              {{ username }}
            </p>
          </div>
          <div class="mx-1">
            <p class="text-xs font-normal text-[#0C8D00]">Logged Shop</p>
          </div>
        </div>
        <div class="mt-5 flex justify-center">
          <button
            class="flex items-center justify-center gap-1 text-xs px-3 bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-normal rounded-md"
          >
            <span class="text-3xl"> + </span>Add New shop
          </button>
        </div>
      </div>
    </transition>
    <div class="p-4 sm:ml-[19rem]">
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
      ></div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  middleware: "auth",
  data() {
    return {
      isShow: false,
      isSidebarOpen: false,
      isDropdown: false,
      visible: false,
      sideBarItems: [
        {
          name: "Dashboard",
          href: "/dashboard",
          isActive: true,
        },
        {
          name: "Marketing",
          href: "/marketing",
          isActive: false,
        },
        {
          name: "shipping",
          href: "/shiping",
          isActive: false,
        },
        {
          name: "Products",
          href: "/products",
          isActive: false,
        },
        {
          name: "Returns",
          href: "/returns",
          isActive: false,
        },
      ],
      activeTab: "",
      userName: "",
    };
  },
  async mounted() {
    document.body.style.backgroundColor = "#D9D8FF";
    this.activeTab = this.$router.history.current.fullPath;
    try {
      const response = await this.getProfileData();
      this.userName = response.data.fullName;
    } catch (error) {
      this.$toast.open({
        message: error,
        type: "error",
        duration: 2000,
        position: "bottom-right",
      });
    }
  },
  beforeDestroy() {
    document.body.style.backgroundColor = '';
  },
  watch: {
    "$route.path"(newPath) {
      this.activeTab = newPath;
    },
  },
  computed: {
    username() {
      return this.userName.charAt(0).toUpperCase() + this.userName.slice(1);
    },
  },
  methods: {
    ...mapActions({
      getProfileData: "auth/getProfileData",
    }),
    showTooltip() {
      this.visible = true;
    },
    hideTooltip() {
      this.visible = false;
    },
    closeDropdown() {
      this.isDropdown = false;
    },
    logOut() {
      sessionStorage.removeItem("token");
      this.$router.push("login");
    },
    toggle() {
      this.activeTab = this.$router.history.current.fullPath;
      this.isSidebarOpen = false;
    },
    closeModal() {
      this.isShow = false;
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
<style scoped>
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(3%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.slide-in-right {
  animation: slideInRight 0.5s ease-in-out forwards;
}
</style>
