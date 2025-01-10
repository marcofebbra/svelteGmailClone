<script lang="ts">
	import { search } from "$lib/SearchBar.svelte";
	import IconButton from "./IconButton.svelte";
    import { Search, SlidersHorizontal,X } from 'lucide-svelte';
    
    
    let focus = $state(false);
    
    let handleReset = () => {
        search.value="";
    }
    let handleFocusIn = () => {
        focus=true;
    }
    let handleFocusOut = () => {
        focus=false;
    }

</script>

<div class="h-full flex-1 ">
    <div class="flex gap-1 h-full justify-between items-center rounded-full px-[6px]"
    style:background={focus ?"#ffffff" : "#eaf1fb"}
    style:box-shadow={focus ?"0px 1px 1px rgba(65,69,73,0.3),0px 1px 3px 1px rgba(65,69,73,0.15) " : ""}
    >
        <IconButton
            Icon={Search}
            label={"Ricerca"}
            padding={6}
            sizeButton={36}
            sizeIcon={24}
        />
        <input 
            type="text" 
            bind:value={search.value}
            class="focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-transparent w-full h-full bg-transparent" placeholder="Cerca nella posta"
            onfocusin={() => handleFocusIn()}
            onfocusout={() => handleFocusOut()}
            />
        <div class="flex">
            
            <IconButton
                Icon={X}
                label={"Cancella ricerca"}
                padding={6}
                disabled={search.value==""}
                onClick={handleReset}
                sizeButton={36}
                sizeIcon={24}
            />
            
            <IconButton
                Icon={SlidersHorizontal}
                label={"Mostra opzioni di ricerca (Da implementare)"}
                padding={6}
                sizeButton={36}
                sizeIcon={24}
            />
        </div>
    </div>
</div>