import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import injectHTML from "vite-plugin-html-inject";
import tsConfigPaths from "vite-tsconfig-paths";

const buildVariables = () => {
	const defines: Record<string, string> = {
		__APP_ID__: JSON.stringify("make-a-wish-nz"),
		__API_PATH__: JSON.stringify(""),
		__API_HOST__: JSON.stringify(""),
		__API_PREFIX_PATH__: JSON.stringify(""),
		__API_URL__: JSON.stringify(""),
		__WS_API_URL__: JSON.stringify(""),
		__APP_BASE_PATH__: JSON.stringify("/"),
		__APP_TITLE__: JSON.stringify("Make-A-Wish NZ"),
		__APP_FAVICON_LIGHT__: JSON.stringify("/favicon-light.svg"),
		__APP_FAVICON_DARK__: JSON.stringify("/favicon-dark.svg"),
		__APP_DEPLOY_USERNAME__: JSON.stringify(""),
		__APP_DEPLOY_APPNAME__: JSON.stringify(""),
		__APP_DEPLOY_CUSTOM_DOMAIN__: JSON.stringify(""),
		__STACK_AUTH_CONFIG__: JSON.stringify(undefined),
		__FIREBASE_CONFIG__: JSON.stringify(undefined),
	};

	return defines;
};

// https://vite.dev/config/
export default defineConfig({
	define: buildVariables(),
	plugins: [react(), splitVendorChunkPlugin(), tsConfigPaths(), injectHTML()],
	resolve: {
		alias: {
			"@/components/ui": path.resolve(__dirname, "./src/extensions/shadcn/components"),
			"@/hooks": path.resolve(__dirname, "./src/extensions/shadcn/hooks"),
			"@/lib": path.resolve(__dirname, "./src/lib"),
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
