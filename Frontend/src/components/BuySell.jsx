import { useState } from "react";

function BuySell() {
  const [activeTab, setActiveTab] = useState("Find a car");

  const placeholderText =
    activeTab === "Find a car"
      ? "Search by brand..."
      : activeTab === "Sell my car"
      ? "Enter your car model..."
      : "Search reviews...";

  return (
    <section id="buysell" className="buy-section">
      <h2>
        BROWSE, BUY, SELL
        <br />
        ALL IN ONE PLACE
      </h2>

      <div className="car-search-box">
        <div className="car-tabs">
          <button
            className={`car-tab ${activeTab === "Find a car" ? "active" : ""}`}
            onClick={() => setActiveTab("Find a car")}
          >
            Find a car
          </button>

          <button
            className={`car-tab ${activeTab === "Sell my car" ? "active" : ""}`}
            onClick={() => setActiveTab("Sell my car")}
          >
            Sell my car
          </button>

          <button
            className={`car-tab ${activeTab === "Read reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("Read reviews")}
          >
            Read reviews
          </button>
        </div>

        <div className="search-area">
          <input type="text" placeholder={placeholderText} />

          <button className="search-btn">
            <img src="/search.png" alt="Search" />
          </button>
        </div>
      </div>

      <div className="car-options">
        <a href="#" className="car-option">
          <img src="/new.png" alt="New Cars" />
          <span>New</span>
        </a>

        <a href="#" className="car-option">
          <img src="/used.png" alt="Used Cars" />
          <span>Used</span>
        </a>

        <a href="#" className="car-option">
          <img src="/ev.png" alt="EV" />
          <span>EVs</span>
        </a>

        <a href="#" className="car-option">
          <img src="/suv.png" alt="SUV" />
          <span>SUVs</span>
        </a>

        <a href="#" className="car-option">
          <img src="/van.png" alt="Van" />
          <span>Vans</span>
        </a>

        <a href="#" className="car-option">
          <img src="/hybrid.png" alt="Hybrid" />
          <span>Hybrids</span>
        </a>
      </div>
    </section>
  );
}

export default BuySell;