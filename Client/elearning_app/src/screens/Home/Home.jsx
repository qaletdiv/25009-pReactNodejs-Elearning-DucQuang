import React from "react";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import TechSection from "../../components/techSection/techSection";
import IntroduceSection from "../../components/IntroduceSection/IntroduceSection";
import CourseList from "../../components/CourseList/CourseList";
const Home = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Header />
        </div>
        <div>
          <Slider />
        </div>
        {/* <div>
          <TechSection />
        </div> */}
        <div>
          <IntroduceSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
