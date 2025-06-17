// store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {type MedicalInfo } from '@/types/auth.types';
import {  medicalApiService } from '@/services/authApi';

// Medical State Interface
interface MedicalState {
  medicalRecords: MedicalInfo[];
  currentRecord: MedicalInfo | null;
  isLoading: boolean;
  error: string | null;
  slipUrl: string | null;
}


// Initial Medical State
const initialMedicalState: MedicalState = {
  medicalRecords: [],
  currentRecord: null,
  isLoading: false,
  error: null,
  slipUrl: null,
};

// Medical Async Thunks
export const createMedicalRecord = createAsyncThunk(
  'medical/create',
  async (medicalData: Omit<MedicalInfo, 'id' | 'userId'>, { rejectWithValue }) => {
    try {
      const response = await medicalApiService.createMedicalInfo(medicalData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create medical record');
    }
  }
);

export const fetchAllMedicalRecords = createAsyncThunk(
  'medical/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await medicalApiService.getAllMedicalInfo();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch medical records');
    }
  }
);

export const fetchMedicalRecord = createAsyncThunk(
  'medical/fetchOne',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await medicalApiService.getMedicalInfo(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch medical record');
    }
  }
);

export const updateMedicalRecord = createAsyncThunk(
  'medical/update',
  async ({ id, data }: { id: number; data: Partial<MedicalInfo> }, { rejectWithValue }) => {
    try {
      const response = await medicalApiService.updateMedicalInfo(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update medical record');
    }
  }
);

export const deleteMedicalRecord = createAsyncThunk(
  'medical/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await medicalApiService.deleteMedicalInfo(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete medical record');
    }
  }
);

export const deleteAllMedicalRecords = createAsyncThunk(
  'medical/deleteAll',
  async (_, { rejectWithValue }) => {
    try {
      await medicalApiService.deleteAllMedicalInfo();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete all medical records');
    }
  }
);

export const generateMedicalSlip = createAsyncThunk(
  'medical/generateSlip',
  async (medicalId: number, { rejectWithValue }) => {
    try {
      const response = await medicalApiService.generateSlip(medicalId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to generate slip');
    }
  }
);

// Medical Slice
const medicalSlice = createSlice({
  name: 'medical',
  initialState: initialMedicalState,
  reducers: {
    clearMedicalError: (state) => {
      state.error = null;
    },
    clearSlipUrl: (state) => {
      state.slipUrl = null;
    },
    setCurrentRecord: (state, action: PayloadAction<MedicalInfo | null>) => {
      state.currentRecord = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create medical record cases
    builder
      .addCase(createMedicalRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMedicalRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medicalRecords.push(action.payload);
        state.currentRecord = action.payload;
        state.error = null;
      })
      .addCase(createMedicalRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch all medical records cases
    builder
      .addCase(fetchAllMedicalRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMedicalRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medicalRecords = action.payload;
        state.error = null;
      })
      .addCase(fetchAllMedicalRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch single medical record cases
    builder
      .addCase(fetchMedicalRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMedicalRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRecord = action.payload;
        state.error = null;
      })
      .addCase(fetchMedicalRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update medical record cases
    builder
      .addCase(updateMedicalRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMedicalRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.medicalRecords.findIndex(record => record.id === action.payload.id);
        if (index !== -1) {
          state.medicalRecords[index] = action.payload;
        }
        state.currentRecord = action.payload;
        state.error = null;
      })
      .addCase(updateMedicalRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete medical record cases
    builder
      .addCase(deleteMedicalRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medicalRecords = state.medicalRecords.filter(record => record.id !== action.payload);
        if (state.currentRecord?.id === action.payload) {
          state.currentRecord = null;
        }
        state.error = null;
      })
      .addCase(deleteMedicalRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete all medical records cases
    builder
      .addCase(deleteAllMedicalRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAllMedicalRecords.fulfilled, (state) => {
        state.isLoading = false;
        state.medicalRecords = [];
        state.currentRecord = null;
        state.error = null;
      })
      .addCase(deleteAllMedicalRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Generate slip cases
    builder
      .addCase(generateMedicalSlip.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateMedicalSlip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.slipUrl = action.payload.slipUrl;
        state.error = null;
      })
      .addCase(generateMedicalSlip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearMedicalError, clearSlipUrl, setCurrentRecord } = medicalSlice.actions;

// Export reducers
export const medicalReducer = medicalSlice.reducer;

// Selectors
export const selectMedical = (state: { medical: MedicalState }) => state.medical;
export const selectMedicalRecords = (state: { medical: MedicalState }) => state.medical.medicalRecords;
export const selectCurrentRecord = (state: { medical: MedicalState }) => state.medical.currentRecord;
export const selectMedicalLoading = (state: { medical: MedicalState }) => state.medical.isLoading;
export const selectMedicalError = (state: { medical: MedicalState }) => state.medical.error;
export const selectSlipUrl = (state: { medical: MedicalState }) => state.medical.slipUrl;