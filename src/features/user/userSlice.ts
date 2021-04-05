import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk, store } from '../../app/store';

interface IUser {
    id: number;
    name: string;
    username: string;
    email: string,
  }
const userAdapter = createEntityAdapter<IUser>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (book) => book.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  })

export const fetchUserAsync = createAsyncThunk(
  'user/fetchName',
  async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`) as any;
    return await response.json();
  }
);
export const fetchAllUserAsync = createAsyncThunk(
  'user/fetchAllName',
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`) as any;
    return await response.json();
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: userAdapter.getInitialState(),
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addOne: userAdapter.addOne,
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateById: (state, action: PayloadAction<number>) => {
      // TODO find and udpate
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.fulfilled, (state, action: any) => {
        userAdapter.addOne(state, action.payload)      
      })
      .addCase(fetchAllUserAsync.fulfilled, (state, action: any) => {
        userAdapter.addMany(state, action.payload)      
      });
  },
});

export const { addOne, updateById } = userSlice.actions;

export const userSelectors = userAdapter.getSelectors();
  
export const getUsersState = (state: RootState) => state.user; // I am assuming you have a 'categories' reducer in your redux store.

export const selectCategoryEntity = (id: number) => {
   return createSelector(getUsersState, (state) => userSelectors.selectById(state, id));
}

export default userSlice.reducer;
