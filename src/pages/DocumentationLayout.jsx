// DocumentationLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const DocumentationLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left-side Navbar */}
      <div className="w-1/4 bg-gray-200 p-4">
        {/* Your navbar content goes here */}
        <ul>
          <li><Link to="/section1">Section 1</Link></li>
          <li><Link to="/section2">Section 2</Link></li>
          {/* Add more sections as needed */}
        </ul>
      </div>

      {/* Right-side Content */}
      <div className="w-3/4 p-4">
        {/* Your documentation content goes here */}
        {children}
      </div>
    </div>
  );
};

export default DocumentationLayout;
