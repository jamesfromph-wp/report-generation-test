import moment from "moment/moment";

export const MonthlyTransactions = () => {
  // parameters
  const portfolio = [];
  const user = {
    MasterInvestorCode: "0000-0000-0000",
    FirstName: "Juan",
    LastName: "Dela Cruz",
  };
  const date = new Date();

  // helpers
  const parseValue = (value = 0, fallback = "-") =>
    value === null
      ? fallback
      : Number(value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  const parseCurrency = (value = 0, currency = "PHP", fallback = "-") =>
    value === null ? fallback : `${currency} ${parseValue(value)}`;

  const getPercentage = (value = 0, total = 100, fallback = 0) => {
    const temp = (Number(value) / Number(total)) * 100;
    return isNaN(temp) ? fallback : temp;
  };

  // mappers
  const mapBlocks = (data = []) => {
    return [
      {
        label: "Total amount received from sale of shares",
        value: 500,
        type: "currency",
      },
      {
        label: "Total amount of redemption",
        value: 500,
        type: "currency",
      },
      {
        label: "Number of shares outstanding at beginning of month",
        value: 1,
        type: "share",
      },
      {
        label: "Number of shares sold during month",
        value: 1,
        type: "share",
      },
      {
        label: "Number of shares redeemed during month",
        value: 1,
        type: "share",
      },
      {
        label: "Number of shares outstanding at end of month",
        value: 1,
        type: "share",
      },
      {
        label: "Percentage of outstanding shares owned by Filipino",
        value: 100,
        type: "percent",
      },
      {
        label: "Average net asset value as of the end of the month",
        value: 1,
        type: "share",
      },
    ];
  };

  // renderer
  const renderBlocks = (data = []) => {
    const letters = "ABCDEFGH";
    const elements = [];

    data.forEach((item, index) => {
      let content = `${parseCurrency(item.value)}`;

      if (item.type === "percent")
        content = `${Math.round(Number(item.value))}%`;

      if (item.type === "share")
        content = `${parseValue(item.value)} ${
          Number(item.value) > 1 ? "shares" : "share"
        }`;

      elements.push(`
        <div class="d-flex justify-content-between py-2">
          <p class="m-0">(${letters.charAt(index)}) ${item.label}</p>
          <p class="m-0">${content}</p>
        </div>`);
    });

    return elements.join("\n");
  };

  // components
  const SectionHeader = (options = {}) => {
    const {
      title = "Monthly Sales and Redemptions",
      date = new Date(),
      logo,
    } = options;

    const dateStart = moment(date, "MM-DD-YYYY")
      .startOf("month")
      .format("MMMM DD, YYYY");

    const dateEnd = moment(date, "MM-DD-YYYY")
      .endOf("month")
      .format("MMMM DD, YYYY");

    const image = {
      bucket: "https://mbgbucket2.s3.ap-southeast-1.amazonaws.com/resources/",
      source: logo || "mbgx-logo-4.png",
    };

    return `
      <div class="row">
        <div class="col-md-12 d-flex section-border">
          <div class="logo-wrapper">
            <img width="120px" class="img-fluid" src="${image.bucket}${image.source}">
          </div>

          <div class="ms-auto">
            <p class="fw-bold m-0">${title}</p>
            <p class="text-secondary text-small">For ${dateStart} to ${dateEnd}</p>
          </div>
        </div>
      </div>`;
  };

  const SectionInvestor = (options = {}) => {
    const {
      code = "0000-0000-0000",
      firstName = "Juan",
      lastName = "Dela Cruz",
    } = options;

    return `
      <div class="row mt-3">
        <div class="wrapper d-flex flex-column">
          <div class="d-flex align-items-center">
            <p class="fw-bold m-0">Investor ID:</p>
            <p class="m-0 ms-2">${code}</p>
          </div>

          <div class="d-flex align-items-center">
            <p class="fw-bold m-0">Investor Name:</p>
            <p class="m-0 ms-2">${firstName} ${lastName}</p>
          </div>
        </div>
      </div>`;
  };

  return `
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">

  <style>
    html {
      -webkit-print-color-adjust: exact;
    }

    body {
      padding: 24px;
    }

    .section-border {
      border-bottom: 5px solid #f7f7f7;
    }

    .text-small {
      font-size: 14px;
    }
  </style>
</head>

<body>
  ${SectionHeader({ date: date })}
  ${SectionInvestor(user)}

  <div class="d-flex flex-column mt-4">
    ${renderBlocks(mapBlocks(portfolio))}
  </div>
</body>

</html>`;
};
