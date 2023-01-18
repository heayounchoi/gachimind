import { stat } from 'fs';

import userApi from '@apis/userApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MyProfile } from '@customTypes/userType';

interface InitialUserStateType {
  user: MyProfile | null;
  isLogined: boolean;
}

// FIXME: 소켓 통신 시 인증 상태 가정을 위해 로그인 된 상태로 초기 설정하였으며 로그인 상태 기능 구현 시 null로 처리되어야 한다.
const initialState: InitialUserStateType = {
  user: null,
  isLogined: false,
};

export const __getUserInfo = createAsyncThunk('getUserInfo', async () => {
  try {
    const userInfo = await userApi.getUserInfo();
    return userInfo;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // FIXME: 인증 구현 후 지울 것
    setUser: (state, action) => {
      state.isLogined = true;
      state.user = action.payload;
    },
    logout: (state) => {
      // TODO: 스토리지에 로그인상태와 jwt토큰을 저장하게 된다면 같이 지워줄 것
      state.isLogined = false;
      state.user = null;
    },
  },
  extraReducers: {},
});

export const { setUser, logout } = userSlice.actions;

export default userSlice;
