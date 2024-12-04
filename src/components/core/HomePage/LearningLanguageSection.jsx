import React from 'react';
import HighlightText from './HighlightText';
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../HomePage/Button";

const LearningLanguageSection = () => {
    return (
        <div className='mt-[130px] mb-32'>
            <div className='flex flex-col gap-5 items-center'>
                <div className='text-4xl font-semibold text-center'>
                    Your Swiss Knife for
                    <HighlightText text={" learning any language"} />
                </div>
                <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                    Using spin making learning multiple languages easy. With 20+ languages, realistic voice-over, progress tracking, custom schedule, and more.
                </div>

                {/* Images Section */}
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-5 justify-center mt-8'>
                    <img
                        src={know_your_progress}
                        alt="KnowYourProgressImage"
                        className='object-contain w-full lg:w-[30%] mx-auto lg:-mr-32'
                    />
                    <img
                        src={compare_with_others}
                        alt="CompareWithOthersImage"
                        className='object-contain w-full lg:w-[30%] mx-auto'
                    />
                    <img
                        src={plan_your_lesson}
                        alt="PlanYourLessonImage"
                        className='object-contain w-full lg:w-[30%] mx-auto lg:-ml-36'
                    />
                </div>

                {/* CTA Button */}
                <div className='w-fit mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>Learn more</div>
                    </CTAButton>
                </div>
            </div>
        </div>
    );
};

export default LearningLanguageSection;
