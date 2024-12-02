export type Keybind = {
    key: string;
    label: string;
    defaultKey: string;
    allowNui: boolean;
    keydown: () => void;
    keyup?: () => void | undefined;
};
