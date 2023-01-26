import { useState } from 'react';

import styled from 'styled-components';

import { BUG_OPTIONS } from '@constants/options';

import Button from '@components/common/Button';
import InputContainer from '@components/common/InputContainer';
import Modal from '@components/common/Modal';
import Selection from '@components/common/Selection';

const ReportBugModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState<string>('');
  const [reportContent, setReportContent] = useState<string>('');

  return (
    <Modal visible={visible} onClose={onClose} title="REPORT" width={700}>
      <ReportBugModalLayout>
        <InputContainer label="카테고리">
          <Selection options={BUG_OPTIONS} setValue={setCategory} />
        </InputContainer>
        <InputContainer label="내용">
          <ReportTextarea
            spellCheck={false}
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
          ></ReportTextarea>
        </InputContainer>
        <ReportBugButton>제보하기</ReportBugButton>
      </ReportBugModalLayout>
    </Modal>
  );
};

const ReportBugModalLayout = styled.div`
  padding: 48px 80px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReportBugButton = styled(Button)`
  font-family: inherit;
  font-size: 24px;
  height: 72px;
  margin-top: 17px;
  background-color: ${(props) => props.theme.colors.purple1};
`;

const ReportTextarea = styled.textarea`
  font-family: inherit;
  font-size: 24px;
  color: ${(props) => props.theme.colors.ivory2};
  background-color: ${(props) => props.theme.colors.darkGrey2};
  height: 299px;
  padding: 20px;
  resize: none;
  ${(props) => props.theme.borders.bottomRightWhiteBorder}

  :focus {
    outline: none;
  }
`;

export default ReportBugModal;
