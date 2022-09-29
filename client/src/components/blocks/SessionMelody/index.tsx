import React, { MouseEventHandler } from "react";

import Button from "components/atoms/Button";
import Span from "components/atoms/Span";
import { MelodyLength } from "types/projectType";
import "./style.scss";

interface SessionMelodyProps {
  melodyType: MelodyLength;
  clickHandler: MouseEventHandler;
}

function SessionMelody({ melodyType, clickHandler }: SessionMelodyProps) {
  return (
    <div className="session-melody">
      <Span>세션 마디</Span>
      <div className="session-buttons">
        <Button type="line" isSelected={melodyType === "4"} clickHandler={clickHandler} width="6rem">
          4마디
        </Button>
        <Button type="line" isSelected={melodyType === "8"} clickHandler={clickHandler} width="8rem" marginLeft="8px">
          8마디
        </Button>
        <Button type="line" isSelected={melodyType === "16"} clickHandler={clickHandler} width="10rem" marginLeft="8px">
          16마디
        </Button>
      </div>
    </div>
  );
}

export default SessionMelody;
