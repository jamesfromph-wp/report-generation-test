import moment from "moment/moment";

// default values
const initial = {
  porfolio: [],
  history: [],
  user: {
    MasterInvestorCode: "0000-0000-0000",
    FirstName: "Juan",
    LastName: "Dela Cruz",
  },
};

export const PortfolioStatement = () => {
  // parameters
  const portfolio = [];
  const history = [];
  const user = {
    MasterInvestorCode: "0000-0000-0000",
    FirstName: "Juan",
    LastName: "Dela Cruz",
  };
  const date = new Date();
  const isGroupByBank = false;
  const isInventoryStatement = false;

  const assetColors = [
    "#ffff34",
    "#0000ff",
    "#FDBDF4",
    "#C0F054",
    "#F000FF",
    "#e18dba",
    "#94a1d5",
    "#9b6c2d",
    "#78c603",
    "#c455e2",
    "#c54891",
    "#2CF86D",
    "#86a8fa",
    "#774d16",
    "#63b434",
    "#899f98",
    "#89f5d2",
  ];

  const dateStart = moment(date).startOf("month").format("MMMM DD, YYYY");
  const dateEnd = moment(date).endOf("month").format("MMMM DD, YYYY");

  // helpers
  const parseDate = (date = new Date()) => moment(date).format("MMMM DD, YYYY");

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
  const mapInvestmentSummary = (data = []) => {
    return [
      {
        title: "Total Investment",
        value: 1000,
      },
      {
        title: "Current Value",
        value: 1000,
      },
      {
        title: "Holding Period Return",
        value: 0,
        percent: parseValue(getPercentage(0, 1000)),
      },
    ];
  };

  const mapPorfolioSummary = (data = []) => {
    return [
      {
        fundName: "ABC",
        units: 1,
        NAV: 500,
        initialValue: 500,
        currentValue: 500,
        returnValue: 0,
        percent: 50,
      },
      {
        fundName: "XYZ",
        units: 1,
        NAV: 500,
        initialValue: 500,
        currentValue: 500,
        returnValue: 0,
        percent: 50,
      },
    ];
  };

  const mapPorfolioAllocation = (data = []) => {
    return [
      {
        fundName: "ABC",
        value: 500,
        percent: 50,
      },
      {
        fundName: "XYZ",
        value: 500,
        percent: 50,
      },
    ];
  };

  const mapTransactionHistory = (data = []) => {
    return [
      {
        date: new Date(),
        fundName: "ABC",
        type: "Subscription",
        units: 1,
        NAV: 500,
        amount: 500,
        status: "Confirmed",
      },
      {
        date: new Date(),
        fundName: "DEF",
        type: "Subscription",
        units: 1,
        NAV: 500,
        amount: 500,
        status: "Pending",
      },
      {
        date: new Date(),
        fundName: "XYZ",
        type: "Redemption",
        units: 1,
        NAV: 500,
        amount: 500,
        status: "Confirmed",
      },
    ];
  };

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
  const renderTableHeader = (data = []) => {
    const elements = [];

    data.forEach((item) =>
      elements.push(`<th class="table-header fw-bold px-3">${item}</th>`)
    );

    return elements.join("\n");
  };

  const renderInvestmentSummary = (data = []) => {
    const elements = data.map((item) => {
      const content = item.hasOwnProperty("percent")
        ? `${parseCurrency(item.value)} (${item.percent}%)`
        : parseCurrency(item.value);

      return `
        <div class="col-md-4 mt-3">
          <div class="section-wrapper d-flex flex-column justify-content-center p-3">
            <p class="fw-bold m-0">${item.title}</p>
            <p class="fs-2 m-0">${content}</p>
          </div> 
        </div>`;
    });

    return elements.join("\n");
  };

  const renderPorfolioSummary = (data = []) => {
    const total = {
      initialValue: 0,
      currentValue: 0,
      returnValue: 0,
      percent: 0,

      returnPercent: 0,
    };

    const elements = [];

    data.forEach((item) => {
      // compute values
      total.initialValue += Number(item.initialValue);
      total.currentValue += Number(item.currentValue);
      total.returnValue += Number(item.returnValue);
      total.percent += Number(item.percent);

      elements.push(`
        <tr>
          <td class="fw-normal px-3">${item.fundName}</td>
          <td class="fw-normal px-3">${parseValue(item.units)}</td>
          <td class="fw-normal px-3">${parseCurrency(item.NAV)}</td>
          <td class="fw-normal px-3">${parseCurrency(item.initialValue)}</td>
          <td class="fw-normal px-3">${parseCurrency(item.currentValue)}</td>
          <td class="fw-normal px-3">${parseCurrency(item.returnValue)}</td>
          <td class="fw-normal px-3">${Number(item.percent)}%</td>
        </tr>`);
    });

    // get total percentage of return
    total.returnPercent = getPercentage(total.returnValue, total.initialValue);

    elements.push(`
      <tr>
        <td class="fw-normal px-3">All</td>
        <td class="fw-normal px-3">-</td>
        <td class="fw-normal px-3">-</td>
        <td class="fw-normal px-3">${parseCurrency(total.initialValue)}</td>
        <td class="fw-normal px-3">${parseCurrency(total.currentValue)}</td>
        <td class="fw-normal px-3">${parseCurrency(
          total.returnValue
        )} (${parseValue(total.returnPercent)}%)</td>
        <td class="fw-normal px-3">${Math.round(total.percent)}%</td> 
      </tr>`);

    return elements.join("\n");
  };

  const renderPorfolioAllocation = (data = []) => {
    const total = {
      value: 0,
      percent: 0,
    };

    const elements = [];

    data.forEach((item) => {
      // compute values
      total.value += Number(item.value);
      total.percent += Number(item.percent);

      elements.push(`
        <tr>
          <td class="fw-normal px-3">${item.fundName}</td>
          <td class="fw-normal px-3">${parseCurrency(item.value)}</td>
          <td class="fw-normal px-3">${Number(item.percent)}%</td>
        </tr>`);
    });

    elements.push(`
      <tr>
        <td class="fw-normal px-3">Total</td>
        <td class="fw-normal px-3">${parseCurrency(total.value)}</td>
        <td class="fw-normal px-3">${Math.round(total.percent)}%</td>
      </tr>`);

    return elements.join("\n");
  };

  const renderTransactionHistory = (data = []) => {
    const elements = [];

    data.map((item) => {
      elements.push(`
        <tr>
          <td class="fw-normal px-3">${parseDate(item.date)}</td>
          <td class="fw-normal px-3">${item.fundName}</td>
          <td class="fw-normal px-3">${item.type}</td>
          <td class="fw-normal px-3">${parseValue(item.units)}</td>
          <td class="fw-normal px-3">${parseCurrency(item.NAV)}</td>
          <td class="fw-normal px-3">${parseCurrency(item.amount)}</td>
          <td class="fw-normal px-3">${item.status}</td>
        </tr>`);
    });

    return data.length
      ? elements.join("\n")
      : `
      <tr class="text-center">
        <td colspan="7">—</td>
      </tr>`;
  };

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
        <span>--</span>
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
        <span>--</span>
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
        <span>--</span>
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

    .column-header {
      background-color: #3848a2;
      color: white;
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

    .page-break {
      page-break-after: always;
    }
  </style>
</head>

<body>
  ${SectionHeader({ date: date })}
  ${SectionInvestor(user)}

  <div class="row">
    ${renderInvestmentSummary(mapInvestmentSummary(portfolio))}
  </div>

  <div class="row mt-3">
    <span class="column-header fw-bold px-3 py-2">Portfolio Summary</span>

    <table class="table table-striped">
      <thead>
        <tr>
          ${renderTableHeader([
            "Fund",
            "Units",
            "NAV",
            "Invested Capital",
            "Current Value",
            "Return",
            "Percentage (%) of Portfolio",
          ])}
        </tr>
      </thead>

      <tbody>
        ${renderPorfolioSummary(mapPorfolioSummary(portfolio))}
      </tbody>
    </table>
  </div>

  <!-- <br> -->
  <div class="page-break"></div>

  <div class="row">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-4 d-flex align-items-center justify-content-center">
          <div class="wrapper mb-3">
            <canvas id="assetAllocation" width="300" height="300"></canvas>
          </div>
        </div>

        <div class="col-md-8">
          <div class="row mx-md-2">
            <span class="column-header fw-bold px-3 py-2">Portfolio Asset Allocation</span>

            <table class="table table-striped">
              <thead>
                <tr>
                  ${renderTableHeader([
                    "Fund",
                    `Value In ${dateEnd}`,
                    "Percent of assets",
                  ])}
                </tr>
              </thead>

              <tbody>
                ${renderPorfolioAllocation(mapPorfolioAllocation(portfolio))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="row">
        <span class="column-header fw-bold px-3 py-2">Value of Investments over time</span>

        <div class="d-flex align-items-center justify-content-center mb-3">
          <canvas id="investmentValue" width="600" height="300" class="pt-2"></canvas>
        </div>
      </div>
    </div>
  </div>

  <!-- page break -->
  <div class="page-break"></div>

  ${SectionHeader({ date: date })}
  ${SectionInvestor(user)}

  <div class="row mt-3">
    <table class="table table-striped">
      <span class="column-header fw-bold px-3 py-2">Investment Transaction History</span>

      <thead>
        <tr>
          ${renderTableHeader([
            "Date",
            "Fund",
            "Type",
            "Units",
            "NAV",
            "Amount",
            "Status",
          ])}
        </tr>
      </thead>

      <tbody>
        ${renderTransactionHistory(mapTransactionHistory(history))}
      </tbody>
    </table>
  </div>

  <!-- page break -->
  <div class="page-break"></div>

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

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <script>
    const assetAllocationData = {
      datasets: [
        {
          label: 'Funds',
          data: ${JSON.stringify(
            mapPorfolioAllocation(portfolio).map((item) => item.value)
          )},
          backgroundColor: ${JSON.stringify(assetColors)},
        },
      ]
    };

    const assetAllocation = document.getElementById('assetAllocation');

    new Chart(assetAllocation, {
      type: 'pie',
      data: assetAllocationData,
      options: {
        animation: false,
        transitions: {
          active: {
            animation: {
              duration: 0
            }
          },
        },
      }
    });

    const investmentValueData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Deposits & Withdrawals',
          data: [65, 59, 80, 81, 56, 55, 40, 60, 65, 71, 52, 43],
          borderWidth: 1
        },
        {
          label: 'Value of your accounts',
          data: [95, 39, 70, 61, 66, 45, 50, 70, 55, 61, 42, 33],
          borderWidth: 2
        }
      ]
    };

    const investmentValue = document.getElementById('investmentValue');

    new Chart(investmentValue, {
      type: 'line',
      data: investmentValueData,
      options: {
        animation: false,
        animations: {
          colors: false,
        },
        transitions: {
          active: {
            animation: {
              duration: 0
            }
          },
        },
        responsive: false,
        legend: { display: true },
        scales: {
          yAxes: [],
        }
      }
    });
  </script>
</body>

</html>`;
};
