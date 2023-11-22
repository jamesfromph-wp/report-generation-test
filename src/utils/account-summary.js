import moment from "moment/moment";

export const AccountSummary = () => {
  // parameters
  const portfolio = [];
  const history = [];
  const user = {
    MasterInvestorCode: "0000-0000-0000",
    FirstName: "Juan",
    LastName: "Dela Cruz",
  };
  const date = new Date();

  const dateStart = moment(date).startOf("month").format("MMMM DD, YYYY");
  const dateEnd = moment(date).endOf("month").format("MMMM DD, YYYY");

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
  const mapFundSummary = (data = []) => {
    return [
      {
        fundName: "ABC",
        currency: "PHP",
      },
      {
        fundName: "DEF",
        currency: "PHP",
      },
      {
        fundName: "XYZ",
        currency: "PHP",
      },
    ];
  };

  const mapAccountSummary = (data = []) => {
    return [
      {
        title: "Market Value",
        value: 1000,
      },
      {
        title: "Invested Capital",
        value: 1000,
      },
      {
        title: "Gain/loss for the period",
        value: null,
      },
      {
        title: "Gain/loss since initial invested",
        value: null,
      },
    ];
  };

  const mapActivitySummary = (data = []) => {
    return [
      {
        activity: "Beginning Position",
        units: 1,
        netAssetValue: 1000,
        marketValue: 1000,
      },
      {
        activity: "Purchases",
        units: 2,
        netAssetValue: 1000,
        marketValue: 1000,
      },
      {
        activity: "Withdrawals",
        units: 0,
        netAssetValue: null,
        marketValue: null,
      },
      {
        activity: "Change in Value",
        units: null,
        netAssetValue: null,
        marketValue: null,
      },
      {
        activity: "Ending Position",
        units: 2,
        netAssetValue: 1000,
        marketValue: 1000,
      },
    ];
  };

  // renderers
  const renderFundSummary = (data = []) => {
    const elements = [];

    data.forEach((item) => {
      elements.push(`
        <div class="d-flex align-items-center justify-content-between px-3 py-2">
          <span class="w-50">${item.fundName}</span>
          <span class="w-50 text-end">${item.currency}</span>
        </div>`);
    });

    return data.length
      ? elements.join("\n")
      : `
      <div class="d-flex align-items-center justify-content-center px-3 py-2">
        <span>—</span>
      </div>`;
  };

  const renderAccountSummary = (data = []) => {
    const elements = [];

    // @todo: to be implemented
    // - Gain/loss for the period calculation
    // - Gain/loss since initial investment calculation

    data.forEach((item) => {
      elements.push(`
        <div class="d-flex align-items-center justify-content-between px-3 py-2">
          <span class="w-50">${item.title}</span>
          <span class="w-50 text-end">${parseCurrency(item.value)}</span>
        </div>`);
    });

    return data.length
      ? elements.join("\n")
      : `
      <div class="d-flex align-items-center justify-content-center px-3 py-2">
        <span>—</span>
      </div>`;
  };

  const renderActivitySummary = (data = []) => {
    const elements = [];

    // @todo: to be implemented
    // - Change in Value > Units calculation
    // - Change in Value > Net Asset Value calculation
    // - Change in Value > Market Value calculation

    data.forEach((item) => {
      elements.push(`
        <div class="d-flex align-items-center justify-content-between px-3 py-2">
          <span class="w-25">${item.activity}</span>
          <span class="w-25">${parseValue(item.units, "N/A")}</span>
          <span class="w-25 text-end">${parseCurrency(
            item.netAssetValue,
            "PHP",
            "N/A"
          )}</span>
          <span class="w-25 text-end">${parseCurrency(item.marketValue)}</span>
        </div>`);
    });

    return data.length
      ? elements.join("\n")
      : `
      <div class="d-flex align-items-center justify-content-center px-3 py-2">
        <span>—</span>
      </div>`;
  };

  // components
  const SectionHeader = (options = {}) => {
    const {
      title = "Investor Portfolio Statement",
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
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">

  <style>
    html {
      -webkit-print-color-adjust: exact;
    }

    body {
      padding: 24px;
    }

    .table-header {
      border-bottom: 1px solid #ddd !important;
    }

    .section-wrapper {
      background-color: #f7f7f7;
    }

    .section-border {
      border-bottom: 5px solid #f7f7f7;
    }

    .section-border-summary {
      border: 1px solid #ccc;
    }

    .text-small {
      font-size: 14px;
    }
  </style>
</head>

<body>
  ${SectionHeader({ date: date })}
  ${SectionInvestor(user)}

  <div class="row mt-4">
    <div class="d-flex flex-column align-items-center">
      <p class="fw-bold m-0">Investor Statement</p>
      <p class="m-0">${dateStart} to ${dateEnd}</p>
    </div>
  </div>

  <div class="row mt-3">
    <div class="section-border-summary d-flex align-items-center justify-content-between px-3 py-2 mb-2">
      <span class="fw-bold w-50">Fund</span>
      <span class="fw-bold w-50 text-end">Currency</span>
    </div>

    ${renderFundSummary(mapFundSummary(portfolio))}
  </div>

  <div class="row mt-3">
    <div class="section-border-summary d-flex align-items-center justify-content-center px-3 py-2 mb-2">
      <span class="fw-bold">Account Summary</span>
    </div>

    ${renderAccountSummary(mapAccountSummary(portfolio))}
  </div>

  <div class="row mt-3">
    <div class="section-border-summary d-flex align-items-center justify-content-center px-3 py-2 mb-2">
      <span class="fw-bold w-25">Account Activity</span>
      <span class="fw-bold w-25">Units</span>
      <span class="fw-bold w-25 text-end">Net Asset Value</span>
      <span class="fw-bold w-25 text-end">Market Value</span>
    </div>

    ${renderActivitySummary(mapActivitySummary(portfolio))}
  </div>
</body>

</html>`;
};
