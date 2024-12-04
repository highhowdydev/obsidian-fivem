import { RootState } from "@store/index";
import { cn } from "@utils/styles";
import { useSelector } from "react-redux";
import Suggestion from "./suggestion";

type SuggestionsProps = {
	command: string;
	fullText: string;
};

export default function Suggestions({ command, fullText }: SuggestionsProps) {
	const { suggestions } = useSelector((state: RootState) => state.chat);
	const filteredSuggestions = suggestions.filter(
		suggestion => suggestion.name.startsWith(command) && command.length > 1,
	);
	const userParams = fullText.split(" ").slice(1);

	return (
		<div className='flex flex-col gap-2'>
			{filteredSuggestions.map(suggestion => (
				<Suggestion key={suggestion.name} suggestion={suggestion} userParams={userParams} />
			))}
		</div>
	);
}
