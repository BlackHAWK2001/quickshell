import React from "react";
import TicketCard from "../Cards/Card";

import "./Dashboard.css";

const priorityTitles = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const picture = {
  Backlog: "Backlog.svg",
  Todo: "To-do.svg",
  "In progress": "in-progress.svg",
  Done: "Done.svg",
  Cancelled: "Cancelled.svg",
  0: "No-priority.svg",
  1: "Img - Low Priority.svg",
  2: "Img - Medium Priority.svg",
  3: "Img - High Priority.svg",
  4: "SVG - Urgent Priority colour.svg",
  default: "user.jpg",
};
export const Dashboard = ({ tickets, users, grouping }) => {
  return (
    <div className="dashboard">
      {Object.keys(tickets).map((group) => (
        <div key={group}>
          <div className="group-column">
            <span className="groupStatus">
              <img
                src={
                  picture[group]
                    ? `/icons_FEtask/${picture[group]}`
                    : "user.jpg"
                }
                alt={group}
              ></img>
              <span className="groupHeading">
                {grouping === "priority" ? priorityTitles[group] : group}
              </span>
              <span className="groupCount">{tickets[group].length}</span>
            </span>
            <span className="groupIcon">
              <img src="/icons_FEtask/add.svg"></img>
              <img src="/icons_FEtask/3 dot menu.svg"></img>
            </span>
          </div>
          {tickets[group].map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              users={users}
              grouping={grouping}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
