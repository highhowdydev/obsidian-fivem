export type SpawnData = {
    x: number;
    y: number;
    z: number;
    heading: number;
    label: string;
    icon: string;
    onSelect: (closeApps: Function) => Promise<void>;
}

export type CreateCharacter = {
    dob: string;
    firstName: string;
    lastName: string;
    gender: "Male" | "Female",
    nationality: string;
}
