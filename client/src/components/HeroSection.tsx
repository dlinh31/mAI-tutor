import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            SWE 1
          </h1>
          <p className="mb-8 leading-relaxed">
            Integrate AI into your daily tasks, schedule with ease, and collaborate in real-time.
          </p>
          <div className="flex justify-center">
            {/* Insert any call to action here */}
          </div>
        </div>
        {/* You might want an image or graphic on the other half */}
      </div>
    </section>
  );
};

export default HeroSection;
