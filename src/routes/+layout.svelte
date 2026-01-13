<script lang="ts">
    import "../app.css";
    import { base } from '$app/paths';
    import { slide } from 'svelte/transition';
    import { onMount } from 'svelte';

    // --- Configuration ---
    const currentYear = new Date().getFullYear();
    const bmacUsername = 'axelbase';

    // --- State ---
    let isDropdownOpen = false;
    let isDarkMode = false;

    // --- Dropdown Logic ---
    function toggleDropdown(event: MouseEvent) {
        event.stopPropagation();
        isDropdownOpen = !isDropdownOpen;
    }

    function closeDropdown() {
        isDropdownOpen = false;
    }

    function clickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (node && !node.contains(event.target as Node) && isDropdownOpen) {
                node.dispatchEvent(new CustomEvent('click_outside'));
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }

    // --- Theme Toggle Logic ---
    function toggleTheme() {
        const current = document.body.getAttribute('data-bs-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-bs-theme', newTheme);
        isDarkMode = newTheme === 'dark';
    }

    onMount(() => {
        const current = document.body.getAttribute('data-bs-theme');
        isDarkMode = current === 'dark';
    });
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
    <nav class="container glass-card rounded-pill px-4 py-2 d-flex justify-content-between align-items-center"
         style="pointer-events: auto; max-width: 1200px; border-radius: 50px; overflow: visible;">
        
        <div class="d-flex align-items-center gap-3">
            <a href="{base}/" class="d-flex align-items-center gap-2 text-decoration-none logo-group">
                <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-brand-logo" />
                <span class="fw-bold fs-5" style="color: var(--color-text-main);">AxelBase</span>
            </a>

            <div class="position-relative d-none d-sm-block" use:clickOutside on:click_outside={closeDropdown}>
                <button 
                    class="bmac-button d-flex align-items-center gap-2" 
                    on:click={toggleDropdown}
                    aria-label="Support AxelBase"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
                    </svg>
                    <span>Coffee</span>
                </button>

                {#if isDropdownOpen}
                    <div class="bmac-dropdown glass-card" transition:slide={{ duration: 220 }}>
                        <a href="https://buymeacoffee.com/{bmacUsername}" target="_blank" rel="noopener" on:click={closeDropdown}>
                            <span class="amount">$3</span> One Coffee
                        </a>
                        <a href="https://buymeacoffee.com/{bmacUsername}" target="_blank" rel="noopener" on:click={closeDropdown}>
                            <span class="amount">$5</span> Two Coffees
                        </a>
                        <a href="https://buymeacoffee.com/{bmacUsername}" target="_blank" rel="noopener" on:click={closeDropdown}>
                            <span class="amount">$10</span> Three Coffees
                        </a>

                        <a href="https://buymeacoffee.com/{bmacUsername}" target="_blank" rel="noopener" on:click={closeDropdown} class="custom-amount">
                            Custom Amount
                        </a>

                        <a
                            href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
                            target="_blank"
                            rel="noopener"
                            on:click={closeDropdown}
                            class="custom-amount bitcoin-option"
                        >
                            Buy via Bitcoin
                        </a>
                    </div>
                {/if}
            </div>
        </div>

        <div class="d-flex align-items-center gap-3">
            <ul style="list-style: none; display: flex; align-items: center; margin: 0; padding:0; gap: 0.5rem;" class="d-none d-lg-flex">
                <li><a class="nav-link-custom" href="{base}/">Home</a></li>
                <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
                <li><a class="nav-link-custom" href="{base}/#how-to">How to</a></li>
                <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
                <li><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
            </ul>

            <button class="btn btn-outline-secondary d-flex align-items-center justify-content-center border-0"
                    style="width: 40px; height: 40px; border-radius: 50%;"
                    on:click={toggleTheme}
                    aria-label="Toggle dark mode">
                {#if isDarkMode}
                     <i class="bi bi-sun-fill fs-5" style="color: #ffdd00;"></i>
                {:else}
                     <i class="bi bi-moon-stars-fill fs-5" style="color: #464531;"></i>
                {/if}
            </button>
        </div>
    </nav>
</header>

<main>
    <slot />
</main>

<footer class="custom-footer glass-card rounded-0 border-start-0 border-end-0 border-bottom-0">
    <div class="container d-flex justify-content-between align-items-center">
        <span>© {currentYear} AxelBase Line-by-Line Merger</span>
        <div>
            <a href="{base}/privacy" class="footer-link">Privacy</a>
            <span style="opacity:0.3; margin: 0 5px;">|</span>
            <a href="{base}/terms" class="footer-link">Terms</a>
        </div>
    </div>
</footer>

<style>
    /* ── Existing styles kept ── */
    .navbar-brand-logo { height: 32px; width: auto; border-radius: 8px; transition: transform 0.3s ease; }
    .logo-group:hover .navbar-brand-logo { transform: rotate(10deg) scale(1.1); }

    .nav-link-custom {
        position: relative;
        padding: 0.5rem 0.8rem;
        color: var(--color-text-muted);
        font-weight: 600;
        font-size: 0.95rem;
        transition: color 0.3s;
    }
    .nav-link-custom:hover { color: var(--theme-accent); }

    /* ── Updated BMAC Button (blending both styles) ── */
    .bmac-button {
        background: linear-gradient(135deg, #FFDD00 0%, #FBB03B 100%);
        border: none;
        border-radius: 50px;
        padding: 8px 18px;
        font-weight: 700;
        color: #464531;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(251, 176, 59, 0.4);
        transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-size: 0.9rem;
    }

    .bmac-button:hover {
        transform: scale(1.06) translateY(-1px);
        box-shadow: 0 7px 22px rgba(251, 176, 59, 0.55);
    }

    .bmac-button svg { width: 18px; height: 18px; }

    /* Dropdown - glass + file1 feeling */
    .bmac-dropdown {
        position: absolute;
        top: 130%;
        left: 50%;
        transform: translateX(-50%);
        width: 240px;
        padding: 8px 0;
        z-index: 1050;
        background: var(--glass-bg);
        backdrop-filter: blur(16px);
        border: 1px solid var(--glass-border);
        box-shadow: var(--glass-shadow);
        border-radius: 20px;
        overflow: hidden;
    }

    .bmac-dropdown a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 11px 20px;
        color: var(--color-text-main);
        text-decoration: none;
        font-size: 0.95rem;
        font-weight: 500;
        transition: all 0.18s ease;
    }

    .bmac-dropdown a:hover {
        background: rgba(70, 69, 49, 0.08);
        color: var(--theme-accent);
        padding-left: 26px;
    }

    .bmac-dropdown .amount {
        font-weight: 800;
        color: #e89b00;
        font-size: 1.15rem;
        min-width: 38px;
    }

    .bmac-dropdown .custom-amount {
        font-weight: 700;
        color: var(--theme-accent);
        justify-content: center !important;
        border-top: 1px solid var(--glass-border);
        margin-top: 4px;
        padding-top: 12px;
    }

    .bitcoin-option {
        color: #f7931a !important;
        font-weight: 700;
    }

    .bitcoin-option:hover {
        background: rgba(247, 147, 26, 0.08) !important;
    }

    /* Footer (unchanged) */
    .custom-footer {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 12px 0;
        font-size: 0.85rem;
        z-index: 1030;
        color: var(--color-text-muted);
    }

    .footer-link { color: var(--color-text-muted); margin: 0 5px; text-decoration: none; }
    .footer-link:hover { color: var(--theme-accent); }
</style>