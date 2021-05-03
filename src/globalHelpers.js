const helpers = {
  formatDate: (date) => {
    try {
      console.log("formatting date", typeof date);
      if (typeof date === "string") {
        let datesToNums = [];
        date.slice(0, 10);
        date = date.split("-");
        date.forEach((int, index) => {
          if (index === 1) int -= 1;
          datesToNums.push(parseInt(int));
          console.log(datesToNums);
        });
        let utc = Date.UTC(...datesToNums);
        let f = new Intl.DateTimeFormat("en", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        let formattedDate = f.format(utc);
        return formattedDate;
      }
    } catch (err) {
      console.warn("error within formatDate method", err);
      return;
    }
  },
};

export default helpers;
