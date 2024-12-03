local isInVehicle = false
local isEnteringVehicle = false
local currentVehicle = false
local currentSeat = false

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		local ped = PlayerPedId()

		if IsPedInAnyVehicle(ped, false) then
			local vehicle = GetVehiclePedIsIn(ped, false)
			local seat = GetPedsCurrentSeat(ped, vehicle)

			if not isInVehicle then
				isInVehicle = true
				currentSeat = seat
				currentVehicle = vehicle
				TriggerEvent('baseevents:enteredVehicle', currentVehicle, currentSeat)
			else
				if currentSeat ~= seat then
					currentSeat = seat
					TriggerEvent('baseevents:changedSeat', currentVehicle, currentSeat)
				end

				if currentVehicle ~= vehicle then
					currentVehicle = vehicle
					TriggerEvent('baseevents:enteredVehicle', currentVehicle, currentSeat)
				end
			end
		else
			if isInVehicle then
				isInVehicle = false
				TriggerEvent('baseevents:leftVehicle', currentVehicle, currentSeat)
				currentVehicle = false
				currentSeat = false
			end
		end
		Citizen.Wait(50)
	end
end)

function GetPedsCurrentSeat(ped, vehicle)
	local maxSeats = GetVehicleModelNumberOfSeats(GetEntityModel(vehicle))

	for i = -1, maxSeats - 1 do
		if GetPedInVehicleSeat(vehicle, i) == ped then
			return i
		end
	end

	return -2
end

function GetPedVehicleSeat(ped)
    local vehicle = GetVehiclePedIsIn(ped, false)
    for i=-2,GetVehicleMaxNumberOfPassengers(vehicle) do
        if(GetPedInVehicleSeat(vehicle, i) == ped) then return i end
    end
    return -2
end


-- local isInVehicle = false
-- local isEnteringVehicle = false
-- local currentVehicle = 0
-- local currentSeat = 0

-- local CurVehicle, PrevVehicle, CurSeat, PrevSeat, EngineOn, InVehicle, Speeding, EnteringVehicle = nil
-- local CurBodyHealth, PrevBodyHealth, CurSpeed, PreviousSpeed, CurVelocity, PrevVelocity

-- Citizen.CreateThread(function()
-- 	while true do
-- 		if not InVehicle then
-- 			local ped = PlayerPedId()

-- 			local veh = GetVehiclePedIsIn(ped)
-- 			local enteringVeh = veh == 0 and GetVehiclePedIsTryingToEnter(ped) or 0

-- 			if enteringVeh ~= 0 and not EnteringVeh then
-- 				EnteringVehicle = true

-- 				-- Vehicle, Seat, Vehicle Class, Vehicle Model
-- 				TriggerEvent('baseevents:enter-vehicle', enteringVeh, GetSeatPedIsTryingToEnter(ped), GetVehicleClass(enteringVeh), GetEntityModel(enteringVeh))
-- 				-- Vehicle Network ID, Seat, Vehicle Class, Vehicle Model
-- 				TriggerServerEvent('baseevents:enter-vehicle', NetworkGetNetworkIdFromEntity(enteringVeh), GetSeatPedIsTryingToEnter(ped), GetVehicleClass(enteringVeh), GetEntityModel(enteringVeh))
-- 			elseif EnteringVehicle and enteringVeh == 0 and vehicle == 0 then
-- 				EnteringVehicle = false
				
-- 			end
-- 		elseif InVehicle then

-- 		end

		
-- 		Citizen.Wait(100)
-- 	end
-- end)

-- function GetPedVehicleSeat(ped)
--     local vehicle = GetVehiclePedIsIn(ped, false)
--     for i=-2,GetVehicleMaxNumberOfPassengers(vehicle) do
--         if(GetPedInVehicleSeat(vehicle, i) == ped) then return i end
--     end
--     return -2
-- end
