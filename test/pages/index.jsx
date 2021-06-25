import { WhiteWebSdk } from "white-web-sdk";
import { SceneCameraManger } from "../../dist";

const sdk = new WhiteWebSdk({
    appIdentifier: "-OePAJTDEequWX3apwJAEg/m5-NmP5HtHNyVA",
})

setTimeout(() => {
    joinRoom()
}, 500)

const joinRoom = () => {
    sdk.joinRoom({
        uuid: "ac530cf0d58611eb8d5c639e3db535ac",
        roomToken: "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZub25jZT0xNjI0NjA2MDA0MTc0MDAmcm9sZT0wJnNpZz0yZWVlMTNiNzBiN2EwZjdkNjUwZjZlZTJiNmI0ZTkzN2Q5YjQ3MmI1YjBmYzZmYmJmNjg4M2QxZWQwNWExM2ZiJnV1aWQ9YWM1MzBjZjBkNTg2MTFlYjhkNWM2MzllM2RiNTM1YWM"
    }).then(room => {
        room.bindHtmlElement(document.getElementById("whiteboard"));
        window.room = room;
        const manager = new SceneCameraManger(room, "test1");
        window.manager = manager;
        // const plugin = room.getInvisiblePlugin(IframeBridge.kind)
        // window.plugin = plugin;
        // if (!plugin) {
        //     IframeBridge.insert({ // 插件插入到白板中
        //         room,
        //         width: 1280,
        //         height: 720,
        //         url: "https://demo-h5.netless.group/dist2020/", // iframe url
        //         displaySceneDir: "/example"
        //     })
        // }
    })
}

window.joinRoom = joinRoom;

export default function() {
    return (
        <div id="whiteboard" style={{width: "100%", height: "100vh"}}></div>
    )
}
