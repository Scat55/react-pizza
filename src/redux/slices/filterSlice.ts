import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

// Создаем стэйт
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  // Описываем функции
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    test(state) {
      state.count = 1087;
    },
  },
});

export const { increment, decrement, incrementByAmount, test } =
  filterSlice.actions;

export default filterSlice.reducer;
