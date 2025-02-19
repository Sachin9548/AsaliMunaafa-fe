<template>
  <div>
    <PageTemplate>
      <template #content>
        <div class="pt-8 my-4 xl:w-[22%] lg:w-1/2 sm:w-1/2 md:w-[75%] mx-5">
          <h2
            class="xl:text-4xl text-2xl py-2 font-medium text-center text-white lg:mb-12 xl:mb-3 sm:mb-0"
          >
            signup
          </h2>
          <p
            class="text-white text-[22px] text-center lg:mb-12 xl:mb-7 sm:mb-0 font-light"
          >
            Know your real profit in just 60 second
          </p>
          <a
            class="flex items-center justify-center mt-4 text-white rounded-lg shadow-md bg-white"
          >
            <div class="px-4 py-3">
              <svg class="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <h1 class="px-4 xl:py-3 sm:py-0 w-5/6 text-gray-600 font-bold">
              Sign in with Google
            </h1>
          </a>
          <div class="mt-7 flex items-center justify-between mb-6">
            <span class="border-b w-[46%]"></span>
            <a href="#" class="text-base text-center text-white">Or</a>
            <span class="border-b w-[46%]"></span>
          </div>

          <div class="mt-4 flex gap-3 flex-col">
           <form @submit.prevent="signup">
            <label class="block text-white xl:text-lg text-sm font-bold mb-2"
              >Email or Phone</label
            >
            <div class="flex items-center text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 96"
                id="email"
                class="absolute ml-3 mb-5"
                width="24"
              >
                <g>
                  <path
                    d="M0 11.283V8a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v3.283l-64 40zm66.12 48.11a4.004 4.004 0 0 1-4.24 0L0 20.717V88a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8V20.717z"
                  ></path>
                </g>
              </svg>

              <input
                v-model="form.email"
                type="email"
                id="email"
                class="bg-white rounded pl-12 py-2 md:py-2 focus:outline-none w-full mb-5"
                placeholder="Email"
              />
            </div>
            <label class="block text-white xl:text-lg text-sm font-bold mb-1"
              >Password
            </label>
            <div class="flex items-center text-lg">
              <svg class="absolute ml-3 mb-3" viewBox="0 0 24 24" width="24">
                <path
                  d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"
                />
              </svg>
              <input
                v-model="form.password"
                type="password"
                id="password"
                class="bg-white rounded pl-12 py-2 md:py-2 focus:outline-none w-full mb-3"
                placeholder="Password"
              />
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div class="ml-3 xl:text-base mb-4">
                <label for="remember" class="text-white dark:text-white"
                  >Would like to receive update on email</label
                >
              </div>
            </div>
            <button
              class="bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full rounded-md"
              :disabled="isLoading"
            >
              <Loader v-if="isLoading" :loading="isLoading"></Loader>
              <span v-else>Continue With Email</span>
            </button>
           </form>
          </div>
          <div class="py-4 mt-3">
            <p
              class="xl:text-[20px] font-medium text-center font-light text-white"
            >
              Already have an Account ?
              <span class="cursor-pointer font-medium border-b"
                ><nuxt-link :to="`/login/?ensh=${ensh}`"
                  >Log in</nuxt-link
                ></span
              >
            </p>
          </div>
        </div>
      </template>
    </PageTemplate>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import message from "@/static/lang/en.json";
export default {
  layout: "blank",
  data() {
    return {
      ensh: "",
      form: {},
      isLoading: false,
    };
  },

  mounted() {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("ensh")) {
      this.ensh = queryParams.get("ensh");
    }
  },
  methods: {
    ...mapActions({
      Signup: "auth/signup",
    }),
    async signup() {
      try {
        if (this.form.email == "" || this.form.password == "") {
          this.$toast.open({
            message: message.errorMessage,
            type: "error",
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          this.isLoading = true;
          const response = await this.Signup(this.form);
          this.$toast.open({
            message: message.signupMessage,
            type: "success",
            duration: 2000,
            position: "bottom-right",
          });
          if (this.ensh) {
            this.$router.push(`/login/?ensh=${this.ensh}`);
          } else {
            this.$router.push("/login");
          }
        }
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg || this.message?.techinalError,
          type: "error",
          duration: 2000,
          position: "bottom-right",
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
