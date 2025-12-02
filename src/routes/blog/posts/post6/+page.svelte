<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Keyboard Shortcuts and Power User Workflow | Merger Blog</title>
	<meta name="description" content="Master the A and R keyboard shortcuts to review large diffs in seconds — no mouse required." />
	<meta property="og:title" content="Keyboard Shortcuts and Power User Workflow | Merger Blog" />
	<meta property="og:description" content="Master the A and R keyboard shortcuts to review large diffs in seconds — no mouse required." />
	<meta property="og:url" content="{base}/blog/posts/post6" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Keyboard Shortcuts and Power User Workflow</p>
	</div>

	<article class="prose">
		<h1>Keyboard Shortcuts and Power User Workflow</h1>
		<p class="post-meta">Published: December 2, 2025</p>

		<p>While the mouse works perfectly, power users can fly through even the largest diffs using just two keys: A to accept the current pending hunk, R to reject it.</p>

		<h2>How the Shortcuts Work</h2>
		<p>As soon as a diff loads, the first undecided hunk is automatically focused. Press A to accept it and instantly move to the next pending hunk. Press R to reject and move on. The Final Result updates with every keystroke — you see the merged file take shape in real time.</p>

		<h3>Why This Is Fast</h3>
		<p>Most reviews follow a clear pattern: accept most changes, reject a few outliers. With keyboard shortcuts you never move your hands from the home row. A large pull request with dozens of hunks can be reviewed in under a minute.</p>

		<h2>Advanced Tips</h2>
		<p>Combine shortcuts with the view toggle button for maximum speed: start in Side-by-Side to understand layout, switch to Inline, then hammer A and R until done. Use “Use as Base” between iterations without ever touching the mouse.</p>

		<h2>FAQ</h2>
		<details>
			<summary>Do the shortcuts wrap around?</summary>
			<p>No. When you reach the last hunk, pressing A or R does nothing until new changes appear.</p>
		</details>
		<details>
			<summary>Can I customize the keys?</summary>
			<p>Not yet, but A and R are the universal standard for accept/reject in many tools.</p>
		</details>
		<details>
			<summary>Do shortcuts work on mobile?</summary>
			<p>No, but mobile users have large, easy-to-tap buttons instead.</p>
		</details>

		<p class="italic-note">Two keys. Zero friction. Total control.</p>
	</article>
</div>

<style>
	/* Same styling as all previous posts */
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
	.prose details { background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; }
	.prose details[open] { background-color: var(--card-bg); }
	.prose summary { cursor: pointer; font-weight: 600; color: var(--accent-secondary); list-style: none; }
	.prose summary::-webkit-details-marker { display: none; }
	.prose summary::before { content: '+'; margin-right: 0.75rem; color: var(--accent-primary); font-weight: bold; transition: transform 0.2s ease; }
	.prose details[open] summary::before { transform: rotate(45deg); }
	.prose details p { margin-top: 1rem; padding-left: 1.5rem; border-left: 2px solid var(--accent-primary); color: var(--text-secondary); }
	.prose .italic-note { font-style: italic; color: var(--text-secondary); text-align: center; margin-top: 3rem; }
</style>