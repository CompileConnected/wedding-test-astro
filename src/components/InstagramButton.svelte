
<script>
    function toInstagram() {
	    console.log("hardcode")
        window.open('https://www.instagram.com/ar/347137501335742/', '_blank');
    }

</script>

<button
	type="button"
	class="outline
    white 
    md 
    group 
    relative 
    border 
    transition-all 
    center
    duration-300
    inline-block 
    outline-none 
    active:outline-none 
    items-center 
    disabled:cursor-not-allowed
    appearance-none 
    focus:outline-none 
    active:ring-0 
    false 
    h-10 
    px-6
     text-sm
     text-black hover:text-white border-black hover:bg-black rounded-full"
	on:click={() => {
		toInstagram()
	}}
	>
	<span class="flex items-center h-full w-full justify-center gap-1 flex-nowrap whitespace-nowrap">
		<iconify-icon icon="mdi:instagram" width="24" height="24"></iconify-icon>  Open Instagram
		<div class="h-2 w-2 relative -mr-2 ml-2">
			<div
				class="absolute left-0 top-0 transition-all duration-300 bg-black group-hover:bg-white w-2 h-2 rounded-full"
			>
			</div>
			<div
				class="absolute left-0 top-0 transition-all duration-300 bg-black group-hover:bg-white w-2 h-2 rounded-full animate-ping"
			>
			</div>
		</div>
	</span>
</button>
