function About() {
  return (
    <div className="bg-gray-100 min-h-screen px-6 py-16">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          About <span className="text-yellow-500">Study Circle</span>
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Study Circle is a student-focused learning platform designed to help MCA
          students access semester-wise academic resources in a simple and
          organized way.
        </p>

        {/* Why Study Circle */}
        <h2 className="text-2xl font-semibold text-black mt-8 mb-4">
          Why Study Circle?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          During our academic journey, we often struggle to find the right study
          materials at one place. Notes are scattered, previous year questions
          are hard to track, and useful links get lost over time.
          Study Circle was created to solve this problem by bringing everything
          together under one platform.
        </p>

        {/* What You’ll Find */}
        <h2 className="text-2xl font-semibold text-black mt-8 mb-4">
          What You’ll Find Here
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Semester-wise subject organization</li>
          <li>Easy access to notes and resources</li>
          <li>Previous year question papers (PYQs)</li>
          <li>Helpful external learning links</li>
          <li>Placement preparation resources</li>
        </ul>

        {/* Vision */}
        <h2 className="text-2xl font-semibold text-black mt-8 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The goal of Study Circle is to become a one-stop academic companion for
          MCA students. In the future, we plan to add more interactive features,
          better resource categorization, and community-driven learning support.
        </p>

        {/* Footer note */}
        <p className="text-center text-gray-600 mt-10 italic">
          Built by students, for students 📘
        </p>

      </div>

    </div>
  );
}

export default About;
