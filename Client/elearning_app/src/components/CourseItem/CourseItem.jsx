import React from "react";

export default function MediaCard({ course, base_url }) {
  return (
    <div className="w-[300px] h-[400px] bg-white rounded-lg shadow-md flex flex-col justify-between">
      <img
        src={`${base_url}/${course.image}`}
        alt={course.title}
        className="w-full h-[140px] object-contain bg-gray-200 rounded-t-lg"
      />

      
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {course.price}$
        </h3>
        <p className="text-gray-600 text-sm">{course.description}</p>
      </div>

      <div className="flex justify-between p-4">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Add to cart
        </button>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Detail
        </button>
      </div>
    </div>
  );
}