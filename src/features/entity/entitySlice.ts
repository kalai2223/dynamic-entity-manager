import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEntities,
  createEntity,
  updateEntity,
  deleteEntity,
} from "@api/baseApi";
import type { BaseEntity, EntitiesState } from "@config/entity.types";

const initialState: EntitiesState = {};

export const fetchEntity = createAsyncThunk<
  { entity: string; data: BaseEntity[] },
  string
>("entities/fetch", async (entity) => {
  const data = await getEntities<BaseEntity>(entity);
  return { entity, data };
});

export const createEntityAction = createAsyncThunk<
  { entity: string; data: BaseEntity },
  { entity: string; payload: Omit<BaseEntity, "id"> }
>("entities/create", async ({ entity, payload }) => {
  const data = await createEntity<BaseEntity>(entity, payload);
  return { entity, data };
});

export const updateEntityAction = createAsyncThunk<
  { entity: string; data: BaseEntity },
  { entity: string; id: string; payload: Omit<BaseEntity, "id"> }
>("entities/update", async ({ entity, id, payload }) => {
  const data = await updateEntity<BaseEntity>(entity, id, payload);
  return { entity, data };
});

export const deleteEntityAction = createAsyncThunk<
  { entity: string; id: string },
  { entity: string; id: string }
>("entities/delete", async ({ entity, id }) => {
  await deleteEntity(entity, id);
  return { entity, id };
});


const entitySlice = createSlice({
  name: "entities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchEntity.pending, (state, action) => {
        const entity = action.meta.arg;

        state[entity] ??= {
          data: [],
          loading: false,
          error: null,
        };

        state[entity].loading = true;
        state[entity].error = null;
      })

      .addCase(fetchEntity.fulfilled, (state, action) => {
        const { entity, data } = action.payload;

        state[entity].data = data;
        state[entity].loading = false;
      })

      .addCase(fetchEntity.rejected, (state, action) => {
        const entity = action.meta.arg;

        state[entity].loading = false;
        state[entity].error =
          action.error.message ?? "Failed to fetch data";
      })

      .addCase(createEntityAction.fulfilled, (state, action) => {
        const { entity, data } = action.payload;

        state[entity]?.data.push(data);
      })

      .addCase(updateEntityAction.fulfilled, (state, action) => {
        const { entity, data } = action.payload;

        const index = state[entity]?.data.findIndex(
          (item) => item.id === data.id
        );

        if (index !== undefined && index >= 0) {
          state[entity].data[index] = data;
        }
      })

      .addCase(deleteEntityAction.fulfilled, (state, action) => {
        const { entity, id } = action.payload;

        state[entity].data = state[entity].data.filter(
          (item) => item.id !== id
        );
      });
  },
});

export default entitySlice.reducer;
