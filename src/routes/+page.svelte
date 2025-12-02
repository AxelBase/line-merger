<script lang="ts">
    import { baseText, modifiedText, hunks, result, acceptHunk, rejectHunk, resetDecisions, useResultAsBase, copyResult, downloadResult } from '$lib/merger.store.js';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    let viewMode: 'side-by-side' | 'inline' = 'side-by-side';

    const clearBase = () => baseText.set('');
    const clearModified = () => modifiedText.set('');

    const handleDrop = (e: DragEvent, target: 'base' | 'modified') => {
        e.preventDefault();
        const file = e.dataTransfer?.files[0];
        if (file && (file.type.startsWith('text/') || file.name.endsWith('.txt'))) {
            const reader = new FileReader();
            reader.onload = ev => {
                const text = ev.target?.result as string;
                target === 'base' ? baseText.set(text) : modifiedText.set(text);
            };
            reader.readAsText(file);
        }
    };

    onMount(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'a') {
                const pending = $hunks.find(h => h.decision === 'pending');
                if (pending) acceptHunk(pending.id);
            }
            if (e.key.toLowerCase() === 'r') {
                const pending = $hunks.find(h => h.decision === 'pending');
                if (pending) rejectHunk(pending.id);
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    });
</script>

<div class="container-fluid py-4" style="margin-top: 2rem;">
    
    <section id="home" class="mb-5">
        <div class="text-center mb-5 mt-4" in:fade={{ duration: 1000, delay: 200 }}>
            <h1 class="display-6 fw-bold" style="color: var(--color-text-main);">Merge Tool</h1>
            <p class="text-muted">Accept or reject changes line-by-line with ease.</p>
        </div>

        <div class="row g-4 mb-4" in:fly={{ y: 50, duration: 800, delay: 300 }}>
            <div class="col-lg-6">
                <div class="glass-card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>Original / Base Text</span>
                        <button class="btn btn-sm btn-outline-danger" on:click={clearBase}>Clear</button>
                    </div>
                    <div class="card-body p-0">
                        <div class="h-100 p-3" role="region" aria-label="Drop zone for base text"
                            on:drop={e => handleDrop(e, 'base')}
                            on:dragover|preventDefault on:dragenter|preventDefault>
                            <textarea class="form-control h-100 border-0 shadow-none" rows="20" bind:value={$baseText}
                                placeholder="Paste base text or drop file..." spellcheck="false" style="background: transparent; resize: none;"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="glass-card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>Modified / New Text</span>
                        <button class="btn btn-sm btn-outline-danger" on:click={clearModified}>Clear</button>
                    </div>
                    <div class="card-body p-0">
                        <div class="h-100 p-3" role="region" aria-label="Drop zone for modified text"
                            on:drop={e => handleDrop(e, 'modified')}
                            on:dragover|preventDefault on:dragenter|preventDefault>
                            <textarea class="form-control h-100 border-0 shadow-none" rows="20" bind:value={$modifiedText}
                                placeholder="Paste modified text or drop file..." spellcheck="false" style="background: transparent; resize: none;"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {#if $hunks.length > 0}
            <div class="text-center mb-4" in:fade>
                <div class="btn-group shadow-sm" style="border-radius: 50px; overflow: hidden; background: var(--glass-bg);">
                    <button class="btn {viewMode === 'side-by-side' ? 'btn-primary' : 'btn-light'}"
                        on:click={() => viewMode = 'side-by-side'}>Side-by-Side</button>
                    <button class="btn {viewMode === 'inline' ? 'btn-primary' : 'btn-light'}"
                        on:click={() => viewMode = 'inline'}>Inline</button>
                </div>
                <button class="btn btn-warning ms-3 text-white" on:click={resetDecisions}>Reset Decisions</button>
            </div>

            <div class="row g-4" in:fly={{ y: 20, duration: 600 }}>
                <div class="col-xl-8">
                    <div class="glass-card">
                        <div class="card-header">Interactive Diff</div>
                        <div class="card-body p-0">
                            {#each $hunks as hunk (hunk.id)}
                                <div class="border-bottom" style="border-color: var(--glass-border) !important;">
                                    <div class="p-2 px-3 d-flex justify-content-between align-items-center small" style="background: rgba(128,128,128,0.05); color: var(--color-text-muted);">
                                        <span class="badge bg-secondary rounded-pill">Chunk {hunk.id + 1}</span>
                                        <div>
                                            <button class="btn btn-success btn-sm me-1" on:click={() => acceptHunk(hunk.id)}>Accept All</button>
                                            <button class="btn btn-danger btn-sm" on:click={() => rejectHunk(hunk.id)}>Reject All</button>
                                        </div>
                                    </div>

                                    {#if viewMode === 'inline'}
                                        {#each hunk.lines as line}
                                            <div class="diff-line px-3 py-1 {line.added ? 'diff-added' : line.removed ? 'diff-removed' : 'diff-context'}
                                                 {hunk.decision === 'accepted' && line.added ? 'diff-accepted' : ''}
                                                 {hunk.decision === 'rejected' && line.removed ? 'diff-rejected' : ''}">
                                                <span class="me-3 opacity-50 user-select-none">{line.added ? '+' : line.removed ? '-' : ' '}</span>
                                                <span class="flex-grow-1">{line.value.replace(/\n$/, '')}</span>
                                                {#if line.added && hunk.decision !== 'accepted'}
                                                    <button class="btn btn-success btn-sm float-end p-0 px-2" style="font-size: 0.7em" on:click={() => acceptHunk(hunk.id)}>✓</button>
                                                {:else if line.removed && hunk.decision !== 'rejected'}
                                                    <button class="btn btn-danger btn-sm float-end p-0 px-2" style="font-size: 0.7em" on:click={() => rejectHunk(hunk.id)}>✗</button>
                                                {/if}
                                            </div>
                                        {/each}
                                    {:else}
                                        <div class="table-responsive">
                                            <table class="table table-sm mb-0 text-body">
                                                <tbody>
                                                    {#each hunk.lines as line}
                                                        <tr class="{line.added ? 'diff-added' : line.removed ? 'diff-removed' : ''}
                                                                  {hunk.decision === 'accepted' && line.added ? 'diff-accepted' : ''}
                                                                  {hunk.decision === 'rejected' && line.removed ? 'diff-rejected' : ''}">
                                                            <td class="text-center opacity-50 w-5 user-select-none border-end border-light-subtle">{line.removed ? '-' : ''}</td>
                                                            <td class="w-45 pe-3 border-end border-light-subtle position-relative">
                                                                <pre class="m-0" style="white-space: pre-wrap; color: inherit;">{line.removed ? line.value.replace(/\n$/, '') : ''}</pre>
                                                            </td>
                                                            <td class="text-center opacity-50 w-5 user-select-none border-end border-light-subtle">{line.added ? '+' : ''}</td>
                                                            <td class="w-45 ps-3 position-relative">
                                                                <pre class="m-0" style="white-space: pre-wrap; color: inherit;">{line.added ? line.value.replace(/\n$/, '') : ''}</pre>
                                                                
                                                                <div class="position-absolute top-0 end-0 p-1">
                                                                    {#if line.added && hunk.decision !== 'accepted'}
                                                                        <button class="btn btn-success btn-sm p-0 px-2" style="font-size: 0.7em" on:click={() => acceptHunk(hunk.id)}>✓</button>
                                                                    {:else if line.removed && hunk.decision !== 'rejected'}
                                                                        <button class="btn btn-danger btn-sm p-0 px-2" style="font-size: 0.7em" on:click={() => rejectHunk(hunk.id)}>✗</button>
                                                                    {/if}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    {/each}
                                                </tbody>
                                            </table>
                                        </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="col-xl-4">
                    <div class="glass-card sticky-top" style="top: 6rem; z-index: 1020;">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <strong>Final Result</strong>
                            <div>
                                <button class="btn btn-primary btn-sm me-1" on:click={copyResult} title="Copy to clipboard">Copy</button>
                                <button class="btn btn-outline-primary btn-sm me-1" on:click={downloadResult} title="Download file">
                                    <i class="bi bi-download"></i>
                                </button>
                                <button class="btn btn-outline-success btn-sm" on:click={useResultAsBase} title="Move result to Base">↺</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <pre class="mb-0 p-3 small font-monospace" style="max-height: 70vh; overflow-y: auto; background: rgba(0,0,0,0.05); color: var(--color-text-main);"><code>{$result || '(empty)'}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        {:else if $baseText && $modifiedText}
            <div class="alert alert-info text-center mt-5 shadow-sm rounded-pill w-50 mx-auto glass-card">No differences found between texts.</div>
        {:else}
            <div class="text-center text-muted mt-5 py-5" in:fade>
                <h3 class="fw-light">Paste or drop two text versions above to begin</h3>
            </div>
        {/if}
    </section>

    <hr class="my-5 opacity-25">

<!-- ABOUT SECTION -->
<section id="about" class="container py-5">
	<h2 class="h3 mb-4 fw-bold text-center" style="color: var(--accent-primary);">About the Line-by-Line Merger</h2>
	<div class="glass-card p-5">
		<div class="prose mx-auto" style="max-width: 800px;">
			<p class="lead">The Line-by-Line Accept/Reject Merger is a privacy-first, fully client-side web tool that brings the exact GitHub Pull Request review experience directly into your browser — no installation, no Git, no data ever leaves your device.</p>

			<p>Designed for developers, technical writers, translators, and anyone who needs to compare and merge two versions of text, this tool replicates the familiar GitHub diff interface: green for additions, red for removals, and clear Accept/Reject controls for every change. Whether you're merging configuration files, documentation, localization strings, or even creative writing revisions, everything happens instantly and locally.</p>

			<p>Unlike traditional diff tools that only show differences, this merger is interactive. Every decision you make — whether to accept or reject a change — immediately updates the final merged result in real time. You see exactly what your output will be before you copy or download it. This "what you see is what you get" approach eliminates surprises and makes complex merges safe and predictable.</p>

			<p>Built with performance in mind, the tool uses a fast hunk-based diff engine that groups related changes together, just like GitHub does. Large files with thousands of lines are split into manageable chunks, each with its own Accept All / Reject All buttons. You retain full control: accept an entire feature update with one click, or fine-tune line by line using the individual buttons.</p>

			<p>Two viewing modes are available: Inline view shows changes in the flow of the document (perfect for prose and Markdown), while Side-by-Side view aligns old and new versions perfectly (ideal for structured data like JSON, YAML, or CSV). Toggle between them anytime — your decisions are preserved across views.</p>

			<p>Privacy is not an afterthought — it’s the core principle. Because all processing runs in your browser using pure JavaScript, your text never touches a server. No analytics, no cookies, no tracking. Even localStorage usage is optional and fully under your control.</p>

			<p>The tool also supports power users with keyboard shortcuts (A to accept, R to reject), drag-and-drop file loading, and an innovative “Use as Base” feature that lets you perform multi-step, iterative merges by progressively applying approved changes across multiple versions.</p>

			<p>Whether you're on a laptop, tablet, or restricted workstation, the Line-by-Line Merger works instantly, offline-capable after first load, and requires zero setup. It’s open-source, MIT-licensed, and hosted statically — making it perfect for air-gapped environments, internal tools, or public sharing.</p>

			<p class="italic-note text-center mt-5"><strong>Your text. Your decisions. Your privacy. Always.</strong></p>
		</div>
	</div>
</section>

<!-- HOW TO USE SECTION – FIXED & BUILD-READY -->
<section id="how-to" class="container py-5">
	<h2 class="h3 mb-4 fw-bold text-center" style="color: var(--accent-primary);">How to Use the Merger</h2>
	<div class="row g-4 justify-content-center">
		<div class="col-lg-10">
			<div class="glass-card p-5">
				<div class="prose mx-auto" style="max-width: 800px;">
					<h4 class="fw-bold text-success">1. Input Your Texts</h4>
					<p>Paste your original (base) text into the left panel and the modified version into the right. You can also drag and drop .txt files directly onto either panel. The tool accepts any plain text format — code, Markdown, JSON, YAML, CSV, or prose.</p>

					<h4 class="fw-bold text-success">2. Review Changes</h4>
					<p>As soon as both texts are loaded, the interactive diff appears below. Changes are grouped into logical hunks with clear headers. Green lines (+) are additions, red lines (−) are removals. Use the toggle buttons to switch between Inline view (natural reading flow) and Side-by-Side view (perfect alignment for structured data).</p>

					<h4 class="fw-bold text-success">3. Make Decisions</h4>
					<p>For each hunk, click Accept All to apply the entire change, or Reject All to keep the original. For finer control, use the small check/cross buttons on individual lines. Accepted additions turn bright green, rejected removals get a strikethrough. Pending changes remain neutral.</p>

					<h4 class="fw-bold text-success">4. See Real-Time Results</h4>
					<p>The Final Result panel on the right updates instantly with every decision. What you see is exactly what you’ll get — no hidden logic, no surprises. Scroll through to verify your merged file looks perfect.</p>

					<h4 class="fw-bold text-success">5. Export Your Work</h4>
					<p>When satisfied, click Copy to send the result to your clipboard, Download to save as merged.txt, or Use as Base to lock in your current result and start a new merge with a third version. This enables powerful iterative workflows.</p>

					<h4 class="fw-bold text-success">Power User Tips</h4>
					<ul>
						<li>Press <kbd>A</kbd> to accept and <kbd>R</kbd> to reject the next pending hunk — no mouse needed</li>
						<li>Use “Reset Decisions” to start over while keeping your input texts</li>
						<li>Works completely offline after first visit</li>
						<li>Handles files up to tens of thousands of lines smoothly</li>
					</ul>

					<p class="italic-note text-center mt-5"><strong>Simple to learn. Powerful to master.</strong></p>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- FAQ SECTION -->
<section id="faq" class="container py-5 mb-5">
	<h2 class="h3 mb-4 fw-bold text-center" style="color: var(--accent-primary);">Frequently Asked Questions</h2>
	<div class="glass-card p-4">
		<div class="accordion" id="faqAccordion">
			<div class="accordion-item border-0 bg-transparent">
				<h2 class="accordion-header">
					<button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
						Is my data really private and secure?
					</button>
				</h2>
				<div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
					<div class="accordion-body">
						Yes — 100%. All processing happens entirely in your browser. Your text never leaves your device, is never sent to any server, and is never logged. No cookies, no analytics, no tracking of any kind.
					</div>
				</div>
			</div>

			<div class="accordion-item border-0 border-top bg-transparent" style="border-color: var(--glass-border)!important;">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
						Do I need Git or GitHub to use this?
					</button>
				</h2>
				<div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
					<div class="accordion-body">
						No. This tool works with any plain text. Perfect for when you only have two text snippets from email, chat, or documents.
					</div>
				</div>
			</div>

			<div class="accordion-item border-0 border-top bg-transparent" style="border-color: var(--glass-border)!important;">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
						What file types and sizes does it support?
					</button>
				</h2>
				<div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
					<div class="accordion-body">
						Any plain text file (.txt, .md, .json, .yml, .csv, .js, etc.). File size is limited only by your browser’s memory — typically tens of thousands of lines work smoothly.
					</div>
				</div>
			</div>

			<div class="accordion-item border-0 border-top bg-transparent" style="border-color: var(--glass-border)!important;">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
						Can I use it offline?
					</button>
				</h2>
				<div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
					<div class="accordion-body">
						Yes! After the first visit, the tool works completely offline. Ideal for airplanes, secure networks, or restricted environments.
					</div>
				</div>
			</div>

			<div class="accordion-item border-0 border-top bg-transparent" style="border-color: var(--glass-border)!important;">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
						What does “Use as Base” do?
					</button>
				</h2>
				<div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
					<div class="accordion-body">
						It takes your current merged result and moves it to the left (base) panel, clearing all decisions. This lets you perform multi-stage merges — apply one set of changes, then merge the next version against your approved result.
					</div>
				</div>
			</div>
		</div>

		<p class="italic-note text-center mt-5"><strong>Still have questions? The tool is open-source — explore the code anytime.</strong></p>
	</div>
</section></div>