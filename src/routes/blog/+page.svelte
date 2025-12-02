<script lang="ts">
	import { base } from '$app/paths';

	const posts = [
		{
			href: '/blog/posts/post1',
			title: 'What is a Line-by-Line Accept/Reject Merger?',
			description: 'An introduction to browser-based interactive merge tools and how they replicate GitHub’s Pull Request review experience without Git.'
		},
		{
			href: '/blog/posts/post2',
			title: 'How the Hunk-Based Diff Engine Works',
			description: 'Deep Dive: how line-by-line diff is computed in-browser using jsdiff, grouped into hunks, and updated in real time.'
		},
		{
			href: '/blog/posts/post3',
			title: 'Accept vs Reject: Decision Logic Explained',
			description: 'Understanding pending, accepted, and rejected states — and how the final merged result is built instantly after every decision.'
		},
		{
			href: '/blog/posts/post4',
			title: 'Side-by-Side vs Inline View: When to Use Each',
			description: 'Comparing the two visual modes and why both are essential for different types of changes (code, prose, config files).'
		},
		{
			href: '/blog/posts/post5',
			title: 'Iterative Merging with “Use as Base”',
			description: 'How to apply changes progressively across multiple versions using the “Use as Base” feature for complex, multi-step merges.'
		},
		{
			href: '/blog/posts/post6',
			title: 'Keyboard Shortcuts and Power User Workflow',
			description: 'Speed up reviews with A (accept) / R (reject) shortcuts and navigate large diffs without touching the mouse.'
		},
		{
			href: '/blog/posts/post7',
			title: 'Real-World Use Cases: Config Files, Docs, and More',
			description: 'Practical examples: merging package.json, Markdown docs, JSON configs, and even poetry — all without installing anything.'
		}
	];
</script>

<svelte:head>
	<title>Blog | Line-by-Line Merger Insights</title>
	<meta name="description" content="Technical deep dives, tips, and real-world examples for the browser-based Line-by-Line Accept/Reject Merger." />
</svelte:head>

<div class="container fade-in blog-index">
	<header class="blog-header">
		<h1>Blog: Merger Insights</h1>
		<p class="subtitle">
			Technical articles, usage guides, and advanced patterns for the fully client-side Line-by-Line Accept/Reject Merger. 
			Everything runs in your browser — no server, no install, no Git required.
		</p>
	</header>

	<div class="posts-grid">
		{#each posts as post}
			<a href="{base}{post.href}" class="card post-card">
				<div class="card-body">
					<h2 class="post-title">{post.title}</h2>
					<p class="post-description">{post.description}</p>
					<span class="read-more">Read Article →</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.blog-index {
		padding-top: 2rem;
		padding-bottom: 4rem;
	}

	.blog-header {
		text-align: center;
		margin-bottom: 3rem;
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 2rem;
	}

	.blog-header h1 {
		font-size: 2.8rem;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--text-secondary);
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.7;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.post-card {
		text-decoration: none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: transform 0.2s ease;
	}

	.post-card:hover {
		transform: translateY(-4px);
	}

	.post-card .card-body {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.post-title {
		font-size: 1.25rem;
		color: var(--accent-secondary);
		margin-bottom: 0.75rem;
	}

	.post-description {
		color: var(--text-secondary);
		flex-grow: 1;
		margin-bottom: 1rem;
	}

	.read-more {
		color: var(--accent-primary);
		font-weight: 600;
		align-self: flex-start;
		transition: transform 0.2s ease;
	}

	.post-card:hover .read-more {
		transform: translateX(5px);
	}
</style>