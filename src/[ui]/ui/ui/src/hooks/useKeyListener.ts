import { useEffect, useRef } from "react";
import { noop } from "../utils";

type FrameVisibleSetter = (bool: boolean) => void;

export const useKeyListener = (targetKey: KeyboardEvent["key"], visibleSetter: FrameVisibleSetter) => {
	const setterRef = useRef<FrameVisibleSetter>(noop);

	useEffect(() => {
		setterRef.current = visibleSetter;
	}, [visibleSetter]);

	useEffect(() => {
		const keyHandler = (e: KeyboardEvent) => {
			if (e.code === targetKey) {
				setterRef.current(false);
			}
		};

		window.addEventListener("keydown", keyHandler);

		return () => window.removeEventListener("keydown", keyHandler);
	}, [targetKey]);
};
