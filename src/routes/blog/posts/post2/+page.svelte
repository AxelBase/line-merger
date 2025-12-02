<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>How the Hunk-Based Diff Engine Works | Merger Blog</title>
	<meta name="description" content="Learn how the Line-by-Line Merger groups changes into logical hunks and recomputes the final result in real time — all in your browser." />
	<meta property="og:title" content="How the Hunk-Based Diff Engine Works | Merger Blog" />
	<meta property="og:description" content="Learn how the Line-by-Line Merger groups changes into logical hunks and recomputes the final result in real time — all in your browser." />
	<meta property="og:url" content="{base}/blog/posts/post2" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>How the Hunk-Based Diff Engine Works</p>
	</div>

	<article class="prose">
		<h1>How the Hunk-Based Diff Engine Works</h1>
		<p class="post-meta">Published: December 2, 2025</p>

		<p>At the heart of the Line-by-Line Merger is a fast, client-side diff engine that doesn’t just show every changed line — it intelligently groups related changes into hunks. This makes reviewing and deciding on changes much more natural and efficient than working line-by-line in isolation.</p>

		<h2>What Is a Hunk?</h2>
		<p>A hunk is a cluster of consecutive changed lines surrounded by unchanged context. When you modify a function, add a paragraph, or update a configuration block, those related changes naturally form a single hunk. The merger displays each hunk as one reviewable unit, complete with its own Accept All and Reject All buttons.</p>

		<h3>How Hunks Are Built</h3>
		<p>The tool compares both text versions line by line. As soon as it finds a sequence of additions or removals, it starts a new hunk. It then includes a few lines of unchanged context before and after the change so you can understand exactly where the modification occurs. This context is crucial for making informed decisions.</p>

		<h3>Real-Time Result Calculation</h3>
		<p>Every time you accept or reject a hunk, the Final Result panel instantly rebuilds the merged file from scratch. It starts with the original base text, walks through each hunk in order, and applies only the changes you have accepted. Rejected or still-pending hunks are treated as if the change never happened — the original lines are kept.</p>

		<h2>Why This Approach Wins</h2>
		<p>By working with hunks instead of isolated lines, you avoid making hundreds of tiny decisions. One click can accept an entire function update or reject a whole configuration section. Yet you still retain full control: if needed, you can accept only part of a hunk by using the individual line buttons.</p>

		<h2>FAQ</h2>
		<details>
			<summary>Can hunks ever be too big?</summary>
			<p>Very large changes are automatically split into smaller hunks (usually under 30 lines) for better readability.</p>
		</details>
		<details>
			<summary>Does the order of decisions matter?</summary>
			<p>No. The final result is always deterministic — it follows the original line order regardless of when you made decisions.</p>
		</details>
		<details>
			<summary>Why not just use Git merge?</summary>
			<p>Git requires installation and a repository. This tool works instantly on any text, anywhere, with zero setup.</p>
		</details>

		<p class="italic-note">Understanding hunks is key to mastering fast, accurate merging.</p>
	</article>
</div>

<style>
	.post-layout { max-width: 800px; padding-top: 2rem; padding-bottom: 4rem; }
	.breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); }
	.breadcrumbs a { color: var(--accent-secondary); }
	.breadcrumbs a:hover { text-decoration: underline; }
	.breadcrumbs p { margin: 0; }
	.prose { line-height: 1.8; }
	.prose .post-meta { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
	.prose h1, .prose h2, .prose h3 { color: var(--accent-secondary); }
	.prose h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
	.prose h2 { margin-top: 2.5rem; border-bottom: 1px solid var(--secondary-bg); padding-bottom: 0.5rem; }
	.prose p { color: var(--text-primary); }
	.prose details { background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; transition: background-color 0.2s ease; }
	.prose details[open] { background-color: var(--card-bg); }
	.prose summary { cursor: pointer; font-weight: 600; color: var(--accent-secondary); list-style: none; }
	.prose summary::-webkit-details-marker { display: none; }
	.prose summary::before { content: '+'; margin-right: 0.75rem; color: var(--accent-primary); font-weight: bold; display: inline-block; transition: transform 0.2s ease; }
	.prose details[open] summary::before { transform: rotate(45deg); }
	.prose details p { margin-top: 1rem; padding-left: 1.5rem; border-left: 2px solid var(--accent-primary); color: var(--text-secondary); }
	.prose .italic-note { font-style: italic; color: var(--text-secondary); text-align: center; margin-top: 3rem; }
</style>