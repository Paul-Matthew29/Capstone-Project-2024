// SearchResult.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [searchResults, setSearchResults] = useState([]);

  const getRatingPercentage = (pagemap, link) => {
    const ogImage = pagemap?.metatags?.find(tag => tag['og:image'])?.['og:image'];
    const ogDescription = pagemap?.metatags?.find(tag => tag['og:description'])?.['og:description'];
    const ogAuthor = pagemap?.metatags?.find(tag => tag['author'])?.['author'];
    const pubdate = pagemap?.metatags?.find(tag => tag['og:pubdate'])?.['og:pubdate'];
    const ogType = pagemap?.metatags?.find(tag => tag['og:type'])?.['og:type'];
    let rating = 100;

    if (!ogImage) rating -= 5;
    if (!ogDescription) rating -= 15;
    if (!ogAuthor) rating -= 5;
    if (!pubdate) rating -= 15;

    if (link.startsWith('https://')) {
      // If it's HTTPS, don't decrease by 40%
    } else if (link.startsWith('http://')) {
      // If it's HTTP, decrease by 40%
      rating -= 40;
    }

    const trustedDomains = [
      '.inquirer.net',
      'www.cnnphilippines.com',
      '.news.abs-cbn.com',
      '.gmanetwork.com',
      '.cnnphilippines.com/entertainment',
    ];

    // Check if the link's domain is in the trustedDomains list
    const isTrustedDomain = trustedDomains.some((domain) => link.includes(domain));

    // Adjust the logic based on whether it's a trusted domain
    if (isTrustedDomain) {
      // If the URL domain is trusted, don't decrease by 20%
    } else {
      // If the URL domain is not trusted, decrease by 20%
      rating -= 20;
    }
    
    /*
    console.log('Link:', link);
    console.log('Is Trusted Domain:', isTrustedDomain);
    */

    return Math.max(0, rating);
  };

  const getRatingColor = (rating) => {
    if (rating >= 0 && rating <= 20) {
      return 'red-500'; // Missing Context/Unidentified
    } else if (rating > 20 && rating <= 40) {
      return 'orange-500'; // False
    } else if (rating > 40 && rating <= 60) {
      return 'yellow-500'; // Half True
    } else if (rating > 60 && rating <= 80) {
      return 'blue-500'; // Mostly True
    } else if (rating > 80 && rating <= 100) {
      return 'green-500'; // True
    } else {
      return 'gray-500'; // Default or other cases
    }
  };

  const getRatingText = (rating) => {
    if (rating >= 0 && rating <= 20) {
      return 'Missing Context/Unidentified';
    } else if (rating > 20 && rating <= 40) {
      return 'False';
    } else if (rating > 40 && rating <= 60) {
      return 'Half True';
    } else if (rating > 60 && rating <= 80) {
      return 'Mostly True';
    } else if (rating > 80 && rating <= 100) {
      return 'True';
    } else {
      return 'N/A';
    }
  };

  const getMissingFields = (pagemap, rating) => {
    const missingFields = [];

    if (rating < 100) {
      if (!pagemap?.metatags?.find(tag => tag['og:image'])) missingFields.push('Image');
      if (!pagemap?.metatags?.find(tag => tag['og:description'])) missingFields.push('Description');
      if (!pagemap?.metatags?.find(tag => tag['author'])) missingFields.push('Author');
      if (!pagemap?.metatags?.find(tag => tag['og:pubdate'])) missingFields.push('Published Date');
    }

    return missingFields;
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=${process.env.REACT_APP_CUSTOM_SEARCH_ID}`;

        const response = await axios.get(apiUrl);
        setSearchResults(response.data.items);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="container mx-auto my-4 p-4">
      <h1 className="text-2xl font-bold mb-2">Search Result for: {searchQuery}</h1>
      {searchResults.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((result) => (
            <div key={result.link} className="bg-white p-4 rounded shadow-md">
              {result.pagemap.cse_image && (
                <img
                  src={result.pagemap.cse_image[0].src}
                  alt="Result Thumbnail"
                  className="mb-2 object-cover w-full h-40 rounded"
                />
              )}
              {result.pagemap.metatags && (
                <div>
                  <p className="text-black text-lg font-semibold mb-2 block">
                    {result.pagemap.metatags[0]['og:title'] || result.htmlTitle || 'Untitled'}
                  </p>
                </div>
              )}
              <p className="text-gray-600 text-sm">
                {result.pagemap.metatags && result.pagemap.metatags[0]['og:description']}
              </p>
              {result.pagemap.metatags && (
                <div>
                  <p>Type: {result.pagemap.metatags[0]['og:type'] && result.pagemap.metatags[0]['og:type'].charAt(0).toUpperCase() + result.pagemap.metatags[0]['og:type'].slice(1)}</p>
                  <p>Author: {result.pagemap.metatags[0]['author']}</p>
                  <p>Published Date: {new Date(result.pagemap.metatags[0]['og:pubtime']).toLocaleDateString()}</p>
                  <p>
                    <a
                      href={result.pagemap.metatags[0]['og:url']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      See More
                    </a>
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="border-t border-gray-300 w-full my-2" />
                    <span className="text-gray-500 ml-2">
                      <strong>Rating:</strong> {getRatingPercentage(result.pagemap, result.link)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className={`font-bold text-${getRatingColor(getRatingPercentage(result.pagemap, result.link))}`}>
                      {getRatingText(getRatingPercentage(result.pagemap, result.link))}
                    </span>
                  </div>
                  {result.pagemap && getRatingPercentage(result.pagemap, result.link) < 100 && (
                    <div className="mt-2 text-red-500">
                      <strong>Missing Fields:</strong>{' '}
                      {getMissingFields(result.pagemap, getRatingPercentage(result.pagemap, result.link)).map((field, index) => (
                        <span key={index}>{field}{index !== getMissingFields(result.pagemap, getRatingPercentage(result.pagemap, result.link)).length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
