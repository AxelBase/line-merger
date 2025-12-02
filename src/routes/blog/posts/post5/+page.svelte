<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Iterative Merging with “Use as Base” | Merger Blog</title>
	<meta name="description" content="Learn how to perform complex multi-step merges by progressively applying changes using the Use as Base feature." />
	<meta property="og:title" content="Iterative Merging with “Use as Base” | Merger Blog" />
	<meta property="og:description" content="Learn how to perform complex multi-step merges by progressively applying changes using the Use as Base feature." />
	<meta property="og:url" content="{base}/blog/posts/post5" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Iterative Merging with “Use as Base”</p>
	</div>

	<article class="prose">
		<h1>Iterative Merging with “Use as Base”</h1>
		<p class="post-meta">Published: December 2, 2025</p>

		<p>Sometimes a merge isn’t just between two versions — it’s a chain of changes across multiple revisions. The “Use as Base” button turns the Line-by-Line Merger into a powerful iterative tool.</p>

		<h2>How It Works</h2>
		<p>After you finish reviewing and accepting the changes you want, click “Use as Base”. The current Final Result instantly becomes the new left-side text, and all decisions are reset. You can now paste a third version on the right and continue merging — building up the file exactly how you want, one controlled step at a time.</p>

		<h3>Real-World Example</h3>
		<p>Imagine updating a large configuration file in stages: first apply security fixes, then performance tweaks, then new features. Instead of trying to review everything at once, you apply each batch separately, verifying the result before moving on.</p>

		<h2>Why This Matters</h2>
		<p>Complex changes are easier to reason about when broken into smaller, focused reviews. Iterative merging reduces cognitive load and dramatically lowers the chance of mistakes. You never lose work — each approved version becomes the new foundation.</p>

		<h2>FAQ</h2>
		<details>
			<summary>Does it keep my previous decisions?</summary>
			<p>No — decisions are cleared so you start fresh with the new base. This prevents accidental carry-over.</p>
		</details>
		<details>
			<summary>Can I go backwards?</summary>
			<p>You would need to manually paste a previous version again, but most workflows only move forward.</p>
		</details>
		<details>
			<summary>Is there a limit to how many times I can do this?</summary>
			<p>No. You can chain as many iterations as needed.</p>
		</details>

		<p class="italic-note">Iterative merging turns big, scary changes into calm, confident steps.</p>
	</article>
</div>

<style>
	/* Same styling as previous posts */
	.post-layout { max-width: 800px; padding-top: 2rem; padding-bottom: 4rem; }
	.breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); }
	.breadcrumbs a { color: var(--accent-secondary); }
	.breadcrumbs a:hover { text-decoration: underline; }
	.breadcrumbs p { margin: 0; }
	.prose { line-height: 1.8; }
	.prose .post-meta { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;}
	.prose h1, .prose h2, .prose h3 { color: var(--accent-secondary); }
	.prose h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
	.prose h2 { margin-top: 2.5rem; border-bottom: 1px solid var(--secondary-bg); padding-bottom: 0.5rem; }
	.prose p { color: var(--text-primary); }
	.prose details { background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; }
	.prose details[open] { background-color: var(--card-bg); }
	.prose summary { cursor: pointer; font-weight: 600; color: var(--accent-secondary); list-style: none; }
	.prose summary::-webkit-details-marker { display: none; }
	.prose summary::before { content: '+'; margin-right: 0.75rem; color: var(--accent-primary); font-weight: bold; transition: transform 0.2s ease; }
	.prose details[open] summary::before { transform: rotate(45deg); }
	.prose details p { margin-top: 1rem; padding-left: 1.5rem; border-left: 2px solid var(--accent-primary); color: var(--text-secondary); }
	.prose .italic-note { font-style: italic; color: var(--text-secondary); text-align: center; margin-top: 3rem; }
</style>