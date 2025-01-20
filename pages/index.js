import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

export default function Home() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("data.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(({ professionals, events }) => {
        const profs = professionals.map((p) => ({ ...p, isEvent: false }));
        const evts = events.map((e) => ({ ...e, isEvent: true }));
        setItems([...profs, ...evts]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSwipe = (direction, id) => {
    console.log(`Swiped ${direction} on card ID: ${id}`);
    if (direction === "left" || direction === "right") {
      setCurrentIndex((prev) => prev + 1); // Move to the next card
    }
  };

  const currentItem = items[currentIndex];

  if (!currentItem) {
    return <div>No more items to swipe!</div>;
  }

  return (
    <div className="card-container">
      {items
        .slice(currentIndex)
        .reverse() // Reverse to show the top card last (Tinder effect)
        .map((item, index) => (
          <TinderCard
            key={item.id}
            className="swipe"
            onSwipe={(dir) => handleSwipe(dir, item.id)}
            preventSwipe={["up", "down"]} // Only allow left/right swipes
          >
            <div className="card">
              <img
                src={item.imageUrl}
                alt={item.name || item.title}
                className="card-image"
              />
              <div className="card-info">
                <h2>{item.name || item.title}</h2>
                {item.profession && <p className="profession">{item.profession}</p>}
                {item.bio && <p className="bio">{item.bio}</p>}
                {item.date && <p className="date">{item.date}</p>}
                {item.location && <p className="location">{item.location}</p>}
              </div>
            </div>
          </TinderCard>
        ))}
    </div>
  );
}