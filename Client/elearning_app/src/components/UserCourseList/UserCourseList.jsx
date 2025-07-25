import React from "react";
import UserCourseItem from "../UserCourseItem/UserCourseItem";

const UserCourseList = ({ userCourse }) => {
  const base_url = import.meta.env.VITE_API_URL_BE;

  return (
    <>
      <div className="flex gap-6 container mx-auto flex-wrap justify-center">
        {userCourse?.courses?.map((userCourse) => (
          <UserCourseItem
            className=""
            key={userCourse.id}
            userCourse={userCourse}
            base_url={base_url}
          />
        ))}
      </div>
    </>
  );
};

export default UserCourseList;
