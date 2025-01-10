<script lang="ts">

    let textarea: HTMLTextAreaElement | null = $state(null);
    let {testo=$bindable()}  = $props();

    const handleInput = () => {
        if(textarea){
            textarea.style.height = ""
            textarea.style.height = textarea?.scrollHeight + "px";
        }
    }

</script>

<div class="w-full flex-1 cursor-text"
    role="textbox"
    tabindex={0}
    onclick={() => { if(textarea) textarea?.focus()}}
    onkeydown={(e) => e.key =="Enter" ? textarea?.focus() : ""}
>
    <textarea
        oninput={() => handleInput()}
        bind:this={textarea}
        bind:value={testo}
        class={`focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-transparent 
        w-full resize-none overflow-y-hidden`}>
    </textarea>
</div>
