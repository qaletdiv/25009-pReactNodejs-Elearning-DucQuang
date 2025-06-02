import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllSectionByUserCourse,
  getVideosBySection,
} from "../../redux/AuthSlice/AuthSlice";
import Header from "../../components/Header/Header";

const CourseUserDetail = () => {
  const { courseSections, videosBySection } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const base_url = import.meta.env.VITE_API_URL_BE;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (courseId) {
      dispatch(getAllSectionByUserCourse({ courseId }));
    }
  }, [dispatch, courseId]);

  const handleSectionClick = (sectionId) => {
    dispatch(getVideosBySection({ sectionId, courseId }));
    setActiveSection(sectionId);
    if (videosBySection && videosBySection.length > 0) {
      setSelectedVideo(videosBySection[0]); 
    } else {
      setSelectedVideo(null);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex flex-row gap-4 h-[calc(100vh-64px)]">
        <div className="w-3/4 bg-dark rounded-lg shadow-md p-4">
          {selectedVideo ? (
            <div className="flex flex-col h-[calc(100%-2rem)]">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> 
                <video
                  controls
                  className="absolute top-0 left-0 w-full h-full rounded-md object-contain"
                  src={`${base_url}/${selectedVideo.path}`}
                  autoPlay
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 text-sm h-full flex items-center justify-center">
              Select a section from the right to start watching.
            </div>
          )}
        </div>

        <div className="w-1/4 bg-white rounded-lg shadow-md p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {courseSections?.length > 0 ? (
            <div className="space-y-2">
              {courseSections.map((course) => (
                <div key={course.id}>
                  <h3 className="text-md font-medium text-gray-700 mb-2">
                    {course.title}
                  </h3>
                  {course.sections?.map((section) => (
                    <div key={section.id}>
                      <div
                        className={`pl-2 py-2 cursor-pointer rounded ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-800"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleSectionClick(section.id, section.sectionName)}
                      >
                        <h4 className="text-sm font-medium">
                          {section.sectionName}
                        </h4>
                      </div>
                      {activeSection === section.id && videosBySection?.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {videosBySection.map((video) => (
                            <div
                              key={video.id}
                              className={`pl-2 py-1 cursor-pointer rounded ${
                                selectedVideo?.id === video.id
                                  ? "bg-gray-200"
                                  : "hover:bg-gray-100"
                              }`}
                              onClick={() => handleVideoClick(video)}
                            >
                              <p className="text-xs text-gray-600">{video.videoName}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600 text-sm">No course content available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseUserDetail;