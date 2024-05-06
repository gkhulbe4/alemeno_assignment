import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import StudentPurchases from "./StudentPurchases";

function StudentDashboard() {
  const userId = localStorage.getItem("id");

  const { data, isLoading, error } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/student/details/${userId}`
      );
      return res.data.student;
    },
  });

  if (error) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1 className="h-screen">Students details are loading...</h1>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="flex w-[50%] border-4 border-gray-400 rounded-3xl p-5 mt-5">
        <div className="w-[40%] h-[200px] border border-gray-300">
          <img
            src="https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720"
            className="h-full w-full object-contain"
            alt=""
          />
        </div>
        <div className="w-[60%] flex flex-col justify-center items-center">
          <h1 className="text-xl font-medium">Name : {data.name}</h1>
          <h1 className="text-sm">Email : {data.email}</h1>
        </div>
      </div>
      <StudentPurchases />
    </div>
  );
}

export default StudentDashboard;
