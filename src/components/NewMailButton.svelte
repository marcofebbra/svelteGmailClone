<script>
    import { Pencil } from 'lucide-svelte';
    import { leftSidebar } from '$lib/LeftSidebar.svelte';
    import { newEmailForm } from '$lib/NewEmailForm.svelte';
	import { createEmail } from '$lib/email';

    let isHover = $state(false)
    const handleMouseEnter = () => {
        isHover=true;
    }
    const handleMouseLeave = () => {
        isHover=false;
    }
    const handleClick = () => {
        if(newEmailForm.isOpen){
            newEmailForm.isOpen = false
            newEmailForm.currentEmail="";
        } else {
            newEmailForm.currentEmail=createEmail();
            newEmailForm.isOpen=!newEmailForm.isOpen;
        }
    }

</script>

<div class="btn relative h-[56px] flex-shrink-0 rounded-[16px] flex justify-center items-center mt-2 mb-4 ms-2 overflow-hidden transition-all duration-200" role="button" tabindex="0"
style:width={leftSidebar.isOpen ? "120px" : "56px"}
style:box-shadow={isHover ? "0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15)" : ""}
onmouseenter={() => handleMouseEnter()}
onmouseleave={() => handleMouseLeave()}
onclick={() => handleClick()}
onkeydown={(e) => e.key == "Enter" ? handleClick() : ""}
>
    <div class="absolute left-0 w-[56px] h-[56px] flex justify-center items-center">
        <Pencil size={20}/>
    </div>
    <div class="absolute left-[56px] h-[56px] flex justify-center items-center">
        <p class="text-sm "
        style:font-weight={500}
        >Scrivi</p>
    </div>
</div>

<style>
    .btn{
        background-color: rgb(194, 231, 255);
    }
</style>