<script lang="ts">    
	import Tooltip from "./Tooltip.svelte";

    interface Props {
		imageSrc: string,
        label: string,
        onClick?: () => void
	}

    const {imageSrc, label="Button", onClick=() => {}}: Props = $props()
    let hover = $state(false);
    let parent: HTMLDivElement | undefined = $state();
    
    const handleMouseEnter = () => {
        hover=true;
    }
    const handleMouseLeave = () => {
        hover=false;
    }
    
</script>

<div
    bind:this={parent}
    role="button"
    tabindex="0"
    class={`rounded-full hover:bg-[#3c40431a] active:bg-[#3c40434a] flex items-center justify-center w-[40px] h-[40px]`}
    aria-label={label}
    onclick={()=>onClick()}
    onkeydown={(e) => e.key == "Enter" ? onClick() : ""}
    onmouseenter={() => {handleMouseEnter()}}
    onmouseleave={() => {handleMouseLeave()}}
>
    <img src={imageSrc} class="w-[20px] h-[20px]" alt={label}/>
    {#if hover} 
        <Tooltip label={label} {parent}/>
    {/if}
</div>