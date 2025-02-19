<template>
    <div>
      <div class="bg-[#0a000000] bg-center xl:!h-[58rem] h-auto relative overflow-hidden" style="background-image: radial-gradient(circle, #512274, #0a000000);">
        <div class="flex flex-col xl:flex-row items-center">
            <h1 class="text-white xl:max-w-[425px] text-[73px] xl:text-[90px] font-medium xl:mx-44 mx-5 margin-7 mt-20 xl:mt-44 xl:mb-0 mb-10">What Our <span class="text-[#69d6ce]">Client Say's</span></h1>
            <div class="mb-10 cursor-pointer grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
            <ClientReviewCard
              v-for="(client, index) in clients"
              :key="index"
              :review="client.review"
              :image="client.image"
              :title="client.title"
              :right="client.right"
              :top="client.top"
              :rotate="client.rotate"
              :bgColor="client.bgColor"
              :hoverRight="client.hoverRight"
            />
            </div>
        </div>
      </div>
    </div>
  </template>
<script>
import userImage from '../static/Images/user-image.webp'
export default{
  data() {
    return {
      clients:[
        {
          review:'Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec. Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec.',
          image:userImage,
          title:'Client1',
          right:'1.75rem',
          top:'6rem',
          rotate:'2deg',
          bgColor:'#602275',
          hoverRight:'4rem'
        },
        {
          review:'Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec. Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec.',
          image:userImage,
          title:'Client1',
          right:'0',
          top:'14rem',
          rotate:'20deg',
          bgColor:'#0e125e',
          hoverRight:'4rem'
        },
        {
          review:'Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec. Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec.',
          image:userImage,
          title:'Client1',
          right:'18rem',
          top:'11rem',
          rotate:'-15deg',
          bgColor:'#484f0d',
          hoverRight:''
        },
        {
          review:'Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec. Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec.',
          image:userImage,
          title:'Client1',
          right:'16rem',
          top:'21rem',
          rotate:'2deg',
          bgColor:'#0a3d47',
          hoverRight:''
        },
        {
          review:'Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec. Know your REAL E-commerce Profit or Loss in Just one Dashboard within 60 Sec.',
          image:userImage,
          title:'Client1',
          right:'4rem',
          top:'23rem',
          rotate:'2deg',
          bgColor:'#451317',
          hoverRight:''
        },

      ]
    }
  },
}
</script>
<style scoped>
@media screen and (min-width:1199px) and (max-width:1300px) {
  .margin-7{
    margin-left: 7rem;
  }
}
</style>
  