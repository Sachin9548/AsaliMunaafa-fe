<template>
    <div>
        <div class="bg-[#130b42] rounded-xl sm:h-[130px] h-[180px] xl:h-[150px]">
                <div class="flex justify-between mx-3 mt-2 py-3 px-1">
                    <div>
                    <h1 class="xl:text-lg text-white">{{item.title}}</h1>
                <p class="xl:text-md text-[#c6beeb] text-left tracking-widest">★★★★★</p>
                </div>
                <img :src="item.image" alt="" class="w-24 h-11 rounded object-cover">
                </div>
                <p class="xl:text-md mx-3 text-[#c6beeb] text-left mb-2 max-w-[440px] mt-3">{{item.description}}</p>
          </div>
    </div>
</template>

<script> 
export default{
    props:{
        item:{
            type:Object,
            required:true,
        }
    }
}
</script>