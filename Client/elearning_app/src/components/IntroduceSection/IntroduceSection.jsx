import React from "react";
import { Link } from "react-router-dom";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
const IntroduceSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <div className="h-[600px] w-full hidden md:block">
          <img
            src="https://plus.unsplash.com/premium_photo-1669627149039-dfb49daf1301?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="px-8 py-8">
          <h1 className="text-5xl text-black text-left font-mono font-bold">
            What Kind of Courses Offers
          </h1>
          <h2 className="text-3xl text-blue-700 font-mono mb-2">
            Learning Platform
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            voluptate iure mollitia saepe in explicabo, ad consectetur,
            accusantium ducimus deserunt sunt inventore nihil maxime nulla
            numquam! Praesentium exercitationem omnis nihil?
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
           
            <p className="bg-blue-700 text-white px-4 py-6 rounded "> <LaptopChromebookIcon/> 1500+ Courese</p>
            <p className="bg-blue-700 text-white px-4 py-6 rounded "><VideoLibraryIcon/> 200+ Free Videos</p>
            <p className="bg-blue-700 text-white px-4 py-6 rounded "><PlayLessonIcon/> 10K Lesson</p>
            <p className="bg-blue-700 text-white px-4 py-6 rounded "><GroupsIcon/> Qualitied Teaches</p>
          </div>
          <div className="mt-10">
            <Link className="border border-blue-900 px-4 py-4 rounded" to="/courses">
              Explore More <ArrowRightAltIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroduceSection;
