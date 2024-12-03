// useKeyPress

import { useEffect, useState } from "react";

// Use:
// const [pressed, setPressed] = useKeyPress("a");
export default function useKeyPress(targetKey: string) {
	const [keyPressed, setKeyPressed] = useState(false);

	const downHandler = ({ key }: KeyboardEvent) => {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	};

	const upHandler = ({ key }: KeyboardEvent) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", downHandler);
		window.addEventListener("keyup", upHandler);

		return () => {
			window.removeEventListener("keydown", downHandler);
			window.removeEventListener("keyup", upHandler);
		};
	}, []);

	return keyPressed;
}
