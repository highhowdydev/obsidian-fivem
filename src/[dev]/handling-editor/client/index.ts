import Vehicle from "./classes/vehicle";

RegisterCommand("handling", () => {
    const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    if (!vehicle) return;
    const handling = new Vehicle(vehicle);
    const data = handling.GetVehicleHandlingData();
    console.log(data);
}, false);
