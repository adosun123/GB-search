document.getElementById("zipForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const zip = document.getElementById("zipInput").value.trim();
  const deals = getDealsByZip(zip);
  const container = document.getElementById("deals");
  container.innerHTML = "";

  if (!deals || deals.length === 0) {
    container.innerHTML = "<p>No deals found for that ZIP code.</p>";
    return;
  }

  deals.forEach(deal => {
    const div = document.createElement("div");
    div.className = "deal";
    div.innerHTML = `<a href="${deal.url}" target="_blank">${deal.title}</a>`;
    container.appendChild(div);
  });
});

function getDealsByZip(zip) {
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
        title: "Yelp Deals: $10 Off Dining Certificates",
        url: "https://www.yelp.com/deals"
      }
    ],
    "90210": [
      {
        title: "Uber Eats: $15 Off First Order",
        url: "https://ubereats.com/feed?promoCode=eats-adoramsue"
      },
      {
        title: "Grubhub: Free Delivery from Local Favorites",
        url: "https://grubhub.com"
      },
      {
        title: "Yelp Deals: Save at Beverly Hills Eateries",
        url: "https://www.yelp.com/deals"
      }
    ],
    default: [
      {
        title: "DoorDash: Local Deals Available Now",
        url: "https://www.doordash.com"
      },
      {
        title: "Instacart: Free Delivery on First Orders",
        url: "https://instacart.com"
      }
    ]
  };
  return dealMap[zip] || dealMap["default"];
}

// Try to detect user's ZIP code using geolocation
window.addEventListener("load", function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await res.json();
        if (data.postcode) {
          document.getElementById("zipInput").value = data.postcode;
        }
      } catch (err) {
        console.error("Geolocation error:", err);
      }
    });
  }
});

