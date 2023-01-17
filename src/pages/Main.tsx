import { useAuthSocket } from '@hooks/socket/useAuthSocket';

import RoomList from '@components/home/RoomList';
import UserInfo from '@components/home/UserInfo';
import ContentContainer from '@components/layout/ContentContainer';
import MainTemplate from '@components/layout/MainTemplate';

const Main = () => {
  useAuthSocket();
  return (
    <MainTemplate>
      <ContentContainer title="SCORE">
        <UserInfo />
      </ContentContainer>
      <ContentContainer title="ROOM SELECTION">
        <RoomList />
      </ContentContainer>
    </MainTemplate>
  );
};

export default Main;
