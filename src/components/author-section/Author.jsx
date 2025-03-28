import React from "react";

const Author = () => {
  const authors = [
    {
      id: 1,
      name: "Emma Johnson",
      role: "Technology Writer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      link: "/authors/emma-johnson",
    },
    {
      id: 2,
      name: "Liam Smith",
      role: "Lifestyle Blogger",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      link: "/authors/liam-smith",
    },
    {
      id: 3,
      name: "Olivia Brown",
      role: "Travel Enthusiast",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      link: "/authors/olivia-brown",
    },
    {
      id: 4,
      name: "Noah Williams",
      role: "Finance Specialist",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
      link: "/authors/noah-williams",
    },
    {
      id: 5,
      name: "Ava Davis",
      role: "Health & Wellness Writer",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      link: "/authors/ava-davis",
    },
  ];

  return (
    <div>
      <section className="py-12">
        <div className="text-center mb-8 md:py-5">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
            Meet Our Authors
          </h2>
          <p className="text-gray-600 mt-2">
            Discover the minds behind the content
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          {authors.map((author, index) => (
            <div
              data-aos="flip-right"
              key={index}
              className="card rounded-sm w-[380px] px-10 bg-base-100 shadow-sm hover:shadow-lg transform hover:scale-95 transition duration-300 "
            >
              <figure className="px-10 pt-10">
                <img
                  src={author.image}
                  alt={author.name}
                  className="rounded-full w-24 h-24 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title text-lg font-semibold">
                  {author.name}
                </h3>
                <p className="text-gray-500">{author.role}</p>
                <div className="card-actions mt-4">
                  <a
                    href={author.link}
                    className="btn text-white rounded-sm bg-indigo-600 btn-sm"
                  >
                    View Articles
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Author;
