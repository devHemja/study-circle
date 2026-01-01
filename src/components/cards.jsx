function Cards({ image, onClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden transform hover:-translate-y-1">
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt="semester"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Button */}
      <div className="p-5 flex justify-center">
        <button
          onClick={onClick}
          className="bg-black text-yellow-400 px-8 py-2 rounded-lg shadow-lg hover:bg-yellow-400 hover:text-black hover:shadow-xl transition duration-300 font-semibold"
        >
          Go To Subjects
        </button>
      </div>
    </div>
  );
}

export default Cards;
