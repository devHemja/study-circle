function SubjectImageCard({ image, link }) {

  const handleClick = (e) => {
    if (link === "#") {
      e.preventDefault(); 
    }
  };

  return (
    <a
      href={link}
      target={link !== "#" ? "_blank" : undefined}
      rel={link !== "#" ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className="
        block
        bg-white
        rounded-2xl
        shadow-[0_0_25px_rgba(0,0,0,0.45)]
        hover:shadow-[0_0_45px_rgba(0,0,0,0.7)]
        transform
        hover:scale-105
        hover:-translate-y-2
        transition
        duration-300
        cursor-pointer
      "
    >
      <img
        src={image}
        alt="subject"
        className="w-full h-52 object-cover rounded-2xl"
      />
    </a>
  );
}

export default SubjectImageCard;
