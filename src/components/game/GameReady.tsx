import { useEffect, useState } from 'react';

import styled from 'styled-components';

import useGameInitiationSocket from '@hooks/socket/useGameInitiationSocket';
import useDebounce from '@hooks/useDebounce';

// TODO: 디자인을 반영해야 한다.
const GameReady = ({ readyStatus }: { readyStatus: boolean }) => {
  const [isReady, setIsReady] = useState<boolean>(readyStatus);
  const [isRenderedFirstTime, setIsRenderedFirstTime] = useState<boolean>(true);
  const debouncedReadyState = useDebounce(isReady, 200);
  const { emitGameReady } = useGameInitiationSocket();

  useEffect(() => {
    return () => {
      if (isRenderedFirstTime) {
        setIsRenderedFirstTime(false);
        return;
      }
      emitGameReady();
    };
  }, [debouncedReadyState]);

  return (
    <GameReadyLayout>
      <button onClick={() => setIsReady(!isReady)}>{isReady ? '레디취소' : '레디하기'}</button>
    </GameReadyLayout>
  );
};

const GameReadyLayout = styled.div``;

export default GameReady;
