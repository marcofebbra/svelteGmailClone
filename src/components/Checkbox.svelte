<script lang="ts">
    import { Check } from 'lucide-svelte';

    interface Props {
        isSelected: boolean
        isHover: boolean,
        onClick: (e: Event) => void
    }

    const {isSelected, isHover, onClick}: Props = $props()

</script>

<div class="w-[15px] h-[15px] mx-2 border-[1.5px] rounded-[2px] flex justify-center items-center"
style:border-color={isHover || isSelected ?  "#202124" : "#bfbfbf"}
role="checkbox"
aria-checked={isSelected}
tabindex="0"
onkeydown={(e) => {e.key == "Enter" ? onClick(e) : ""}}
onclick={(e) => onClick(e)}
>
    {#if isSelected}
        <Check size={10} color="#202124" strokeWidth={4} />    
    {/if}
</div>