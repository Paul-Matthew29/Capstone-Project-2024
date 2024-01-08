import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BsCircleFill, BsSquareFill, BsDiamondFill, BsPentagonFill, BsTriangleFill } from 'react-icons/bs';

const CompareResult = () => {
  const location = useLocation();
  const link1 = new URLSearchParams(location.search).get('link1');
  const link2 = new URLSearchParams(location.search).get('link2');
  const [result1, setResult1] = useState({});
  const [result2, setResult2] = useState({});
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const getRatingPercentage = (pagemap, link) => {
    const ogImage = pagemap?.metatags?.find(tag => tag['og:image'])?.['og:image'];
    const ogDescription = pagemap?.metatags?.find(tag => tag['og:description'])?.['og:description'];
    const ogAuthor = pagemap?.metatags?.find(tag => tag['author'])?.['author'];
    const pubdate = pagemap?.metatags?.find(tag => tag['og:pubdate'])?.['og:pubdate'];
    const url = link;
    const ogType = pagemap?.metatags?.find(tag => tag['og:type'])?.['og:type'];

    let rating = 100;

    if (!ogImage) rating -= 5;
    if (!ogDescription) rating -= 15;
    if (!ogAuthor) rating -= 5;
    if (!pubdate) rating -= 15;

    if (url && url.startsWith('https://')) {
    } else if (url && url.startsWith('http://')) {
      rating -= 40;
    }

    const trustedDomains = [
      '.inquirer.net',
      '.cnnphilippines.com',
      '.news.abs-cbn.com',
      '.gmanetwork.com',
    ];

    if (url && trustedDomains.some((domain) => url.includes(domain))) {
    } else {
      rating -= 20;
    }

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
      return 'green-500'; // Mostly True
    } else if (rating > 80 && rating <= 100) {
      return 'blue-500'; // True
    } else {
      return 'gray-500'; // Default or other cases
    }
  };

  const getProgressColor = (metricScore) => {
    if (metricScore >= 81 && metricScore <= 100) {
      return 'blue'; // Blue
    } else if (metricScore >= 61 && metricScore <= 80) {
      return 'green'; // Green
    } else if (metricScore >= 41 && metricScore <= 60) {
      return 'yellow'; // Yellow
    } else if (metricScore >= 21 && metricScore <= 40) {
      return 'orange'; // Orange
    } else {
      return 'red'; // Red
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

  const fetchSearchResults = async (link, setResult) => {
    try {
      const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(link)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=${process.env.REACT_APP_CUSTOM_SEARCH_ID}`;
      const response = await axios.get(apiUrl);
      setResult(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const fetchResultsWithDelay = async (link, setResult, setLoading) => {
    try {
      setLoading(true);
      await fetchSearchResults(link, setResult);
    } catch (error) {
      console.error('Error fetching search results with delay:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayBetweenRequests = 1000;

    const fetchBothResults = async () => {
      await fetchResultsWithDelay(link1, setResult1, setLoading1);
      await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
      await fetchResultsWithDelay(link2, setResult2, setLoading2);
    };

    fetchBothResults();
  }, [link1, link2]);

// Icon Rating
const IconRating = () => (
  <div className="flex items-center space-x-3 text-xs">
    <div className="flex items-center space-x-1">
      <BsCircleFill title="True" className="text-blue-500" size={16} />
      <span>100% - 81%</span>
    </div>
    <div className="flex items-center space-x-1">
      <BsSquareFill title="Mostly True" className="text-green-500" size={16} />
      <span>80% - 61%</span>
    </div>
    <div className="flex items-center space-x-1">
      <BsDiamondFill title="Half True" className="text-yellow-500 transform rotate-45" size={16} />
      <span>60% - 41%</span>
    </div>
    <div className="flex items-center space-x-1">
      <BsPentagonFill title="False" className="text-orange-500" size={16} />
      <span>40% - 21%</span>
    </div>
    <div className="flex items-center space-x-1">
      <BsTriangleFill title="Missing Context/Unidentified" className="text-red-500" size={16} />
      <span>20% - 0%</span>
    </div>
  </div>
);

  const renderResult = (result, loading) => {
    const metricScore = loading ? 0 : getRatingPercentage(result.pagemap, result.link);
    const ratingColor = loading ? 'gray' : getProgressColor(metricScore);

    return (
      <div className={`bg-white p-4 rounded shadow-md mb-8 ${loading ? 'animate-pulse' : ''}`}>
        <div className="flex items-center flex-col mb-4"> {/* Center the circular progress bar */}
          {loading ? (
            <div className="h-8 w-8 bg-gray-300 rounded-full mb-2"></div>
          ) : (
            <div style={{ width: '125px', height: '125px' }}>
              <CircularProgressbar
                value={metricScore}
                text={`${metricScore}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '100%', height: '100%' },
                  path: { stroke: ratingColor },
                  text: { fill: '#000', fontSize: '14px' },
                }}
              />
            </div>
          )}
          <h2 className={`text-xl font-bold mt-5 ${loading ? 'bg-gray-300 h-6 w-36 rounded' : ''}`}>
            {loading ? '' : 'Metric Score'}
          </h2>
          {loading ? (
            <p className="text-gray-600 text-sm mt-2 mb-3"></p>
          ) : (
            <>
            
              <p className="text-gray-600 text-center text-sm mt-2 mb-3">
                The metric score reflects the reliability of the information found on the provided links.
                It is calculated based on the presence or absence of key metadata on the web page.
              </p>
              {/* Icon Rating */}
              <IconRating />
            </>
          )}
        </div>
        
        {loading ? (
          <div className="border-b border-gray-300 mb-4 h-6 bg-gray-300 rounded"></div>
        ) : (
          <div className="border-b border-gray-300 mb-4"></div>
        )}

        {loading ? (
          
          <div className="mb-4 h-40 bg-gray-300 rounded"></div>
        ) : (
          <div className="mb-4">
            {result.pagemap?.cse_image && (
              <img
                src={result.pagemap?.cse_image[0]?.src}
                alt="Result Thumbnail"
                className="object-cover w-full h-40 rounded"
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        )}

        {loading ? (
          <div className="border-b border-gray-300 mb-4 h-6 bg-gray-300 rounded"></div>
        ) : (
          <div className="border-b border-gray-300 mb-4"></div>
        )}

        {loading ? (
          <div className="h-4 bg-gray-300 w-3/4 rounded mb-4"></div>
        ) : (
          result.pagemap?.metatags && (
            <div>
              <p className="text-black text-lg font-semibold mb-2 block">
                {result.pagemap?.metatags[0]['og:title'] || result.htmlTitle || 'Untitled'}
              </p>
              <p className="text-gray-600 text-sm">
                {result.pagemap?.metatags && result.pagemap?.metatags[0]['og:description']}
              </p>
              {result.pagemap?.metatags && result.pagemap?.metatags[0]['og:type'] && (
                <p>Type: {result.pagemap?.metatags[0]['og:type'].charAt(0).toUpperCase() + result.pagemap?.metatags[0]['og:type'].slice(1)}</p>
              )}
              {result.pagemap?.metatags && result.pagemap?.metatags[0]['author'] && (
                <p>Author: {result.pagemap?.metatags[0]['author']}</p>
              )}
              {result.pagemap?.metatags && result.pagemap?.metatags[0]['og:pubtime'] && (
                <p>Published Date: {new Date(result.pagemap?.metatags[0]['og:pubtime']).toLocaleDateString()}</p>
              )}
              {result.pagemap?.metatags && result.pagemap?.metatags[0]['og:url'] && (
                <p className="text-sm text-blue-600">
                <span className="font-bold">Source:</span> {' '}
                <a
                  href={result.pagemap?.metatags[0]['og:url']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all"
                >
                  {result.pagemap?.metatags[0]['og:url']}
                </a>
              </p>
              )}
            </div>
          )
        )}

        {loading ? (
          <div className="h-4 bg-gray-300 w-3/4 rounded mb-4"></div>
        ) : (
          result.pagemap?.metatags && (
            <div>
              {getRatingPercentage(result.pagemap, result.link) > 100 && (
                <div className="mt-2 text-green-500">
                  <strong>Present Fields:</strong>
                  {Object.keys(result.pagemap.metatags[0]).length > 0 ? (
                    Object.keys(result.pagemap.metatags[0]).map((field, index) => (
                      <p key={index}>
                        {field}: {result.pagemap.metatags[0][field]}
                      </p>
                    ))
                  ) : (
                    <p>No present fields available.</p>
                  )}
                </div>
              )}
              {getRatingPercentage(result.pagemap, result.link) < 100 && (
                <div className="mt-2 text-red-500">
                  <strong>Missing Fields:</strong>
                  {getMissingFields(result.pagemap, getRatingPercentage(result.pagemap, result.link)).map(
                    (field, index) => (
                      <span key={index}>{field}{index !== getMissingFields(result.pagemap, getRatingPercentage(result.pagemap, result.link)).length - 1 ? ', ' : ''}</span>
                    )
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Comparison Results</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
          <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4"></h2>
          {result1 && renderResult(result1, loading1)}
        </div>
        <div className="md:w-1/2 pl-0 md:pl-4">
          <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4"></h2>
          {result2 && renderResult(result2, loading2)}
        </div>
      </div>
    </div>
  );
};
  

export default CompareResult;
