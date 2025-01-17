import React from 'react';

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-15 items-center">
        
        {/* Timeline Section */}
        <div className="w-full lg:w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-col lg:flex-row gap-6" key={index}>
                
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center">
                  <img src={element.Logo} alt={element.heading} className="w-full h-full object-contain" />
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                  <p className="text-base">{element.Description}</p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Image Section */}
        <div className="relative w-full lg:w-[55%] shadow-lg">
          <img
            src={timelineImage}
            alt="Timeline"
            className="shadow-white object-cover w-full h-full lg:h-[auto] rounded-md"
          />
          
          {/* Stats Overlay */}
          <div className="absolute bg-caribbeangreen-700 flex flex-col lg:flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%] lg:w-[70%] w-full text-center lg:text-left">
            <div className="flex flex-row lg:flex-col gap-5 items-center border-b lg:border-b-0 lg:border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
            </div>

            <div className="flex flex-row lg:flex-col gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">Types of Courses</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TimelineSection;
