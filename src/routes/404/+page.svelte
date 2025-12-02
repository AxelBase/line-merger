<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>404 — Page Not Found | Line-by-Line Merger</title>
	<meta name="description" content="The page you're looking for doesn't exist. Return home to continue merging text with full privacy." />
	<meta property="og:title" content="404 — Page Not Found | Line-by-Line Merger" />
	<meta property="og:description" content="The page you're looking for doesn't exist. Return home to continue merging text with full privacy." />
	<meta property="og:url" content="{base}/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="container fade-in post-layout text-center">
	<div class="breadcrumbs">
		<a href="{base}/">Home</a>
		<span>/</span>
		<p>404 Not Found</p>
	</div>

	<article class="prose">
		<h1>404 — Oops, Nothing Here!</h1>

		<p class="post-meta">You’ve reached a page that doesn’t exist… yet.</p>

		<p>
			The link might be broken, the URL mistyped, or the page may have been moved.
			Don’t worry — the <strong>Line-by-Line Merger</strong> is still fully functional and ready for you.
		</p>

		<h2>Let’s get you back on track</h2>
		<ul class="helpful-links">
			<li><a href="{base}/">Home – Start Merging Now</a></li>
			<li><a href="{base}/blog">Blog – Tips & Guides</a></li>
			<li><a href="{base}/privacy">Privacy Policy</a></li>
			<li><a href="{base}/terms">Terms & Conditions</a></li>
		</ul>

		<h2>Pro tip</h2>
		<p>
			Just paste your two text versions on the home page — no login, no tracking, no data ever leaves your browser.
		</p>

		<div class="mt-8">
			<a href="{base}/" class="btn btn-primary btn-lg">
				Take Me Home
			</a>
		</div>

		<p class="italic-note mt-8">
			<strong>Merge freely. Privacy guaranteed.</strong><br>
			Even 404 pages respect your data protection.
		</p>
	</article>
</div>

<style>
	.post-layout {
		max-width: 800px;
		padding: 4rem 1rem;
		margin: 0 auto;
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: .5rem;
		margin-bottom: 2rem;
		font-size: .95rem;
		color: var(--text-secondary);
	}

	.breadcrumbs a {
		color: var(--accent-secondary);
		text-decoration: none;
	}

	.breadcrumbs a:hover {
		text-decoration: underline;
	}

	.prose h1 {
		font-size: 4rem;
		font-weight: 800;
		color: var(--accent-primary);
		margin-bottom: .5rem;
	}

	.prose .post-meta {
		color: var(--text-secondary);
		font-size: 1rem;
		margin-bottom: 2.5rem;
	}

	.helpful-links {
		list-style: none;
		padding: 0;
		margin: 2rem 0;
		font-size: 1.2rem;
	}

	.helpful-links li {
		margin: 1rem 0;
	}

	.helpful-links a {
		color: var(--accent-primary);
		text-decoration: none;
		font-weight: 500;
		padding: .25rem 0;
		border-bottom: 2px solid transparent;
		transition: all 0.2s ease;
	}

	.helpful-links a:hover {
		border-color: var(--accent-primary);
	}

	.btn-lg {
		font-size: 1.25rem;
		padding: .75rem 2rem;
	}

	.italic-note {
		font-style: italic;
		color: var(--text-secondary);
		text-align: center;
		margin-top: 4rem;
		font-size: 1.1rem;
	}
</style>