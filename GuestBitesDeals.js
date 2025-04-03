
import { useState } from "react";

export default function GuestBitesDeals() {
  const [zip, setZip] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [deals, setDeals] = useState([]);

  const dealMap = {
    "43209": [
      {
        title: "DoorDash: 25% Off First 2 Orders",
        url: "https://drd.sh/rhocnPsAKvRbkw3J"
      },
      {
        title: "Instacart: Free Delivery on $35+ Orders",
        url: "https://inst.cr/t/c4fab097b"
      },
      {
        title: "Uber Eats: $15 Off First Order",
        url: "https://ubereats.com/feed?promoCode=eats-adoramsue"
      },
      {
        title: "Yelp Deals: $10 Off Dining Certificates",
        url: "https://www.yelp.com/deals"
      }
    ],
    default: [
      {
        title: "DoorDash: 25% Off First 2 Orders",
        url: "https://drd.sh/rhocnPsAKvRbkw3J"
      },
      {
        title: "Instacart: Free Delivery on $35+ Orders",
        url: "https://inst.cr/t/c4fab097b"
      },
      {
        title: "Uber Eats: $15 Off First Order",
        url: "https://ubereats.com/feed?promoCode=eats-adoramsue"
      },
      {
        title: "Yelp Deals: $10 Off Dining Certificates",
        url: "https://www.yelp.com/deals"
      }
    ]
  };

  const fetchYelp = async () => {
    const res = await fetch(`/api/yelp?zip=${zip}`);
    const data = await res.json();
    setDeals(data.businesses || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    fetchYelp();
  };

  const topDeals = dealMap[zip] || dealMap["default"];

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h1>Find Local Food Deals 🍽️</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter ZIP Code"
            required
            style={{ padding: "1rem", width: "100%", marginBottom: "1rem" }}
          />
          <button type="submit" style={{ padding: "1rem", width: "100%" }}>
            Show Deals
          </button>
        </form>
      ) : (
        <>
          <h2>Top Deals Near {zip}</h2>
          <ul>
            {topDeals.map((deal, i) => (
              <li key={i}>
                <a href={deal.url} target="_blank" rel="noopener noreferrer">
                  {deal.title}
                </a>
              </li>
            ))}
          </ul>
          <h2>Restaurants Nearby</h2>
          <ul>
            {deals.map((biz) => (
              <li key={biz.id}>
                <a href={biz.url} target="_blank" rel="noopener noreferrer">
                  {biz.name}
                </a>
                <p>{biz.categories.map(c => c.title).join(", ")}</p>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "2rem" }}>
            Are you a local business?{" "}
            <a href="mailto:hi@guestbites.com">Get featured here.</a>
          </p>
        </>
      )}
    </div>
  );
}
