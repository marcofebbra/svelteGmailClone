<script lang="ts">
	import { newEmailForm } from '$lib/NewEmailForm.svelte';
	import '../app.css';
	import LeftSidebar from '../components/LeftSidebar.svelte';
	import NewEmailForm from '../components/NewEmailForm.svelte';
	import RightSidebar from '../components/RightSidebar.svelte';
	import TopBar from '../components/TopBar.svelte';
	let { children } = $props();
</script>

<TopBar/>
<div class="relative w-full h-[calc(100vh-64px)] pb-4 flex min-w-[400px]">
    <LeftSidebar/>
    {@render children()}
    <RightSidebar/>
	{#if newEmailForm.isOpen}
     	<NewEmailForm/>
	{/if}
</div>


