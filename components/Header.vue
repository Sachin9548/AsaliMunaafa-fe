<template>
  <header
    id="header"
    style="z-index: 999"
    class="bg-gradient-to-r from-[#0c040f] to-[#320747] fixed top-0 w-full lef-0 p-3 header-area"
  >
    <div class="flex justify-between items-center mx-7">
      <div class="flex items-center gap-9">
        <a href="/">
          <img
            src="../static/Images/logo.webp"
            alt
            class="xl:w-[115px] sm:w-[100px] md:w-[100px] lg:w-[100px] w-[80px] h-auto"
          />
        </a>
        <div
          class="relative text-white bg-transparent display-absolute top-0 top-100 left-0 w-full xl:w-[unset] text-center menu-container display-none block"
        >
          <div>
            <ul class="flex display-block items-center gap-7">
              <li>
                <a
                  href="/"
                  class="xl:text-[19px] lg:text-[19px] font-normal justify-center xl:text-white text-white [&.active]:after:content('') [&.active]:after:w-full [&.active]:after:h-[2px] [&.active]:after:bg-gradient-to-r from-[#9ED0FF] to-[#4F42E4] [&.active]:after:absolute [&.active]:after:bottom-[-10px] [&.active]:after:left-0 relative active nav-menu-content"
                  >Home</a
                >
              </li>
              <li class="drop-li relative">
                <a
                  href="javascript:void(0)"
                  class="xl:text-[19px] lg:text-[19px] inline-flex gap-2 justify-center items-center font-normal xl:text-white text-white [&.active]:after:content('') [&.active]:after:w-full [&.active]:after:h-[2px] [&.active]:after:bg-gradient-to-r from-[#9ED0FF] to-[#4F42E4] [&.active]:after:absolute [&.active]:after:bottom-[-10px] [&.active]:after:left-0 relative nav-menu-content"
                >
                  Explore
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.20044 8.59619C6.3352 8.4616 6.51788 8.38599 6.70835 8.38599C6.89882 8.38599 7.0815 8.4616 7.21627 8.59619L11.5 12.8799L15.7838 8.59619C15.8496 8.52558 15.9289 8.46894 16.0171 8.42965C16.1053 8.39037 16.2004 8.36925 16.2969 8.36754C16.3934 8.36584 16.4893 8.38359 16.5788 8.41974C16.6683 8.45589 16.7496 8.5097 16.8178 8.57795C16.8861 8.6462 16.9399 8.7275 16.9761 8.817C17.0122 8.90649 17.03 9.00235 17.0283 9.09886C17.0266 9.19537 17.0054 9.29054 16.9661 9.37871C16.9269 9.46688 16.8702 9.54623 16.7996 9.61203L12.0079 14.4037C11.8732 14.5383 11.6905 14.6139 11.5 14.6139C11.3096 14.6139 11.1269 14.5383 10.9921 14.4037L6.20044 9.61203C6.06584 9.47726 5.99023 9.29458 5.99023 9.10411C5.99023 8.91364 6.06584 8.73096 6.20044 8.59619Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <!-- <div
                    class="bg-white text-left xl:absolute child-drop top-[55px] min-w-[200px] shadow-md p-5">
                    <ul>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3 inline-block">item1</a></li>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3 inline-block">item2</a></li>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3">item3</a></li>
                    </ul>
                  </div> -->
              </li>
              <li class="drop-li relative">
                <a
                  href="javascript:void(0)"
                  class="xl:text-[19px] lg:text-[19px] inline-flex gap-2 justify-center items-center font-normal xl:text-white text-white [&.active]:after:content('') [&.active]:after:w-full [&.active]:after:h-[2px] [&.active]:after:bg-gradient-to-r from-[#9ED0FF] to-[#4F42E4] [&.active]:after:absolute [&.active]:after:bottom-[-10px] [&.active]:after:left-0 relative nav-menu-content"
                >
                  Pages
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.20044 8.59619C6.3352 8.4616 6.51788 8.38599 6.70835 8.38599C6.89882 8.38599 7.0815 8.4616 7.21627 8.59619L11.5 12.8799L15.7838 8.59619C15.8496 8.52558 15.9289 8.46894 16.0171 8.42965C16.1053 8.39037 16.2004 8.36925 16.2969 8.36754C16.3934 8.36584 16.4893 8.38359 16.5788 8.41974C16.6683 8.45589 16.7496 8.5097 16.8178 8.57795C16.8861 8.6462 16.9399 8.7275 16.9761 8.817C17.0122 8.90649 17.03 9.00235 17.0283 9.09886C17.0266 9.19537 17.0054 9.29054 16.9661 9.37871C16.9269 9.46688 16.8702 9.54623 16.7996 9.61203L12.0079 14.4037C11.8732 14.5383 11.6905 14.6139 11.5 14.6139C11.3096 14.6139 11.1269 14.5383 10.9921 14.4037L6.20044 9.61203C6.06584 9.47726 5.99023 9.29458 5.99023 9.10411C5.99023 8.91364 6.06584 8.73096 6.20044 8.59619Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <!-- <div
                    class="bg-white text-left xl:absolute child-drop top-[55px] min-w-[200px] shadow-md p-5">
                    <ul>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3 inline-block">item1</a></li>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3 inline-block">item2</a></li>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3">item3</a></li>
                    </ul>
                  </div> -->
              </li>
              <li class="drop-li relative">
                <a
                  href="javascript:void(0)"
                  class="xl:text-[19px] lg:text-[19px] inline-flex gap-2 justify-center items-center font-normal xl:text-white text-white [&.active]:after:content('') [&.active]:after:w-full [&.active]:after:h-[2px] [&.active]:after:bg-gradient-to-r from-[#9ED0FF] to-[#4F42E4] [&.active]:after:absolute [&.active]:after:bottom-[-10px] [&.active]:after:left-0 relative nav-menu-content"
                >
                  <Nuxt-link to="/blog"> Blogs</Nuxt-link>

                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.20044 8.59619C6.3352 8.4616 6.51788 8.38599 6.70835 8.38599C6.89882 8.38599 7.0815 8.4616 7.21627 8.59619L11.5 12.8799L15.7838 8.59619C15.8496 8.52558 15.9289 8.46894 16.0171 8.42965C16.1053 8.39037 16.2004 8.36925 16.2969 8.36754C16.3934 8.36584 16.4893 8.38359 16.5788 8.41974C16.6683 8.45589 16.7496 8.5097 16.8178 8.57795C16.8861 8.6462 16.9399 8.7275 16.9761 8.817C17.0122 8.90649 17.03 9.00235 17.0283 9.09886C17.0266 9.19537 17.0054 9.29054 16.9661 9.37871C16.9269 9.46688 16.8702 9.54623 16.7996 9.61203L12.0079 14.4037C11.8732 14.5383 11.6905 14.6139 11.5 14.6139C11.3096 14.6139 11.1269 14.5383 10.9921 14.4037L6.20044 9.61203C6.06584 9.47726 5.99023 9.29458 5.99023 9.10411C5.99023 8.91364 6.06584 8.73096 6.20044 8.59619Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <!-- <div
                    class="bg-white text-left xl:absolute child-drop top-[55px] min-w-[200px] shadow-md p-5">
                    <ul>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3 inline-block">item1</a></li>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3 inline-block">item2</a></li>
                      <li><a href="#"
                          class="xl:text-xl lg:text-lg  font-normal text-white mb-3">item3</a></li>
                    </ul>
                  </div> -->
              </li>
              <li class="">
                <a
                  href="javascript:void(0)"
                  class="xl:text-[19px] lg:text-[19px] font-normal xl:text-white text-white justify-center [&.active]:after:content('') [&.active]:after:w-full [&.active]:after:h-[2px] [&.active]:after:bg-gradient-to-r from-[#9ED0FF] to-[#4F42E4] [&.active]:after:absolute [&.active]:after:bottom-[-10px] [&.active]:after:left-0 relative nav-menu-content"
                  >Contact</a
                >
              </li>
              <li class="">
                <a
                  href="javascript:void(0)"
                  class="xl:text-[19px] lg:text-[19px] font-normal xl:text-white text-white justify-center [&.active]:after:content('') [&.active]:after:w-full [&.active]:after:h-[2px] [&.active]:after:bg-gradient-to-r from-[#9ED0FF] to-[#4F42E4] [&.active]:after:absolute [&.active]:after:bottom-[-10px] [&.active]:after:left-0 relative nav-menu-content"
                  >About</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="items-center sm:gap-7 gap-0 flex">
        <!-- <div class="cursor-pointer xl:block hidden">
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.67 18.9198C17.5708 18.9056 17.4433 18.9056 17.33 18.9198C14.8367 18.8348 12.8533 16.7948 12.8533 14.2873C12.8533 11.7231 14.9217 9.64062 17.5 9.64062C20.0642 9.64062 22.1467 11.7231 22.1467 14.2873C22.1325 16.7948 20.1633 18.8348 17.67 18.9198Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M27.0483 28.2697C24.5267 30.5788 21.1833 31.9813 17.5 31.9813C13.8167 31.9813 10.4733 30.5788 7.95166 28.2697C8.09333 26.938 8.94333 25.6347 10.4592 24.6147C14.3408 22.0363 20.6875 22.0363 24.5408 24.6147C26.0567 25.6347 26.9067 26.938 27.0483 28.2697Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.5 31.9813C25.324 31.9813 31.6667 25.6387 31.6667 17.8146C31.6667 9.99058 25.324 3.64795 17.5 3.64795C9.67596 3.64795 3.33333 9.99058 3.33333 17.8146C3.33333 25.6387 9.67596 31.9813 17.5 31.9813Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div> -->
        <a
          href="javascript:void(0)"
          @click="openGetInTouchModal"
          class="py-[10px] rounded-xl xl:px-3 px-2 bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white xl:text-[17px] text-sm font-medium"
        >
          Get In Touch
        </a>
        <div>
                <Nuxt-link
                  to="/login"
                  class="xl:text-[19px] lg:text-[19px] font-normal xl:text-white text-white justify-center [&.active]:after:content('') [&.active]:after:w-full [&.active]:after:h-[2px] [&.active]:after:bg-gradient-to-r from-[#9ED0FF] to-[#4F42E4] [&.active]:after:absolute [&.active]:after:bottom-[-10px] [&.active]:after:left-0 relative nav-menu-content  sm:!block hidden"
                  >Login</Nuxt-link>
              </div>
        <div class="xl:hidden lg:hidden nav-menu text-white">
          <button
            @click.prevent="toggleSidebar"
            type="button"
            class="inline-flex items-center ms-3 display-block text-sm rounded-lg focus:outline-none"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M3 6h18M3 12h18M3 18h18"
              />
            </svg>
          </button>
          <!-- ---------------- sidebar ------------ -->

          <aside
            :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
            v-click-outside="closeSidebar"
            class="fixed top-0 left-0 z-40 w-[19rem] mt-[64px] width-17 h-screen transition-transform xl:translate-x-0 bg-[#2B0064]"
            aria-label="Sidebar"
          >
            <div
              class="bg-gradient-to-r from-[#2B0064] to-[#6313D9] h-full px-3 dark:bg-gray-800"
            >
              <div class="flex justify-center py-2">
                <ul
                  class="flex flex-col gap-y-5 text-white text-xl font-medium w-full"
                >
                  <li
                    v-for="(tab, key) in sideBarItems"
                    :key="key"
                    class="text-white font-semibold py-2 border-b border-white w-full flex justify-center"
                    @click="isSidebarOpen = false"
                  >
                    <Nuxt-link
                      :to="tab.href"
                      class="flex items-center gap-4 justify-between"
                      >{{ tab.name }}
                    </Nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
          <div
            v-if="isSidebarOpen"
            @click="isSidebarOpen = false"
            class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
          ></div>
          <!-- -------------------------------------- -->
        </div>
      </div>
    </div>

    <GetInTouchModal
      :isGetInTouchModal="isGetInTouchModal"
      @save="handleGetInTouch"
      @close="closeGetInTouchModal"
    />
    <ComingSoonModal
      :isComingSoonModal="isComingSoonModal"
      @close="closeComingSoonModal"
    />
  </header>
</template>
<script>
export default {
  data() {
    return {
      isGetInTouchModal: false,
      isComingSoonModal: false,
      isSidebarOpen: false,
      sideBarItems: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Explore",
          href: "",
        },
        {
          name: "Pages",
          href: "",
        },
        {
          name: "Blogs",
          href: "/blog",
        },
        {
          name: "Contact",
          href: "",
        },
        {
          name: "About",
          href: "",
        },
        {
          name: "Login",
          href: "/login",
        },
      ],
    };
  },
  methods: {
    handleGetInTouch() {
      document.body.style.overflow = "hidden";
      this.isGetInTouchModal = false;
      this.isComingSoonModal = true;
    },
    closeComingSoonModal() {
      this.isComingSoonModal = false;
      document.body.style.overflow = "";
    },
    openGetInTouchModal() {
      document.body.style.overflow = "hidden";
      this.isGetInTouchModal = true;
    },
    closeGetInTouchModal() {
      this.isGetInTouchModal = false;
      document.body.style.overflow = "";
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      document.body.style.overflow = "hidden";
    },
    closeSidebar() {
      document.body.style.overflow = "";
    },
  },
};
</script>
