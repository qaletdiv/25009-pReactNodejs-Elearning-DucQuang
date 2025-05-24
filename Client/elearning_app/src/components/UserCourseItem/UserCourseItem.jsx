import React from "react";

export default function UserCourseItem({ userCourse, base_url }) {

  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-102 bg-white">
      <img
        src={`${base_url}/${userCourse.image}`}
        alt={userCourse.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {userCourse.title}
        </h3>
        <p className="text-gray-600 text-sm h-16 overflow-hidden">
          {userCourse.description}
        </p>

        <div className="mt-4">
          <div className="text-sm text-gray-700 mb-1">
            Tiến độ: {userCourse.Enrollment.inProgess}% - {userCourse.Enrollment.status}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${userCourse.inProgess}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-4 pb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Tiếp tục học
        </button>
      </div>
    </div>
  );
}