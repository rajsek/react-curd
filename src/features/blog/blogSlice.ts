import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk, store } from '../../app/store';

export interface BlogState {
    blogs: IBlog[];
    status: 'idle' | 'loading' | 'failed';
}

export interface IBlog {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

const initialState: BlogState = {
  blogs: [],
  status: 'loading'
};

const blogAdapter = createEntityAdapter<IBlog>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (book) => book.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.id - b.id,
  })

export const fetchBlogAsync = createAsyncThunk(
  'counter/fetchBlog',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts') as any;
    return await response.json();
  }
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState: blogAdapter.getInitialState(),
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    load: blogAdapter.addMany,
    addOne: blogAdapter.addOne,
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateById: (state, action: PayloadAction<number>) => {
      // TODO find and udpate
    },
    updateBlog: blogAdapter.updateOne,
    deteleBlog: blogAdapter.removeOne
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogAsync.fulfilled, (state, action: any) => {
        blogAdapter.addMany(state, action.payload)      
      });
  },
});

export const { addOne, updateById, load, updateBlog, deteleBlog } = blogSlice.actions;

export const blogsSelectors = blogAdapter.getSelectors<RootState>(
    (state) => state.blog
  )
// export const allBlogs = blogsSelectors.selectAll(store.getState())

export default blogSlice.reducer;
