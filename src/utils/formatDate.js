const formatDate = (date) =>
  new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(Date.parse(date))

export default formatDate
