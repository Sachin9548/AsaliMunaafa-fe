<template>
 <div>
     <div class="flex justify-center flex-col items-center mb-10 bg-[#020436]" style="background-image: radial-gradient(circle, #4b2c56, #020436);">
         <h1 class="text-white mt-24 sm:text-4xl text-[20px] font-semibold mb-20">Frequently Asked <span class="text-[#69d6ce]">Questions</span></h1>
         <div class="w-[77%] mb-40">
             <Question v-for="(question, index) in questions" :key="index" :index="index" :question="question" :activeIndex="activeIndex"  @toggleAnswer="toggleAnswer" />
         </div>
     </div>
 </div>
</template>

  
<script>
export default {
    data() {
        return {
            activeIndex: null,
            questions: [{
                    question: "What is net profit?",
                    answer: "New profit, also known as the bottom line or net income, is the amount of revenue left over after deducting all expenses, including Product manufacturing cost, operating expenses, shipping, labor cost,taxes,and interest, from total revenue."
                },
                {
                    question: "What is gross profit?",
                    answer: "New profit, also known as the bottom line or net income, is the amount of revenue left over after deducting all expenses, including Product manufacturing cost, operating expenses, shipping, labor cost,taxes,and interest, from total revenue."
                },
                {
                    question: "How Asli Munaafa help ous?",
                    answer: "New profit, also known as the bottom line or net income, is the amount of revenue left over after deducting all expenses, including Product manufacturing cost, operating expenses, shipping, labor cost,taxes,and interest, from total revenue."
                },
                {
                    question: "What are the new features in it?",
                    answer: "New profit, also known as the bottom line or net income, is the amount of revenue left over after deducting all expenses, including Product manufacturing cost, operating expenses, shipping, labor cost,taxes,and interest, from total revenue."
                },
            ]
        }
    },
    methods: {
        toggleAnswer(index) {
            setTimeout(() => {
                this.activeIndex = this.activeIndex === index ? null : index;
            }, 300);
        }
    }
}
</script>

<style scoped>
.custom-class {
    background-image: radial-gradient(circle, #4b2c56, #312652);
}
</style>
