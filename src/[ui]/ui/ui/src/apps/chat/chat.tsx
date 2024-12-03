import { Input } from "@mantine/core";
import anims from "@styles/anims";
import { motion } from "motion/react";
import { useState } from "react";

const CHANNELS = ["ALL", "OOC", "ME", "DISPATCH", "STAFF"] as const;

export default function Chat() {
	const [channel, setChannel] = useState<typeof CHANNELS[number]>(CHANNELS[0]);

	const handleTabPress = (e: KeyboardEvent) => {
        e.preventDefault();
		const index = CHANNELS.indexOf(channel);
		const nextIndex = (index + 1) % CHANNELS.length;
        setChannel(CHANNELS[nextIndex]);
	};

	return (
		<motion.div onKeyDown={(e: any) => e.key === "Tab" && handleTabPress(e)} {...anims.slideDown} className='absolute top-[1vh] left-[1vh] w-[30rem] h-fit flex flex-col'>
			<div className='h-[20rem]'>
                <div className="p-3 rounded-sm shadow-sm bg-gray-800 border-b-2 w-fit border-red-500 text-sm">This is a message</div>
            </div>
			<div className='flex gap-1 items-center justify-center transition-all duration-300'>
				<div className='transition-transform duration-300 w-fit flex items-center justify-center text-sm uppercase font-medium bg-gray-800 p-3 rounded-sm'>
					{channel}
				</div>
				<Input className='w-full transition-all duration-300' placeholder='Press TAB to cycle channels' />
			</div>
		</motion.div>
	);
}
