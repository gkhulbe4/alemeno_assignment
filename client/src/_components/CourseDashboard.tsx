import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "react-router-dom";
import { DialogBox } from "./DialogBox";

function CourseDashboard() {
  let { courseId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/course/details/${courseId}`
      );
      console.log(res.data);
      return res.data;
    },
  });

  if (error) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Course details are loading</h1>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center gap-7">
      <div className="flex flex-col gap-7 w-[70%] mb-5 mt-5">
        <div className="w-full border-4 px-3 py-4 rounded-3xl flex flex-col">
          <div className="flex justify-around">
            <div className="flex flex-col gap-2">
              <h1
                className={`${
                  data.courseDetails.enrollmentStatus === "OPEN" && "text-green-500"
                } ${
                  data.courseDetails.enrollmentStatus === "IN_PROGRESS" && "text-yellow-500"
                } ${
                  data.courseDetails.enrollmentStatus === "CLOSED" && "text-red-500"
                } font-bold w-max`}
              >
                {data.courseDetails.enrollmentStatus}
              </h1>
              <h1 className="font-bold text-xl">{data.courseDetails.course_name}</h1>
              <h1 className="text-sm font-bold text-gray-600">
                Description: {data.courseDetails.description}
              </h1>
              <h1 className="text-sm font-bold text-gray-600">
                Instructor: {data.courseDetails.instructor_name}
              </h1>
              <h1 className="text-sm font-bold text-gray-600">
                Schedule: {data.courseDetails.schedule}
              </h1>
              <ul className="text-sm font-bold text-gray-600 list-disc">
                Prerequisites :
                {data.courseDetails.prerequisites.map((p: string) => (
                  <li className="text-sm font-bold text-gray-600 ml-4">{p}</li>
                ))}
              </ul>
              <h1 className="text-sm font-bold text-gray-600">
                Location: {data.courseDetails.location}
              </h1>
              <h1 className="text-sm font-bold text-gray-600">
                Weeks: {data.courseDetails.duration}
              </h1>
              <h1 className="text-sm font-bold text-gray-600">Syllabus: </h1>
              {data.courseDetails.syllabus.map(
                (s: { week: string; topic: string; content: string }) => (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Week {s.week}</AccordionTrigger>
                      <AccordionContent>
                        <h1 className="font-medium">{s.topic}</h1>
                        <h1 className="text-sm font-light">{s.content}</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )
              )}
            </div>

            <div className="object-contain border border-black rounded-3xl p-2 h-max">
              <img src={data.courseDetails.thumbnail} className="h-full w-full" alt="" />
            </div>
          </div>
          <div className="flex px-5 py-5 rounded-3xl items-center justify-end gap-4">
            <h1 className="text-lg text-gray-500">Number of students enrolled : {data.purchases}</h1>
            <DialogBox courseId={courseId!} price={data.courseDetails.price} status={data.courseDetails.enrollmentStatus}/>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CourseDashboard;
