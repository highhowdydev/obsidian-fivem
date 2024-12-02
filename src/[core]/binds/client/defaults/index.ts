import { createBind } from "..";
import type { Keybind } from "../../types";
import crouch from "./binds/crouch";

const defaultBinds: Keybind[] = [crouch];

export function loadDefaultBinds(): void {
	defaultBinds.forEach(bind => createBind(bind));
}
