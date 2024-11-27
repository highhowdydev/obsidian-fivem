import type { CraftingItem } from 'src/obsidian-old/server/database';
import { InventoryItem, ItemKey, InventorySlot } from '@ui/types';

export type {
    ItemVariantType,
    ItemListType,
    ItemKey,
    ItemListItemType,
    AddItemType,
} from '@ui/store/reducers/inventory/types';

export type InventoryTypes = 'player' | 'storage' | 'shop';

export type PlayerInventory = {
    health: number;
    armour: number;
    sourceInventory: InventoryType;
    bagInventory: InventoryType;
    targetInventories: InventoryType[];
    craftItems: CraftingListItem[];
    craftQueue: CraftingItem[];
};

export type CraftingListItem = {
    itemId: ItemKey;
    requirments: CraftingListItemRequirement[];
};

export type CraftingListItemRequirement = {
    itemId: ItemKey;
    amount: number;
};

export type InventoryType = {
    type: InventoryTypes;
    inventory: string;
    slots: number;
    weight: number;
    label: string;
    items?: InventoryItem[] | InventorySlot[];
};

export type ItemType = {
    itemId: ItemKey;
    slot: string;
    inventory: string;
    quality: string;
    data: any[];
    createdAt?: Date;
};

export type SlotType = {
    slot: string;
    itemId: ItemKey;
    data: { [key: string]: any };
    amount?: number;
    price?: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ShopItemType = {
    itemId: ItemKey;
    price: number;
    purchaseTime?: number;
};

export type ShopType = {
    id: string;
    label: string;
    blip?: number;
    blipScale?: number;
    ped?: string;
    objects?: number[];
    locations: {
        x: number;
        y: number;
        z: number;
        h: number;
    }[];
    items: ShopItemType[];
};
