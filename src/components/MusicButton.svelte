<script >
	import music from '../music/music.ogg'
	import { isInvitationOpen } from '../store/store'

	let audio
	let isPaused = false

	function AudioInstance() {
		if (audio == null) {
			audio = new Audio(music)
			
		}
		return audio
	}

	function playMusic() {
		AudioInstance().play()
	}

	function togglePlay() {
		if (isPaused) {
			AudioInstance().play()
		} else {
			AudioInstance().pause()
		}

		isPaused = !isPaused
	}
	isInvitationOpen.subscribe((isOpen) => {
		if (isOpen) {
			playMusic()
		}
	})

</script>

<button class="fixed bottom-5 right-5 rounded-full p-2 bg-gray-500 text-white w-[32px] z-50" on:click={togglePlay} >▶️</button>

