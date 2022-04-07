local ws,err = http.websocket("ws://localhost:8080")

if ws then
    ws.send("Hello")
    local ans = ws.receive()
    print(ans)
else
    print(err)
end