<script>
	import music from '../music/music.ogg'
	import { isInvitationOpen } from '../store/store'

	let audio
	let isPlaying = false
	let isLooping = true

	function AudioInstance() {
		if (audio == null) {
			audio = new Audio(music)
			audio.loop = isLooping
			audio.addEventListener('ended', () => {
				if (!isLooping) isPlaying = false
			})
		}
		return audio
	}

	function playMusic() {
		AudioInstance().play()
		isPlaying = true
	}

	function togglePlay() {
		const a = AudioInstance()
		if (isPlaying) {
			a.pause()
			isPlaying = false
		} else {
			a.play()
			isPlaying = true
		}
	}

	function toggleLoop() {
		isLooping = !isLooping
		if (audio) audio.loop = isLooping
	}

	isInvitationOpen.subscribe((isOpen) => {
		if (isOpen) playMusic()
	})
</script>

<div class="pill">
	<!-- Animated bars -->
	<div class="bars" class:playing={isPlaying}>
		{#each [1, 2, 3, 4] as i}
			<span class="bar" style="--i:{i}"></span>
		{/each}
	</div>

	<div class="divider"></div>

	<!-- Play / Pause -->
	<button class="btn-play" on:click={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
		{#if isPlaying}
			<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
				<rect x="6" y="4" width="4" height="16" rx="1" />
				<rect x="14" y="4" width="4" height="16" rx="1" />
			</svg>
		{:else}
			<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
				<path d="M8 5v14l11-7z" />
			</svg>
		{/if}
	</button>

	<!-- Loop -->
	<button class="btn-loop" class:active={isLooping} on:click={toggleLoop} aria-label="Toggle loop">
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			width="11"
			height="11"
		>
			<polyline points="17 1 21 5 17 9" />
			<path d="M3 11V9a4 4 0 0 1 4-4h14" />
			<polyline points="7 23 3 19 7 15" />
			<path d="M21 13v2a4 4 0 0 1-4 4H3" />
		</svg>
	</button>
</div>

<style>
	.pill {
		position: fixed;
		bottom: 1.25rem;
		right: 1.25rem;
		z-index: 50;
		display: flex;
		align-items: center;
		gap: 7px;
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 999px;
		padding: 6px 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
	}

	/* ── Bars ── */
	.bars {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		height: 16px;
	}

	.bar {
		display: block;
		width: 3px;
		height: 3px;
		border-radius: 2px;
		background: linear-gradient(to top, #16213e, #3a3a6e);
	}

	.bars.playing .bar {
		animation: bounce 0.7s ease-in-out infinite alternate;
		animation-delay: calc((var(--i) - 1) * 0.13s);
	}

	.bar:nth-child(1) {
		animation-duration: 0.6s;
	}
	.bar:nth-child(2) {
		animation-duration: 0.85s;
	}
	.bar:nth-child(3) {
		animation-duration: 0.55s;
	}
	.bar:nth-child(4) {
		animation-duration: 0.75s;
	}

	@keyframes bounce {
		from {
			height: 3px;
		}
		to {
			height: 14px;
		}
	}

	/* ── Divider ── */
	.divider {
		width: 1px;
		height: 18px;
		background: rgba(255, 255, 255, 0.25);
		flex-shrink: 0;
	}

	/* ── Buttons ── */
	.btn-play {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: none;
		background: linear-gradient(135deg, #1a1a2e, #16213e);
		color: white;
		cursor: pointer;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255,255,255,0.08) inset;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
		flex-shrink: 0;
	}

	.btn-play:hover {
		transform: scale(1.12);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.55);
	}

	.btn-play:active {
		transform: scale(0.93);
	}

	.btn-loop {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 1.5px solid rgba(0, 0, 0, 0.2);
		background: linear-gradient(135deg, #1a1a2e, #16213e);
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.btn-loop.active {
		color: #ffffff;
		border-color: rgba(255, 255, 255, 0.15);
		background: linear-gradient(135deg, #2d2d4e, #1e2a4a);
	}

	.btn-loop:hover {
		transform: scale(1.12);
	}
</style>
