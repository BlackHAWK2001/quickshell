export const groupTickets = (tickets, groupBy, users) => {
  const groupedTickets = {};

  if (groupBy === "status") {
    ["Backlog", "Todo", "In progress", "Done", "Cancelled"].forEach((status) => {
      groupedTickets[status] = tickets.filter(
        (ticket) => ticket.status === status
      );
    });
  } else if (groupBy === "priority") {
    [4, 3, 2, 1, 0].forEach((priority) => {
      groupedTickets[priority] = tickets.filter(
        (ticket) => ticket.priority === priority
      );
    });
  } else if (groupBy === "user") {
    users.forEach((user) => {
      groupedTickets[user.name] = tickets.filter(
        (ticket) => ticket.userId === user.id
      );
    });
  } else {
    console.warn(`Unknown groupBy value: ${groupBy}`);
  }

  return groupedTickets;
};


export const sortTickets = (groupedTickets, sortBy) => {
  const sortedTickets = {};

  Object.keys(groupedTickets).forEach((group) => {
    const tickets = groupedTickets[group];
    if (sortBy === "priority") {
      sortedTickets[group] = tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "title") {
      sortedTickets[group] = tickets.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
  });

  return sortedTickets;
};
