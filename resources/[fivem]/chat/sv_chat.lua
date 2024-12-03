RegisterServerEvent('chat:init')
RegisterServerEvent('chat:addTemplate')
RegisterServerEvent('chat:addMessage')
RegisterServerEvent('chat:addSuggestion')
RegisterServerEvent('chat:removeSuggestion')
RegisterServerEvent('_chat:messageEntered')
RegisterServerEvent('chat:clear')
RegisterServerEvent('__cfx_internal:commandFallback')

AddEventHandler('_chat:messageEntered', function(author, color, message)
    if not message or not author then
        return
    end

    TriggerEvent('chatMessage', source, author, message)

    if not WasEventCanceled() then
        --TriggerClientEvent('chatMessage', -1, 'OOC | '..author,  false, message)
    end
end)

RegisterCommand('ooc', function(source, args)
    local src = source
    local player = exports['obsidian']:fetchPlayer(src)
    if not player then return end
    local name = player.data.character.firstName .. ' ' .. player.data.character.lastName
    local message = table.concat(args, ' ')
    TriggerClientEvent('chatMessage', -1, 'OOC | '..name,  false, message)
end, false)

RegisterCommand('looc', function(source, args)
    local src = source
    local coords = GetEntityCoords(GetPlayerPed(src))
    local player = exports.obsidian:fetchPlayer(src)
    if not player then return end
    local name = player.data.character.firstName .. ' ' .. player.data.character.lastName
    local message = table.concat(args, ' ')

    for _, id in ipairs(GetPlayers()) do
        local targetCoords = GetEntityCoords(GetPlayerPed(id))
        if #(coords - targetCoords) < 20.0 then
            TriggerClientEvent('chatMessage', id, 'Local OOC | '..name,  false, message)
        end
    end
end, false)

AddEventHandler('__cfx_internal:commandFallback', function(command)
    local name = GetPlayerName(source)

    TriggerEvent('chatMessage', source, name, '/' .. command)

    if not WasEventCanceled() then
        -- TriggerClientEvent('chatMessage', -1, name, false, '/' .. command) 
    end

    CancelEvent()
end)

-- player join messages
AddEventHandler('chat:init', function()
    --TriggerClientEvent('chatMessage', -1, '', { 255, 255, 255 }, '^2* ' .. GetPlayerName(source) .. ' joined.')
end)

AddEventHandler('playerDropped', function(reason)
    --TriggerClientEvent('chatMessage', -1, '', { 255, 255, 255 }, '^2* ' .. GetPlayerName(source) ..' left (' .. reason .. ')')
end)
-- command suggestions for clients
local function refreshCommands(player)
    if GetRegisteredCommands then
        local registeredCommands = GetRegisteredCommands()

        local suggestions = {}

        for _, command in ipairs(registeredCommands) do
            if IsPlayerAceAllowed(player, ('command.%s'):format(command.name)) then
                table.insert(suggestions, {
                    name = '/' .. command.name,
                    help = ''
                })
            end
        end

        TriggerClientEvent('chat:addSuggestions', player, suggestions)
    end
end

AddEventHandler('chat:init', function()
    refreshCommands(source)
end)

AddEventHandler('onServerResourceStart', function(resName)
    Wait(500)

    for _, player in ipairs(GetPlayers()) do
        refreshCommands(player)
    end
end)
