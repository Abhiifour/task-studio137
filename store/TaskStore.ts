import { Task } from '@/constant';
import { create } from 'zustand';

import { persist, createJSONStorage } from 'zustand/middleware'


const useTaskStore = create(
    persist(
        (set) => ({
            tasks: [],
            addTask: (task: Task) =>
                set((state: any) => ({ tasks: [...state.tasks, task] })),
            deleteTask: (id: number) =>
                set((state: any) => ({
                    tasks: state.tasks.filter((task: Task) => task.id !== id),
                })),
            editTask: (id: number, updatedTask: Task) =>
                set((state: any) => ({
                    tasks: state.tasks.map((task: Task) =>
                        task.id === id ? { ...task, ...updatedTask } : task
                    ),
                })),
        }),
        {
            name: 'task-storage',
            storage: createJSONStorage(() => sessionStorage), 
        }
    )
);


export default useTaskStore;