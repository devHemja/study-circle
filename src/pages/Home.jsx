import { useState } from "react";
import Cards from "../components/cards";
import SubjectImageCard from "../components/subjectImageCard";
import { FaArrowLeft } from "react-icons/fa";

import banner from "../assets/banner.png";

import sem1 from "../assets/semester1.png";
import sem2 from "../assets/semester2.png";
import sem3 from "../assets/semester3.png";
import sem4 from "../assets/semester4.png";
import sem5 from "../assets/semester5.png";
import placement from "../assets/placement.png";

import sem1Subjects from "../data/sem1Subjects";
import sem2Subjects from "../data/sem2Subjects";
import sem3Subjects from "../data/sem3Subjects";
import sem4Subjects from "../data/sem4Subjects";
import sem5Subjects from "../data/sem5Subjects";
import placementMaterial from "../data/placementMaterial";

function Home() {
  const [activeSem, setActiveSem] = useState(null);

  const semesterCards = [
    { img: sem1, sem: 1 },
    { img: sem2, sem: 2 },
    { img: sem3, sem: 3 },
    { img: sem4, sem: 4 },
    { img: sem5, sem: 5 },
    { img: placement, sem: 6 },
  ];

  // Decide which subjects to show
  const getSubjects = () => {
    if (activeSem === 1) return sem1Subjects;
    if (activeSem === 2) return sem2Subjects;
    if (activeSem === 3) return sem3Subjects;
    if (activeSem === 4) return sem4Subjects;
    if (activeSem === 5) return sem5Subjects;
    if (activeSem === 6) return placementMaterial;
    return [];
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 🔹 Banner */}
      <div
        className="
  w-full
  aspect-[16/7]
  sm:aspect-[16/6]
  md:aspect-[16/5]
  max-h-[420px]
  overflow-hidden
"
      >
        <img
          src={banner}
          alt="StudyCircle Banner"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* 🔹 Semester Cards */}
      {!activeSem && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {semesterCards.map((item, index) => (
              <Cards
                key={index}
                image={item.img}
                onClick={() => item.sem && setActiveSem(item.sem)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 🔹 Subject Cards (Sem 1 / Sem 2) */}
      {activeSem && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Heading */}
          <div className="relative flex items-baseline justify-center">
            <button
              onClick={() => setActiveSem(null)}
              className="absolute left-0 bg-black p-3 text-white flex items-center justify-center rounded-full shadow-2xl cursor-pointer"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h2 className="text-3xl font-bold text-center text-black mb-10">
              Subjects
            </h2>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {getSubjects().map((sub) => (
              <SubjectImageCard
                key={sub.id}
                image={sub.image}
                link={sub.link}
              />
            ))}
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-14"></div>
        </div>
      )}
    </div>
  );
}

export default Home;
