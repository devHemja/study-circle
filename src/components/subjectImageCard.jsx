function SubjectImageCard({ image, link }) {
  return (
    <div
      className="
        rounded-2xl
        shadow-[0_0_22px_rgba(0,0,0,0.35)]
        hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]
        transition
        duration-300
        overflow-hidden
        flex
        flex-col
      "
    >
      {/* Image */}
      <img
        src={image}
        alt="subject"
        loading="lazy"
        decoding="async"
        className="w-full h-52 object-cover"
      />

      {/* Button Background */}
      <div
        className="
          bg-gradient-to-r
          from-slate-100
          via-blue-100
          to-slate-100
          p-4
          flex
          justify-center
        "
      >
        {link && link !== "#" ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-gradient-to-r from-blue-700 to-indigo-700
              text-white
              px-8 py-2.5
              rounded-xl
              font-semibold
              shadow-lg
              hover:from-indigo-600 hover:to-blue-600
              transition
              duration-300
            "
          >
            📥 Get Data
          </a>
        ) : (
          <button
            disabled
            className="
              bg-gray-300
              text-gray-600
              px-8 py-2.5
              rounded-xl
              font-semibold
              cursor-not-allowed
            "
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}

export default SubjectImageCard;
