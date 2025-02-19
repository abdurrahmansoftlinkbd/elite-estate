import PropTypes from "prop-types";
const NewsCard = ({ newsItem }) => {
  const { category, image, title, description, addedBy, date } = newsItem;
  return (
    <div className="card card-compact bg-base-100 md:w-[21rem] lg:w-72 xl:w-96 shadow-xl">
      <figure>
        <img src={image} alt={category} />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <span>{date}</span>
          <span className="badge bg-default border-default text-white p-2 lg:py-4 lg:px-3 xl:p-2 cursor-pointer">
            {category}
          </span>
        </div>
        <h2 className="card-title font-playfair font-bold">{title}</h2>
        <p className="mb-4">{description}</p>
        <div className="flex items-center gap-1">
          <span>By</span>
          <span className="text-default cursor-pointer hover:text-dark">
            {addedBy}
          </span>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  newsItem: PropTypes.object,
};

export default NewsCard;
