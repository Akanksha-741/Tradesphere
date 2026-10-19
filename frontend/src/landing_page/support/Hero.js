import React , { useState }from 'react';
// import React, { useState } from "react";
 import "./SupportPage.css";




const categories = [
  {
    icon: "⊕",
    title: "Account Opening",
    links: ["Online Account Opening", "Offline Account Opening", "KYC"],
  },
  {
    icon: "♙",
    title: "Your Zerodha Account",
    links: ["Login and Password", "Account Details", "Account Security"],
  },
  {
    icon: "◉",
    title: "Kite",
    links: ["Trading on Kite", "Orders and Positions", "Charts"],
  },
  {
    icon: "₹",
    title: "Funds",
    links: ["Add Funds", "Withdraw Funds", "Fund Statement"],
  },
  {
    icon: "▤",
    title: "Console",
    links: ["Reports", "Holdings", "Tax P&L"],
  },
];

function Hero() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="support-portal">

      {/* Heading */}
      <div className="support-heading">
        <h1>Support Portal</h1>
        <button className="tickets-button">My tickets</button>
      </div>

      {/* Search */}
      <div className="support-search">
        <span className="search-symbol">⌕</span>

        <input
          type="text"
          placeholder="Eg: How do I open my account, How do I activate F&O..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Main Section */}
      <div className="support-layout">

        {/* Categories */}
        <div className="support-category-list">
          {filteredCategories.map((category, index) => (
            <div className="support-item" key={category.title}>

              <div
                className="support-item-heading"
                onClick={() =>
                  setExpanded(expanded === index ? null : index)
                }
              >
                <span className="category-icon">{category.icon}</span>

                <h2>{category.title}</h2>

                <span className="category-arrow">
                  {expanded === index ? "⌃" : "⌄"}
                </span>
              </div>

              {expanded === index && (
                <div className="support-item-links">
                  {category.links.map((link) => (
                    <a href="#" key={link} onClick={(e) => e.preventDefault()}>
                      {link}
                    </a>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Announcements */}
        <aside className="support-announcements">
          <ul>
            <li>
              <a href="#">
                Current Takeovers and Delisting – October 2026
              </a>
            </li>

            <li>
              <a href="#">
                Latest Intraday leverages and Square-off timings
              </a>
            </li>

            <li>
              <a href="#">
                Important information for traders
              </a>
            </li>
          </ul>
        </aside>

      </div>
    </section>
  );
}



export default Hero  ;