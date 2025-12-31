function Contact() {
  return (
    <div className="bg-gray-100 min-h-screen px-6 py-16">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Contact <span className="text-yellow-500">Us</span>
        </h1>

        {/* Intro */}
        <p className="text-center text-gray-700 mb-10">
          Have questions, suggestions, or useful resources to share?  
          Feel free to reach out to us.
        </p>

        {/* Contact Info */}
        <div className="text-gray-700 space-y-6 text-lg text-center items-center">

          <p>
            📧 <span className="font-semibold">Email:</span>{" "}
            hemja2003@gmail.com
          </p>

          <p>
            🏫 <span className="font-semibold">Institute:</span>{" "}
            NIT Raipur
          </p>

          <p>
            📍 <span className="font-semibold">Location:</span>{" "}
            India
          </p>

          <p>
            💬 <span className="font-semibold">Note:</span>{" "}
            This platform is built by students for students.  
            More interactive contact features will be added soon.
          </p>

        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 mt-12 italic">
          Thank you for being a part of Study Circle 📘
        </p>

      </div>

    </div>
  );
}

export default Contact;
