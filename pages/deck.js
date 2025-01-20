import { useState, useEffect } from "react";

export default function Deck() {
  const [allItems, setAllItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(({ professionals, events }) => {
        const profs = professionals.map((p) => ({ ...p, isEvent: false }));
        const evts = events.map((e) => ({ ...e, isEvent: true }));
        setAllItems([...profs, ...evts]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const likedData = allItems.filter((item) =>
    likedItems.some((like) => like.id === item.id && like.isEvent === item.isEvent)
  );

  return (
    <div>
      {likedData.map((item) => (
        <div key={item.id}>
          <h2>{item.name || item.title}</h2>
          {/* Render other item details */}
        </div>
      ))}
    </div>
  );
}