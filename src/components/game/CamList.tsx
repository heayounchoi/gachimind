import { useEffect, useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';

import useStreamUpdateSocket from '@hooks/socket/useStreamUpdateSocket';
import { useAppSelector } from '@redux/hooks';

import Cam from './Cam';
import CamListSliderArrow from './CamListSliderArrow';

const CamList = () => {
  const { userStream, userMic, userCam } = useAppSelector((state) => state.userMedia);
  const { playerList, playerStreamMap } = useAppSelector((state) => state.playerMedia);
  const [hasSlider, setHasSlider] = useState<{ hasPrev: boolean; hasNext: boolean }>({
    hasPrev: false,
    hasNext: true,
  });
  const { user } = useAppSelector((state) => state.user);
  const { turn } = useAppSelector((state) => state.gamePlay);
  const { onUpdateUserStream, offUpdateUserStream, emitUpdateUserStream } = useStreamUpdateSocket();

  useEffect(() => {
    emitUpdateUserStream({ audio: userMic, video: userCam });
  }, [playerStreamMap]);

  useEffect(() => {
    onUpdateUserStream();
    return () => {
      offUpdateUserStream();
    };
  }, [playerList]);

  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: (
      <CamListSliderArrow
        direction="right"
        hasSlider={hasSlider.hasNext}
        setHasSlider={() => setHasSlider({ hasNext: false, hasPrev: true })}
      />
    ),
    prevArrow: (
      <CamListSliderArrow
        direction="left"
        hasSlider={hasSlider.hasPrev}
        setHasSlider={() => setHasSlider({ hasNext: true, hasPrev: false })}
      />
    ),
  };

  return (
    <CamListLayout {...settings}>
      {playerList
        .filter((player) => player.userId !== turn?.speechPlayer)
        .map((player, index) => {
          return (
            <div key={player.userId}>
              {player.userId === user?.userId ? (
                <Cam
                  userId={user.userId}
                  userStream={userStream}
                  nickname={user.nickname}
                  audio={userMic}
                  video={userCam}
                  isMe={true}
                  isHost={index === 0}
                  profileImg={user.profileImg}
                  size="sub"
                />
              ) : (
                <Cam
                  userId={player.userId}
                  key={player.userId}
                  userStream={playerStreamMap[player.socketId]}
                  nickname={player.nickname}
                  audio={player.audio}
                  video={player.video}
                  isHost={index === 0}
                  profileImg={player.profileImg}
                  size="sub"
                />
              )}
            </div>
          );
        })}
    </CamListLayout>
  );
};

const CamListLayout = styled(Slider)`
  width: 500px;
  margin-top: -6px;
  margin-left: 12px;
`;

export default CamList;
