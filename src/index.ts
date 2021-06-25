import { AnimationMode, CameraState, Room, RoomState } from "white-web-sdk";

export type SceneCameraState = Pick<CameraState, "scale" | "centerX" | "centerY">;

export class SceneCameraManager {
    private room: Room;
    private prefix: string = "sceneCamera";
    private userId: string;

    constructor(room: Room, userId: string) {
        this.room = room;
        this.userId = userId;
        room.callbacks.on("onRoomStateChanged", this.roomStateChangeListener);
        const contextPath = this.room.state.sceneState.contextPath;
        const sceneCameraState = this.getGlobalSceneCameraState(this.room.state.globalState, contextPath);
        if (sceneCameraState) {
           this.room.moveCamera({ ...sceneCameraState, animationMode: AnimationMode.Immediately });
        }
    }

    private roomStateChangeListener = (state: Partial<RoomState>) => {
        if (state.cameraState) {
            const contextPath = this.room.state.sceneState.contextPath;
            this.room.setGlobalState({
                [`${this.prefix}-${contextPath}-${this.userId}`]: this.getSceneCameraState(state.cameraState),
            })
        }
        if (state.sceneState) {
            const contextPath = state.sceneState.contextPath;
            const sceneCameraState = this.getGlobalSceneCameraState(this.room.state.globalState, contextPath);
            if (sceneCameraState) {
                const currentState = this.getSceneCameraState(this.room.state.cameraState);
                if (JSON.stringify(sceneCameraState) !== JSON.stringify(currentState)) {
                    this.room.moveCamera({
                        scale: sceneCameraState.scale,
                        centerX: sceneCameraState.centerX,
                        centerY: sceneCameraState.centerY,
                        animationMode: AnimationMode.Immediately
                    })
                }
            } else {
                this.room.moveCamera({ scale: 1, centerX: 0, centerY: 0, animationMode: AnimationMode.Immediately });
            }
        }
    }

    private getSceneCameraState(state: CameraState): SceneCameraState {
        return {
            scale: state.scale,
            centerX: state.centerX,
            centerY: state.centerY,
        };
    }

    private getGlobalSceneCameraState(globalState: any, contextPath: string): SceneCameraState | undefined {
        const path = `${this.prefix}-${contextPath}-${this.userId}`;
        return globalState[path];
    }

    public uninstall(): void {
        if (this.room) {
            this.room.callbacks.off("onRoomStateChanged", this.roomStateChangeListener);
        }
    }
}
