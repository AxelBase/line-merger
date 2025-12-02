<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Accept vs Reject: Decision Logic Explained | Merger Blog</title>
	<meta name="description" content="Explore the three decision states — pending, accepted, rejected — and how they combine to produce the final merged output in real time." />
	<meta property="og:title" content="Accept vs Reject: Decision Logic Explained | Merger Blog" />
	<meta property="og:description" content="Explore the three decision states — pending, accepted, rejected — and how they combine to produce the final merged output in real time." />
	<meta property="og:url" content="{base}/blog/posts/post3" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Accept vs Reject: Decision Logic Explained</p>
	</div>

	<article class="prose">
		<h1>Accept vs Reject: Decision Logic Explained</h1>
		<p class="post-meta">Published: December 2, 2025</p>

		<p>Every change in the Line-by-Line Merger exists in one of three states: pending, accepted, or rejected. These states are the foundation of how the tool produces a clean, accurate final result with zero ambiguity.</p>

		<h2>The Three Decision States</h2>
		<p>When a hunk first appears, it is marked as pending. This means no decision has been made yet. By default, pending hunks behave exactly like rejected hunks — the original base text is kept. This ensures that if you close the page without reviewing everything, you get the original version back.</p>

		<h3>Accept: Apply the Change</h3>
		<p>When you click Accept on a hunk or individual line, the tool records that decision. All added lines from that hunk will appear in the final result, and removed lines will be omitted. The visual feedback changes immediately: accepted additions turn bright green and stay visible.</p>

		<h3>Reject: Keep the Original</h3>
		<p>Clicking Reject tells the tool to ignore the proposed in this hunk entirely. Removed lines are kept, added lines are discarded, and the hunk gets a strikethrough style to show it has been deliberately declined.</p>

		<h3>Pending: Treated as Rejected</h3>
		<p>Any hunk still marked pending when you export or copy the result is automatically treated as rejected. This fail-safe design means you never accidentally include unwanted changes.</p>

		<h2>How the Final Result Is Built</h2>
		<p>The merger reconstructs the file from scratch on every change. It starts with the base text, walks through every hunk in order, and applies only the accepted additions. Everything else — rejected or pending — preserves the original lines. This guarantees the output is always correct and predictable.</p>

		<h2>FAQ</h2>
		<details>
			<summary>Can I change my mind after deciding?</summary>
			<p>Yes. Click Accept on a rejected hunk or Reject on an accepted one — the decision updates instantly.</p>
		</details>
		<details>
			<summary>What does “Reset All Decisions” do?</summary>
			<p>It returns every hunk to pending state, giving you a clean slate while keeping both input texts.</p>
		</details>
		<details>
			<summary>Is the result ever different from what I see?</summary>
			<p>Never. The Final Result panel is updated on every single click — what you see is exactly what you get.</p>
		</details>

		<p class="italic-note">Mastering accept/reject decisions gives you full control over every merge.</p>
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