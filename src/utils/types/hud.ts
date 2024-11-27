import { NotificationIconKey } from '@ui/utils/notifications';
import { IconType } from 'react-icons';

export type HudStore = {
    active: boolean;
    progress: ProgressType;
    interaction: InteractionType;
    money: MoneyType;
    status: StatusType;
    label: string;
    notifications: NotificationType[];
    compass: CompassType;
};

export type CompassType = {
    display: boolean;
    direction: number;
    previousDirection: number;
    disableEasing: boolean;
    waypoint: number | null;
    street: {
        left: string;
        right: string;
    };
};

export type MoneyType = {
    display: boolean;
    cash: number;
    changes: MoneyChangeType[];
};

export type NotificationType = {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    description: string;
    icon?: NotificationIconKey;
    duration: number;
    color: string;
};

export type StatusType = {
    display: boolean;
    isDead: boolean;
    inVehicle: boolean;
    vehicle: StatusVehicleType;
    bars: StatusBarType[];
};

export type StatusBarType = {
    type: string;
    value: number;
    color: string;
    icon: IconType;
    hidden?: boolean;
    hideBelow?: number;
    hideAbove?: number;
};

export type StatusVehicleType = {
    speed: number;
    rpm: number;
    fuel: number;
    seatbelt: boolean;
    engineFailure: boolean;
    currentVehicle: {
        name: string;
        category: string;
    };
};

export type MoneyChangeType = {
    id: number;
    action: 'add' | 'remove';
    amount: number;
};

export type InteractionType = {
    display: boolean;
    message: string;
    type: number;
};

export type ProgressType = {
    display: boolean;
    started: number;
    completed: number;
    label: string;
    progress: number;
};
