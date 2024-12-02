import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { CharacterState } from "@store/reducers/characters/types";
import { Button, TextInput, Select, Group, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useSelector } from "react-redux";
import { RootState, store } from "@store/index";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { fetchNui } from "@utils/index";
import nationalities from "../data/nationalities.json";
import { motion } from "motion/react";
import anims from "@styles/anims";

dayjs.extend(customParseFormat);
const DATE_FORMAT = "YYYY-MM-DD";

type NewCharacterKey = keyof CharacterState["newCharacter"];

function getMinMaxDates() {
	const minDate = dayjs().subtract(100, "years");
	const maxDate = dayjs().subtract(18, "years");

	return {
		maxDate,
		minDate,
	};
}

const GENDERS = ["male", "female"] as const;

export default function NewCharacter() {
	const state = useSelector((state: RootState) => state.characters);
	const { maxDate, minDate } = getMinMaxDates();

	const form = useForm({
		mode: "controlled",
		initialValues: {
			firstName: "",
			lastName: "",
			gender: "Male",
			dob: dayjs(maxDate),
			nationality: "American",
		},
		validate: {
			firstName: value => (value?.length > 0 ? null : "First name is required"),
			lastName: value => (value?.length > 0 ? null : "Last name is required"),
			gender: value => (value?.length > 0 ? null : "Gender is required"),
			nationality: value => (value?.length > 0 ? null : "Nationality is required"),
			dob: value => (value?.isValid() ? null : "Date of birth is required"),
		},
	});

	const [dob, setDob] = useState<Date>(maxDate.toDate());

	const handleCreateCharacter = async (values: typeof form.values) => {
		const character = {
			...values,
			dob: dayjs(dob).format(DATE_FORMAT),
		};

		store.dispatch({
			type: "characters/setBusy",
			payload: {
				busy: true,
			},
		});

		const result: any = await fetchNui("characters/createCharacter", character);

		if (!result.success) {
			store.dispatch({
				type: "characters/setBusy",
				payload: {
					busy: false,
				},
			});

			return;
		}

		store.dispatch({
			type: "characters/createdCharacter",
			payload: {
				characters: result.characters,
			},
		});
	};

	return (
		<motion.div
			{...anims.scale}
			className='w-full h-full flex items-center justify-center'
		>
			<form
				onSubmit={form.onSubmit(handleCreateCharacter, (validationErrors, values, event) => {
					console.log(validationErrors, values, event);
				})}
				className='bg-gray-base w-[35vh] h-fit p-4 shadow-md rounded-md border border-gray-highlight/25 flex flex-col gap-[1vh]'
			>
				<div className='leading-tight mb-[0.1vh] text-center'>
					<h1 className='text-xl font-bold'>Create New Character</h1>
					<p className='text-white/75 text-sm'>Fill out the form below to create a new character. </p>
					<p className='text-xs text-white/50 mt-[.2vh]'>
						Yes this form is ugly, ill fix it later. Needed something...
					</p>
				</div>
				<Stack gap='sm'>
					<TextInput key={form.key("firstName")} label='First Name' {...form.getInputProps("firstName")} />
					<TextInput key={form.key("lastName")} label='Last Name' {...form.getInputProps("lastName")} />
					<Select
						key={form.key("nationality")}
						label='Nationality'
						{...form.getInputProps("nationality")}
						data={nationalities.map(nationality => nationality)}
					/>
					<DateInput
						label='Date of Birth'
						value={dob}
						// @ts-ignore
						onChange={setDob}
						minDate={minDate.toDate()}
						maxDate={maxDate.toDate()}
					/>
					<Select
						key={form.key("gender")}
						label='Gender'
						{...form.getInputProps("gender")}
						data={GENDERS.map(gender => gender.charAt(0).toUpperCase() + gender.slice(1))}
					/>
					<Group grow wrap='nowrap' gap='xs'>
						<Button
							type='submit'
							disabled={state.isBusy}
							fullWidth
							// onClick={handleCreateCharacter}
						>
							Create
						</Button>
						<Button
							color='red'
							fullWidth
							onClick={() => {
								store.dispatch({
									type: "characters/resetNewCharacter",
								});

								store.dispatch({
									type: "characters/setCreatingCharacter",
									payload: false,
								});
							}}
							disabled={state.isBusy}
						>
							Cancel
						</Button>
					</Group>
				</Stack>
			</form>
		</motion.div>
	);
}
