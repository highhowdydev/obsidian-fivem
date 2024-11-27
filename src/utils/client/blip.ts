import { Blip as BlipType } from "@utils/types/blip";

export class Blip {
	public blip: number | null;

	constructor(x: number, y: number, z: number, blip?: BlipType) {
		this.blip = AddBlipForCoord(x, y, z);

		if (blip) {
			if (blip.sprite) this.setSprite(blip.sprite);
			if (blip.color) this.setColor(blip.color);
			if (blip.label) this.setLabel(blip.label);
			if (blip.display) this.setDisplay(blip.display);
			if (blip.flashes) this.setFlashes(blip.flashes);
			if (blip.scale) this.setScale(blip.scale);
			if (blip.alpha) this.setAlpha(blip.alpha);
			if (blip.route) this.setRoute(blip.route);
			if (blip.routeColor) this.setRouteColor(blip.routeColor);
		}
	}

	public setSprite(sprite: number) {
        if (!this.blip) return;
		SetBlipSprite(this.blip, sprite);
	}

	public setAsShortRange(value: boolean) {
        if (!this.blip) return;
		SetBlipAsShortRange(this.blip, value);
	}

	public setColor(color: number) {
        if (!this.blip) return;
		SetBlipColour(this.blip, color);
	}

	public setLabel(label: string) {
        if (!this.blip) return;
		BeginTextCommandSetBlipName("STRING");
		AddTextComponentString(label);
		EndTextCommandSetBlipName(this.blip);
	}

	public setDisplay(display: number) {
        if (!this.blip) return;
		SetBlipDisplay(this.blip, display);
	}

	public setFlashes(flashes: boolean) {
        if (!this.blip) return;
		SetBlipFlashes(this.blip, flashes);
	}

	public setScale(scale: number) {
        if (!this.blip) return;
		SetBlipScale(this.blip, scale);
	}

	public setAlpha(alpha: number) {
        if (!this.blip) return;
		SetBlipAlpha(this.blip, alpha);
	}

	public setRoute(route: boolean) {
        if (!this.blip) return;
		SetBlipRoute(this.blip, route);
	}

	public setRouteColor(color: number) {
        if (!this.blip) return;
		SetBlipRouteColour(this.blip, color);
	}

	public setCoords(x: number, y: number, z: number) {
        if (!this.blip) return;
		SetBlipCoords(this.blip, x, y, z);
	}

	public setHighDetail(value: boolean) {
        if (!this.blip) return;
		SetBlipHighDetail(this.blip, value);
	}

	public delete() {
        if (!this.blip) return;
		RemoveBlip(this.blip);
		this.blip = null;
	}
}
