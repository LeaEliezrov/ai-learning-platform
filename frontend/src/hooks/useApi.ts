import { useCallback } from 'react';
import { CrudService } from '../services/apiHelpers';
import { useAsyncOperation } from './useAsyncOperation';

// Generic hook for CRUD operations
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

  // Combined operations
  const createAndRefresh = useCallback(async (data: CreateData) => {
    const newItem = await createItem(data);
    await fetchItems();
    return newItem;
  }, [createItem, fetchItems]);

  const updateAndRefresh = useCallback(async (id: number, data: UpdateData) => {
    const updatedItem = await updateItem({ id, data });
    await fetchItems();
    return updatedItem;
  }, [updateItem, fetchItems]);

  const deleteAndRefresh = useCallback(async (id: number) => {
    await deleteItem(id);
    await fetchItems();
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
    
    // Error states
    itemsError,
    itemError,
    createError,
    updateError,
    deleteError,
    
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
