<script lang="ts">
    
	import type { Email } from "$lib/types";
	import { sortEmails, updateEmails } from "$lib/email";
	import { getTab, page, sorting, tabSelected } from "$lib/EmailSection.svelte";
	import { emailStore } from "../store/emailStore";
	import { leftSidebar } from "$lib/LeftSidebar.svelte";
	import { search } from "$lib/SearchBar.svelte";
	import ControlBar from "../components/ControlBar.svelte";
	import Tabs from "../components/Tabs.svelte";
	import EmailPreview from "../components/EmailPreview.svelte";
	import { Scaling } from "lucide-svelte";
  
    let sectionEmails: Email[] = $state([]);
    let currentEmails: Email[] = $derived(sectionEmails.filter((_,index) => index>=page.value*50 && index<page.value*50+50));
    let draggedEmail: Email | undefined = $state();

    $effect(() => {
        if($emailStore.length>0){
            sectionEmails=sortEmails([...$emailStore].filter((email) => { 
                if(leftSidebar.selected.name == "Speciali")
                    return email.isSpecial && email.sezione!="Cestino" && (search.value != "" ? search.searchFn(email) : true);
                else if (leftSidebar.selected.name == "Posta in arrivo")
                    return email.sezione===leftSidebar.selected.name && email.cartella===(getTab(tabSelected.value)?.name) && (search.value != "" ? search.searchFn(email) : true);
                else
                    return email.sezione===leftSidebar.selected.name && (search.value != "" ? search.searchFn(email) : true);
            }),sorting.value)
        }
    })

    const handleUpdateSelected = (updates: Partial<Email>) => {
        updateEmails(sectionEmails.filter((email) => email.isSelected).map((email) => email.id), updates);
    }

    const handleSelectAll = () => {
        if(currentEmails.filter((email) => email.isSelected===false).length > 0){
            currentEmails.forEach((email)=> email.isSelected=true);
        } else {
            currentEmails.forEach((email)=> email.isSelected=false);
        }
    }

    const handleSelect = (index: number,selected: boolean) => {
        if(selected)
        currentEmails[index].isSelected=false;
        else 
        currentEmails[index].isSelected=true;
    }

    const handleDragStart = (email: Email) => {
        draggedEmail = email;
    }

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    }

    const handleDrop = (targetEmail: Email) => {
        if (draggedEmail && draggedEmail !== targetEmail) {
            const draggedIndex = sectionEmails.findIndex((e) => e.id === draggedEmail!.id);
            const targetIndex = sectionEmails.findIndex((e) => e.id === targetEmail.id);

            const specialEmailsToEdit = sectionEmails.filter((_,index) => {
                if(draggedIndex - targetIndex > 0)
                    return index < draggedIndex && index >= targetIndex;
                else 
                    return index <= targetIndex && index > draggedIndex;
            });
      
            specialEmailsToEdit.forEach((email) => updateEmails([email.id], {specialPos: email.specialPos+(draggedIndex - targetIndex > 0 ? 1 : -1)}))
            updateEmails([draggedEmail.id], {specialPos: targetIndex});
    }
}

</script>

