import testimg from "@/assets/images/test-img.png";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg?react";
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
  shift,
  arrow,
  safePolygon,
  FloatingArrow,
} from "@floating-ui/react";
import { useRef, useState } from "react";

interface ImgObjectData {
  id: string;
  img: string;
  cameraId: string;
  objId: string;
  createdAt: string;
}

interface ImgObjectProps extends ImgObjectData {
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const imgObjectList: ImgObjectData[] = [
  {
    id: "1",
    img: testimg,
    cameraId: "1",
    objId: "1",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    img: testimg,
    cameraId: "2",
    objId: "2",
    createdAt: "2025-01-01",
  },
  {
    id: "3",
    img: testimg,
    cameraId: "3",
    objId: "3",
    createdAt: "2025-01-01",
  },
  {
    id: "4",
    img: testimg,
    cameraId: "4",
    objId: "4",
    createdAt: "2025-01-01",
  },
  {
    id: "5",
    img: testimg,
    cameraId: "5",
    objId: "5",
    createdAt: "2025-01-01",
  },
  {
    id: "6",
    img: testimg,
    cameraId: "6",
    objId: "6",
    createdAt: "2025-01-01",
  },
  {
    id: "7",
    img: testimg,
    cameraId: "7",
    objId: "7",
    createdAt: "2025-01-01",
  },
  {
    id: "8",
    img: testimg,
    cameraId: "8",
    objId: "8",
    createdAt: "2025-01-01",
  },
  {
    id: "9",
    img: testimg,
    cameraId: "9",
    objId: "9",
    createdAt: "2025-01-01",
  },
  {
    id: "10",
    img: testimg,
    cameraId: "10",
    objId: "10",
    createdAt: "2025-01-01",
  },
  {
    id: "11",
    img: testimg,
    cameraId: "11",
    objId: "11",
    createdAt: "2025-01-01",
  },
  {
    id: "12",
    img: testimg,
    cameraId: "12",
    objId: "12",
    createdAt: "2025-01-01",
  },
  {
    id: "13",
    img: testimg,
    cameraId: "13",
    objId: "13",
    createdAt: "2025-01-01",
  },
  {
    id: "14",
    img: testimg,
    cameraId: "14",
    objId: "14",
    createdAt: "2025-01-01",
  },
  {
    id: "15",
    img: testimg,
    cameraId: "15",
    objId: "15",
    createdAt: "2025-01-01",
  },
  {
    id: "16",
    img: testimg,
    cameraId: "16",
    objId: "16",
    createdAt: "2025-01-01",
  },
  {
    id: "17",
    img: testimg,
    cameraId: "17",
    objId: "17",
    createdAt: "2025-01-01",
  },
  {
    id: "18",
    img: testimg,
    cameraId: "18",
    objId: "18",
    createdAt: "2025-01-01",
  },
  {
    id: "19",
    img: testimg,
    cameraId: "19",
    objId: "19",
    createdAt: "2025-01-01",
  },
  {
    id: "20",
    img: testimg,
    cameraId: "20",
    objId: "20",
    createdAt: "2025-01-01",
  },
  {
    id: "21",
    img: testimg,
    cameraId: "21",
    objId: "21",
    createdAt: "2025-01-01",
  },
  {
    id: "22",
    img: testimg,
    cameraId: "22",
    objId: "22",
    createdAt: "2025-01-01",
  },
  {
    id: "23",
    img: testimg,
    cameraId: "23",
    objId: "23",
    createdAt: "2025-01-01",
  },
  {
    id: "24",
    img: testimg,
    cameraId: "24",
    objId: "24",
    createdAt: "2025-01-01",
  },
  {
    id: "25",
    img: testimg,
    cameraId: "25",
    objId: "25",
    createdAt: "2025-01-01",
  },
  {
    id: "26",
    img: testimg,
    cameraId: "26",
    objId: "26",
    createdAt: "2025-01-01",
  },
  {
    id: "27",
    img: testimg,
    cameraId: "27",
    objId: "27",
    createdAt: "2025-01-01",
  },
  {
    id: "28",
    img: testimg,
    cameraId: "28",
    objId: "28",
    createdAt: "2025-01-01",
  },
  {
    id: "29",
    img: testimg,
    cameraId: "29",
    objId: "29",
    createdAt: "2025-01-01",
  },
];

const ImgObject = (item: ImgObjectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const arrowRef = useRef(null);

  // 개별 ImgObject를 위한 Floating UI 설정
  const { refs, floatingStyles, context } = useFloating({
    open: isHovered,
    onOpenChange: setIsHovered,
    placement: "bottom-end", // 우하단에 위치
    middleware: [
      offset(8), // tooltip과 reference 사이 간격
      flip(), // 화면 경계를 벗어나면 반대편에 표시
      shift({ padding: 8 }), // 화면 경계에서 8px 여백 유지
      arrow({ element: arrowRef }), // 화살표 위치 자동 계산
    ],
  });

  // Hover 상호작용 설정
  const hover = useHover(context, {
    delay: { open: 200, close: 100 }, // 의도치 않은 hover 방지
    handleClose: safePolygon(), // tooltip으로 마우스 이동시 안 닫힘
    restMs: 50, // 마우스가 50ms 정지 후 열림
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`relative col-span-1 cursor-pointer border-2 transition-all ${
          item.isSelected
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onClick={() => item.onSelect(item.id)}
      >
        <img
          className="max-h-[200px] w-full object-contain"
          src={item.img}
          alt="object"
        />
        {item.isSelected && (
          <div className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
            ✓
          </div>
        )}
      </div>

      {/* Floating UI Tooltip */}
      {isHovered && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white shadow-lg"
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className="fill-gray-800"
          />
          <div className="space-y-1">
            <div>Camera ID: {item.cameraId}</div>
            <div>Object ID: {item.objId}</div>
            <div>생성일: {item.createdAt}</div>
          </div>
        </div>
      )}
    </>
  );
};

const JobPage = () => {
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);

  const handleObjectSelect = (id: string) => {
    setSelectedObjects(
      (prev) =>
        prev.includes(id)
          ? prev.filter((objId) => objId !== id) // 이미 선택된 경우 제거
          : [...prev, id], // 선택되지 않은 경우 추가
    );
  };

  return (
    <div className="grid h-full grid-cols-6 gap-2 p-2">
      <div className="col-span-5 flex flex-col border-2 border-gray-200">
        {/* object Info */}
        <div className="flex items-center justify-between border-b p-2">
          <img
            src={testimg}
            alt="object"
            className="h-[200px] w-[200px] border-2 border-gray-300 object-contain"
          />
          <ArrowRightIcon className="h-30 w-30 text-blue-200" />
          <span className="text-[24px] font-bold">
            이 사람과 같은 사람을 모두 찾으세요.
          </span>
          <div className="flex h-[200px] w-[600px] flex-col gap-2 bg-gray-100 p-2">
            <span className="text-center text-[28px] text-gray-500">
              오브젝트 정보
            </span>
            <span className="text-[20px] text-gray-500">
              OBJ ID: 1234567890
            </span>
            <span className="text-[20px] text-gray-500">
              CAMERA ID: 1234567890
            </span>
            <span className="text-[20px]  text-gray-500">기타 정보 ...</span>
          </div>
        </div>

        {/* object select view */}
        <div className="p-2">
          <div
            className="
              grid
              max-h-[calc(100vh-325px)]
              flex-1 
              auto-rows-max
              grid-cols-8 
              overflow-y-auto
              border-2
              border-gray-300
            "
          >
            {imgObjectList.map((item) => (
              <ImgObject
                key={item.id}
                {...item}
                isSelected={selectedObjects.includes(item.id)}
                onSelect={handleObjectSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {/* submit area */}
      <div className="col-span-1 flex flex-col justify-end gap-1">
        {/* <div className="bg-blue-100 p-2 text-center">
          <span className="text-sm text-gray-600">선택된 항목</span>
          <div className="text-lg font-bold text-blue-600">
            {selectedObjects.length}개
          </div>
        </div> */}
        <span className="bg-gray-100 p-1">작업불가사유</span>
        <textarea
          placeholder="입력"
          className="h-40 w-full rounded-md border border-gray-300 p-2"
        />
        <button className="w-full bg-red-500 p-1 text-white hover:bg-red-600">
          작업불가
        </button>
        <button className="w-full bg-sky-500 p-1 text-white hover:bg-sky-600">
          제출
        </button>
      </div>
    </div>
  );
};

export default JobPage;
