import { Dispatch, FormEventHandler, MouseEventHandler, SetStateAction } from "react";

import { Track } from "types/projectType";
import Button from "components/atoms/Button";
import Bpm from "components/blocks/BpmBar";
import RecordDevice from "../RecordDevice";
import TrackTag from "../TrackTag";
import "./style.scss";
import TrackSpace from "../TrackSpace";
import UnderPlayBar from "../UnderPlayBar";

interface ProjectSettingProps {
  onDeviceClick: (deviceId: string, deviceName: string) => void;
  onTrackClick: MouseEventHandler;
  onBtnClick: MouseEventHandler;
  onBpmInput: FormEventHandler;
  onTitleInput: FormEventHandler;
  bpmState: number;
  selectedTrack: Track;
  tracks: Track[];
  inputTextDevice: string;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

function ProjectSetting({
  onDeviceClick,
  onTrackClick,
  onBtnClick,
  onBpmInput,
  onTitleInput,
  bpmState,
  selectedTrack,
  tracks,
  inputTextDevice,
  time,
  setTime,
}: ProjectSettingProps) {
  return (
    <div id="project-setting">
      <div id="top-section">
        <div id="setting-section">
          <div id="setting-box">
            <input className="project-title" onInput={onTitleInput} type="text" placeholder="프로젝트명" />
            <RecordDevice onDeviceClick={onDeviceClick} inputTextDevice={inputTextDevice} />
            <Bpm bpmState={bpmState} onBpmInput={onBpmInput} />
            <TrackTag onTrackClick={onTrackClick} selectedTrack={selectedTrack} tracks={tracks} />
          </div>
          <Button type="green" onBtnClick={onBtnClick} marginTop="5rem" width="100%">
            프로젝트 생성하기
          </Button>
        </div>
        <TrackSpace bpm={bpmState} currentTime={time} setCurrentTime={setTime} />
      </div>
      <div id="bottom-section">
        <UnderPlayBar
          sound={0}
          currentTime="00:00"
          totalTime="00:30"
          onSoundInput={() => {}}
          isPlaying={false}
          onClickPlay={() => {}}
        />
      </div>
    </div>
  );
}

export default ProjectSetting;