import React from "react";
import { Link } from "react-router-dom";
export default function MediaCard({ course, base_url }) {
  return (
    <div className="w-[300px] h-[400px] bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={`${base_url}/${course.image}`}
        alt={course.title}
        className="w-full h-[160px] object-cover bg-gray-200 rounded-t-xl"
      />

      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 truncate mb-2">
            {course.title}
          </h2>
          <h3 className="text-lg font-semibold text-blue-600 mb-3">
            {course.price}$
          </h3>
          <p className="text-gray-700 text-sm line-clamp-2 mb-3">
            {course.description}
          </p>
          <div className="space-y-2">
            <p className="text-gray-700 text-sm flex items-center">
              Danh mục: {course.category.name}
            </p>
            <p className="text-gray-700 text-sm flex items-center">
              Cấp độ: {course.level.level}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
            Add to cart
          </button>
          <Link to={`/courses/${course.id}`} className=" flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200" >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
