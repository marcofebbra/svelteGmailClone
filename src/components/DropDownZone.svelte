<script lang="ts">
	import { addFiles, removeFile } from "$lib/allegato";
	import type { Allegato } from "$lib/types";
	import { X } from "lucide-svelte";
	import type { Snippet } from "svelte";

    interface Props {
        allegati: Allegato[],
        children: Snippet
    }

    let {allegati=$bindable(), children}: Props = $props()
    let dragging = $state(false);

   
    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        if(event.dataTransfer?.files){
            allegati = addFiles(allegati,event.dataTransfer?.files);
        }
        dragging=false
    }

    
</script>

<div class="w-full h-full py-2 overflow-scroll">
    <div class="relative w-full h-fit min-h-full py-2 flex flex-col"
        role="region"
        ondragover={(e) => {e.preventDefault()
            dragging=true
        }}
        ondragenter={(e) => e.preventDefault()}
        ondrop={handleDrop}
    >
        {@render children()}
        <div class="flex flex-col gap-2">
            {#each allegati as allegato}
            <div class="flex gap-2 items-center bg-[#F5F5F5] w-fit p-2">
                <p class="font-bold text-[#444746]">{allegato.file.name + " (" + Math.round(allegato.file.size/1000)+ "KB)"}</p>
                <button onclick={() => allegati = removeFile(allegati,allegato.id)}>
                    <X size={20}/>
                </button>
            </div>
            {/each}
        </div>
        {#if dragging}
            <div class="opacity-50 absolute w-full h-full top-0 flex justify-center items-center border-[5px] border-dashed border-[#555555] p-4 bg-white">
                <p class="text-[40px]">Rilascia i file qui</p>
            </div>
        {/if}
    </div>
</div>