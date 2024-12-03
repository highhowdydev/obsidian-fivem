import { Delay } from "@/utils/shared";

async () => {
	await Delay(5000);
	SetWeaponDamageModifier(GetHashKey("WEAPON_UNARMED"), 0.65);
	SetWeaponDamageModifier(GetHashKey("WEAPON_NIGHTSTICK"), 0.3);
	SetWeaponDamageModifier(GetHashKey("WEAPON_BREAD"), 0.3);
	SetWeaponDamageModifier(GetHashKey("WEAPON_SNOWBALL"), 0.001);
	SetWeaponDamageModifier(GetHashKey("SNOWBALL"), 0.001);
	SetWeaponDamageModifier(GetHashKey("WEAPON_HAMMER"), 0.25);
	SetWeaponDamageModifier(GetHashKey("WEAPON_GOLFCLUB"), 0.25);
	SetWeaponDamageModifier(GetHashKey("WEAPON_CROWBAR"), 0.25);
	SetWeaponDamageModifier(GetHashKey("WEAPON_DAGGER"), 0.25);
	SetWeaponDamageModifier(GetHashKey("WEAPON_POOLCUE"), 0.25);
	SetWeaponDamageModifier(GetHashKey("WEAPON_WRENCH"), 0.25);
	SetWeaponDamageModifier(GetHashKey("WEAPON_FLASHLIGHT"), 0.25);
	SetWeaponDamageModifier(GetHashKey("WEAPON_KNUCKLE"), 0.25);
	SetWeaponDamageModifier(GetHashKey("WEAPON_SNIPERRIFLE"), 0.17);
};
