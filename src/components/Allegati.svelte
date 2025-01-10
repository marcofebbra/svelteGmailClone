<script lang="ts">
	import AllegatoCard from "./AllegatoCard.svelte";
	import type { Allegato } from "$lib/types";

    interface Props {
        allegati: Allegato[];
    }
    
    let { allegati }: Props = $props();


</script>

<div class="flex gap-2 flex-wrap ps-[72px] py-[20px]">
    {#if allegati.length > 0}
        {#each allegati as allegato}
            <AllegatoCard allegato={allegato as Allegato}/>
        {/each}
    {/if}
</div>