<template>
  <div class="">
    <button
      @click="toggleDropdown"
      class="text-[#8C93BE] border-2 bg-[#F3F3F3] xl:mx-7 mx-0 lg:mx-8 md:mx-5 xl:w-1/2 xs:w-full width-100 lg:w-1/2 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button"
    >
      {{ selectedLabel }}
    </button>

    <div
      v-if="isDropdownVisible"
      v-click-outside="closeDropdown"
      class="shadow-md z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-1/2 dark:bg-gray-700 mx-6 my-4"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 lg:px-3 px-0">
        <li v-for="item in items" :key="item.value">
          <a
            href="#"
            class="block lg:px-4 px-0 py-2 border-b"
            @click.prevent="selectItem(item)"
          >
            <span class="text-[#8C93BE] font-semibold text-lg">
              {{ item.label }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedLabel: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    closeDropdown(){
      this.isDropdownVisible = false;
    },
    selectItem(item) {
      this.isDropdownVisible = false;
      this.$emit("getValue", item, this.index);
    },
  },
};
</script>
