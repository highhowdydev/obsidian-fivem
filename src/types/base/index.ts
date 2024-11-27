export type Character = {
    id: number;
    cid: number;
    steam: string;
    license: string;
    discord: string;
    ip: string;
    name: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    nationality: string;
}

export type CharacterPosition = {
    id: string;
    x: number;
    y: number;
    z: number;
    heading: number;
    characterCid: string;
    createdAt: Date;
    updatedAt: Date;
}
