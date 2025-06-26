import { useCallback } from 'react';
import { CrudService } from '../api';
import { useAsyncOperation } from './useAsyncOperation';
import { AppError } from '../errors';

// Generic hook for CRUD operations with better error handling
export function useApi<T, CreateData, UpdateData>(endpoint: string) {
  const service = new CrudService<T, CreateData, UpdateData>(endpoint);

  // Get all items
  const {
    data: items,
    loading: loadingItems,
    error: itemsError,
    execute: fetchItems,
  } = useAsyncOperation(() => service.getAll());

  // Get single item
  const {
    data: item,
    loading: loadingItem,
    error: itemError,
    execute: fetchItem,
  } = useAsyncOperation((id: number) => service.getById(id));

  // Create item
  const {
    loading: creating,
    error: createError,
    execute: createItem,
  } = useAsyncOperation((data: CreateData) => service.create(data));

  // Update item
  const {
    loading: updating,
    error: updateError,
    execute: updateItem,
  } = useAsyncOperation(({ id, data }: { id: number; data: UpdateData }) => 
    service.update(id, data)
  );

  // Delete item
  const {
    loading: deleting,
    error: deleteError,
    execute: deleteItem,
  } = useAsyncOperation((id: number) => service.delete(id));

  // Combined operations with optimistic updates
  const createAndRefresh = useCallback(async (data: CreateData): Promise<T> => {
    try {
      const newItem = await createItem(data);
      await fetchItems(); // Refresh list
      return newItem;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to create item', 'CREATE_ERROR');
    }
  }, [createItem, fetchItems]);

  const updateAndRefresh = useCallback(async (id: number, data: UpdateData): Promise<T> => {
    try {
      const updatedItem = await updateItem({ id, data });
      await fetchItems(); // Refresh list
      return updatedItem;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update item', 'UPDATE_ERROR');
    }
  }, [updateItem, fetchItems]);

  const deleteAndRefresh = useCallback(async (id: number): Promise<void> => {
    try {
      await deleteItem(id);
      await fetchItems(); // Refresh list
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to delete item', 'DELETE_ERROR');
    }
  }, [deleteItem, fetchItems]);

  return {
    // Data
    items,
    item,
    
    // Loading states
    loadingItems,
    loadingItem,
    creating,
    updating,
    deleting,
    
    // Error states (now properly typed)
    itemsError: itemsError as AppError | null,
    itemError: itemError as AppError | null,
    createError: createError as AppError | null,
    updateError: updateError as AppError | null,
    deleteError: deleteError as AppError | null,
    
    // Basic operations
    fetchItems,
    fetchItem,
    createItem,
    updateItem,
    deleteItem,
    
    // Combined operations
    createAndRefresh,
    updateAndRefresh,
    deleteAndRefresh,
  };
}
