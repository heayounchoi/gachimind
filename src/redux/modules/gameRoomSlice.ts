import { createSlice } from '@reduxjs/toolkit';

import { GameRoomDetail } from '@customTypes/gameRoomType';

// TODO: 게임룸의 상태 정보가 추가될 수 있다. EX) [대기, 게임중, 게임종료] 상태
interface InitialGameRoomStateType {
  room: GameRoomDetail | null;
}

const initialState: InitialGameRoomStateType = {
  room: null,
};

const gameRoomSlice = createSlice({
  name: 'gameRoom',
  initialState,
  reducers: {
    joinGameRoom: (state, action) => {
      state.room = action.payload;
    },
  },
  extraReducers: {},
});

export const { joinGameRoom } = gameRoomSlice.actions;

export default gameRoomSlice;
