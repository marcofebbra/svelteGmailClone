<script>

	import { tabs } from "$lib/data/tabs";
    import { tabSelected } from "$lib/EmailSection.svelte";
	import { Inbox, Info, Tag, UsersRound } from "lucide-svelte";
    import { innerWidth } from 'svelte/reactivity/window';


</script>

<div class="w-full h-[56px] flex flex-none">
    {#each tabs as tab}
        <div class="relative h-full flex-1 flex justify-center items-center text-[14px] font-medium tracking-wider"
        style:color={tabSelected.value==tab.id ? "#0b57d0" : "#444746"}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key == "Enter" ? tabSelected.value=tab.id : ""}
        onclick={() => tabSelected.value=tab.id}
        >
        <div class="flex gap-2">
            {#if tab.name == "Principale"}
                <Inbox size={20}/>
            {:else if tab.name == "Promozioni"}
                <Tag size={20}/>
            {:else if tab.name == "Social"}
                <UsersRound size={20}/>
            {:else}
                <Info size={20}/>
            {/if}
            {#if innerWidth.current ? innerWidth.current > 625 : false}
                {tab.name}
            {/if}
        </div>
            {#if tabSelected.value==tab.id}
                <div class="absolute w-[90%] h-[3px] bottom-0 left-0 right-0 mx-auto bg-[#0b57d0] rounded-t-full"></div>
            {/if}
        </div>
    {/each}
</div>