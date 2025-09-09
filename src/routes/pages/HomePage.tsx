import StartTaskIcon from "@/assets/icons/start-task-icon.svg?react";
import TaskDetailsIcon from "@/assets/icons/task-details.svg?react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-110px)]">
      <div className="flex w-full items-center justify-center gap-[30px]">
        <div className="card">
          <h2>작업하기</h2>
          <p>Start Task</p>
          <div>
            <StartTaskIcon className="h-[96px] w-[84px]" />
          </div>
          <button onClick={() => navigate("/job/annotator")}>작업하기</button>
        </div>
        <div className="card">
          <h2>작업내용</h2>
          <p>Task Details</p>
          <div>
            <TaskDetailsIcon className="mt-[6px] mb-[5px] h-[85px] w-[128px]" />
          </div>
          <button onClick={() => navigate("/history")}>자세히 보기</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
