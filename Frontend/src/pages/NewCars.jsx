import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NewCars() {
  const [activeTab, setActiveTab] = useState("find");
  const [activeCategory, setActiveCategory] = useState("new");
  const [searchTerm, setSearchTerm] = useState("");

  const carSections = [
    {
      id: "new-section",
      key: "new",
      title: "New Cars",
      cars: [
        {
          image: "/new1.jpg",
          alt: "Volkswagen Jetta",
          badge: "New",
          name: "Volkswagen Jetta",
          details: "Automatic • Petrol • 2024",
          price: "28,500 €",
        },
        {
          image: "/new2.jpg",
          alt: "Volkswagen Golf 8",
          badge: "New",
          name: "Volkswagen Golf 8",
          details: "Automatic • Petrol • 2025",
          price: "44,000 €",
        },
        {
          image: "/new4.jpeg",
          alt: "Golf GTI SE",
          badge: "New",
          name: "Golf GTI SE",
          details: "Automatic • Hybrid • 2024",
          price: "41,000 €",
        },
      ],
    },
    {
      id: "ev-section",
      key: "ev",
      title: "EVs",
      cars: [
        {
          image: "/ev1.png",
          alt: "BYD Dolphin Surf",
          badge: "EV",
          name: "BYD Dolphin Surf",
          details: "Automatic • Electric • 2024",
          price: "13,000 €",
        },
        {
          image: "/ev2.png",
          alt: "Dacia Spring",
          badge: "EV",
          name: "Dacia Spring",
          details: "Automatic • Electric • 2024",
          price: "15,000 €",
        },
        {
          image: "/ev3.png",
          alt: "Hyundai Ioniq 5",
          badge: "EV",
          name: "Hyundai Ioniq 5",
          details: "Automatic • Electric • 2025",
          price: "42,000 €",
        },
      ],
    },
    {
      id: "suv-section",
      key: "suv",
      title: "SUVs",
      cars: [
        {
          image: "/suv1.png",
          alt: "KIA Sorento Hybrid",
          badge: "SUV",
          name: "KIA Sorento Hybrid",
          details: "Automatic • Petrol • 2026",
          price: "47,190 €",
        },
        {
          image: "/suv2.png",
          alt: "Honda Passport",
          badge: "SUV",
          name: "Honda Passport",
          details: "Automatic • Diesel • 2026",
          price: "53,850 €",
        },
        {
          image: "/suv3.png",
          alt: "Hyundai Tucson Hybrid",
          badge: "SUV",
          name: "Hyundai Tucson Hybrid",
          details: "Automatic • Hybrid • 2026",
          price: "42,075 €",
        },
      ],
    },
    {
      id: "vans-section",
      key: "vans",
      title: "Vans",
      cars: [
        {
          image: "/van2.png",
          alt: "Toyota Proace City",
          badge: "Van",
          name: "Toyota Proace City",
          details: "Manual • Diesel • 2024",
          price: "28,000 €",
        },
        {
          image: "/van1.png",
          alt: "Ford Transit",
          badge: "Van",
          name: "Ford Transit",
          details: "Automatic • Diesel • 2025 • Passenger Van XL",
          price: "60,000 €",
        },
        {
          image: "/van4.png",
          alt: "Vuxhall Vivaro",
          badge: "Van",
          name: "Vuxhall Vivaro",
          details: "Manual • Diesel • 2024",
          price: "35,500 €",
        },
      ],
    },
    {
      id: "hybrid-section",
      key: "hybrid",
      title: "Hybrids",
      cars: [
        {
          image: "/hybrid2.png",
          alt: "Kia Sportage",
          badge: "Hybrid",
          name: "Kia Sportage",
          details: "Automatic • Hybrid • 2024",
          price: "30,000 €",
        },
        {
          image: "/hybrid3.png",
          alt: "Nissan Qashqai",
          badge: "Hybrid",
          name: "Nissan Qashqai",
          details: "Automatic • Hybrid • 2025",
          price: "26,000 €",
        },
        {
          image: "/hybrid1.png",
          alt: "Jaecoo 7",
          badge: "Hybrid",
          name: "Jaecoo 7",
          details: "Automatic • Hybrid • 2024",
          price: "28,000 €",
        },
      ],
    },
  ];

  const sellCars = [
    {
      image: "/new1.jpg",
      alt: "Sell Volkswagen",
      badge: "Sell",
      name: "Sell your Volkswagen",
      details: "Get a fast estimate for your car",
      price: "Free valuation",
    },
    {
      image: "/suv1.png",
      alt: "Sell SUV",
      badge: "Sell",
      name: "Sell your SUV",
      details: "Compare offers from interested buyers",
      price: "Quick process",
    },
    {
      image: "/van1.png",
      alt: "Sell Van",
      badge: "Sell",
      name: "Sell your Van",
      details: "List your vehicle in minutes",
      price: "Easy listing",
    },
  ];

  const reviews = [
    {
      image: "/new2.jpg",
      alt: "Volkswagen Golf review",
      badge: "Review",
      name: "Volkswagen Golf 8 Review",
      details: "Comfort • Fuel economy • Practicality",
      price: "4.7 / 5",
    },
    {
      image: "/ev3.png",
      alt: "Hyundai Ioniq 5 review",
      badge: "Review",
      name: "Hyundai Ioniq 5 Review",
      details: "Range • Charging • Interior space",
      price: "4.8 / 5",
    },
    {
      image: "/hybrid2.png",
      alt: "Kia Sportage review",
      badge: "Review",
      name: "Kia Sportage Review",
      details: "Hybrid system • Comfort • Safety",
      price: "4.6 / 5",
    },
  ];

  const searchText = searchTerm.toLowerCase();

  const filteredSections = carSections
    .map((section) => ({
      ...section,
      cars: section.cars.filter((car) =>
        `${car.badge} ${car.name} ${car.details} ${car.price}`
          .toLowerCase()
          .includes(searchText)
      ),
    }))
    .filter((section) => section.cars.length > 0);

  const filteredSellCars = sellCars.filter((car) =>
    `${car.badge} ${car.name} ${car.details} ${car.price}`
      .toLowerCase()
      .includes(searchText)
  );

  const filteredReviews = reviews.filter((car) =>
    `${car.badge} ${car.name} ${car.details} ${car.price}`
      .toLowerCase()
      .includes(searchText)
  );

  const getPlaceholder = () => {
    if (activeTab === "sell") return "Enter your car model...";
    if (activeTab === "reviews") return "Search reviews...";
    return "Search by brand...";
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  return (
    <main className="new-cars-page">
      <section className="buy-page-hero buy-cars-hero">
        <Navbar />

        <h1>
          BROWSE, BUY, SELL
          <br />
          ALL IN ONE PLACE
        </h1>
      </section>

      <section className="buy-page-search-section">
        <div className="buy-page-search-box">
          <div className="car-tabs">
            <button
              type="button"
              className={`car-tab ${activeTab === "find" ? "active" : ""}`}
              onClick={() => handleTabChange("find")}
            >
              Find a car
            </button>

            <button
              type="button"
              className={`car-tab ${activeTab === "sell" ? "active" : ""}`}
              onClick={() => handleTabChange("sell")}
            >
              Sell my car
            </button>

            <button
              type="button"
              className={`car-tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => handleTabChange("reviews")}
            >
              Read reviews
            </button>
          </div>

          <div className="search-area">
            <input
              type="text"
              placeholder={getPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="search-btn" type="button">
              <img src="/search.png" alt="Search" />
            </button>
          </div>
        </div>

        <div className="car-options">
          <a
            href="#new-section"
            className={`car-option ${
              activeCategory === "new" ? "active-car-option" : ""
            }`}
            onClick={() => setActiveCategory("new")}
          >
            <img src="/new.png" alt="New Cars" />
            <span>New</span>
          </a>

          <a
            href="#ev-section"
            className={`car-option ${
              activeCategory === "ev" ? "active-car-option" : ""
            }`}
            onClick={() => setActiveCategory("ev")}
          >
            <img src="/ev.png" alt="EV" />
            <span>EVs</span>
          </a>

          <a
            href="#suv-section"
            className={`car-option ${
              activeCategory === "suv" ? "active-car-option" : ""
            }`}
            onClick={() => setActiveCategory("suv")}
          >
            <img src="/suv.png" alt="SUV" />
            <span>SUVs</span>
          </a>

          <a
            href="#vans-section"
            className={`car-option ${
              activeCategory === "vans" ? "active-car-option" : ""
            }`}
            onClick={() => setActiveCategory("vans")}
          >
            <img src="/van.png" alt="Van" />
            <span>Vans</span>
          </a>

          <a
            href="#hybrid-section"
            className={`car-option ${
              activeCategory === "hybrid" ? "active-car-option" : ""
            }`}
            onClick={() => setActiveCategory("hybrid")}
          >
            <img src="/hybrid.png" alt="Hybrid" />
            <span>Hybrids</span>
          </a>
        </div>
      </section>

      {activeTab === "find" && (
        <>
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <div key={section.key}>
                <h2 id={section.id} className="car-section-title">
                  {section.title}
                </h2>

                <section className="buy-page-content">
                  {section.cars.map((car) => (
                    <div className="new-car-card" key={car.name}>
                      <img src={car.image} alt={car.alt} />

                      <div className="new-car-info">
                        <span className="car-badge">{car.badge}</span>
                        <h3>{car.name}</h3>
                        <p>{car.details}</p>
                        <strong>{car.price}</strong>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            ))
          ) : (
            <p className="no-results-message">No cars found.</p>
          )}
        </>
      )}

      {activeTab === "sell" && (
        <>
          <h2 className="car-section-title">Sell My Car</h2>

          {filteredSellCars.length > 0 ? (
            <section className="buy-page-content">
              {filteredSellCars.map((car) => (
                <div className="new-car-card" key={car.name}>
                  <img src={car.image} alt={car.alt} />

                  <div className="new-car-info">
                    <span className="car-badge">{car.badge}</span>
                    <h3>{car.name}</h3>
                    <p>{car.details}</p>
                    <strong>{car.price}</strong>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <p className="no-results-message">No sell options found.</p>
          )}
        </>
      )}

      {activeTab === "reviews" && (
        <>
          <h2 className="car-section-title">Car Reviews</h2>

          {filteredReviews.length > 0 ? (
            <section className="buy-page-content">
              {filteredReviews.map((car) => (
                <div className="new-car-card" key={car.name}>
                  <img src={car.image} alt={car.alt} />

                  <div className="new-car-info">
                    <span className="car-badge">{car.badge}</span>
                    <h3>{car.name}</h3>
                    <p>{car.details}</p>
                    <strong>{car.price}</strong>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <p className="no-results-message">No reviews found.</p>
          )}
        </>
      )}
      <Footer />
    </main>
  );
}

export default NewCars;