import useTaskStore from "@/store/TaskStore";
import { IoMdClose } from "react-icons/io";

export default function DeleteModal({ isOpen, onClose, taskId }: { isOpen: boolean; onClose: () => void; taskId: number }) {
    const deleteTask = useTaskStore((state: any) => state.deleteTask);

    const handleDelete = (id: number) => {
        deleteTask(id);
        onClose();
    };

    if (isOpen)
        return (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                <div className="bg-white flex flex-col gap-4 p-6 rounded-xl w-[90%] max-w-md sm:max-w-lg">
                    <div className="flex justify-between gap-4 items-start">
                        <p className="text-lg text-start sm:text-left">Are you sure that you wish to delete this task?</p>
                        <IoMdClose onClick={() => onClose()} className="cursor-pointer text-xl font-semibold" />
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button onClick={onClose} className="border border-[#941B0F] text-[#941B0F] rounded-lg cursor-pointer px-4 py-2">
                            Cancel
                        </button>
                        <button onClick={() => handleDelete(taskId)} className="bg-[#941B0F] text-white px-4 py-2 rounded-lg">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
}