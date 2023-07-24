import TopTimeBox from "../TopTimeBox";
import TrackPlayer from "../TrackPlayer";
import { TrackPlayerProps } from "../../../types/trackType";
import "./style.scss";

function TrackSpace({ bpm = 0, time, audioTracks, setTime, onRecord }: TrackPlayerProps) {
  return (
    <div id="track-space">
      <TopTimeBox bpm={bpm} />
      <TrackPlayer bpm={bpm} time={time} audioTracks={audioTracks} setTime={setTime} onRecord={onRecord} />
    </div>
  );
}

export default TrackSpace;
