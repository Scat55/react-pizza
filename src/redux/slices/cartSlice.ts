import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  totalPrice: number;
  items: [];

}

const initialState: FilterState = {
  totalPrice: 0,
  items: []
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<object>)  {
      state.items.push(action.payload)
    },
    removeItems(state, action: PayloadAction<object>){
      state.items = state.items.filter(el => {
        el.id !== action.payload
      })
    },
    clearItems(state){
      state.items = []
    }
  },
});

export const { addItems, removeItems,clearItems} = cartSlice.actions;
export default cartSlice.reducer;
