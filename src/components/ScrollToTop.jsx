import React, { useState, useEffect } from 'react';
import { BsArrowUp } from 'react-icons/bs';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-5 right-5 p-2 bg-blue-500 text-white rounded-full cursor-pointer"
          onClick={scrollToTop}
        >
          <BsArrowUp size={24} />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
