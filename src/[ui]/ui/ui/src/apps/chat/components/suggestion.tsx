import { ChatCommandSuggestion } from "@store/reducers/chat/types";
import { cn } from "@utils/styles";
import { useEffect, useState } from "react";

type SuggestionProps = {
	suggestion: ChatCommandSuggestion;
	userParams: string[];
};

export default function Suggestion({ suggestion, userParams }: SuggestionProps) {
	const [helpText, setHelpText] = useState<string | null>(null);
	const paramIndex = userParams.length - 1;

	return (
		<div key={suggestion.name} className='flex flex-col gap-1 bg-gray-base p-2 rounded-md text-xs'>
			<div className='flex gap-1 justify-start'>
				<span className='font-semibold'>{suggestion.name}</span>
				{suggestion.params.length > 0 &&
					suggestion.params.map((param, index) => {
						const isCurrentParam = paramIndex === index;
						if (isCurrentParam && helpText !== param.help) setHelpText(param.help);

						return (
							<div key={param.name} className='flex flex-col gap-1'>
								<span
									key={param.name}
									className={cn(
										"text-gray-400",
										(paramIndex === index) && "font-semibold text-gray-300",
									)}
								>
									[{param.name}]
								</span>
							</div>
						);
					})}
			</div>
			{helpText && <div className='text-gray-400'>{helpText}</div>}
		</div>
	);
}
