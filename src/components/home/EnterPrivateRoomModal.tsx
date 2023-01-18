import styled from 'styled-components';

import Modal from '@components/common/Modal';

const EnterPrivateRoomModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  return (
    <Modal visible={visible} onClose={onClose} title="ENTER THE ROOM">
      <EnterPrivateRoomModalLayout>
        <RoomInfoBox>
          <span>방 제목</span>
          <div>방제</div>
        </RoomInfoBox>
        <InputBox>
          <span>비밀번호</span>
          <input placeholder="비밀번호가 들어간당" />
        </InputBox>
        <EnterRoomButton>생성하기</EnterRoomButton>
      </EnterPrivateRoomModalLayout>
    </Modal>
  );
};

// TODO: 임시 색상으로 추후 변경되어야 한다.
const EnterPrivateRoomModalLayout = styled.div`
  font-family: ${(props) => props.theme.font.korean};
  padding: 40px 70px;
  gap: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RoomInfoBox = styled.div`
  font-family: inherit;
  display: flex;
  flex-direction: column;
  span {
    font-family: inherit;
    font-size: 24px;
    margin-bottom: 8px;
  }
  div {
    font-family: inherit;
    font-size: 24px;
    background-color: ${(props) => props.theme.colors.ivory1};
    height: 56px;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
`;
const InputBox = styled.div`
  font-family: inherit;
  display: flex;
  flex-direction: column;
  span {
    font-family: inherit;
    font-size: 24px;
    margin-bottom: 8px;
  }
  input {
    font-family: inherit;
    font-size: 24px;
    background-color: ${(props) => props.theme.colors.ivory1};
    height: 56px;
    ::placeholder {
      padding-left: 20px;
    }
  }
`;

const EnterRoomButton = styled.button`
  font-family: inherit;
  font-size: 24px;
  color: ${(props) => props.theme.colors.ivory1};
  background-color: ${(props) => props.theme.colors.darkGrey1};
  height: 56px;
  margin-top: 26px;
  margin-bottom: 56px;
`;

export default EnterPrivateRoomModal;
