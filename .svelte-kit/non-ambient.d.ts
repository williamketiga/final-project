
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/dashboard" | "/api/login" | "/api/post" | "/api/register" | "/dashboard" | "/feeds" | "/forgot-password" | "/login" | "/post" | "/post/[id]" | "/profile" | "/register";
		RouteParams(): {
			"/post/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/api": Record<string, never>;
			"/api/dashboard": Record<string, never>;
			"/api/login": Record<string, never>;
			"/api/post": Record<string, never>;
			"/api/register": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/feeds": Record<string, never>;
			"/forgot-password": Record<string, never>;
			"/login": Record<string, never>;
			"/post": { id?: string };
			"/post/[id]": { id: string };
			"/profile": Record<string, never>;
			"/register": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/dashboard" | "/api/dashboard/" | "/api/login" | "/api/login/" | "/api/post" | "/api/post/" | "/api/register" | "/api/register/" | "/dashboard" | "/dashboard/" | "/feeds" | "/feeds/" | "/forgot-password" | "/forgot-password/" | "/login" | "/login/" | "/post" | "/post/" | `/post/${string}` & {} | `/post/${string}/` & {} | "/profile" | "/profile/" | "/register" | "/register/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}