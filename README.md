# scene-camera-manager

# 关于
插件的作用是根据白板 `scene` 的 `contextPath` 和用户自定义的 `userId` 作为 `key` 存储当前的 `cameraState`
当切换至其他 `scenePath` 时, 并且 `cameraState` 有了变化, 再切换回之前的 `scenePath` 可以恢复之前的 `cameraState`
来进行不同 `scene` 之间的 `cameraState` 隔离 
 
## example
```
const sceneCameraManager =  new SceneCameraManager(room, userId)
// userId 为用来标记用户的 ID，来保存状态
```
