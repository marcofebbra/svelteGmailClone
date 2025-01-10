<script lang="ts">

	import {EllipsisVertical, MailOpen, Mail, Trash2, Undo2 } from "lucide-svelte";
	import IconButton from "./IconButton.svelte";
	import { goto } from "$app/navigation";
	import { deleteEmails, restoreEmails, updateEmails } from "$lib/email";
	import type { Email } from "$lib/types";

    let {email}: {email: Email} = $props()

</script>


<div class="w-full h-[48px] flex justify-between items-center px-4 flex-shrink-0">
    <div class="flex h-full items-center">
        
        <IconButton
                Icon={Undo2}
                label={"Indietro"}
                padding={8}
                sizeButton={40}
                sizeIcon={16}
                strokeWidth={2}
                color="#555555"
                onClick={() => goto("/")}
            />
            {#if email.isUnread}
            <IconButton
                Icon={MailOpen}
                label={"Segna come già letta"}
                padding={8}
                sizeButton={40}
                sizeIcon={16}
                strokeWidth={2}
                color="#555555"
                onClick={() => updateEmails([email.id],{isUnread: false})}
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
                onClick={() => updateEmails([email.id],{isUnread: true})}
            />
            {/if}
            {#if email.sezione !== "Cestino"}
                <IconButton
                    Icon={Trash2}
                    label={"Elimina"}
                    padding={8}
                    sizeButton={40}
                    sizeIcon={16}
                    strokeWidth={2}
                    color="#555555"
                    onClick={() => deleteEmails([email.id])}
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
                    onClick={() => restoreEmails([email.id])}
                /> 
            {/if}
       
        <IconButton
            Icon={EllipsisVertical}
            label={"Altro (Da implementare)"}
            padding={8}
            sizeButton={40}
            sizeIcon={16}
        />

    </div>
</div>