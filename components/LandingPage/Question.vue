<template>
<div @click="toggleAnswer(index)" class="cursor-pointer xxxl:px-16 xl:px-16 sm:px-14 px-2 py-4 mb-3 rounded-lg shadow-xl duration-1000 ease-in-out transform" :class="activeIndex === index ? 'bg-[#7a24d1] pt-7' : 'bg-[#312652] custom-class'">
    <div class="text-white flex justify-between items-center">
        <span class="text-white sm:text-2xl text-[18px] font-medium pt-2">{{ question.question }}</span>
        <svg v-if="activeIndex === index" fill="#ffffff" height="25" width="25" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330.002 330.002" xml:space="preserve">
            <path id="XMLID_105_" d="M324.001,209.25L173.997,96.75c-5.334-4-12.667-4-18,0L6.001,209.25c-6.627,4.971-7.971,14.373-3,21
                        c2.947,3.93,7.451,6.001,12.012,6.001c3.131,0,6.29-0.978,8.988-3.001L164.998,127.5l141.003,105.75c6.629,4.972,16.03,3.627,21-3
                        C331.972,223.623,330.628,214.221,324.001,209.25z" />
        </svg>
        <svg v-else fill="#ffffff" height="25" width="25" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330.002 330.002" xml:space="preserve">
            <path id="XMLID_229_" d="M327.001,99.751c-4.971-6.628-14.374-7.971-21-3l-140.997,105.75L24.001,96.751
                        c-6.628-4.971-16.029-3.626-21,3c-4.971,6.627-3.627,16.03,3,21l150.004,112.5c2.667,2,5.833,3,9,3c3.166,0,6.333-1,9-3
                        l149.996-112.5C330.628,115.781,331.972,106.379,327.001,99.751z" />
        </svg>
    </div>
    <div v-if="activeIndex === index" class="mt-3 !max-w-[890px]">
        <span class="text-white sm:text-lg font-medium">{{ question.answer }}</span>
    </div>
</div>
</template>

<script>
export default {
    props: {
        question: {
            type: Object,
            required: true
        },
        activeIndex: {
            type: null,
            required: true
        },
        index: {
            type: Number,
        },
    },
    methods: {
        toggleAnswer() {
            this.$emit('toggleAnswer', this.index);
        }
    }
}
</script>
