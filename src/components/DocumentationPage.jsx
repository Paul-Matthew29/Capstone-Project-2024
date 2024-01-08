import React, { useState } from 'react';

const DocumentationPage = () => {
  const [selectedContent, setSelectedContent] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigationClick = (content) => {
    setSelectedContent(content);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Mobile Navbar */}
      <nav className="bg-blue-500 p-4 block sm:hidden">
        {/* Show only on small screens (hidden on screens larger than or equal to sm) */}
        <div className="flex items-center justify-between">
          <button className="text-white" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-white p-4">
          <ul>
            <li>
              <a
                href="#"
                className={`block text-black mb-2 py-2 border-b border-gray-300 hover:underline ${selectedContent === '' && 'font-bold'}`}
                onClick={() => handleNavigationClick('')}
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block text-black mb-2 py-2 border-b border-gray-300 hover:underline ${selectedContent === 'Veracity' && 'font-bold'}`}
                onClick={() => handleNavigationClick('Veracity')}
              >
                Veracity
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block text-black hover:underline ${selectedContent === 'Rating' && 'font-bold'}`}
                onClick={() => handleNavigationClick('Rating')}
              >
                Rating
              </a>
            </li>
          </ul>
        </div>
      )}
 {/* Content */}
 <div className="flex-1 flex">

  {/* Left side - Document List */}
  <div className="md:w-1/4 p-4 overflow-hidden shadow-lg hidden md:block">

    {/* Search input */}
    <input
      type="text"
      placeholder="Search documents..."
      className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />

    {/* Navigation links */}
    <nav>
      <ul>
        {/* Documentation link */}
        <li className="mb-2">
          <a
            href="#"
            className={`block text-blue-500 hover:underline ${selectedContent === '' && 'font-bold'}`}
            onClick={() => handleNavigationClick('')}
          >
            Documentation
          </a>
        </li>

        {/* Veracity link */}
        <li className="mb-2">
          <a
            href="#"
            className={`block text-blue-500 hover:underline ${selectedContent === 'Veracity' && 'font-bold'}`}
            onClick={() => handleNavigationClick('Veracity')}
          >
            Veracity
          </a>
        </li>

        {/* Rating Scales link */}
        <li>
          <a
            href="#"
            className={`block text-blue-500 hover:underline ${selectedContent === 'Rating' && 'font-bold'}`}
            onClick={() => handleNavigationClick('Rating')}
          >
            Rating
          </a>
        </li>
      </ul>
    </nav>
  </div>


      {/* Right side - Content */}
      <div className="w-3/2 p-4 overflow-y-auto">
        {/* Dynamic content based on the selected navigation item */}
        <div className="documentation-section">
          <h1 className="text-3xl font-bold mb-4">{selectedContent}</h1>
          {selectedContent === 'Veracity' && (
  <div>
{/* Veracity Content */}
<div id="Veracity" className="mt-8 documentation-content p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Veracity Tools and Features</h2>
      <p>
        Welcome to the Veracity section! Explore the following tools and features designed to assess the accuracy and reliability of information:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-4">
          <strong className="text-blue-500">Rating on Search Results:</strong>
          <p>
            Use the Veracity rating feature to evaluate search results directly. This tool provides a quick assessment of the accuracy and reliability of information displayed in search results, helping you make informed decisions at a glance.
          </p>
          {/* Image for Rating on Search Results */}
          <img
            src="RatingSample.png"
            alt="Rating on Search Results"
            className="mt-4 rounded-md shadow-md"
          />
        </li>
        <li className="mb-4">
          <strong className="text-blue-500">Compare Results Modal:</strong>
          <p>
            Enable users to compare multiple search results with the Compare Results Modal. Users can input links to different sources, and the modal will present a side-by-side comparison of the veracity ratings, allowing for a comprehensive analysis of information from various sources.
          </p>
          {/* Image for Compare Results Modal */}
          <img
            src="ComparModal2.png"
            alt="Compare Results Modal2"
            className="mt-4 rounded-md shadow-md"
          />
          {/* Image for Compare Results Modal */}
          <img
            src="CompareResult.png"
            alt="Compare Results"
            className="mt-4 rounded-md shadow-md"
          />
        </li>
      </ul>
    </div>

    {/* Veracity Best Practices */}
    <div className="mt-8 documentation-content p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Best Practices for Veracity Assessment</h2>
      <p>
        To ensure accurate and reliable fact-checking, follow these best practices when using the Veracity tools:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-4">
          <strong className="text-blue-500">Verify Sources:</strong>
          <p>Always verify the credibility of your information sources. Cross-reference information from multiple reliable sources to ensure accuracy.</p>
        </li>
        <li className="mb-4">
          <strong className="text-blue-500">Check Context:</strong>
          <p>Consider the context in which the information is presented. Ensure that the content is not taken out of context, as this can impact its accuracy.</p>
        </li>
        <li className="mb-4">
          <strong className="text-blue-500">Evaluate Supporting Evidence:</strong>
          <p>Examine the supporting evidence provided with the information. Strong evidence enhances the reliability of the content.</p>
        </li>
        <li>
          <strong className="text-blue-500">Regularly Update Information:</strong>
          <p>Stay informed about updates and changes to the information. Regularly review and update your fact-checking assessments as new details emerge.</p>
        </li>
      </ol>
    </div>
  </div>
)}


