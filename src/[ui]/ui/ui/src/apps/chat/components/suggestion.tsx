import { ChatCommandSuggestion } from "@store/reducers/chat/types";
import { cn } from "@utils/styles";

type SuggestionProps = {
	suggestion: ChatCommandSuggestion;
	userParams: string[];
};

export default function Suggestion({ suggestion, userParams }: SuggestionProps) {
	return (
		<div key={suggestion.name} className='flex flex-col gap-1 bg-gray-base p-2 rounded-md text-xs'>
			<div className='flex items-center gap-1'>
				<span className='font-semibold'>{suggestion.name}</span>
				{suggestion.params.length > 0 &&
					suggestion.params.map((param, index) => (
						<span
							key={param.name}
							className={cn(
								"text-gray-400",
								index === userParams.length - 1 && "font-semibold text-gray-300",
							)}
						>
							[{param.name}]
						</span>
					))}
			</div>
			{suggestion.params.map(param => (
				<div key={param.name} className='flex items-center gap-1'>
					<span className='text-gray-400'>{param.name}</span>
					<span className='text-gray-400'>{param.help}</span>
				</div>
			))}
		</div>
	);
}
