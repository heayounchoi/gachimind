import userApi from '@apis/userApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MyKeywords, MyProfile } from '@customTypes/userType';

interface InitialUserStateType {
  user: MyProfile | null;
  isLogined: boolean;
  keywords: MyKeywords | null;
}

const initialState: InitialUserStateType = {
  user: null,
  isLogined: false,
  keywords: null,
};

export const __getUserInfo = createAsyncThunk('getUserInfo', async (_, thunkAPI) => {
  try {
    const userInfo = await userApi.getUserInfo();
    return thunkAPI.fulfillWithValue(userInfo);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getUserKeyword = createAsyncThunk('getUserKeyword', async (_, thunkAPI) => {
  try {
    const userKeywords = await userApi.getUserKeyword();
    return thunkAPI.fulfillWithValue(userKeywords);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updateUserInfo = createAsyncThunk(
  'updateUserInfo',
  async ({ newNickname, newProfileImg }: { newNickname: string; newProfileImg: string }, thunkAPI) => {
    try {
      await userApi.updateUserInfo({ newNickname, newProfileImg });
      return thunkAPI.fulfillWithValue({ newNickname, newProfileImg });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogined = false;
      state.user = null;
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getUserInfo.fulfilled, (state, action) => {
      state.isLogined = true;
      state.user = action.payload;
    });
    builder.addCase(__getUserInfo.rejected, (state) => {
      state.isLogined = false;
    });
    builder.addCase(__getUserKeyword.fulfilled, (state, action) => {
      state.keywords = action.payload;
    });
    builder.addCase(__updateUserInfo.fulfilled, (state, action) => {
      if (state.user) {
        state.user.profileImg = action.payload.newProfileImg;
        state.user.nickname = action.payload.newNickname;
        return;
      }
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice;
