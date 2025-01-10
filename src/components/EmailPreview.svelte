<script lang="ts">
    import type { Email } from '$lib/types';
    import { ArchiveRestore, Trash2, MailPlus,Clock,GripVertical, Star, Undo2, MailOpen } from 'lucide-svelte';
    import {format} from "date-fns";
	import IconButton from "./IconButton.svelte";
	import Checkbox from "./Checkbox.svelte";
	import { it } from 'date-fns/locale';
	import { deleteEmails, restoreEmails, updateEmails } from '$lib/email';
	import { goto } from '$app/navigation';
	import { newEmailForm } from '$lib/NewEmailForm.svelte';
	import { get } from 'svelte/store';
	import { emailStore } from '../store/emailStore';

    let {index, email, handleSelect}: {index: number, email: Email, handleSelect: (index: number, selected: boolean) => void} = $props();
    let isHover = $state(false);

    const handleMouseEnter = () => {
        isHover=true
    }
    const handleMouseLeave = () => {
        isHover=false
    }

    const handleUpdateEmails = (e: Event, ids: string[], updates: Partial<Email>) => {
        e.stopPropagation();
        updateEmails(ids,updates)
    }

    const handleSpecial = (e: Event, email: Email) => {
        e.stopPropagation();
        if(!email.isSpecial)
            updateEmails([email.id],{isSpecial: true, specialPos: get(emailStore).filter((email) => email.isSpecial).length})
        else {
            updateEmails([email.id],{isSpecial: false, specialPos: -1})
            get(emailStore).forEach((storedEmail) => {
                if(storedEmail.isSpecial && storedEmail.specialPos > email.specialPos)
                    updateEmails([storedEmail.id],{specialPos: storedEmail.specialPos-1})
            })
        }
    }

</script>

<div class="relative flex-none h-[40px] w-full flex items-center justify-between text-[14px] px-4 border-b-[1px] border-[#e8e8e8]"
    style:background-color={email.isSelected ? "#c2dbff" : email.isUnread ? "" : "#f2f6fc"}
    style:box-shadow={isHover ? "0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15)" : ""}
    role="button"
    tabindex="0"
    onmouseenter={() => handleMouseEnter()}
    onmouseleave={() => handleMouseLeave()}
    onkeydown={(e) => e.key == "Enter" ? handleUpdateEmails(e,[email.id], {isUnread: false}) : "" }
    onclick={(e) => {
        handleUpdateEmails(e,[email.id], {isUnread: false});
        if(email.sezione==="Bozze"){
            if(newEmailForm.isOpen){
                newEmailForm.currentEmail = "";
                newEmailForm.isOpen=false;
            }
            newEmailForm.currentEmail = email.id;
            newEmailForm.isOpen=true;
        } else 
            goto(`/${email.id}`);
        }
    }
    >
    {#if isHover}
        <GripVertical size={20} class="absolute left-1 text-[#8a8a8a] cursor-grab"/>
    {/if }

    <div class="w-[40px] h-[40px] flex justify-center items-center rounded-full hover:bg-[#00000011]"
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key == "Enter" ? handleSelect(index,email.isSelected) : "" }
    onclick={(e) => {e.stopPropagation(); handleSelect(index,email.isSelected)}}
    >
    <Checkbox
        isSelected={email.isSelected}
        {isHover}
        onClick={() => {}}
    />
    </div>
    <div class="w-[40px] h-[40px] flex justify-center items-center rounded-full hover:bg-[#00000011]"
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key == "Enter" ? handleSpecial(e,email) : "" }
    onclick={(e) => handleSpecial(e,email)}
    >
    <Star
        size={16}
        color={email.isSpecial ? "#ffc424" : isHover || email.isSelected ? "#202124" : "#bfbfbf"}
        fill={email.isSpecial ? "#ffc424" : "transparent"}
        />
    </div>

    <h2 class="w-[200px] ml-2" style:font-weight={email.isUnread ? "600" : ""} style:color={email.sezione=="Bozze" || (email.sezione=="Cestino" && email.before=="Bozze") ? "#dd4d39" : ""}>
        {email.sezione=="Bozze" || (email.sezione=="Cestino" && email.before=="Bozze") ? "Bozza" : email.mittente.name}
    </h2>

    <h3 class="truncate flex-1">
        <span class="text-[#202124] " style:font-weight={email.isUnread ? "600" : ""}>{email.oggetto == "" ? "(nessun oggetto)" : email.oggetto}</span>
        <span class="text-[#5f6368] ">{" - " + email.testo}</span>
    </h3>

   <div
   style:margin-left={isHover ? "10px" : "40px"}
   >
    {#if isHover}
    <div class="h-full flex">
        <IconButton
            Icon={ArchiveRestore}
            label={"Archivia (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={18}
            onClick={((event)=> event.stopPropagation())}
        />
        {#if email.sezione != "Cestino"}
        <IconButton
            Icon={Trash2}
            label={"Elimina"}
            padding={8}
            sizeButton={40}
            sizeIcon={18}
            onClick={(event) => deleteEmails([email.id],event)}
        />
        {:else}
        <IconButton
            Icon={Undo2}
            label={"Ripristina"}
            padding={8}
            sizeButton={40}
            sizeIcon={18}
            onClick={(event) => restoreEmails([email.id],event)}
        />
        {/if}
        {#if email.isUnread}
        <IconButton
            Icon={MailOpen}
            label={"Segna come già letta"}
            padding={8}
            sizeButton={40}
            sizeIcon={18}
            onClick={((event)=> updateEmails([email.id], {isUnread: false}, event))}
        />
        {:else}
        <IconButton
            Icon={MailPlus}
            label={"Segna come da leggere"}
            padding={8}
            sizeButton={40}
            sizeIcon={18}
            onClick={((event)=> updateEmails([email.id], {isUnread: true}, event))}
        />
        {/if}
        <IconButton
            Icon={Clock}
            label={"Posticipa (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={18}
            onClick={((event)=> event.stopPropagation())}

        />

    </div>
    {:else}
    <p class="text-[12px] truncate"
    style:color={email.isUnread ? "#202124" : "rgb(95, 99, 104)"}
    style:font-weight={email.isUnread ? "600" : ""}
    >{format(email.data, email.data.getFullYear() == new Date().getFullYear() ? "dd MMM" : "dd/MM/yy", {locale: it})}</p>
    {/if}
    </div>
</div>