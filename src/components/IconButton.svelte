<script lang="ts">    
    import { type Icon as IconType } from "lucide-svelte";
	import Tooltip from "./Tooltip.svelte";

    interface Props {
		Icon: typeof IconType | null,
        sizeIcon: number;
        sizeButton: number;
        strokeWidth?: number;
        color?: string
        label: string,
        padding: number,
        disabled?: boolean,
        onClick?: (e: Event) => void
	}

    const {
        Icon,
        label="Button",
        padding=8,
        disabled = false,
        onClick=() => {},
        sizeButton,
        sizeIcon,
        strokeWidth=2,
        color="#5f6368"
    }: Props = $props();

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
    class={`relative z-50 rounded-full hover:bg-[#3c40431a] active:bg-[#3c40434a] flex items-center justify-center`}
    style:height={`${sizeButton}px`}
    style:width={`${sizeButton}px`}
    style:padding={`${padding}px`}
    style:opacity={disabled ? 0 : 1}
    aria-label={label}
    onclick={(e)=>onClick(e)}
    onkeydown={(e) => e.key == "Enter" ? onClick(e) : ""}
    onmouseenter={(e) => {handleMouseEnter()}}
    onmouseleave={(e) => {handleMouseLeave()}}
>
    {#if Icon}
        <Icon size={sizeIcon} {strokeWidth} {color}/>
    {/if}
    {#if hover} 
        <Tooltip label={label} {parent}/>
    {/if}
</div>