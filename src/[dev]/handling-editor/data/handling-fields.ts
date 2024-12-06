export const HANDLING_FIELD_TYPES = ["float", "vector", "integer"] as const;

export type HandlingFieldType = (typeof HANDLING_FIELD_TYPES)[number];

export type HandlingField = {
	name: string;
	type: HandlingFieldType;
	description?: string;
};

export const HANDLING_FIELDS: HandlingField[] = [
	{
		name: "fMass",
		type: "float",
		description:
			"The weight of the vehicle. Values should be given in kg. Used when the vehicle collides with another vehicle or a non-static object.",
	},
	{
		name: "fInitialDragCoeff",
		type: "float",
		description: "Set the drag coefficient of the vehicle. Increase to simulate aerodynamic drag.",
	},
	{
		name: "fDownforceModifier",
		type: "float",
	},
	{
		name: "fPercentSubmerged",
		type: "float",
		description: "The percentage of the vehicle's 'floating height' after it falls into the water, before sinking.",
	},
	{
		name: "vecCentreOfMassOffset",
		type: "vector",
		description: "The offset of the vehicle's center of mass from the origin of the vehicle model.",
	},
	{
		name: "vecInteriaMultiplier",
		type: "vector",
	},
	{
		name: "fDriveBiasFront",
		type: "float",
		description:
			"Used to determine whether a vehicle is fron, read or four wheel drive. 0.0 = rear, 1.0 = front, inbetween = four wheel drive.",
	},
	{
		name: "nInitialDriveGears",
		type: "integer",
		description:
			"Determines how many forward speeds/gearss a vehicle's transmission contains. Must be between 1 and 6.",
	},
	{
		name: "fInitialDriveForce",
		type: "float",
		description: "Modifies the game's calculation of drive force (from the output of the transmission).",
	},
	{
		name: "fDriveInertia",
		type: "float",
		description:
			"Describes how fast an engine will rev. Values 0.01 - 2.0. Default value is 1.0. Bigger values = quicker redline.",
	},
	{
		name: "fClutchChangeRateScaleUpShift",
		type: "float",
		description: "Clutch speed multiplier for upshifts. Higher values = faster shifts",
	},
	{
		name: "fClutchChangeRateScaleDownShift",
		type: "float",
		description: "Clutch speed multiplier for downshifts. Higher values = faster shifts",
	},
	{
		name: "fInitialDriveMaxFlatVel",
		type: "float",
		description:
			"Determines the vehicle speed at redline in the top gear. Setting this value DOES NOT guarantee the vehicle will reach the given speed. Multiply the number by 0.82 to get the speed in mph.",
	},
	{
		name: "fBrakeForce",
		type: "float",
		description: "Multiplies the game's calculation of deceleration. Bigger numbers = harder braking. Default 1.0",
	},
	{
		name: "fBrakeBiasFront",
		type: "float",
		description:
			"Controls the distribution of braking force between the front and rear axis. 0.0 = rear, 1.0 = front, 0.5 = both",
	},
	{
		name: "fHandBrakeForce",
		type: "float",
		description: "Braking power of the handbrake. Bigger values = harder braking.",
	},
	{
		name: "fSteeringLock",
		type: "float",
		description:
			"Multiplies the game's calculation of the angle of what the steering wheel will turn while at full turn. Steering lock is directly related to over/under-steer. 0.1-0.2 = long wheelbase. > 0.75 will turn extremely fast.",
	},
	{
		name: "fTractionCurveMax",
		type: "float",
		description: "Cornering grip of the vehicle as a multiplier of the tire surface friction",
	},
	{
		name: "fTractionCurveMin",
		type: "float",
		description: "Accelerating/braking grip of the vehicle as a multiplier of the tire surface friction",
	},
	{
		name: "fTractionCurveLateral",
		type: "float",
		description: "Shape of the lateral traction curve.",
	},
	{
		name: "fTractionSpringDeltaMax",
		type: "float",
		description: "Determines at what distance above the ground the vehicle will lose traction",
	},
	{
		name: "fLowSpeedTractionLossMult",
		type: "float",
		description:
			"How much traction is reduced at low speeds. 0.0 = normal traction. Decreasing will cause less burnout and less sliding. Higher will cause more burnout",
	},
	{
		name: "fCamberStiffnesss",
		type: "float",
		description:
			"Modifies the grip of the vehicle when drifting. > 0 = vehicle slides on same angle you're drifting. < 0 vehicle oversteers. ",
	},
	{
		name: "fTractionBiasFront",
		type: "float",
		description:
			"Determines the distribution of traction from front to rear. 0.1 = read, 0.99 = front, 0.5 = both. 0.0 & 1.0 = no traction.",
	},
	{
		name: "fSuspensionForce",
		type: "float",
		description:
			"Affects how strong suspension is. 1 / (Force * Wheels) = Lower limit for zero force at full extension.",
	},
	{
		name: "fSuspensionCompDamp",
		type: "float",
		description: "Damping during strut compression. Bigger values = stiffer.",
	},
	{
		name: "fSuspensionReboundDamp",
		type: "float",
		description: "Damping during strut rebound.",
	},
	{
		name: "fSuspensionUpperLimit",
		type: "float",
		description: "Visual limit of how far the wheels can move up / down from original position",
	},
	{
		name: "fSuspensionLowerLimit",
		type: "float",
		description: "Visual limit of how far the wheels can move up / down from original position",
	},
	{
		name: "fSuspensionRaise",
		type: "float",
		description: "The amount that the suspension raises the body off the wheels",
	},
	{
		name: "fSuspensionBiasFront",
		type: "float",
		description:
			"Determines which suspension is stronger, front or rear. If value is above 0.5 then front is stiffer, below rear is stiffer.",
	},
	{
		name: "fAntiRollBarForce",
		type: "float",
		description: "Larger numbers = less body roll.",
	},
	{
		name: "fAntiRollBArBiasFront",
		type: "float",
		description: "The bias between front and rear for the anti-roll bar. 0 = front, 1 = rear",
	},
	{
		name: "fRollCentreHeightFront",
		type: "float",
		description: "Values (Recommended -0.15 to 0.15) Larger values = less rollovers.",
	},
	{
		name: "fRollCentreHeightRear",
		type: "float",
		description:
			"Modifies the weight transmission during an acceleration between the front and rear. High positive value can make vehicles do wheelies. Recommended (-0.15 - 0.15). Larger values = less rollovers",
	},
	{
		name: "fCollisionDamageMult",
		type: "float",
		description: "Multiplies the game's calculation of damage to the vehicle by collision",
	},
	{
		name: "fWeaponDamageMult",
		type: "float",
		description: "Multiplies the game's calculation of damage to the vehicle by weapons",
	},
	{
		name: "fDeformationDamageMult",
		type: "float",
		description: "Multiplies the game's calculation of deformation damage to the vehicle",
	},
	{
		name: "fEngineDamageMult",
		type: "float",
		description:
			"Multiplies the game's calculation of engine damage to the vehicle, causing explosions or engine failure.",
	},
	{
		name: "fPetrolTankVolume",
		type: "float",
		description: "The amount of petrol that will leak after damaging a vehicle's tank",
	},
	{
		name: "fOilVolume",
		type: "float",
		description: "Amount of oil",
	},
	{
		name: "fSeatOffsetDistX",
		type: "float",
		description: "Value: Driver > passenger",
	},
	{
		name: "fSeatOffsetDistY",
		type: "float",
		description: "Value: Trunk > hood",
	},
	{
		name: "fSeatOffsetDistZ",
		type: "float",
		description: "Value: Undercarriage > roof",
	},
	{
		name: "nMonetaryValue",
		type: "integer",
	},
];
