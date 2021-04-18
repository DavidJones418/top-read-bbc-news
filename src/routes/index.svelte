<script context="module" type="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const url = `/index.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: await res.json()
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script type="ts">
	export let source: string;
	export let links: { href: string; text: string }[];
</script>

<svelte:head>
	<title>Top Read BBC News</title>
</svelte:head>

<main>
	<article>
		<h1>Top Read Articles on <a href={source}>BBC News</a></h1>
		<ol>
			{#each links as { href, text }}
				<li>
					<div>
						<a href={new URL(href, source).href}>{text}</a>
						<small>{href.replace(/^\//, '').replace(/[/-]\d+$/, '')}</small>
					</div>
				</li>
			{/each}
		</ol>
	</article>
</main>

<style>
	:any-link {
		text-decoration: none;
	}

	:any-link:hover {
		text-decoration: underline;
	}

	main {
		padding: 1rem;
	}

	h1 a {
		text-transform: uppercase;
	}

	ol {
		display: grid;
		gap: 1rem;
		max-width: 32rem;
	}

	li:hover {
		background-color: hsl(0 0% 95%);
	}

	li div {
		display: flex;
		flex-direction: column;
	}

	li a {
		font-weight: 500;
	}

	li small {
		color: hsl(0 0% 35%);
	}
</style>
