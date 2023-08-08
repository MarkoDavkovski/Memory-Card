import "../styles/card.css";

const Card = ({ id, imgUrl, title, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };
  return (
    <>
      <div className="card-space">
        <div className="img-container">
          <img src={imgUrl} alt={title} onClick={handleClick} />
        </div>

        <div className="card-title">{title}</div>
      </div>
    </>
  );
};

export default Card;
