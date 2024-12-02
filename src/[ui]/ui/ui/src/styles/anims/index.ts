import { fade } from "./list/fade";
import { slideUp, slideLeft, slideRight, slideDown } from "./slide/slide";
import { scale } from "./scale/scale";

const anims = {
	fade,
	slideUp,
	slideDown,
	slideLeft,
	slideRight,
	scale,
} as const;

export default anims;
