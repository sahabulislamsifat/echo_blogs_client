import React from "react";

const TipsAndResources = () => {
  const tips = [
    "Focus on high-quality content that provides value to your readers.",
    "Use catchy headlines to grab attention.",
    "Include relevant images to enhance engagement.",
    "Optimize your blog for SEO to improve visibility.",
    "Encourage user comments to build a community.",
  ];

  const resources = [
    { name: "Grammarly", link: "https://www.grammarly.com" },
    { name: "Canva", link: "https://www.canva.com" },
    { name: "Google Analytics", link: "https://analytics.google.com" },
    {
      name: "Keyword Planner",
      link: "https://ads.google.com/home/tools/keyword-planner/",
    },
    { name: "Unsplash (Free Images)", link: "https://unsplash.com" },
  ];

  return (
    <section
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="300"
      data-aos-offset="0"
      className="p-10 bg-gradient-to-r from-indigo-50 via-white to-gray-50 shadow-sm my-12"
    >
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-700 mb-12">
        Tips and Resources for Bloggers
      </h2>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b-4 border-indigo-300 inline-block">
          Blogging Tips
        </h3>
        <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="p-4 bg-gray-50 rounded-lg border shadow-sm hover:shadow-md transition duration-300"
            >
              <p className="text-lg text-gray-600 hover:text-gray-800">{tip}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b-4 border-indigo-300 inline-block">
          Useful Resources
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <li
              key={index}
              className="p-4 border bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-700 text-lg font-medium"
              >
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TipsAndResources;