<div class=" bg-white rounded-[16px] flex-1 flex flex-col w-full h-full overflow-hidden">
    <ControlBar bind:sorting={sorting.value} currentPageEmails={currentEmails} totEmails={sectionEmails.length} {handleSelectAll} {handleUpdateSelected}/>
        {#if leftSidebar.selected.name == "Posta in arrivo"}
            <Tabs/>
        {/if}
    {#if sectionEmails.length != 0}
        <div class="w-full overflow-x-scroll overflow-y-scroll">
            {#each currentEmails as email , i (email.id)}
            <div
            role="listitem"
            draggable={leftSidebar.selected.name == "Speciali"}
            ondragstart={() => handleDragStart(email)}
            ondragover={handleDragOver}
            ondrop={() => handleDrop(email)}
            class="min-w-[500px]"
            >
                    <EmailPreview index={i} {email} {handleSelect}/>
            </div>
            {/each}
			<div class="h-[40px] my-[16px] px-[16px] flex justify-between items-center">
				<div class="flex flex-col gap-1">
					<div class="relative h-[5px] w-[200px] bg-[#dadce0] rounded-full overflow-hidden">
						<div class="absolute left-0 w-[33%] h-full bg-[#5f6368]"></div>
					</div>
					<div class="flex items-center gap-1 text-[#5f6368]">
						<p class="text-[12px]">5 GB di 15 GB utilizzati</p>
						<Scaling size={16} class="cursor-pointer"/>
					</div>
				</div>
				<div class="flex gap-1 self-start items-center">
					<a href={"/"} class="text-[#666666] text-[12px] cursor-pointer">Termini</a>
					<div class="w-[2px] h-[2px] rounded-full bg-[#666666]"></div>
					<a href={"/"} class="text-[#666666] text-[12px] cursor-pointer">Privacy</a>
					<div class="w-[2px] h-[2px] rounded-full bg-[#666666]"></div>
					<a href={"/"} class="text-[#666666] text-[12px] cursor-pointer">Norme del programma</a>
				</div>
				<div class="flex gap-1 items-center self-start">
					<p class="text-[#666666] text-[12px] cursor-pointer">Ultima attività dell'account: 0 minuti fa</p>
				</div>
			</div>
        </div>
    {:else}
        <div class="w-full flex justify-center items-center">
            <div class="flex flex-col gap-4 max-w-[550px] py-[80px] px-5 text-[#666666] text-[14px]">
                {#if leftSidebar.selected.name == "Cestino"}
                    <p class="text-[16px]">{`Il cestino è vuoto`}</p>
                    <p>{"La email eliminate verranno visualizzate qui."}</p>
                {:else if leftSidebar.selected.name == "Bozze"}
                    <p class="text-[16px]">{`Non ci sono bozze salvate`}</p>
                    <p>{"La bozze verranno visualizzate qui."}</p>
                {:else if leftSidebar.selected.name == "Inviati"}
                    <p class="text-[16px]">{`Non ci sono email inviate`}</p>
                    <p>{"La email inviate verranno visualizzate qui."}</p>
                {:else if leftSidebar.selected.name == "Speciali"}
                    <p class="text-[16px]">{`Nessun messaggio speciale. La funzione Speciali ti permette di assegnare uno stato speciale a un messaggio per renderlo più facile da trovare. Fai clic sulla stella accanto a ciascuna conversazione o messaggio per contrassegnarlo come speciale.`}</p>
                {:else}
                    <p class="text-[16px]">{`La scheda ${getTab(tabSelected.value)?.name} è vuota`}</p>
                    {#if getTab(tabSelected.value)?.name == "Promozioni"}
                        <p>{"Marketing, interessi, cause politiche e sociali e altre email promozionali verranno visualizzate qui."}</p>
                    {:else if getTab(tabSelected.value)?.name == "Social"}
                        <p>{"Le email provenienti da social network, siti di media-sharing, servizi di incontri e altri social media verranno visualizzate qui."}</p>
                    {:else if getTab(tabSelected.value)?.name == "Aggiornamenti"}
                        <p>{"I messaggi automatici che potrebbero non richiedere un intervento immediato verranno mostrati qui. Possono includere conferme, notifiche, estratti conto e promemoria."}</p>
                        <p>
                            {"Spostare i messaggi nella cartella Aggiornamenti o rimuoverli aiuta Gmail a capire quali messaggi vuoi ricevere in questa cartella. "}
                            <span class="text-[#1155cc] cursor-pointer">{"Scopri di più."}</span>
                        </p>
                    {:else}
                        <p>{"La email in arrivo verranno visualizzate qui."}</p>
                    {/if}
                    <p>{"Per aggiungere o rimuovere le schede fai clic su"}
                        <span class="text-[#1155cc] cursor-pointer">{"Impostazioni della casella di posta."}</span>
                    </p>
                {/if}
            </div>
        </div>
    {/if}
</div>