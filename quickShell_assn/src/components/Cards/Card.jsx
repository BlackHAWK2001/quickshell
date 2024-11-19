import React from "react";
import "./Card.css";

const TicketCard = ({ ticket, users, grouping }) => {
  const { id, title, userId, status, tag = [], priority } = ticket;
  const user = users.find((user) => user.id === userId) || {};

  const shouldShowUser = grouping !== "user";
  const shouldShowStatus = grouping !== "status";
  const shouldShowPriority = grouping !== "priority";

  const statusIcon =
    status === "Todo"
      ? "To-do.svg"
      : status === "In progress"
      ? "in-progress.svg"
      : "Backlog.svg";

  const priorityIcon = {
    0: "No-priority.svg",
    1: "Img - Low Priority.svg",
    2: "Img - Medium Priority.svg",
    3: "Img - High Priority.svg",
    4: "SVG - Urgent Priority grey.svg",
  }[priority] || "default-image.svg";

  return (
    <div className="ticket-card">
      <div className="ticketHeading">
        <span>{id}</span>
        {shouldShowUser && (
          <>
            <img src="user.jpg" alt="user-avatar" />
            <span
              className={`availability-indicator ${
                user.available ? "available" : "unavailable"
              }`}
            ></span>
          </>
        )}
      </div>

      <div className="ticketTitle">
        {shouldShowStatus && (
          <img
            src={`/icons_FEtask/${statusIcon}`}
            alt="status-icon"
          />
        )}
        {title}
      </div>

        <div className="ticketInfo">
        {shouldShowPriority && (
          <img
            src={`/icons_FEtask/${priorityIcon}`}
            alt="priority-icon"
          />
        )}
        <span className="tag-container">
          {tag.map((t, index) => (
            <div key={`${id}-${index}`} className="tag-wrapper">
              <img src="/icons_FEtask/To-do.svg" alt="tag-icon" />
              <span className="tag">{t}</span>
            </div>
          ))}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
