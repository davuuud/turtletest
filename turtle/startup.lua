local ws,err = http.websocket("ws://localhost:8080")

if ws then
    ws.send("{ \"text\": \"Ich bin turtle\" }")
    local ans = ws.receive()
    print(ans)
else
    print(err)
end