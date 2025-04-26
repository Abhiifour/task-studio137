"use client";

import useEditTaskStore from "@/store/EditTaskStore";
import useTaskStore from "@/store/TaskStore";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAddTask: boolean;
}

export default function TaskModal({ isOpen, onClose, isAddTask }: TaskModalProps) {
  const addTask = useTaskStore((state: any) => state.addTask);
  const editTask = useTaskStore((state: any) => state.editTask);
  const editableTask = useEditTaskStore((state: any) => state.editableTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const [status, setStatus] = useState("");
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (!isAddTask && editableTask) {
      setTitle(editableTask.title || "");
      setDescription(editableTask.description || "");
      setDueDate(editableTask.dueDate || "");
      setStatus(editableTask.status || "");
      setId(editableTask.id || null);
      setPriority(editableTask.priority || "Medium"); // Default to Medium if not provided
    } else {
      // Reset form when adding
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("");
      setId(null);
      setPriority("Medium");
    }
  }, [editableTask, isAddTask, isOpen]);

  const handleSubmit = () => {
    if (isAddTask) {
      addTask({
        id: Math.floor(Math.random() * 10000),
        title,
        description,
        dueDate,
        status: status || "In Progress",
        priority: priority
      });
    } else if (id !== null) {
      editTask(id, {
        id,
        title,
        description,
        dueDate,
        status,
        priority: priority,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white flex flex-col gap-4 p-4 md:p-6 rounded-xl w-full max-w-md md:max-w-lg mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-lg md:text-xl font-bold">{isAddTask ? "Add Task" : "Edit Task"}</p>
          <IoMdClose onClick={() => onClose()} className="cursor-pointer text-xl font-semibold"/>
        </div>

        <div className="flex flex-col gap-1">
          <p>Title</p>
          <input
            type="text"
            placeholder="Title"
            className="w-full h-10 text-gray-500 rounded-lg border border-gray-400 outline-0 px-2.5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Description</p>
          <input
            type="text"
            placeholder="Description"
            className="w-full h-10 text-gray-500 rounded-lg border border-gray-400 outline-0 px-2.5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Due Date</p>
          <input
            type="date"
            className="w-full h-10 text-gray-500 rounded-lg border border-gray-400 outline-0 px-2.5"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Priority</p>
          <select
            className="w-full h-10 text-gray-500 rounded-lg border border-gray-400 outline-0 px-2.5"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p>Status</p>
          <select
            className="w-full h-10 text-gray-500 rounded-lg border border-gray-400 outline-0 px-2.5"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-3 justify-between mt-4">
          <button
            className="w-full sm:w-1/2 py-3 border border-[#941B0F] text-[#941B0F] rounded-lg cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-1/2 py-3 bg-[#941B0F] text-white rounded-lg cursor-pointer"
            onClick={handleSubmit}
          >
            {isAddTask ? "Add Task" : "Update Task"}
          </button>
        </div>
      </div>
    </div>
  );
}