{selectedContent === 'Rating' && (
  <div>
    {/* Additional Content */}
    <div className="mt-8 documentation-content p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Understanding the Rating System</h2>
      <p>
        The rating system is designed to provide a nuanced evaluation of the information based on various criteria. Each percentage corresponds to a specific level of accuracy, taking into account the completeness, context, and reliability of the presented content:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-4">
          <strong className="text-blue-500">0% = Missing Context/Unidentified:</strong>
          <ul className="list-disc pl-8">
            <li>No One Claimed</li>
            <li>It's Not Clear</li>
            <li>Autogenerated Text</li>
            <li>Lack of Attribution</li>
            <li>Unverifiable Source</li>
          </ul>
          <p>A rating of 0% indicates a severe deficiency in the information, with critical elements such as clarity, attribution, and verifiability missing.</p>
        </li>

        <li className="mb-4">
          <strong className="text-blue-500">40% = False:</strong>
          <ul className="list-disc pl-8">
            <li>Selective Presentation of Facts</li>
            <li>Distorted Framing</li>
            <li>Partially Supported, But Overall Misleading</li>
            <li>Lack of Full Context</li>
          </ul>
          <p>A 40% rating signifies that the information, while not entirely false, is presented in a way that is predominantly misleading due to selective facts or distorted framing.</p>
        </li>
        <li className="mb-4">
          <strong className="text-blue-500">60% = Half True:</strong>
          <ul className="list-disc pl-8">
            <li>Partially Accurate</li>
            <li>Lack of Important Context</li>
            <li>Information Presented in a Potentially Misleading Way</li>
            <li>Partial Truths, Partial Misinformation</li>
          </ul>
          <p>A 60% rating acknowledges that the content possesses elements of accuracy but lacks important context, potentially leading to a somewhat misleading impression.</p>
        </li>
        <li className="mb-4">
          <strong className="text-blue-500">80% = Mostly True:</strong>
          <ul className="list-disc pl-8">
            <li>Mostly Accurate</li>
            <li>Minor Inaccuracies</li>
            <li>Nuanced Information</li>
            <li>Credible, but with Some Caveats</li>
          </ul>
          <p>An 80% rating indicates that the information is predominantly accurate, though there may be minor inaccuracies or nuances that require consideration.</p>
        </li>
        <li>
          <strong className="text-blue-500">100% = True:</strong>
          <ul className="list-disc pl-8">
            <li>Fully Accurate</li>
            <li>Supported by Credible Evidence</li>
            <li>No Significant Inaccuracies</li>
            <li>Reliable and Trustworthy</li>
          </ul>
          <p>A 100% rating confirms that the information is fully accurate, supported by credible evidence, and can be considered reliable and trustworthy with a high level of confidence.</p>
        </li>
      </ol>
    </div>

    {/* Rating Table */}
    <div className="mt-8 documentation-content p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Rating Scale</h2>
      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Percentage</th>
            <th className="px-4 py-2 border">Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">0%</td>
            <td className="px-4 py-2 border">Missing Context/Unidentified</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">40%</td>
            <td className="px-4 py-2 border">False</td>
          </tr>

          <tr>
            <td className="px-4 py-2 border">60%</td>
            <td className="px-4 py-2 border">Half True</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">80%</td>
            <td className="px-4 py-2 border">Mostly True</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">100%</td>
            <td className="px-4 py-2 border">True</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mt-8 documentation-content p-6 bg-white shadow-md rounded-md">
  <h2 className="text-2xl font-bold mb-4">Rating Scale</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-gray-100 border rounded">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4 border-b text-center">Percentage</th>
          <th className="py-2 px-4 border-b text-center">Rating Criteria</th>
          <th className="py-2 px-4 border-b text-center">Rating Impact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-4 border-b text-center">5%</td>
          <td className="py-2 px-4 border-b text-center">Image</td>
          <td className="py-2 px-4 border-b text-center">No decrease</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b text-center">15%</td>
          <td className="py-2 px-4 border-b text-center">Description</td>
          <td className="py-2 px-4 border-b text-center">No decrease</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b text-center">5%</td>
          <td className="py-2 px-4 border-b text-center">Author</td>
          <td className="py-2 px-4 border-b text-center">No decrease</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b text-center">15%</td>
          <td className="py-2 px-4 border-b text-center">Published Date</td>
          <td className="py-2 px-4 border-b text-center">No decrease</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b text-center">40%</td>
          <td className="py-2 px-4 border-b text-center">Check URL</td>
          <td className="py-2 px-4 border-b text-center">Decrease by 40% if URL starts with "http"</td>
        </tr>
        {/* Add other table rows as needed */}
      </tbody>
    </table>
  </div>
</div>

{/* Trusted Domain */}
<div className="mt-8 documentation-content p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Trusted Domain</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-center">No.</th>
              <th className="py-2 px-4 border-b text-center">Website</th>
              <th className="py-2 px-4 border-b text-center">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b text-center">1</td>
              <td className="py-2 px-4 border-b text-center"><a href="https://www.inquirer.net" target="_blank" rel="noopener noreferrer">www.inquirer.net</a></td>
              <td className="py-2 px-4 border-b">The Inquirer is a reputable news source with a history of delivering accurate and in-depth news.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">2</td>
              <td className="py-2 px-4 border-b text-center"><a href="https://www.cnnphilippines.com" target="_blank" rel="noopener noreferrer">www.cnnphilippines.com</a></td>
              <td className="py-2 px-4 border-b">CNN Philippines, an extension of the global CNN brand, provides reliable news coverage locally.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">3</td>
              <td className="py-2 px-4 border-b text-center"><a href="https://news.abs-cbn.com" target="_blank" rel="noopener noreferrer">news.abs-cbn.com</a></td>
              <td className="py-2 px-4 border-b">ABS-CBN News is a leading news organization in the Philippines, committed to truth and service.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">4</td>
              <td className="py-2 px-4 border-b text-center"><a href="https://www.gmanetwork.com" target="_blank" rel="noopener noreferrer">www.gmanetwork.com</a></td>
              <td className="py-2 px-4 border-b">GMA Network is a well-established media company, offering balanced news and diverse content.</td>
            </tr>
            {/* Add other trusted domains as needed */}
          </tbody>
        </table>
        <p className="text-gray-700 mt-8">
    Note: This table includes a sequential number for each website, the website URL, and a brief description highlighting the key qualities that make each source trustworthy.
  </p>
  </div>
</div>



    <div className="mt-8 documentation-content p-6 bg-white shadow-md rounded-md">
  <h2 className="text-2xl font-bold mb-4">Better Instructions for Rating Calculation</h2>
  <p className="text-gray-700">
    To calculate the overall rating percentage (out of 100%), follow these guidelines for each category:
  </p>
  <ul className="list-disc pl-6 mb-6 text-gray-700">
    <li>
      <strong>Image (5%):</strong> No decrease in rating.
    </li>
    <li>
      <strong>Description (15%):</strong> No decrease in rating.
    </li>
    <li>
      <strong>Author (5%):</strong> No decrease in rating.
    </li>
    <li>
      <strong>Published Date (15%):</strong> No decrease in rating.
    </li>
    <li>
      <strong>Check URL (40%):</strong> If the URL starts with "http," decrease the rating by 40%.
    </li>
    <li>
      <strong>URL Trusted Domain Reference (20%):</strong> No decrease in rating for specified trusted domains.
    </li>
    {/* Add other instructions as needed */}
  </ul>
  <p className="text-gray-700">
    Note: The overall rating will be determined based on the cumulative scores from each category. If any of the conditions mentioned in the "Check URL" category are not met, the overall rating will decrease accordingly.
  </p>
</div>

  </div>

)}

            {/* WWhy Fact-Checking Matters? */}
          {selectedContent === '' && (
            <div className="documentation-content p-6 bg-white shadow-md rounded-md">
              <h2 className="text-3xl font-bold mb-4">Why Fact-Checking Matters?</h2>
              <p className="text-gray-600 mb-6">
                Fact-checking is crucial for several reasons, and its significance extends across various domains, including journalism, public discourse, education, and policymaking. Here are some key reasons why fact-checking matters:
              </p>
              {/* WWhy Fact-Checking Matters? */}
              <ol className="list-decimal pl-6">
                <li className="mb-4">
                  <strong className="text-blue-500"> Accuracy and Credibility:</strong> Fact-checking ensures that information presented to the public is accurate and reliable. Inaccurate information can lead to misunderstandings, misinterpretations, and the spread of false beliefs.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Preserving Trust:</strong> Trust is fundamental in various sectors, such as journalism and politics. Fact-checking helps maintain trust between the public and information sources. When people can rely on accurate information, trust in institutions and media is strengthened.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Countering Misinformation:</strong> In the age of social media and rapid information dissemination, misinformation can spread quickly. Fact-checking serves as a valuable tool in identifying and correcting false claims, preventing the amplification of inaccurate information.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Promoting Informed Decision-Making:</strong> Inaccurate information can lead to poor decision-making, whether in the context of voting, policymaking, or personal choices. Fact-checking helps ensure that decisions are based on a foundation of accurate and reliable information.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Supporting Democracy:</strong> In democratic societies, an informed citizenry is essential. Fact-checking plays a crucial role in providing citizens with the information they need to make educated decisions, hold leaders accountable, and participate effectively in the democratic process.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Educational Value:</strong> Fact-checking contributes to education by promoting critical thinking skills. When people learn to question and verify information, they become more discerning consumers of news and information.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Combating Confirmation Bias:</strong> Fact-checking helps counteract confirmation bias, the tendency to accept information that aligns with one's preexisting beliefs. By presenting objective and verified information, fact-checking encourages a more balanced and nuanced understanding of issues.
                </li>
                <li>
                  <strong className="text-blue-500"> Promoting Accountability:</strong> Holding individuals, organizations, and institutions accountable for the accuracy of their statements is a key function of fact-checking. This accountability is essential in various fields, including politics, journalism, and public discourse.
                </li>
                {/* Add more list items as needed */}
              </ol>
            </div>
          )}

          <div className="mb-8"></div>

          {/* What Are The Benfits For Using Fact Checker Tools? */}
          {selectedContent === '' && (
            <div className="documentation-content  p-6 bg-white shadow-md rounded-md">
              <h2 className="text-3xl font-bold mb-4">What Are The Benifits For Using Fact Checker Tools?</h2>
              <p className="text-gray-600 mb-6">
              When distributing information, fact-checking technologies can help with a number of aspects of correctness and veracity. Incorporating fact-checking tools has the following advantages:
              </p>
              {/* What Are The Benfits For Using Fact Checker Tools? */}
              <ol className="list-decimal pl-6">
                <li className="mb-4">
                  <strong className="text-blue-500"> Quick Verification:</strong> Fact-checking tools help us check if information is true or false quickly
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Avoiding Mistakes:</strong> They stop us from believing or sharing things that might be wrong.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Checking Many Things at Once:</strong> These tools can look at a lot of information at the same time, which is helpful when there's a lot of news.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Always Fair:</strong> Fact-checking tools treat all information the same way, making sure it's fair for everyone.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Finding Patterns: </strong> They help us see if there are similar wrong things being said by many people.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Learning Together:</strong> Fact-checking tools can teach us how to check if things are true. It's like a guide for learning.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Working Together:</strong> Some tools let many people help check if things are true. Teamwork makes it easier.
                </li>
                <li>
                  <strong className="text-blue-500"> Helping Everyone Understand:</strong> They make it easier for all of us to understand what's true and what's not.
                </li>
                {/* Add more list items as needed */}
              </ol>
            </div>
          )}

          <div className="mb-8"></div>

          {/* How Does Fact Checker Tools Works? */}
          {selectedContent === '' && (
            <div className="documentation-content  p-6 bg-white shadow-md rounded-md">
              <h2 className="text-3xl font-bold mb-4">How Does Fact Checker Tools Works?</h2>
              {/* How Does Fact Checker Tools Works? */}
              <ol className="list-decimal pl-6">
                <li className="mb-4">
                  <strong className="text-blue-500"> Finding Claims:</strong> Fact-checker tools start by looking for statements or claims. These could be things people say in the news, on social media, or anywhere else.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Breaking Down the Statement:</strong> The tool breaks down the statement into smaller parts, like keywords and phrases. This helps to understand exactly what is being claimed.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Collecting Information:</strong> The tool gathers information from different places, like databases and reliable news sources, to learn more about the topic.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Checking with Trusted Sources:</strong> It compares the statement with information from trustworthy sources to see if it matches. Trusted sources could include official records, scientific studies, or well-known news outlets.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Understanding the Situation:</strong> The tool considers the situation in which the statement was made. Understanding the context is important to know if the statement is accurate.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Giving a Score or Rating:</strong> Fact-checker tools often give a score or rating to the statement. This score helps people understand if the statement is likely to be true or false.
                </li>
                <li className="mb-4">
                  <strong className="text-blue-500"> Looking for Similarities:</strong> Some tools use smart technology to find patterns. They check if the same false things are being said by different people. This helps spot misinformation.
                </li>
                <li>
                  <strong className="text-blue-500"> Explaining the Results:</strong> Good fact-checker tools always explain how they came to their conclusion. They show their work, like a teacher explaining the answer to a problem. This makes it easy for everyone to understand.
                </li>
                <p className="mb-6"></p>
              </ol>
              <p className="text-gray-600 mb-6">
                Remember, the goal of fact-checker tools is to help people know what's true and what's not, so they can make informed decisions and not believe things that might be incorrect. Human judgment remains crucial in addressing these challenges and ensuring a nuanced and accurate evaluation of information.
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default DocumentationPage;
