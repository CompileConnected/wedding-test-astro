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
		<svg width="24" height="24" style="color: #c8956c;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="inline-block align-middle"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>  Open
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
