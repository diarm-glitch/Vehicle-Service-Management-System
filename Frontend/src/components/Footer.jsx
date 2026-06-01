function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-help">
          <h2>Help Center</h2>
          <p>Monday to Friday 09:00 - 18:00</p>
          <p>Saturday 10:00 - 17:00</p>
          <p>Sundays and Holidays CLOSED</p>

          <div className="footer-socials">
            <a href="#">
              <img src="/facebook.png" alt="Facebook" />
            </a>
            <a href="#">
              <img src="/instagram.png" alt="Instagram" />
            </a>
            <a href="#">
              <img src="/tiktok.png" alt="TikTok" />
            </a>
          </div>
        </div>

        <nav className="footer-links">
          <a href="#about">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#services">Our Services</a>
          <a href="#">Apply To Be A Mechanic</a>
          <a href="#assistance">Pakot</a>
        </nav>

        <a
          href="https://www.google.com/maps/place/Rruga+Xhevded+Doda,+Prishtin%C3%AB+10000"
          className="footer-location"
          target="_blank"
        >
          <img src="/location.png" alt="Location" />
          <span>Rruga Xhevded Doda, Pristina 10000, Kosovo</span>
        </a>

      </div>

      <p className="footer-copy">
        © 2026 Costums Bay Garage. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
