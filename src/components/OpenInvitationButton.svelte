<script>
    import { isInvitationOpen } from '../store/store'
</script>

<button
	type="button"
	class="outline white md group relative border transition-all duration-300 inline-block outline-none active:outline-none items-center disabled:cursor-not-allowed appearance-none focus:outline-none active:ring-0 false h-10 px-6 text-sm text-white hover:text-black border-white hover:bg-white rounded-full"
	on:click={() => {
		isInvitationOpen.set(true)
	}}
	>
	<span class="flex items-center h-full w-full justify-center gap-1 flex-nowrap whitespace-nowrap">
		<iconify-icon icon="mdi:email" width="24" height="24"></iconify-icon>  Open
		<div class="h-2 w-2 relative -mr-2 ml-2">
			<div
				class="absolute left-0 top-0 transition-all duration-300 bg-white group-hover:bg-black w-2 h-2 rounded-full"
			>
			</div>
			<div
				class="absolute left-0 top-0 transition-all duration-300 bg-white group-hover:bg-black w-2 h-2 rounded-full animate-ping"
			>
			</div>
		</div>
	</span>
</button>
