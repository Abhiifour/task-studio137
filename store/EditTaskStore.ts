import { Task } from '@/constant';
import { create } from 'zustand'

const useEditTaskStore = create((set) => ({
    editableTask: {} as Task,
    addEditTask: (task: Task) =>
        set(() => ({ editableTask: task })), 
}));

export default useEditTaskStore;