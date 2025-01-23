import React from "react";

const successStories = [
  { name: "Amit Sharma", platform: "Bionic Technology Coding Course", amount: "₹50,000", story: "After completing Bionic Technology's coding bootcamp, Amit landed a remote developer position earning ₹50,000 monthly." },
  { name: "Neha Singh", platform: "Bionic Technology Design Program", amount: "₹45,000", story: "Neha mastered UI/UX through Bionic Technology's design program, now earning ₹45,000 as a freelancer." },
  { name: "Ravi Kumar", platform: "Bionic Technology Content Writing", amount: "₹30,000", story: "Through Bionic Technology's content writing course, Ravi secured content projects worth ₹30,000 monthly." },
  { name: "Priya Mehta", platform: "Bionic Technology Internship", amount: "₹20,000", story: "Priya's internship at Bionic Technology led to a part-time role earning ₹20,000 monthly." },
  { name: "Rajesh Yadav", platform: "Bionic Technology E-commerce", amount: "₹40,000", story: "Using Bionic Technology's e-commerce strategies, Rajesh built an online store earning ₹40,000 monthly." },
];

const SuccessStories = () => {
  return (
    <div className="w-full py-8 bg-blue-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Success Stories</h2>
      <div className="relative overflow-hidden">
        <style>
          {`
            .scroll-container {
              display: flex;
              gap: 1rem;
              padding: 1rem;
              animation: scroll 20s linear infinite;
            }
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-300px * 5 - 1rem * 5)); }
            }
            .story-card {
              flex: 0 0 300px;
            }
            .scroll-container:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="scroll-container">
          {[...successStories, ...successStories, ...successStories].map((story, index) => (
            <div key={index} className="story-card">
              <div className="border p-4 rounded-lg bg-gray-800 h-full">
                <h3 className="text-lg font-semibold">{story.name}</h3>
                <p className="text-gray-400 text-sm">{story.platform}</p>
                <p className="mt-2 text-sm whitespace-normal">{story.story}</p>
                <p className="mt-2 font-bold">Earnings: {story.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;