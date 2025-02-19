<template>
  <div>
    <form class="flex items-center gap-2">
      <input
        type="checkbox"
        :id="checkboxId"
        :name="checkboxName"
        :value="checkboxValue"
        class="rounded"
        v-model="selectValue"
        @change="updateParent"
      />
      <img :src="imageSrc" alt="" />
      <label
        :for="checkboxId"
        class="text-[#8C93BE] font-semibold text-lg cursor-pointer"
        >{{ labelText }}</label
      ><br />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    labelText: {
      type: String,
      required: true,
    },
    selectedValue: {
      type: Array,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    checkboxId: {
      type: String,
      required: true,
    },
    checkboxName: {
      type: String,
      required: true,
    },
    checkboxValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectValue: this.selectedValue,
    };
  },
  watch: {
    selectedValue() {
      this.selectValue = this.selectedValue;
    },
  },
  methods: {
    updateParent() {
      this.$emit("change", this.selectValue);
    },
  },
};
</script>
