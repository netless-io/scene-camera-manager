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
        const { contextPath, index } = this.room.state.sceneState;
        const sceneCameraState = this.getGlobalSceneCameraState(this.room.state.globalState, contextPath, index);
        if (sceneCameraState) {
            this.moveCamera(sceneCameraState.scale, sceneCameraState.centerX, sceneCameraState.centerY);
        }
    }

    private roomStateChangeListener = (state: Partial<RoomState>) => {
        if (state.cameraState) {
            const { contextPath, index } = this.room.state.sceneState;
            this.room.setGlobalState({
                [`${this.prefix}-${contextPath}-${index}-${this.userId}`]: this.getSceneCameraState(state.cameraState),
            });
        }
        if (state.sceneState) {
            const { contextPath, index } = state.sceneState;
            const sceneCameraState = this.getGlobalSceneCameraState(this.room.state.globalState, contextPath, index);
            if (sceneCameraState) {
                const currentState = this.getSceneCameraState(this.room.state.cameraState);
                if (JSON.stringify(sceneCameraState) !== JSON.stringify(currentState)) {
                    this.moveCamera(sceneCameraState.scale, sceneCameraState.centerX, sceneCameraState.centerY);
                }
            } else {
                this.moveCamera(1, 0, 0);
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

    private getGlobalSceneCameraState(globalState: any, contextPath: string, index: number): SceneCameraState | undefined {
        const path = `${this.prefix}-${contextPath}-${index}-${this.userId}`;
        return globalState[path];
    }

    private moveCamera(scale: number, centerX: number, centerY: number): void {
        this.room.moveCamera({
            scale, centerX, centerY,
            animationMode: AnimationMode.Immediately
        });
    }

    public uninstall(): void {
        if (this.room) {
            this.room.callbacks.off("onRoomStateChanged", this.roomStateChangeListener);
        }
    }
}
