import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllSectionByUserCourse,
  getVideosBySection,
  markVideoCompleted,
  submitQuizze,
  userCourses,
} from "../../redux/AuthSlice/AuthSlice";
import Header from "../../components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseUserDetail = () => {
  const { courseSections, quizResult } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const base_url = import.meta.env.VITE_API_URL_BE;

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedQuizze, setSelectedQuizze] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (courseId) {
      dispatch(getAllSectionByUserCourse({ courseId }));
    }
  }, [dispatch, courseId]);

  const handleCompleteVideo = (videoId, enrollmentId) => {
    dispatch(markVideoCompleted({ videoId, enrollmentId }));
    dispatch(getAllSectionByUserCourse({ courseId }));
    dispatch(userCourses());
    toast.success("Bạn dã hoàn thành video này");
  };

  const handleQuizClick = (quiz) => {
    setSelectedQuizze(quiz);
    setSelectedVideo(null);
    setActiveSection(quiz.sectionId);
    setQuizAnswers({});
    setIsSubmitted(false);
  };

  const handleSubmitQuiz = (quizzeId) => {
    const answers = selectedQuizze.questions.map((q) => ({
      questionId: q.id,
      answerId: quizAnswers[q.id],
    }));
    dispatch(submitQuizze({ quizzeId, answers })).then(() => {
      setIsSubmitted(true);
      toast.success("Nộp bài thành công", {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  const handleSectionClick = (sectionId) => {
    dispatch(getVideosBySection({ sectionId, courseId }));
    setActiveSection(sectionId);
    setSelectedQuizze(null);
    setIsSubmitted(false);
    setQuizAnswers({});
  };

  const handleVideoClick = (video) => {
    console.log(video);
    setSelectedVideo(video);
    setSelectedQuizze(null);
    setIsSubmitted(false);
  };

  const enrollmentId =
    courseSections.map((item) => item?.Enrollment?.id)[0] || null;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex gap-4 h-[calc(100vh-64px)]">
        <div className="w-3/4 bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
          {selectedQuizze ? (
            <div>
              <h2 className="text-lg font-bold mb-4">
                {selectedQuizze.quizzeName}
              </h2>
              {selectedQuizze.questions.map((question, idx) => {
                const result = quizResult?.detailResults?.find(
                  (r) => r.questionId === question.id
                );
                const selectedAns = quizAnswers[question.id];

                return (
                  <div key={question.id} className="mb-4">
                    <p className="font-medium">
                      {idx + 1}. {question.questionText} –{" "}
                      {question.questionScore}
                    </p>
                    {question.answers.map((answer) => {
                      let style = "";
                      if (isSubmitted && result) {
                        if (answer.id === result.correctAnswerId) {
                          style = "text-green-600 font-bold";
                        } else if (
                          answer.id === selectedAns &&
                          !result.isCorrect
                        ) {
                          style = "text-red-600 font-bold";
                        }
                      }

                      return (
                        <div key={answer.id} className={style}>
                          <label>
                            <input
                              type="radio"
                              name={`q_${question.id}`}
                              value={answer.id}
                              checked={selectedAns === answer.id}
                              disabled={isSubmitted}
                              onChange={() =>
                                setQuizAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: answer.id,
                                }))
                              }
                              className="mr-2"
                            />
                            {answer.answerText}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                disabled={isSubmitted}
                onClick={() => handleSubmitQuiz(selectedQuizze.id)}
              >
                Nộp bài
              </button>

              {isSubmitted && quizResult && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Kết quả</h3>
                  <p>
                    Điểm: {quizResult.score} — Đúng: {quizResult.correctCount}/
                    {quizResult.totalQuestion}
                  </p>
                </div>
              )}
            </div>
          ) : selectedVideo ? (
            <>
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <video
                  controls
                  src={`${base_url}/${selectedVideo.path}`}
                  className="absolute top-0 left-0 w-full h-full rounded-md object-contain"
                  autoPlay
                />
              </div>
              <button
                className="mt-6 self-end bg-green-600 text-white px-4 py-2 rounded"
                onClick={() =>
                  handleCompleteVideo(selectedVideo.id, enrollmentId)
                }
              >
                ✅ Done
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              Chọn phần học hoặc quiz để bắt đầu.
            </div>
          )}
        </div>

        <div className="w-1/4 bg-white rounded-lg shadow-md p-4 overflow-y-auto">
          {courseSections.length > 0 ? (
            courseSections.map((section) => (
              <div key={section.id} className="mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  {section.title}
                </h3>
                {section.sections.map((sec) => (
                  <div key={sec.id}>
                    <div
                      className={`pl-2 py-2 rounded cursor-pointer ${
                        activeSection === sec.id
                          ? "bg-blue-100 text-blue-800"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSectionClick(sec.id)}
                    >
                      {sec.sectionName}
                    </div>
                    {activeSection === sec.id && (
                      <>
                        <div className="ml-4 mt-1 space-y-1">
                          {sec.video.map((v) => (
                            <div
                              key={v.id}
                              className={`pl-2 py-1 cursor-pointer rounded flex justify-between items-center ${
                                selectedVideo?.id === v.id
                                  ? "bg-gray-200"
                                  : "hover:bg-gray-100"
                              }`}
                              onClick={() => handleVideoClick(v)}
                            >
                              <p className="text-xs text-gray-600">
                                {v.videoName} –{" "}
                                {v.completed ? "Hoàn thành" : "Chưa xong"}
                              </p>
                            </div>
                          ))}
                        </div>
                        {sec.quizzes?.length > 0 && (
                          <div className="ml-4 mt-2">
                            <h5 className="text-xs font-medium text-gray-600">
                              Quizzes
                            </h5>
                            {sec.quizzes.map((qz) => (
                              <div
                                key={qz.id}
                                className="pl-2 py-1 cursor-pointer rounded hover:bg-gray-100"
                                onClick={() => handleQuizClick(qz)}
                              >
                                <p className="text-xs text-gray-600">
                                  {qz.quizzeName}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-600">Chưa có nội dung khóa học.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CourseUserDetail;
