<template>
<div>
    <button
      @click="toggleDropdown"
      :class="['bg-white mx-0 text-[#5B638B] font-semibold rounded text-base py-2.5 w-40 width-8 width-7 text-center inline-flex items-center justify-center',borderClass]"
      type="button"
    >
     <span class="flex gap-2 items-center text-center">
      {{ selectedLabel }}
      <svg v-if="isSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Downarrow" width="20" height="20">
        <path d="M16 22a2 2 0 0 1-1.41-.59l-10-10a2 2 0 0 1 2.82-2.82L16 17.17l8.59-8.58a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 16 22Z" fill="#5B638B" class="color000000 svgShape">
        </path>
      </svg> 
    </span>
    </button>
    <div v-if="isDropdown" v-click-outside="closeDropdown" class="z-50 absolute right-0 top-14 bg-white rounded-lg shadow  width-8 width-7 w-40 dark:bg-gray-700">
        <ul class="text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
            <li v-for="(item,index) in items" :key="index">
          <a
            @click.prevent="selectItem(item,index)"
          >
            <span class="block px-4 py-2">
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
    borderClass: {
      type: String,
      default: 'border',
    },
    isSvg: {
      type:Boolean,
      default: false,
    },
    },
    data() {
        return {
            isDropdown:false
        }
    },
    methods: {
        closeDropdown() {
            this.isDropdown = false
        },
        toggleDropdown(){
            this.isDropdown = !this.isDropdown;
        },
        selectItem(item) {
        this.isDropdown = false;
        this.$emit("getValue", item);
      },
    },
}
</script>
