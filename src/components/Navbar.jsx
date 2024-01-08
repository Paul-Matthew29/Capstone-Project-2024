import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch, BsX, BsList } from 'react-icons/bs';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCompareResultModalOpen, setIsCompareResultModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');
  const navigate = useNavigate();
  const [searchError, setSearchError] = useState('');
  const [compareError, setCompareError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  const toggleCompareResultModal = () => {
    setIsCompareResultModalOpen(!isCompareResultModalOpen);
  };

  const isURL = (str) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(str);
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() !== '') {
        if (!isURL(searchQuery)) {
          // Proceed with navigation only if it's not a URL
          const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery).slice(0, 3)];
  
          setSearchHistory(updatedHistory);
  
          // Don't close the modal here
  
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?&key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=${process.env.REACT_APP_CUSTOM_SEARCH_ID}&q=${searchQuery}`
          );
  
          if (!response.ok) {
            throw new Error('Failed to fetch search results');
          }
  
          // Perform the navigation only if there is no error
          await navigate(`/searchresult?query=${encodeURIComponent(searchQuery)}`);
  
          // Close the modal after navigation is complete
          setIsSearchModalOpen(false);
        } else {
          // Show an error if it's a URL
          setSearchError('Please enter a valid search query, not a URL.');
        }
      } else {
        setSearchError('Please enter a search query.');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setSearchError('Queries already used. Please try again later.');
        // Prevent navigation in case of a 429 error
        return;
      } else {
        // Handle other errors
        setSearchError('Queries already used. Please try again later');
      }
    }
  };
  
  

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?&key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=${process.env.REACT_APP_CUSTOM_SEARCH_ID}&q=${query}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      const suggestedQueries = data.items.map((item) => item.title);
      setSuggestions(suggestedQueries);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchError(''); // Reset search error when input changes

    // Fetch suggestions for the entered query
    if (query.trim() !== '') {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };
  const handleCompareResultSubmit = async () => {
    try {
      if (link1.trim() !== '' && link2.trim() !== '') {
        // Fetch data from Google Custom Search API for link1
        const responseLink1 = await fetch(`https://www.googleapis.com/customsearch/v1?&key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=${process.env.REACT_APP_CUSTOM_SEARCH_ID}&q=${link1}`);
        if (responseLink1.status === 429) {
          setCompareError('Queries already used. Please try again later.');
          return; // Stop execution if link1 has a 429 status code
        }
  
        // You can navigate to the CompareResult.jsx component with link1 and link2 values
        await navigate(`/compareresult?link1=${encodeURIComponent(link1)}&link2=${encodeURIComponent(link2)}`);
        // Close the Compare Modal after submitting
        setIsCompareResultModalOpen(false);
      } else {
        // Set an error message when either link1 or link2 is empty
        setCompareError('Please enter both link 1 and link 2.');
      }
    } catch (error) {
      // Handle other errors
      setCompareError('An error occurred. Please try again.');
    }
  };
  

    // Update the onChange handlers for the link input fields to reset the compare error
    const handleLink1Change = (e) => {
      setLink1(e.target.value);
      setCompareError(''); // Reset compare error when link1 changes
    };
  
    const handleLink2Change = (e) => {
      setLink2(e.target.value);
      setCompareError(''); // Reset compare error when link2 changes
    };
  

  const handleHistoryItemClick = (query) => {
    setSearchQuery(query);
    handleSearch();
  };

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
    handleSearch();
  };

  const removeHistoryItem = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isSearchModalOpen || isCompareResultModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isSearchModalOpen, isCompareResultModalOpen]);

  return (
    <nav className={`bg-${isDarkMode ? 'gray-900' : 'gray-100'} p-4 flex justify-between items-center text-${isDarkMode ? 'white' : 'black'}`}>
      <div className="flex items-center">
        <img
          src="/veracity.png"
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Veracity</span>
      </div>

      <div className="flex items-center space-x-4">
        <BsList
          className={`h-6 w-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'} md:hidden`}
          onClick={toggleMobileMenu}
        />
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/">
            <a href="#" className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Home
            </a>
          </Link>

            <a
              href="#"
              className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ml-2`}
              onClick={toggleCompareResultModal}
            >
              Compare Result
            </a>

          <Link to="/documentation">
            <a href="#" className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ml-2`}>
              Documentation
            </a>
          </Link>
        </div>
        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>|</span>
        <BsSearch
          className={`h-4 w-4 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}
          style={{ fontSize: '16px' }}
          onClick={toggleSearchModal}
        />
        <span
          role="button"
          className={`cursor-pointer ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </span>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 bg-white p-4 shadow-md rounded-md">
          <Link to="/">
            <a
              href="#"
              className={`block text-${isDarkMode ? 'white' : 'black'} mb-2 py-2 border-b border-gray-300`}
              onClick={toggleMobileMenu}
            >
              Home
            </a>
          </Link>

            <a
              href="#"
              className={`block text-${isDarkMode ? 'white' : 'black'} mb-2 py-2 border-b border-gray-300`}
              onClick={() => {
                toggleMobileMenu();
                toggleCompareResultModal();
              }}
            >
              Compare Result
            </a>

          <Link to="/documentation">
            <a
              href="#"
              className={`block text-${isDarkMode ? 'white' : 'black'} py-2`}
              onClick={toggleMobileMenu}
            >
              Documentation
            </a>
          </Link>
        </div>
      )}

{isSearchModalOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-lg" style={{ width: '758px', height: '561px' }}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Search</h2>
              <button
                onClick={toggleSearchModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <BsX className="h-6 w-6" />
              </button>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type your search query"
                className="border p-2 flex-1 mr-4"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </div>
            {searchError && <p className="text-red-500 mt-2">{searchError}</p>}
            <div className="border-b mt-4 mb-4"></div>

            {searchQuery.trim() !== '' && (
              <div className="flex flex-col mt-4 overflow-auto max-h-48">
                <span className="text-gray-600 mb-2">Search Suggestions:</span>
                <ul className="list-disc list-inside">
                {suggestions.map((query, index) => (
                <li
                  key={index}
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => handleSuggestionClick(query)}
                >
                  {query}
                </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col mt-4 overflow-auto max-h-48">
              <span className="text-gray-600 mb-2">Search History:</span>
              <ul className="list-disc list-inside">
                {searchHistory.map((query, index) => (
                  <li key={index} className="flex items-center">
                    <span
                      className="text-blue-500 cursor-pointer hover:underline"
                      onClick={() => handleHistoryItemClick(query)}
                    >
                      {query}
                    </span>
                    <span
                      className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={() => removeHistoryItem(index)}
                    >
                      <BsX className="h-4 w-4" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}

      {isCompareResultModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-lg" style={{ width: '758px', height: '300px' }}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Compare Result</h2>
                <button
                  onClick={toggleCompareResultModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <BsX className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col">
              <input
                type="text"
                placeholder="Paste link 1 here"
                className="border p-2 mb-4"
                value={link1}
                onChange={handleLink1Change}
              />
              <input
                type="text"
                placeholder="Paste link 2 here"
                className="border p-2 mb-4"
                value={link2}
                onChange={handleLink2Change}
              />
              {compareError && <p className="text-red-500 mt-1 mb-3">{compareError}</p>}
              <button
                onClick={handleCompareResultSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
