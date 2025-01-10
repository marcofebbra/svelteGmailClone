<script lang="ts">

	import type { Allegato, Email } from '$lib/types';
    import type { PageData } from './$types';
	import { format } from 'date-fns';
	import EmailControlBar from '../../components/EmailControlBar.svelte';
	import { emailStore } from '../../store/emailStore';
	import { it } from 'date-fns/locale';
	import { CornerUpRight,CornerUpLeft,User, Smile } from 'lucide-svelte';
	import Allegati from '../../components/Allegati.svelte';

	let { data }: {data: PageData} = $props();
    let email: Email = $state(data);

    $effect(() => {
        if($emailStore.length>0 && data.id){
            email=[...$emailStore].filter((em) => data.id == em.id)[0];
        }
    })

</script>


<div class="bg-white rounded-[16px] flex-1 w-full h-full overflow-hidden pr-[16px] flex flex-col">
    {#if email}
    <EmailControlBar email={email}/>
    <div class="w-full flex-1 overflow-scroll pb-4">
    <div class="w-full py-[20px] pl-[72px]">
        <h2 class=""
        style:font-size={"22px"}
        style:font-weight={"400"}
        style:color={"#1f1f1f"}
        >{email.oggetto}</h2>
    </div>
    <div class="flex w-full h-[40px]">
        <div class="flex-shrink-0 w-[40px] h-[40px] px-[16px] box-content">
            <div class="w-full h-full rounded-full flex justify-center items-center ring-1 ring-[#c1c1c1]">
                <User color={"#c1c1c1"} strokeWidth={"2px"}/>
            </div>
        </div>
        <div class="w-full flex flex-col">
            <div class="flex justify-between items-start md:flex-row md:items-center flex-col">
                <div class="flex gap-1 items-center">
                    <p class="text-[14px] font-semibold truncate">{email.mittente.name}</p>
                    <p class="text-[12px] text-[#5e5e5e] truncate">{`<${email.mittente.email}>`}</p>
                </div>
                <div class="flex gap-1">
                    <p class="text-[12px] text-[#5e5e5e]">{format(String(email.data),"dd MMM yyyy, HH:mm", {locale: it})}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="ps-[72px] text-[14px] pb-[20px]">
        {email.testo}
    </div>
    {#if email.allegati.length > 0}
        <Allegati allegati={email.allegati as Allegato[]}/>
    {/if}
    <div class="flex gap-2 ps-[72px] text-[14px] text-[#444746]">
        <button class="flex gap-2 items-center px-4 py-2 rounded-full border-[1px] border-[#747775]">
            <CornerUpLeft size={20} color={"#444746"}/>
            {"Rispondi"}
        </button>
        <button class="flex gap-2 items-center px-4 py-2 rounded-full border-[1px] border-[#747775]">
            <CornerUpRight size={20} color={"#444746"}/>
            {"Inoltra"}
        </button>
        <button class="w-[40px] h-[40px] flex justify-center items-center rounded-full border-[1px] border-[#747775]">
            <Smile size={20} color={"#444746"}/>
        </button>

    </div>
    </div>
    {/if}
</div>

