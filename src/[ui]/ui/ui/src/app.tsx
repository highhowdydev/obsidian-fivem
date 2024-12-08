import { cloneElement, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { useNuiEvent } from "./hooks/useNuiEvent";
import store from "./store/store";
import { fetchNui, isEnvBrowser } from "./utils";
import getAppComponent from "./app-component";
import { cn } from "@utils/styles";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { baseTheme } from "./styles";
import Chat from "./apps/chat/chat";
import { AnimatePresence } from "motion/react";

export default function App() {
	const { application, init } = useSelector((state: RootState) => state.root);

	useNuiEvent("payload", data => {
		store.dispatch({
			type: data.action,
			payload: data,
		});
	});

	useEffect(() => {
		if (init || isEnvBrowser()) return;
		store.dispatch({ type: "root:initialize" });
		fetchNui("initializeNui");
	}, []);

	const visibleApp = getAppComponent(application);

	return (
		<MantineProvider forceColorScheme='dark' defaultColorScheme='dark' withCssVariables theme={baseTheme}>
			<div
				className={cn(
					"w-screen h-screen text-white antialiased",
					"absolute top-0 left-0 overflow-hidden",
					"bg-no-repeat bg-center bg-cover bg-[url('/static/gta-bg.png')]",
				)}
			>
				<AnimatePresence>
					{visibleApp ? cloneElement(visibleApp, { key: visibleApp.key || visibleApp.type }) : null}
				</AnimatePresence>
				<Chat />
			</div>
		</MantineProvider>
	);
}
