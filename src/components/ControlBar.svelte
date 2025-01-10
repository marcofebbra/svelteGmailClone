<script lang="ts">
	import {ArrowUpDown, Check, Minus, RotateCw , EllipsisVertical, ChevronRight, ChevronLeft, MailOpen, Mail, Trash2, Undo2 } from "lucide-svelte";
	import IconButton from "./IconButton.svelte";
	import type { Email } from "$lib/types";
	import { leftSidebar } from "$lib/LeftSidebar.svelte";
	import { page } from "$lib/EmailSection.svelte";

    interface Props {
        currentPageEmails: Email[],
        sorting: "asc" | "desc" | "special",
        handleSelectAll: () => void,
        handleUpdateSelected: (updates: Partial<Email>) => void
        totEmails: number
    }

    let {  sorting=$bindable(), currentPageEmails=$bindable(), handleSelectAll, handleUpdateSelected, totEmails}: Props = $props();
    let numSelected = $derived(currentPageEmails.filter((email) => email.isSelected===true).length);

    const handleSort = () =>{
        if(sorting == "asc")
            sorting= "desc";
        else
            sorting="asc"
    }

    const nextPage = () => {
        if((page.value+1)*50<totEmails)
            page.value++;
    }

    const prevPage = () => {
        if(page.value>0)
            page.value--;
    }


    $effect(() =>{
    if(leftSidebar.selected)
        page.value=0
})


</script>


<div class="w-full h-[48px] flex justify-between items-center px-4 flex-shrink-0">
    <div class="flex h-full items-center">
        <button class="w-[15px] h-[15px] mx-2 border-[1.5px] rounded-[2px] flex justify-center items-center"
            style:border-color={ "#202124"}
            role="checkbox"
            aria-checked={numSelected != 0}
            tabindex="0"
            onkeydown={(e) => {e.key == "Enter" ? handleSelectAll() : ""}}
            onclick={() => handleSelectAll()}
        >
            {#if numSelected==currentPageEmails.length && currentPageEmails.length != 0}
                <Check size={10} color="#202124" strokeWidth={4} />
            {:else if numSelected > 0}
                <Minus size={10} color="#202124" strokeWidth={4} />
            {/if}
        </button>
        {#if numSelected==0}
        <IconButton
            Icon={RotateCw}
            label={"Aggiorna (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={16}
        />
        {:else}
            <IconButton
                Icon={Mail}
                label={"Segna come da leggere"}
                padding={8}
                sizeButton={40}
                sizeIcon={16}
                strokeWidth={2}
                color="#555555"
                onClick={() => handleUpdateSelected({isUnread: true})}
            />
            <IconButton
                Icon={MailOpen}
                label={"Segna come già lette"}
                padding={8}
                sizeButton={40}
                sizeIcon={16}
                strokeWidth={2}
                color="#555555"
                onClick={() => handleUpdateSelected({isUnread: false})}
            />
            {#if leftSidebar.selected.name !== "Cestino"}
                <IconButton
                    Icon={Trash2}
                    label={"Elimina"}
                    padding={8}
                    sizeButton={40}
                    sizeIcon={16}
                    strokeWidth={2}
                    color="#555555"
                    onClick={() => handleUpdateSelected({sezione: "Cestino"})}
                /> 
                {:else}
                <IconButton
                    Icon={Undo2}
                    label={"Ripristina"}
                    padding={8}
                    sizeButton={40}
                    sizeIcon={16}
                    strokeWidth={2}
                    color="#555555"
                    onClick={() => handleUpdateSelected({sezione: "Posta in arrivo"})}
                /> 

            {/if}
        {/if}
        <IconButton
            Icon={EllipsisVertical}
            label={"Altro (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={16}
        />

    </div>
    {#if currentPageEmails.length>0}
    <div class="flex gap-3 h-full items-center">
        <p class="text-[12px] text-[#5e5e5e]">
            <span class="">{(page.value*50)+1 + "-" + ((page.value*50)+50 < currentPageEmails.length ? (page.value*50)+50 : page.value*50+currentPageEmails.length ) + " di " + totEmails}</span>
        </p>
        <IconButton
            Icon={ChevronLeft}
            label={sorting == "special" ? "Pagina precedente" : sorting == "asc" ? "Meno recenti" : "Più recenti"}
            padding={8}
            sizeButton={40}
            sizeIcon={16}
            onClick={prevPage}
        />
        <IconButton
            Icon={ChevronRight}
            label={sorting == "special" ? "Pagina successiva" : sorting == "desc" ? "Meno recenti" : "Più recenti"}
            padding={8}
            sizeButton={40}
            sizeIcon={16}
            onClick={nextPage}
        />
        {#if leftSidebar.selected.name != "Speciali"}
        <IconButton
            Icon={ArrowUpDown}
            label={sorting == "asc" ? "Ordina per date decrescenti" : "Ordina per date crescenti"}
            padding={8}
            sizeButton={40}
            sizeIcon={16}
            onClick={handleSort}
        />
        {/if}
    </div>
    {/if}
</div>