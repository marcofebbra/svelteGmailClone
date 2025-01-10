<script lang="ts">
	import type { Allegato } from "$lib/types";
	import { CloudUpload, Download } from "lucide-svelte";
	import { onMount } from "svelte";


    interface Props {
        allegato: Allegato,
    }

    let {allegato}: Props = $props();
    let isHover = $state(false)

    const handleMouseEnter = () => {
        isHover=true;
    }
    const handleMouseLeave = () => {
        isHover=false;
    }

</script>

<div class="flex flex-col justify-end w-[178px] h-[133px] bg-[#efefef] relative"
    role="button"
    tabindex={0}
    onmouseenter={() => handleMouseEnter()}
    onmouseleave={() => handleMouseLeave()}
>
    <div class="w-full ps-[8px] flex flex-col gap-2 bg-[#f5f5f5] border border-[#e6e6e6]"
    style:height={isHover ? "100%" : "33px"}
    style:padding-top={isHover ? "10px" : ""}
    >

    <div class="flex justify-between gap-2 w-full h-[33px]"
        style:align-items={isHover ? "start" : "center"}
    >
        <div class="w-4 h-4 flex-shrink-0 bg-[#ff4040] flex justify-center items-center">
            <p class="text-white text-[6px] uppercase font-bold">{allegato.file.ext}</p>
        </div>
        <div class="flex flex-col flex-1 h-fit mr-[40px]"
        style:width={isHover ? "calc(100% - 32px)" : "calc(100% - 72px)"}
        >
            <p class="text-[#777777] text-[12px] font-semibold truncate w-full">{allegato.file.name}</p>
            {#if isHover}
                <div class="flex-1 text-[11px] text-[#858585]">
                    {Math.round(allegato.file.size/1000) + " KB"}
                </div>
                <div class="flex gap-2 mt-[50px]">
                    <div class="w-[24px] h-[24px] bg-[#838383] rounded-[4px] flex justify-center items-center">
                        <Download size={16} color={"#ffffff"}/>
                    </div>
                    <div class="w-[24px] h-[24px] bg-[#838383] rounded-[4px] flex justify-center items-center">
                        <CloudUpload size={16} color={"#ffffff"}/>
                    </div>
        
                </div>
            {/if}
        </div>
        <div class="absolute bottom-0 right-0 w-[40px] h-[20px]">
            <div class="relative w-full h-full flex">
                <div class="h-full flex-1"
                    style:border-top={"20px solid #f5f5f5"}
                    style:border-right={"20px solid #dcdcdc"}
                ></div>
                <div class="h-full flex-1"
                    style:border-top={"20px solid #ff4040"}
                    style:border-right={"20px solid white"}
                ></div>
                <div class="absolute right-[-1px] bottom-[-1px] w-[20px] h-[20px]"
                style:border-top={"20px solid transparent"}
                    style:border-right={"20px solid white"}
                ></div>
            </div>
        </div>
    </div>
    
    </div>
</div>