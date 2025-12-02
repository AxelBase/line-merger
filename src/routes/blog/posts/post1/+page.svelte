<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>What is a Line-by-Line Accept/Reject Merger? | Merger Blog</title>
	<meta name="description" content="Discover the browser-based Line-by-Line Accept/Reject Merger — a privacy-first tool that lets you interactively merge text changes just like GitHub PR reviews, without installing Git." />
	<meta property="og:title" content="What is a Line-by-Line Accept/Reject Merger? | Merger Blog" />
	<meta property="og:description" content="Discover the browser-based Line-by-Line Accept/Reject Merger — a privacy-first tool that lets you interactively merge text changes just like GitHub PR reviews, without installing Git." />
	<meta property="og:url" content="{base}/blog/posts/post1" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>What is a Line-by-Line Accept/Reject Merger?</p>
	</div>

	<article class="prose">
		<h1>What is a Line-by-Line Accept/Reject Merger?</h1>
		<p class="post-meta">Published: December 2, 2025</p>

		<p>A Line-by-Line Accept/Reject Merger is a fully client-side web tool that brings the exact GitHub Pull Request review experience directly into your browser. You paste two versions of any text file — whether it’s code, documentation, configuration, or plain writing — and the tool instantly shows you every change, one line at a time. You then decide, line by line or hunk by hunk, whether to keep the old version (reject) or apply the new change (accept). The final merged result updates instantly as you work.</p>

		<h2>Why This Tool Exists</h2>
		<p>Not everyone has Git installed. Not every device allows terminal access. Sometimes you just need to quickly compare and merge two text snippets from email, chat, or a web form. This merger solves that exact problem: no installation, no accounts, no data sent to servers — everything happens locally in your browser.</p>

		<h3>How It Feels Like GitHub</h3>
		<p>The interface deliberately mimics GitHub’s PR review screen. Green lines are additions, red lines are removals, and you get Accept and Reject buttons right next to each change. You can switch between inline view (like unified diff) and side-by-side view (perfect for prose or structured data). The moment you make a decision, the Final Result panel on the right updates automatically.</p>

		<h3>Privacy by Design</h3>
		<p>Because the entire diff engine runs in your browser using pure JavaScript, nothing you paste ever leaves your device. This makes it safe for sensitive configuration files, internal documentation, or any content you don’t want uploaded anywhere.</p>

		<h2>FAQ</h2>
		<details>
			<summary>Do I need Git or GitHub to use it?</summary>
			<p>No. The tool works with any plain text — no Git knowledge required.</p>
		</details>
		<details>
			<summary>Can I merge large files?</summary>
			<p>Yes. The tool handles files up to tens of thousands of lines, limited only by browser memory.</p>
		</details>
		<details>
			<summary>Does it work offline?</summary>
			<p>Yes. Once loaded, it works completely offline — perfect for airplanes or restricted networks.</p>
		</details>

		<p class="italic-note">This tool brings the power of interactive merging to everyone, everywhere, instantly.</p>
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