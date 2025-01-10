<script lang="ts">
	import { goto } from "$app/navigation";
	import { sezioni } from "$lib/data/sezioni";
	import { sorting } from "$lib/EmailSection.svelte";
    import { leftSidebar } from "$lib/sidebar.svelte";
    import { type Icon as IconType } from "lucide-svelte";

    interface Props {
		Icon: typeof IconType | null,
        label: string,
        selected: boolean,
        index: number,
        newEmails?: number
	}

    const {Icon, label, selected, index, newEmails=0}: Props = $props();
    let isHover = $state(false)

    const handleMouseEnter = () => {
        isHover=true;
    }
    const handleMouseLeave = () => {
        isHover=false;
    }
    const handleClick = () => {
        leftSidebar.selected=sezioni[index]
    }

    

</script>

<div class="relative w-[95%]" role="button" tabindex="0"
    onmouseenter={() => handleMouseEnter()}
    onmouseleave={() => handleMouseLeave()}
    onclick={() => {
        if(sezioni[index].name==="Speciali")
            sorting.value="special";
        else
            sorting.value="desc";
        handleClick();
        goto("/");
        }}
    onkeydown={(e) => e.key == "Enter" ? handleClick() : ""}
>
    <div class="btn relative h-[32px]"
        style:background-color={selected ? "#d3e3fd" : isHover ? "#3c40431a":""}
        style:width={leftSidebar.isOpen ? "100%": "32px"}
        style:border-top-left-radius={leftSidebar.isOpen ? "0px": "20px"}
        style:border-bottom-left-radius={leftSidebar.isOpen ? "0px": "20px"}
        style:border-top-right-radius={"20px"}
        style:border-bottom-right-radius={ "20px"}
        style:margin-left={leftSidebar.isOpen ? "0px":"19px"}
        >
        {#if label=="Posta in arrivo" && newEmails > 0 && !leftSidebar.isOpen}
            <div class="absolute right-0 top-1 w-[8px] h-[8px] bg-red-700 rounded-full">
            </div>
        {/if}
    </div>
    <div class="absolute top-0 left-[26px] h-full flex items-center justify-center truncate gap-4">
        <Icon size={18}/>
        {#if leftSidebar.isOpen}
            <h2
            class="text-sm"
            style:font-weight={ selected ? 600 : 400}
            >{label}</h2>
        {/if}
    </div>

    {#if label=="Posta in arrivo" && newEmails > 0 && leftSidebar.isOpen}
            <span class="absolute h-fit top-0 bottom-0 right-4 my-auto text-[12px] font-semibold">{newEmails}</span>
    {/if}
    

</div>

<style>
    .btn{
        transition: all 0.2s;
   }
</style>