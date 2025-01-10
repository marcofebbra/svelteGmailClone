<script lang="ts">
	import { deleteEmails, updateEmails } from '$lib/email';
	import { newEmailForm } from '$lib/NewEmailForm.svelte';
    import {Minus, Scaling, X,ChevronDown, Trash2, Paperclip } from 'lucide-svelte';
	import DropDownZone from './DropDownZone.svelte';
	import type { Allegato } from '$lib/types';
	import CustomTextarea from './CustomTextarea.svelte';
	import { emailStore } from '../store/emailStore';
	import { get } from 'svelte/store';
	import { addFiles } from '$lib/allegato';

    let isFullScreen=$state(false);
    let isMinimized=$state(false);

    let id = $state("")
    let destinatari=$state("");
    let oggetto=$state("");
    let testo=$state("");
    let allegati: Allegato[] = $state([])

    const initStates = () => {
        const emails = get(emailStore);
        const email = emails.filter((email) => email.id == newEmailForm.currentEmail);
        if (email.length === 1){
            id=email[0].id
            destinatari = email[0].destinatario.join(" ");
            oggetto = email[0].oggetto;
            testo = email[0].testo;
            allegati = email[0].allegati
        }
    }

    const sendEmail = () => {
        updateEmails([newEmailForm.currentEmail], {sezione: "Inviati", data: new Date()});
        newEmailForm.isOpen=false;
        newEmailForm.currentEmail="";
    }

    $effect(() => {
        if(id != newEmailForm.currentEmail)
            initStates();
        if(destinatari!="" || oggetto!="" || testo!="" || allegati.length!=0){
            updateEmails([newEmailForm.currentEmail], {testo: testo, oggetto: oggetto, destinatario: destinatari.split(" "), allegati: allegati})
        }
    })

</script>

<div class="absolute z-50  w-[552px] h-[70%] bg-white flex flex-col overflow-hidden max-w-[552px]"
    style:box-shadow={"0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .2)"}
    style:bottom={isFullScreen ? "" : "0px"}
    style:top={isFullScreen ? "50%" : ""}
    style:right={isFullScreen ? "" : "50px"}
    style:left={isFullScreen ? "50%" : ""}
    style:transform={isFullScreen ? "translate(-50%,-50%)" : ""}
    style:border-radius={isFullScreen ? "8px 8px 8px 8px" : "8px 8px 0px 0px"}
    style:width={isFullScreen ? "80%" : isMinimized ? "328px" : "80%"}
    style:height={isFullScreen ? "80%" : isMinimized ? "40px" : "70%"}
    style:cursor={isMinimized ? "pointer":""}
    onclick={() => {
        if(isMinimized){
            isMinimized=false;
        }
    }}
    role={isMinimized ? "Button" : "Form"}
>
    <div class="flex flex-shrink-0 justify-between items-center h-[40px] bg-[#f2f6fc] px-[16px]">
        <h2 class="text-[14px] font-medium text-[#041e49]">{oggetto ? oggetto : "Nuovo messaggio"}</h2>
        <div class="flex gap-1 justify-center items-center">
            <Minus class="hover:bg-[#c4c4c4] transition duration-200" size={16} strokeWidth={2}
                onclick={(event) => {
                    event.stopPropagation()
                    if(isFullScreen)
                        isFullScreen=false;
                    isMinimized=!isMinimized;
                }}            />
            <Scaling class="hover:bg-[#c4c4c4] p-px box-content transition duration-200" size={14} strokeWidth={2}
                onclick={(event) => {
                    event.stopPropagation()
                    if(isMinimized)
                        isMinimized=false;
                    isFullScreen=!isFullScreen
                    }}
            />
            <X class="hover:bg-[#c4c4c4] transition duration-200" size={16} strokeWidth={2}
                onclick={(event) => {
                    event.stopPropagation()
                    newEmailForm.isOpen=false
                    }}
            />
        </div>

    </div>
    {#if !isMinimized}
    <form class="w-full h-[calc(100%-40px)] px-[16px] text-[14px] flex flex-col">
        <input 
            type="text" 
            bind:value={destinatari}
            class="flex-shrink-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-transparent w-full h-[40px] bg-transparent border-b border-[#ececec]" placeholder="Destinatari"
            />
        <input 
            type="text" 
            bind:value={oggetto}
            class="flex-shrink-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-transparent w-full h-[40px] bg-transparent border-b border-[#ececec]" placeholder="Oggetto"
            />
        <DropDownZone bind:allegati>
            <CustomTextarea bind:testo/>
        </DropDownZone>
        <div class=" w-full flex-shrink-0 flex text-white mb-4 justify-between items-center">
            <div class="flex gap-2">
            <div class="flex h-[36px]">
                <button class="h-full bg-[#0b57d0] px-[22px] rounded-l-full"
                onclick={() => sendEmail()}>Invia</button>
                <div class="w-[1px] h-full bg-[#000000]"></div>
                <button class="h-[36px] w-[33px] bg-[#0b57d0] rounded-r-full flex justify-center items-center">
                    <ChevronDown size={20} class="-translate-x-[2px]"/>
                </button>
            </div>
            <button class="relative z-50 h-[36px] w-[36px] rounded-full overflow-hidden">
               
                <label for="fileBtn" class="hover:bg-[#e7e7e7] w-full h-full flex items-center justify-center transition duration-200">
                    <Paperclip class="pointer-events-none" size={20} color={"#555555"}/>
                </label>
                <input id="fileBtn" type="file" multiple hidden
                onchange={(event) => {
                    const input = event.target as HTMLInputElement
                    if(input.files){
                        const files = Array.from(input.files);
                        allegati = addFiles(allegati,files);
                    }
                }}
                >
            </button>
        </div>
            <button class="w-[36px] h-[36px] flex justify-center items-center hover:bg-[#e7e7e7] rounded-full transition duration-200"
            onclick={() => {
                deleteEmails([newEmailForm.currentEmail]);
                newEmailForm.isOpen=false;
                newEmailForm.currentEmail="";
                }}
            >
                <Trash2 class="text-[#555555]" size={20}/>
            </button>

        </div>
    </form>
    {/if}
   
</div>
{#if isFullScreen}
    <div class="fixed z-40 top-0 left-0 pointer-events-none w-full h-full bg-[#00000077]"></div>
{/if}
