"use client"

import { useState } from "react"
import TaskModal from "./TaskModal"
import useEditTaskStore from "@/store/EditTaskStore"
import { Task } from "@/constant"
import useTaskStore from "@/store/TaskStore"
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { GoSortDesc, GoSortAsc } from "react-icons/go"
import { IoFilter } from "react-icons/io5"
import { FaPlus } from "react-icons/fa6"
import { CiSearch } from "react-icons/ci"
import DeleteModal from "./DeleteModal"

export default function TaskTable() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddTask, setIsAddTask] = useState(false)
  const [deleteTaskId, setDeleteTaskId] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [priorityFilter, setPriorityFilter] = useState<string>("")

  const addEditTask = useEditTaskStore((state: any) => state.addEditTask)
  const deleteTask = useTaskStore((state: any) => state.deleteTask)
  const tasks = useTaskStore((state: any) => state.tasks)

  const setEditTask = (task: Task) => {
    addEditTask({ ...task })
    setIsOpen(true)
    setIsAddTask(false)
  }

  // Computed Tasks (Search + Sort + Filter)
  const filteredTasks = tasks
    .filter((task: Task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task: Task) => {
      if (!priorityFilter) return true
      return task.priority === priorityFilter
    })
    .sort((a: Task, b: Task) => {
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })

  return (
    <div className="relative">
      <div className="w-full max-w-7xl mx-auto mt-4 md:mt-10 px-4">
        {/* Header Section - Responsive */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          <h1 className="font-semibold text-xl md:text-2xl">Tasks</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="bg-[#941B0F] text-white rounded-lg px-3 py-2 cursor-pointer flex gap-2 items-center justify-center"
              onClick={() => {
                setIsOpen(true)
                setIsAddTask(true)
              }}
            >
              <FaPlus/>
              <p>Add Task</p>
            </button>

            {/* Search */}
            <div className="relative w-full sm:w-64 md:w-80">
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              
              <input
                  type="text"
                  className="w-full h-10 pl-10 pr-2.5 text-gray-500 rounded-lg border border-gray-400 outline-none"
                  placeholder="Search Task"
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort & Filter - Horizontal on mobile, part of main controls on desktop */}
            <div className="flex gap-3">
              <button
                className="border border-[#941B0F] text-[#941B0F] rounded-lg px-3 py-2 cursor-pointer flex gap-2 items-center justify-center flex-1 sm:flex-none"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                Sort{sortOrder === "asc" ? <GoSortAsc/> : <GoSortDesc/>}
              </button>

              {/* Filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  className="border border-[#941B0F] text-[#941B0F] rounded-lg pl-10 pr-2 py-2 cursor-pointer appearance-none w-full"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="">Filter</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <div className="pointer-events-none absolute left-4 top-1/2 transform -translate-y-1/2 text-[#941B0F]">
                  <IoFilter className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Table - Responsive with horizontal scroll for small screens */}
        <div className="border border-[#941B0F] rounded-xl overflow-x-auto mt-4">
          <table className="w-full min-w-[640px] bg-[#FFF9F8]">
            <thead>
              <tr className="text-[#941B0F] border-b border-[#941B0F]">
                <th className="text-start py-4 md:py-6 pl-4">SL No</th>
                <th className="text-start py-4 md:py-6">Title</th>
                <th className="text-start py-4 md:py-6">Description</th>
                <th className="text-start py-4 md:py-6">Due Date</th>
                <th className="text-start py-4 md:py-6">Status</th>
                <th className="text-start py-4 md:py-6">Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task: Task, index: number) => (
                  <tr
                    key={task.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-[#FFF9F8]"
                    }`}
                  >
                    <td className="py-4 md:py-6 pl-4">{task.id}</td>
                    <td className="py-4 md:py-6">{task.title}</td>
                    <td className="py-4 md:py-6 max-w-xs truncate">{task.description}</td>
                    <td className="py-4 md:py-6">{task.dueDate}</td>
                    <td className="py-4 md:py-6">
                      <p
                        className={`${
                          task.status === "In Progress"
                            ? "bg-[#F5D20E]"
                            : "bg-[#03A229]"
                        } text-white rounded-2xl py-1 text-center text-xs px-2 w-24`}
                      >
                        {task.status}
                      </p>
                    </td>
                    <td className="py-4 md:py-6 pr-4">
                      <div className="flex justify-between items-center">
                        <span>{task.priority}</span>
                        <div className="flex gap-4">
                          <button onClick={() => setEditTask(task)}>
                            <FaRegEdit className="text-lg cursor-pointer"/>
                          </button>
                          <button onClick={() => {
                            setDeleteTaskId(task.id)
                            setIsDeleteOpen(true)   
                          }}>
                            <RiDeleteBin6Line className="text-lg cursor-pointer"/>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* For extremely small screens, display a message */}
        <div className="md:hidden text-center text-sm text-gray-500 mt-2">
          Scroll horizontally to view all task details
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isAddTask={isAddTask}
      />

      <DeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        taskId={deleteTaskId}
      />
    </div>
  )
}