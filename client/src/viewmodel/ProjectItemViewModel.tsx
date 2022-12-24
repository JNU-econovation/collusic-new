import React, { RefObject, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ProjectItemProps } from "types/projectType";
import ProjectItem from "components/blocks/ProjectItem";
import { setProjectLike } from "api/project";
import { isSignInState, modalOpenState } from "model/signInModel";

function ProjectItemViewModel({ projectId, projectName, trackPreviews, likeCount, isLiked }: ProjectItemProps) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState<number>(likeCount);
  const [isPlaying, setIsPlaying] = useState(false);
  const setModalOpen = useSetRecoilState(modalOpenState);
  const isSignIn = useRecoilValue(isSignInState);
  const previewPlayerRefs = trackPreviews.map(() => useRef<HTMLMediaElement>(null));

  const previewAction = (ref: RefObject<HTMLMediaElement>, action: string) => {
    return new Promise(() => {
      if (action === "play") {
        try {
          ref.current!.play();
        } catch (err) {
          alert("미리듣기가 재생되지 않습니다. 잠시후 다시 시도해주세요.");
        }
      } else if (action === "pause") {
        try {
          ref.current!.pause();
        } catch (err) {
          alert("미리듣기가 재생되지 않습니다. 잠시후 다시 시도해주세요.");
        }
      }
    });
  };

  const previewsAction = async (action: string) => {
    const taskPromises = previewPlayerRefs.map((ref) => previewAction(ref, action));
    await Promise.all(taskPromises);
  };

  const handleClickPreview = async () => {
    if (!!previewPlayerRefs.find((ref) => ref.current!.paused)) {
      setIsPlaying(true);
      await previewsAction("play");
    } else {
      setIsPlaying(false);
      await previewsAction("pause");
    }
  };

  const handleClickLikeBtn = async () => {
    if (isSignIn) {
      if (isLikedState) {
        setIsLikedState(false);
        setLikeCountState((prev) => prev - 1);
      } else {
        setIsLikedState(true);
        setLikeCountState((prev) => prev + 1);
      }
      await setProjectLike(projectId!);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      setModalOpen(true);
    }
  };

  return (
    <ProjectItem
      isLiked={isLikedState}
      isPlaying={isPlaying}
      likeCount={likeCountState}
      projectName={projectName}
      trackPreviews={trackPreviews}
      onClickPreview={handleClickPreview}
      onClickLikeBtn={handleClickLikeBtn}
      currentRefs={previewPlayerRefs}
    />
  );
}

export default ProjectItemViewModel;
