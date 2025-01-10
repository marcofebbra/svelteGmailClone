<script lang="ts">
	import { fade } from "svelte/transition";
    import { innerWidth } from 'svelte/reactivity/window';


    interface Props {
        label: string;
        parent: HTMLDivElement;
    }

    let {label,parent} : Props = $props();
    let left = $state(0)
    let top = $state(0)
    let component: HTMLDivElement | undefined;

    $effect(() => {
        if(component){
            const tooltipRect = component.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();

            let tmpleft = parentRect.left + (parentRect.width - tooltipRect.width) / 2;
            let tmptop = parentRect.top - tooltipRect.height + 80;


            if (tmpleft < 0) tmpleft = 10;
            if (innerWidth.current && tmpleft + tooltipRect.width > innerWidth.current) tmpleft = innerWidth.current - tooltipRect.width - 10;
            if (tmptop < 0) tmptop = parentRect.bottom + 10;
            left=tmpleft;
            top=tmptop;
        }
    })  

</script>

<div 
    bind:this={component}
    in:fade={{delay: 250, duration: 250}}
    out:fade={{ duration: 250}}
    class="fixed z-50 truncate text-xs bg-black bg-opacity-70 text-white font-semibold px-2 py-1 rounded-[5px]"
    style="top: {top}px; left: {left}px"
>
    {label}
</div>


