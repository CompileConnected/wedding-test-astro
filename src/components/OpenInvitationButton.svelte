<script>
    import { isInvitationOpen } from '../store/store'
</script>

<button
	type="button"
	class="animate-hover inline-block transition-all duration-300 outline-none h-10 px-6 text-sm rounded-full"
	style="color: #f5e6d3; border: 1px solid rgba(200,149,108,0.5); background: rgba(200,149,108,0.12);"
	on:click={() => {
		isInvitationOpen.set(true)
	}}
	>
	<span class="flex items-center h-full w-full justify-center gap-1 flex-nowrap whitespace-nowrap">
		<iconify-icon icon="mdi:email" width="24" height="24" style="color: #c8956c;"></iconify-icon>  Open
		<div class="h-2 w-2 relative -mr-2 ml-2">
			<div
				class="absolute left-0 top-0 transition-all duration-300 w-2 h-2 rounded-full"
				style="background: #c8956c;"
			>
			</div>
			<div
				class="absolute left-0 top-0 transition-all duration-300 w-2 h-2 rounded-full animate-ping"
				style="background: #c8956c;"
			>
			</div>
		</div>
	</span>
</button>
