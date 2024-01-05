import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camRef = useRef(null);
  const requestPermissionCamAsync = async () => {
    return await Camera.requestCameraPermissionsAsync();
  };
  const requestPermissionAssetAsync = async () => {
    return await MediaLibrary.requestPermissionsAsync();
  };

  useEffect(() => {
    (async () => {
      await requestPermissionAssetAsync();
      await requestPermissionCamAsync();
    })();
  }, []);

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function camGetPhoto() {
    if (camRef && camRef.current) {
      const data = await camRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(data.uri);
      MediaLibrary.createAlbumAsync("Photos", asset);
      console.log(asset);
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef}>
        <View style={styles.mainView}>
          <TouchableOpacity onPress={toggleCameraType} style={styles.flipAreaLeft}>
            <Text style={styles.flipText}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={camGetPhoto} style={styles.flipAreaRigth}>
            <Text style={styles.flipText}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  flipAreaLeft: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  flipAreaRigth: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  flipText: {
    fontSize: 20,
    marginBottom: 15,
    color: "#FFFFFF",
  },
});
