import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NewCars() {
  const [activeTab, setActiveTab] = useState("find");
  const [activeCategory, setActiveCategory] = useState("new");
  const [searchTerm, setSearchTerm] = useState("");

  const [publicReviews, setPublicReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [saleRequests, setSaleRequests] = useState([]);
  const [showSellForm, setShowSellForm] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    car_make: "",
    car_model: "",
    car_year: "",
    rating: "",
    title: "",
    review_text: "",
  });

  const [sellForm, setSellForm] = useState({
    car_make: "",
    car_model: "",
    car_year: "",
    mileage: "",
    fuel_type: "",
    price: "",
    description: "",
    image: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReviews();
    fetchSaleRequests();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/car-reviews");
      setPublicReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSaleRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/car-sale-requests");
      setSaleRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first to write a review.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/car-reviews", reviewForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Review added successfully");

      setReviewForm({
        car_make: "",
        car_model: "",
        car_year: "",
        rating: "",
        title: "",
        review_text: "",
      });

      setShowReviewForm(false);
      fetchReviews();
    } catch (err) {
      console.log(err);
      alert("Failed to add review");
    }
  };

  const handleSellChange = (e) => {
    setSellForm({
      ...sellForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSellImageChange = (e) => {
    setSellForm({
      ...sellForm,
      image: e.target.files[0],
    });
  };

  const submitSellRequest = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first to sell your car.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("car_make", sellForm.car_make);
      formData.append("car_model", sellForm.car_model);
      formData.append("car_year", sellForm.car_year);
      formData.append("mileage", sellForm.mileage);
      formData.append("fuel_type", sellForm.fuel_type);
      formData.append("price", sellForm.price);
      formData.append("description", sellForm.description);

      if (sellForm.image) {
        formData.append("image", sellForm.image);
      }

      await axios.post("http://localhost:5000/car-sale-requests", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Car sale request submitted successfully");

      setSellForm({
        car_make: "",
        car_model: "",
        car_year: "",
        mileage: "",
        fuel_type: "",
        price: "",
        description: "",
        image: null,
      });

      setShowSellForm(false);
      fetchSaleRequests();
    } catch (err) {
      console.log(err);
      alert("Failed to submit request");
    }
  };

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

  const filteredReviews = publicReviews.filter((review) =>
    `${review.car_make} ${review.car_model} ${review.car_year} ${review.rating} ${review.title} ${review.review_text}`
      .toLowerCase()
      .includes(searchText)
  );

  const filteredSaleRequests = saleRequests.filter((car) =>
    `${car.car_make} ${car.car_model} ${car.car_year} ${car.mileage} ${car.fuel_type} ${car.price} ${car.description}`
      .toLowerCase()
      .includes(searchText)
  );

  const getPlaceholder = () => {
    if (activeTab === "sell") return "Search listed cars...";
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
          <button
            type="button"
            className="review-title-button"
            onClick={() => setShowSellForm(true)}
          >
            Sell My Car
          </button>

          {showSellForm && (
            <div className="review-modal-overlay">
              <div className="review-modal">
                <button
                  type="button"
                  className="review-close-btn"
                  onClick={() => setShowSellForm(false)}
                >
                  ×
                </button>

                <h2>Sell My Car</h2>

                <form className="review-modal-form" onSubmit={submitSellRequest}>
                  <input
                    name="car_make"
                    placeholder="Car make"
                    value={sellForm.car_make}
                    onChange={handleSellChange}
                  />

                  <input
                    name="car_model"
                    placeholder="Car model"
                    value={sellForm.car_model}
                    onChange={handleSellChange}
                  />

                  <input
                    name="car_year"
                    placeholder="Car year"
                    value={sellForm.car_year}
                    onChange={handleSellChange}
                  />

                  <input
                    name="mileage"
                    placeholder="Mileage"
                    value={sellForm.mileage}
                    onChange={handleSellChange}
                  />

                  <input
                    name="fuel_type"
                    placeholder="Fuel type"
                    value={sellForm.fuel_type}
                    onChange={handleSellChange}
                  />

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleSellImageChange}
                  />

                  <input
                    name="price"
                    placeholder="Price (€)"
                    value={sellForm.price}
                    onChange={handleSellChange}
                  />

                  <textarea
                    name="description"
                    placeholder="Describe your car..."
                    value={sellForm.description}
                    onChange={handleSellChange}
                  />

                  <button type="submit">Submit Sale Request</button>
                </form>
              </div>
            </div>
          )}

          {filteredSaleRequests.length > 0 ? (
            <section className="buy-page-content">
              {filteredSaleRequests.map((car) => (
                <div className="new-car-card" key={car.id}>
                  {car.image && (
                    <img
                      src={`http://localhost:5000/uploads/${car.image}`}
                      alt={`${car.car_make} ${car.car_model}`}
                    />
                  )}

                  <div className="new-car-info">
                    <span className="car-badge">For Sale</span>

                    <h3>
                      {car.car_make} {car.car_model}
                    </h3>

                    <p>
                      {car.car_year} • {car.fuel_type} • {car.mileage} km
                    </p>

                    <strong>{car.price} €</strong>

                    <p>{car.description}</p>

                    <small>
                      Seller: {car.emri || "User"} {car.mbiemri || ""}
                    </small>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <p className="no-results-message">No cars listed yet.</p>
          )}
        </>
      )}

      {activeTab === "reviews" && (
        <>
          <button
            type="button"
            className="review-title-button"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            Write a review
          </button>

          {showReviewForm && (
            <div className="review-modal-overlay">
              <div className="review-modal">
                <button
                  type="button"
                  className="review-close-btn"
                  onClick={() => setShowReviewForm(false)}
                >
                  ×
                </button>

                <h2>Car Review</h2>

                <form className="review-modal-form" onSubmit={submitReview}>
                  <input
                    name="car_make"
                    placeholder="Car make"
                    value={reviewForm.car_make}
                    onChange={handleReviewChange}
                  />

                  <input
                    name="car_model"
                    placeholder="Car model"
                    value={reviewForm.car_model}
                    onChange={handleReviewChange}
                  />

                  <input
                    name="car_year"
                    placeholder="Car year"
                    value={reviewForm.car_year}
                    onChange={handleReviewChange}
                  />

                  <input
                    name="rating"
                    placeholder="Rating 1-5"
                    value={reviewForm.rating}
                    onChange={handleReviewChange}
                  />

                  <input
                    name="title"
                    placeholder="Review title"
                    value={reviewForm.title}
                    onChange={handleReviewChange}
                  />

                  <textarea
                    name="review_text"
                    placeholder="Write your review..."
                    value={reviewForm.review_text}
                    onChange={handleReviewChange}
                  />

                  <button type="submit">Submit Review</button>
                </form>
              </div>
            </div>
          )}

          {filteredReviews.length > 0 ? (
            <section className="buy-page-content">
              {filteredReviews.map((review) => (
                <div className="new-car-card" key={review.id}>
                  <div className="new-car-info">
                    <span className="car-badge">Review</span>

                    <h3>
                      {review.car_make} {review.car_model}
                    </h3>

                    <p>{review.car_year}</p>

                    <strong>{review.rating} / 5</strong>

                    <h4>{review.title}</h4>

                    <p>{review.review_text}</p>

                    <small>
                      By: {review.emri || "User"} {review.mbiemri || ""}
                    </small>
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