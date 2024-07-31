import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { PixelRatio, StyleSheet, View, Button } from "react-native";

const source =
  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

const videoSources = [
  {
    label: "Auto",
    value: source,
  },
  {
    label: "1080p",
    value:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_video_1080_4800000.m3u8",
  },
  {
    label: "720p",
    value:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_video_720_2400000.m3u8",
  },
  {
    label: "540p",
    value:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_video_540_1200000.m3u8",
  },
  {
    label: "360p",
    value:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_video_360_800000.m3u8",
  },
  {
    label: "270p",
    value:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_video_270_400000.m3u8",
  },
  {
    label: "180p",
    value:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_video_180_250000.m3u8",
  },
];

export default function VideoScreen() {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.play();
  });

  function onChangeVideoQuality(source: string) {
    const ct = player.currentTime;
    player.replace(source);
    player.currentTime = ct;
  }

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <View style={styles.contentContainer}>
      <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
        />
        {videoSources.map((x) => (
          <Button
            title={x.label}
            onPress={() => onChangeVideoQuality(x.value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: 'wrap',
    padding: 10,
  },
});
