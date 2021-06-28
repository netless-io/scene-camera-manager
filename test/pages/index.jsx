import { WhiteWebSdk } from "white-web-sdk";
import { SceneCameraManger } from "../../dist";

const sdk = new WhiteWebSdk({
    appIdentifier: "appid",
})

setTimeout(() => {
    joinRoom()
}, 500)

const joinRoom = () => {
    sdk.joinRoom({
        uuid: "room uuid",
        roomToken: "room Token"
    }).then(room => {
        room.bindHtmlElement(document.getElementById("whiteboard"));
        window.room = room;
        const manager = new SceneCameraManger(room, "test1");
        window.manager = manager;
    })
}

window.joinRoom = joinRoom;

export default function() {
    return (
        <div id="whiteboard" style={{width: "100%", height: "100vh"}}></div>
    )
}
