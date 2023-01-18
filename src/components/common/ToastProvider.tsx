import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import { theme } from '@styles/theme';

const ToastProvider = () => {
  return (
    <ToastProviderLayout>
      <ToastContainer
        toastStyle={{
          backgroundColor: theme.colors.darkGrey1,
          color: theme.colors.white,
        }}
        position="top-center"
        autoClose={2400}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        limit={3}
      />
    </ToastProviderLayout>
  );
};

const ToastProviderLayout = styled.div`
  position: absolute;
  z-index: 2;
  transform: scale(${(props) => props.theme.layout.scale});
  padding-top: 76px;
  & > * {
    margin-bottom: 891px;
  }
`;

export default ToastProvider;
