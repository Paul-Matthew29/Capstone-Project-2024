import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = ['img1.png', 'img2.png', 'img3.png'];

  const handleImageChange = (index) => {
    setActiveImageIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeImageIndex + 1) % images.length;
      setActiveImageIndex(nextIndex);
    }, 7000);

    return () => clearInterval(interval);
  }, [activeImageIndex, images.length]);

  return (
    <div className="flex flex-col bg-gray-100">
      <section className="min-h-screen bg-gray-200 p-3 md:p-6 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <img
            src={images[activeImageIndex]}
            alt={`Slider Image ${activeImageIndex + 1}`}
            className="w-full h-auto max-w-full max-h-55 rounded-lg"
          />
          <div className="flex mt-2 justify-center">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageChange(index)}
                className={`w-4 h-4 rounded-full mx-1 cursor-pointer ${
                  index === activeImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 flex flex-col items-center">
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-gray-800 text-center">
            Why Fact-Checking is Essential
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 text-center">
            In today's digital landscape, misinformation can spread rapidly. It is crucial to verify information before believing or sharing it. Here are some reasons why fact-checking is essential:
          </p>
          <ul className="list-disc ml-6 mt-4 text-sm md:text-base lg:text-lg text-left">
    <li className="text-sm md:text-base lg:text-lg">Preserve your credibility and trustworthiness.</li>
    <li className="text-sm md:text-base lg:text-lg">Combat the spread of false information.</li>
    <li className="text-sm md:text-base lg:text-lg">Promote a more informed and responsible online community.</li>
    <li className="text-sm md:text-base lg:text-lg">Enhance critical thinking skills.</li>
    <li className="text-sm md:text-base lg:text-lg">Contribute to a healthier and more reliable digital space.</li>
  </ul>

</div>
      </section>

      {/* Section 2 */}
      <section className="min-h-screen bg-gray-300 p-6 flex items-center justify-center">
        <div className="max-w-full md:max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center">
          {/* Left Side (Image) */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-4 md:mb-0">
            <img
              src="Learn.png"
              alt="Veracity Image"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right Side (Content) */}
          <div className="w-full md:w-1/2 pl-0 md:pl-8 flex flex-col items-center">
            <h2 className="text-xl md:text-4xl font-bold mb-4 text-gray-800">How to Use Veracity</h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">
              Veracity is a powerful system designed to help you manage and analyze data efficiently.
              Follow these steps to get started:
            </p>
            <ol className="list-decimal ml-6 mt-4 text-sm md:text-base lg:text-lg text-left">
              <li className="text-sm md:text-base lg:text-lg">Click Search Icon on top of your page.</li>
              <li className="text-sm md:text-base lg:text-lg">Put a topic, articles, news and person on Search</li>
              <li className="text-sm md:text-base lg:text-lg">The Veracity will provide a rating on Search Result including the Compare Result</li>
              <li className="text-sm md:text-base lg:text-lg">Click Compare Result on navigation bar.</li>
              <li className="text-sm md:text-base lg:text-lg">Put two link on Compare Result Modal.</li>
            </ol>
            {/* Learn More Button */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            <Link to="/documentation#Veracity">Learn More</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="min-h-screen bg-gray-400 p-6 flex items-center justify-center">
        <div className="max-w-full md:max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center">
          {/* Left Side (Content) */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-4 md:mb-0 flex flex-col items-center">
            <h2 className="text-xl md:text-4xl font-bold mb-4 text-gray-800">The Importance of Recognizing Fake News</h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">
              In today's digital age, misinformation and fake news are prevalent. It's crucial to be aware of the following:
            </p>
            <ul className="list-disc ml-6 mt-4 text-sm md:text-base lg:text-lg text-left">
              <li className="text-sm md:text-base lg:text-lg">Verify information from reliable sources before sharing.</li>
              <li className="text-sm md:text-base lg:text-lg">Understand the impact of false information on public perception.</li>
              <li className="text-sm md:text-base lg:text-lg">Develop critical thinking skills to discern fact from fiction.</li>
            </ul>
            {/* Learn More Button */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            <Link to="/documentation#Veracity">Learn More</Link>
            </button>
          </div>

          {/* Right Side (Image) */}
          <div className="w-full md:w-1/2 pl-0 md:pl-8">
            <img
              src="News.png"
              alt="Fake News Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

{/* Footer */}
<footer className="bg-gray-900 text-white p-6">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className="md:w-1/2 mb-6 md:mb-0">
      <p className="text-lg md:text-xl lg:text-2xl mb-4">
        Your feedback is invaluable to us! Please take a moment to evaluate our website.
        Your insights help us improve and provide you with a better experience.
      </p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfqNwob0bHoXJdwYvtPBRpGSOwrTwsYfQOaOZy9bnrS6vghkQ/viewform?usp=sf_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Evaluate Now
        </button>
      </a>
    </div>
    <div className="md:w-1/2 flex justify-center md:justify-end">

    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;
