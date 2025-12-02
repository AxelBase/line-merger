import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),

	// Suppress the harmless state_referenced_locally warnings from generated/root.svelte
	onwarn: (warning, defaultHandler) => {
		if (
			warning.code === 'state_referenced_locally' &&
			warning.filename?.includes('generated/root.svelte')
		) {
			return; // Silently ignore this known false-positive
		}
		// Show all other warnings
		defaultHandler?.(warning);
	},

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: undefined,
			precompress: false
		}),

		paths: {
			// Change '/line-merger' to your actual repo name if different
	  		base: '/line-merger'
		},

		prerender: {
			entries: ['*'],
			handleHttpError: 'warn'
		}
	}
};

export default config;