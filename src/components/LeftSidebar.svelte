<script lang="ts">
    import { leftSidebar } from "$lib/LeftSidebar.svelte";
	import NewMailButton from "./NewMailButton.svelte";
	import LeftSidebarButton from "./LeftSidebarButton.svelte";
    import { emailStore } from "../store/emailStore";
	import { sezioni } from "$lib/data/sezioni";

    const handleMouseEnter = () => {
        leftSidebar.open()
    }
    const handleMouseLeave = () => {
        leftSidebar.close()
    }

    let newEmails = $state(0);

    $effect(() => {
        let count = 0;
        $emailStore.forEach((email) => {
            if(email.isUnread && email.sezione=="Posta in arrivo")
            count++;  
        })
        newEmails=count;      
    })

</script>

<aside class="sidebar h-full flex flex-col flex-shrink-0"
style:width={leftSidebar.isOpen ? "256px" : "72px"}
onmouseenter={() => handleMouseEnter()}
onmouseleave={() => handleMouseLeave()}
>

<NewMailButton/>

<div class=" w-full h-full ">
    {#each sezioni as sezione, index}
        <LeftSidebarButton
        Icon={sezione.icon}
        index={sezione.id}
        label={sezione.name}
        selected={leftSidebar.selected.id == sezione.id}
        newEmails={leftSidebar.selected.name=="Posta in arrivo" ? newEmails : 0}
    />
        
    {/each}
    <!-- <LeftSidebarButton
    Icon={Inbox}
    index={0}
    label={sezioni[0].name}
    selected={leftSidebar.selected.id == 0}
    {newEmails}
    />
    <LeftSidebarButton
    Icon={Star}
    index={1}
    label={sezioni[1].name}
    selected={leftSidebar.selected.id == 1}
    />
    <LeftSidebarButton
    Icon={StickyNote}
    index={2}
    label={sezioni[2].name}
    selected={leftSidebar.selected.id == 2}
    />
    <LeftSidebarButton
    Icon={StickyNote}
    index={3}
    label={sezioni[3].name}
    selected={leftSidebar.selected.id == 3}
    />
    <LeftSidebarButton
    Icon={Trash2}
    index={4}
    label={sezioni[4].name}
    selected={leftSidebar.selected.id == 4}
    /> -->
</div>

</aside>

<style>
    .sidebar{
        transition: width 0.2s;
    }
</style>