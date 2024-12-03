import { CharacterSelect } from "./modules/character-select";

new CharacterSelect().awaitSession();

emitNet("testlol", (text: string) => console.log(text));
