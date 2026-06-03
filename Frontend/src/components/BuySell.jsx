import { useState } from "react";
import { Link } from "react-router-dom";

function BuySell() {
  const [activeTab, setActiveTab] = useState("Sell my car");

  const placeholderText =
    activeTab === "Sell my car"
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
          <Link to="/new-cars" className="car-tab">
            Find a car
          </Link>

          <button
            className={`car-tab ${activeTab === "Sell my car" ? "active" : ""}`}
            onClick={() => setActiveTab("Sell my car")}
          >
            Sell my car
          </button>

          <button
            className={`car-tab ${
              activeTab === "Read reviews" ? "active" : ""
            }`}
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
        <Link to="/new-cars" className="car-option">
          <img src="/new.png" alt="New Cars" />
          <span>New</span>
        </Link>

        <Link to="/new-cars#ev-section" className="car-option">
          <img src="/ev.png" alt="EV" />
          <span>EVs</span>
        </Link>

        <Link to="/new-cars#suv-section" className="car-option">
          <img src="/suv.png" alt="SUV" />
          <span>SUVs</span>
        </Link>

        <Link to="/new-cars#vans-section" className="car-option">
          <img src="/van.png" alt="Van" />
          <span>Vans</span>
        </Link>

        <Link to="/new-cars#hybrid-section" className="car-option">
          <img src="/hybrid.png" alt="Hybrid" />
          <span>Hybrids</span>
        </Link>
      </div>
    </section>
  );
}

export default BuySell;