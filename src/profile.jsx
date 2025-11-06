import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1E1E1E]">
      <div className="bg-[#2A2A2A] text-white rounded-2xl shadow-lg p-8 w-80 text-center">
        
        {/* Profile Image */}
        <div className="flex justify-center mb-5">
          <img
            src="/profile.jpg" // from public folder
            alt="Vivek Kumar Rathour"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-600"
          />
        </div>

        {/* Name and Role */}
        <div className="mb-5">
          <h2 className="text-2xl font-semibold mb-1">Vivek Kumar Rathour</h2> <br />
          <p className="text-gray-400 text-sm">Frontend Developer</p> <br />
        </div>

        {/* Languages & Tools */}
        <div className="mb-8"> {/* increased spacing from 6 → 8 */}
          <p className="font-semibold text-sm text-gray-300 mb-3">
            Languages & Tools <br />
          </p>
          <br />
          <div className="flex flex-wrap justify-center gap-3"> <br />
            {["JavaScript", "TypeScript", "React", "HTML & CSS"].map((tool) => (
              
              <span
                key={tool}
                className="bg-[#3A3A3A] px-3 py-1 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Social Buttons */}
        <br />
        
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg font-medium transition text-sm"
          >
            GitHub
          </a>
          <a
            href="#"
            className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg font-medium transition text-sm"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg font-medium transition text-sm"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
