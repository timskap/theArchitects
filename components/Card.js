import TinderCard from "react-tinder-card";

export default function Card({ name, title, profession, bio, imageUrl, onLike, onPass }) {
  const handleSwipe = (direction) => {
    if (direction === "right") {
      onLike();
    } else if (direction === "left") {
      onPass();
    }
  };

  return (
    <TinderCard
      className="swipe"
      onSwipe={handleSwipe}
      preventSwipe={["up", "down"]} // Optional: prevent swiping up/down
    >
      <div className="card">
        <img src={imageUrl} alt={name || title} className="card-image" />
        <div className="card-info">
          <h2>{name || title}</h2>
          {profession && <p className="profession">{profession}</p>}
          {bio && <p className="bio">{bio}</p>}
        </div>
      </div>
    </TinderCard>
  );
}