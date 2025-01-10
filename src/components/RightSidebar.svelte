<script lang="ts">
    import { rightSidebar } from "$lib/LeftSidebar.svelte";
    import { Plus } from 'lucide-svelte';

	import IconButton from "./IconButton.svelte";
	import RightSidebarButton from "./RightSidebarButton.svelte";
	import RightSidebarToggle from "./RightSidebarToggle.svelte";

</script>

<aside class="relative h-full transition-all "
style:width={rightSidebar.isOpen ? "56px" : "16px"}
>

{#if rightSidebar.isOpen}
<div class="w-full flex flex-col gap-3 items-center">
<RightSidebarButton imageSrc={"/googlecalendar.png"} label={"Calendario (Da implementare)"}/>
<RightSidebarButton imageSrc={"/googlekeep.png"} label={"Keep (Da implementare)"}/>
<RightSidebarButton imageSrc={"/googletask.png"} label={"Task (Da implementare)"}/>
<RightSidebarButton imageSrc={"/googlecontatti.png"} label={"Contatti (Da implementare)"}/>

<div class="w-[70%] h-px bg-[#d0d0d0]"></div>

<div class="w-[40px] h-[40px]">
    <IconButton
                Icon={Plus}
                label={"Scarica componenti aggiuntivi (Da implementare)"}
                padding={8}
                sizeButton={40}
                sizeIcon={24}
    />
</div>
</div>

{/if}

<RightSidebarToggle/>

</aside>