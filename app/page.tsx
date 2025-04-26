import TaskTable from "@/components/TaskTable";

import Image from "next/image";

export default function Home() {
  return (
   <div>
     <div>
      <Image
      src="/logo.png"
      alt="Logo"
      width={200}
      height={100}
      />
      </div>

    <TaskTable/>
   </div>
  );
}
