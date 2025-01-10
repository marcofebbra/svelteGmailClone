<script lang="ts">
    import { rightSidebar } from "$lib/sidebar.svelte";
    import { ChevronLeft } from 'lucide-svelte';

    let isHover = $state(false)

    const handleMouseEnter = () => {
        isHover=true;
    }
    const handleMouseLeave = () => {
        isHover=false;
    }
    const handleClick = () => {
        rightSidebar.toggle();
    }
</script>

<div 
    role="button"
    tabindex="0"
    class="absolute flex flex-shrink-0 items-center justify-start bottom-[20px] h-[40px] bg-[#e4e4e4] transition-all duration-200"
    style:right={rightSidebar.isOpen? "8px":"0px"}
    style:border-top-right-radius={rightSidebar.isOpen? "40px" : "0px"}
    style:border-bottom-right-radius={rightSidebar.isOpen? "40px" : "0px"}
    style:border-top-left-radius={"40px"}
    style:border-bottom-left-radius={"40px"}
    style:box-shadow={rightSidebar.isOpen? "":"0px 1px 1px rgba(65,69,73,0.3),0px 1px 3px 1px rgba(65,69,73,0.15)"}
    style:width={rightSidebar.isOpen? "40px" : isHover ? "45px":"25px"}
    onmouseenter={() => handleMouseEnter()}
    onmouseleave={() => handleMouseLeave()}
    onclick={() => handleClick()}
    onkeydown={(e) => e.key == "Enter" ? handleClick() : ""}
>
<div class="w-[40px] h-[40px] flex justify-center items-center transition duration-200"
style:transform={rightSidebar.isOpen? "rotate(180deg)":""}
>
    <ChevronLeft size={16}/>
</div>

</div>