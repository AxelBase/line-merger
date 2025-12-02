<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Privacy Policy | Line-by-Line Merger</title>
	<meta name="description" content="Your data never leaves your browser. Read our full privacy commitment for the Line-by-Line Accept/Reject Merger." />
	<meta property="og:title" content="Privacy Policy | Line-by-Line Merger" />
	<meta property="og:description" content="Your data never leaves your browser. Read our full privacy commitment for the Line-by-Line Accept/Reject Merger." />
	<meta property="og:url" content="{base}/privacy" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/">Home</a>
		<span>/</span>
		<p>Privacy Policy</p>
	</div>

	<article class="prose">
		<h1>Privacy Policy</h1>
		<p class="post-meta">Effective Date: December 2, 2025</p>

		<p>The **Line-by-Line Accept/Reject Merger** is a **100% client-side web application**. This means **nothing you paste, upload, or merge ever leaves your device**. We believe privacy is not a feature — it is the foundation of this tool.</p>

		<h2>We Collect Absolutely Nothing</h2>
		<p>Because all diff computation, decision tracking, and result generation happen entirely in your browser using JavaScript:</p>
		<ul>
			<li>**No text** you input is ever sent to any server</li>
			<li>**No IP addresses** are logged</li>
			<li>**No analytics**, cookies, or tracking pixels are used</li>
			<li>**No usage data** is recorded — not even page views</li>
		</ul>
		<p>Your base text, modified text, and final merged result exist only in your browser’s memory and localStorage (which is automatically cleared when you close or refresh the page unless you choose otherwise).</p>

		<h2>How Your Data Stays Private</h2>
		<p>Every feature — from drag-and-drop file loading to real-time hunk processing and “Use as Base” — runs locally. Even the diff algorithm (jsdiff) and all rendering logic execute exclusively on your device. When you click **Copy** or **Download**, those actions are handled by your browser’s native APIs with zero server involvement.</p>

		<h2>No Third-Party Services</h2>
		<p>We do not use external analytics, advertising, error reporting, or CDN-hosted scripts that could track you. The entire application is statically hosted (e.g., GitHub Pages, Vercel, Netlify) and contains only open-source code you can inspect yourself.</p>

		<h2>Local Storage Usage</h2>
		<p>The only data stored on your device is what you explicitly allow: your base and modified texts are saved in **localStorage** so they survive page refresh. This is optional and under your full control. Clearing your browser data removes everything instantly.</p>

		<h2>Security Responsibility</h2>
		<p>Since we never see your content, we cannot protect it remotely. You remain responsible for using the tool on a secure device and avoiding public or shared computers when merging sensitive files.</p>

		<h2>Children’s Privacy</h2>
		<p>This tool is not directed at children under 13. We do not knowingly collect any personal information from children.</p>

		<h2>Changes to This Policy</h2>
		<p>We may update this policy if new features are added that change data handling (unlikely). Any changes will be posted here with a new effective date.</p>

		<h2>Contact</h2>
		<p>Questions? Open an issue on our GitHub repository — we’re fully transparent.</p>

		<p class="italic-note"><strong>Your text. Your device. Your privacy. Always.</strong></p>
	</article>
</div>

<style>
	.post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
	.breadcrumbs { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: .9rem; color: var(--text-secondary); }
	.breadcrumbs a { color: var(--accent-secondary); text-decoration: none; }
	.breadcrumbs a:hover { text-decoration: underline; }
	.prose { line-height: 1.8; }
	.prose .post-meta { color: var(--text-secondary); font-size: .9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
	.prose h1 { font-size: 2.5rem; color: var(--accent-secondary); margin-bottom: .5rem; }
	.prose h2 { margin-top: 2.5rem; color: var(--accent-secondary); border-bottom: 1px solid var(--secondary-bg); padding-bottom: .5rem; }
	.prose p, .prose ul { color: var(--text-primary); }
	.prose ul { padding-left: 1.5rem; list-style: '→ '; }
	.prose ul li::marker { color: var(--accent-primary); }
	.prose strong { color: var(--accent-primary); }
	.prose .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: var(--text-secondary); font-size: 1.1rem; }
</style>