<script lang="ts">
    import "../app.css";
    import { base } from '$app/paths';
    import { slide } from 'svelte/transition';
    import { onMount } from 'svelte';

    // --- Configuration ---
    const currentYear = new Date().getFullYear();
    const paypalUsername = 'AxelLab427'; 
    const donationAmounts = [1, 3, 5, 10];
    
    // --- State ---
    let isDropdownOpen = false;
    let isDarkMode = false; 

    // --- Buy Me Coffee Logic ---
    function toggleDropdown(event: MouseEvent) {
        // Important: Stop the click from bubbling to the document listener immediately
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
        // Check initial state
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
                <button class="bmac-button" on:click={toggleDropdown}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
                    </svg>
                    <span>Coffee</span>
                </button>
            
                {#if isDropdownOpen}
                    <div class="bmac-dropdown glass-card" transition:slide={{ duration: 200 }}>
                        {#each donationAmounts as amount}
                            <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer" on:click={closeDropdown}>
                                ${amount}
                            </a>
                        {/each}
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
        <span>&copy; {currentYear} AxelBase Line-by-Line Merger</span>
        <div>
            <a href="{base}/privacy" class="footer-link">Privacy</a>
            <span style="opacity:0.3; margin: 0 5px;">|</span>
            <a href="{base}/terms" class="footer-link">Terms</a>
        </div>
    </div>
</footer>

<style>
    /* Navbar Logos */
    .navbar-brand-logo { height: 32px; width: auto; border-radius: 8px; transition: transform 0.3s ease; }
    .logo-group:hover .navbar-brand-logo { transform: rotate(10deg) scale(1.1); }

    /* Nav Links */
    .nav-link-custom { 
        position: relative; 
        padding: 0.5rem 0.8rem; 
        color: var(--color-text-muted); 
        font-weight: 600; 
        font-size: 0.95rem;
        transition: color 0.3s; 
    }
    .nav-link-custom:hover { color: var(--theme-accent); }
    
    /* BMAC Button */
    .bmac-button {
        background: linear-gradient(135deg, #FFDD00 0%, #FBB03B 100%);
        border: none;
        border-radius: 50px;
        padding: 6px 16px;
        font-weight: 700;
        color: #464531;
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(251, 176, 59, 0.4);
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-size: 0.85rem;
    }
    .bmac-button:hover { transform: scale(1.05); box-shadow: 0 6px 20px rgba(251, 176, 59, 0.6); }
    .bmac-button svg { width: 16px; height: 16px; }

    .bmac-dropdown {
        position: absolute;
        top: 130%;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px;
        display: flex;
        flex-direction: column;
        min-width: 100px;
        z-index: 1050;
        /* FIX: Use the CSS variable for dark mode compatibility */
        background: var(--glass-bg); 
    }
    .bmac-dropdown a {
        text-decoration: none;
        color: var(--color-text-main);
        padding: 8px 16px;
        text-align: center;
        font-weight: 600;
        border-radius: 20px;
        transition: background 0.2s;
        font-size: 0.9rem;
    }
    .bmac-dropdown a:hover { background-color: rgba(0,0,0,0.05); color: var(--theme-accent); }

    /* Footer */
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