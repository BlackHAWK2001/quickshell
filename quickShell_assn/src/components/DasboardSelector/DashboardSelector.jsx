import React, { useState, useEffect, useRef } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { groupTickets,sortTickets } from "../../Utils/helper";

import "./DashboardSelector.css";
const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const Display = () => {
  const [ticketData, setTicketData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [groupOption, setGroupOption] = useState(
    localStorage.getItem("groupOption") || "status"
  );
  const [sortOption, setSortOption] = useState(
    localStorage.getItem("sortOption") || "priority"
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const { tickets, users } = data;
      setTicketData(tickets);
      setUserData(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("groupOption", groupOption);
    localStorage.setItem("sortOption", sortOption);
  }, [groupOption, sortOption]);

  const groupedTickets = groupTickets(ticketData, groupOption, userData);
  const sortedTickets = sortTickets(groupedTickets, sortOption);

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div>
      <div className="navbar">
        <div className="display-card" onClick={toggleDropdownVisibility}>
          <span>
            <img src="/icons_FEtask/Display.svg" alt="Display Icon" />
            Display
            <img src="/icons_FEtask/Down.svg" alt="Dropdown Icon" />
          </span>
        </div>
      </div>

      {isDropdownVisible && (
        <div className="dropdown" ref={dropdownRef}>
          <div>
            <span>Grouping</span>
            <select
              className="group-dropdown"
              value={groupOption}
              onChange={(e) => setGroupOption(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <span>Ordering</span>
            <select
              className="sort-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}

      <div className="ticket-container">
        <Dashboard tickets={sortedTickets} users={userData} grouping={groupOption} />
      </div>
    </div>
  );
};

export default Display;
