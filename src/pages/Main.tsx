import { useEffect, useState } from 'react';

import useErrorSocket from '@hooks/socket/useErrorSocket';
import useDuplicatedUserInvalidate from '@hooks/useDuplicatedUserInvalidate';
import useSpecialNotification from '@hooks/useSpecialNotification';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { logout } from '@redux/modules/userSlice';

import AnnouncementModal from '@components/home/AnnouncementModal';
import RoomList from '@components/home/RoomList';
import SetUpInfoModal from '@components/home/SetUpInfoModal';
import SpecialNotificationModal from '@components/home/SpecialNotificationModal';
import UserInfo from '@components/home/UserInfo';
import ContentContainer from '@components/layout/ContentContainer';
import MainTemplate from '@components/layout/MainTemplate';

const Main = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const { onError, offError } = useErrorSocket();
  const { invalidate } = useDuplicatedUserInvalidate();
  const { contents, hasNotification, closeNotification } = useSpecialNotification();
  useEffect(() => {
    onError([
      { target: 'status', value: 401, callback: () => dispatch(logout()) },
      { target: 'status', value: 409, callback: invalidate, skipAlert: true },
    ]);
    return () => {
      offError();
    };
  }, []);

  const [setUpInfoModalVisible, setSetUpInfoModalVisible] = useState<boolean>(false);
  const [announcementModalVisible, setAnnouncementModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (user?.isFirstLogin) {
      setSetUpInfoModalVisible(true);
      return;
    }

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const currentDate = `${year}${month}${day}`;

    const AnnouncementModalShownDate = localStorage.getItem('AnnouncementModalShownDate');

    if (user && AnnouncementModalShownDate !== currentDate) {
      setAnnouncementModalVisible(true);
    }
  }, [user]);

  return (
    <MainTemplate>
      <ContentContainer title="PROFILE">
        <UserInfo />
        {hasNotification && (
          <SpecialNotificationModal visible={hasNotification} onClose={closeNotification} contents={contents} />
        )}
        {setUpInfoModalVisible && (
          <SetUpInfoModal visible={setUpInfoModalVisible} onClose={() => setSetUpInfoModalVisible(false)} />
        )}
        {announcementModalVisible && (
          <AnnouncementModal visible={announcementModalVisible} onClose={() => setAnnouncementModalVisible(false)} />
        )}
      </ContentContainer>
      <ContentContainer title="ROOM SELECTION">
        <RoomList />
      </ContentContainer>
    </MainTemplate>
  );
};

export default Main;
