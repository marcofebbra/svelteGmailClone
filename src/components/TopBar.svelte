<script lang="ts">
	import IconButton from "./IconButton.svelte";
	import SearchBar from "./SearchBar.svelte";
    import {AlignJustify, Grip, UserRound, Settings, CircleHelp, Search} from "lucide-svelte"
    import { leftSidebar } from "$lib/LeftSidebar.svelte";

    const handleSidebar = () => {
        leftSidebar.toggle();
    }
    let innerWidth = $state(0)

</script>

<svelte:window bind:innerWidth/>

<header class="w-full h-[64px] p-2 flex gap-2 justify-between min-w-[400px]">
    <div class="flex gap-[8px]">
        <div class="mx-1">
        <IconButton
            Icon={AlignJustify}
            label={"Menu principale"}
            padding={12}
            onClick={handleSidebar}
            sizeButton={48}
            sizeIcon={24}
        />
        </div>
        <img alt="Gmail logo" src={"/gmailLogo.png"} class="my-[2px]"/>
    </div>
    {#if innerWidth > 625}
        <SearchBar/>
    {/if}
    <div class="flex justify-center items-center">
        {#if innerWidth > 625}
        <IconButton
            Icon={CircleHelp}
            label={"Assistenza (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={24}
        />
        <IconButton
            Icon={Settings}
            label={"Impostazioni (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={24}
        />
        <IconButton
            Icon={Grip}
            label={"App Google (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={24}
        />
        <IconButton
            Icon={UserRound}
            label={"Accont Google (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={24}
        />
        {:else}
        <IconButton
            Icon={Search}
            label={"Ricerca (Search Bar visibile con width>625px)"}
            padding={8}
            sizeButton={40}
            sizeIcon={24}
        />
        <IconButton
            Icon={UserRound}
            label={"Accont Google (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={24}
        />
        {/if}
    </div>
</header>

