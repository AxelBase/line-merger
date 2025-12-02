<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Terms & Conditions | Line-by-Line Merger</title>
	<meta name="description" content="Terms of use for the free, open-source Line-by-Line Accept/Reject Merger web tool." />
	<meta property="og:title" content="Terms & Conditions | Line-by-Line Merger" />
	<meta property="og:description" content="Terms of use for the free, open-source Line-by-Line Accept/Reject Merger web tool." />
	<meta property="og:url" content="{base}/terms" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/">Home</a>
		<span>/</span>
		<p>Terms & Conditions</p>
	</div>

	<article class="prose">
		<h1>Terms & Conditions</h1>
		<p class="post-meta">Effective Date: December 2, 2025</p>

		<p>By using the **Line-by-Line Accept/Reject Merger** (the “Tool”), you agree to these Terms & Conditions. The Tool is provided free of charge and **as-is** for personal and commercial use.</p>

		<h2>1. Nature of the Tool</h2>
		<p>This is a **fully client-side**, open-source web application. All processing occurs in your browser. We do not host, store, or transmit any of your text. You are solely responsible for the content you input and the merged results you generate.</p>

		<h2>2. License to Use</h2>
		<p>You are granted a **worldwide, royalty-free, perpetual license** to use the Tool for any lawful purpose, including merging configuration files, documentation, code, or creative writing. No attribution is required, though appreciated.</p>

		<h2>3. No Warranty</h2>
		<p>The Tool is provided **“as-is”** without any warranties, express or implied. We do not guarantee:</p>
		<ul>
			<li>Accuracy of diff detection in edge cases</li>
			<li>Correctness of merged output (always verify results)</li>
			<li>Availability or uptime (it’s statically hosted)</li>
		</ul>
		<p>We are not liable for any damages resulting from use or inability to use the Tool.</p>

		<h2>4. Acceptable Use</h2>
		<p>You agree not to:</p>
		<ul>
			<li>Use the Tool for illegal purposes</li>
			<li>Attempt to overload or attack the hosting infrastructure</li>
			<li>Remove or alter the open-source license or credits</li>
		</ul>

		<h2>5. Intellectual Property</h2>
		<p>The Tool’s source code is open-source under the MIT License. Your input text and merged output remain **100% yours** — we claim no rights over them.</p>

		<h2>6. Limitation of Liability</h2>
		<p>To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Tool.</p>

		<h2>7. Changes to Terms</h2>
		<p>We may modify these terms at any time. Continued use after changes constitutes acceptance.</p>

		<h2>8. Governing Law</h2>
		<p>These terms are governed by the laws of the jurisdiction where the project maintainer resides, without regard to conflict of law principles.</p>

		<p class="italic-note"><strong>Use freely. Merge confidently. Take full responsibility.</strong></p>
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