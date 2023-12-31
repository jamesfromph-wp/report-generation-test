import moment from "moment/moment";

// helpers
const parseDate = (date = new Date()) => moment(date).format("MMMM DD, YYYY");

const parseValue = (value = 0, fallback = "-") =>
  value === null
    ? fallback
    : Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

const parseCurrency = (value = 0, currency = "₱", fallback = "-") =>
  value === null ? fallback : `${currency} ${parseValue(value)}`;

const getPercentage = (value = 0, total = 100, fallback = 0) => {
  const temp = (Number(value) / Number(total)) * 100;
  return isNaN(temp) ? fallback : temp;
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
        NAV: 1,
        initialValue: 500,
        currentValue: 500,
        returnValue: 0,
        percent: 50,
      },
      {
        fundName: "XYZ",
        units: 1,
        NAV: 1,
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
        NAV: 1,
        amount: 500,
        status: "Confirmed",
      },
      {
        date: new Date(),
        fundName: "DEF",
        type: "Subscription",
        units: 1,
        NAV: 1,
        amount: 500,
        status: "Pending",
      },
      {
        date: new Date(),
        fundName: "XYZ",
        type: "Redemption",
        units: 1,
        NAV: 1,
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
          <td class="fw-normal px-3">${parseValue(item.NAV)}</td>
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
          <td class="fw-normal px-3">${parseValue(item.NAV)}</td>
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
  ${SectionHeader({ title: "Investor Portfolio Statement", date: date })}
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

  ${SectionHeader({ title: "Investor Portfolio Statement", date: date })}
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

  ${SectionHeader({ title: "Investor Portfolio Statement", date: date })}
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

export const InvestmentInsights = () => {
  // parameters
  const portfolio = [
    {
      fund_name: "ABC",
      matchFundNav: {
        ending_paid_in: 0,
        ending_market_value: 0,
      },
      p_net_capital: 0,
    },
  ];
  const user = {
    FirstName: "Juan",
    LastName: "Dela Cruz",
    Email: "juandelacruz@webpuppies.com.sg",
    MobileNo: "09123456789",
  };
  const date = new Date();

  const dateToday = moment(date).format("Do MMM YYYY");

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
        title: "Absolute Return",
        value: 0,
        profit: parseValue(getPercentage(0, 1000)),
      },
    ];
  };

  const mapCategoryAllocation = (data = []) => {
    return [
      {
        fundName: "ABC",
        initialValue: 500,
        currentValue: 500,
        returnValue: 0,
      },
      {
        fundName: "XYZ",
        initialValue: 500,
        currentValue: 500,
        returnValue: 0,
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
      const content = item.hasOwnProperty("profit")
        ? `<div class="highlight d-flex align-items-center">
            <p class="fs-2 m-0">${parseCurrency(item.value)}</p>
            <i class="fs-5 bi bi-arrow-up-circle-fill ms-2"></i>
          </div>`
        : `<p class="fs-2 m-0">${parseCurrency(item.value)}</p>`;

      return `
        <div class="col-md-4 mt-3 mt-md-0">
          <div class="section-wrapper d-flex flex-column p-3">
            <span class="text-muted">${item.title}</span>
            ${content}
          </div>
        </div>`;
    });

    return elements.join("\n");
  };

  const renderCategoryAllocation = (data = []) => {
    const total = {
      initialValue: 0,
      currentValue: 0,
      returnValue: 0,
      percent: 0,
    };

    const elements = [];

    data.forEach((item) => {
      total.initialValue += Number(item.initialValue);
      total.currentValue += Number(item.currentValue);
      total.returnValue += Number(item.returnValue);

      elements.push(`
        <tr>
          <td class="px-3">${item.fundName}</td>
          <td class="px-3">${parseCurrency(item.initialValue)}</td>
          <td class="px-3">${parseCurrency(item.currentValue)}</td>
          <td class="px-3">${parseCurrency(item.returnValue)}</td>
        </tr>`);
    });

    total.percent = getPercentage(total.returnValue, total.initialValue);

    elements.push(`
      <tr>
        <td class="px-3">Total</td>
        <td class="px-3">${parseCurrency(total.initialValue)}</td>
        <td class="px-3">${parseCurrency(total.currentValue)}</td>
        <td class="px-3">
          <div class="highlight d-flex flex-column">
            <span>${parseCurrency(total.returnValue)}</span>
            <span>(${parseValue(total.percent)}%)</span>
          </div>
        </td>
      </tr>`);

    return elements.join("\n");
  };

  const renderAllocationPercent = (data = []) => {
    const elements = [];

    const totalCurrent = data.reduce((a, b) => a + Number(b.currentValue), 0);

    data.forEach((item) => {
      const totalPercent = getPercentage(item.currentValue, totalCurrent);

      elements.push(`
        <div class="d-flex flex-column mt-2">
          <p class="m-0">Equity - ${item.fundName}</p>

          <div class="mt-1" style="background-color: #f5f7f9; border-radius: 25px; overflow: hidden;">
            <div class="progress-bar" style="font-size: 12px; width: ${totalPercent}%; height: 20px;">${Math.round(
        totalPercent
      )}%</div>
          </div>
        </div>`);
    });

    return elements.join("\n");
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

    .section-wrapper {
      background-color: #f5f7f9;
    }

    .section-border {
      border-bottom: 5px solid #f7f7f7;
    }

    .table-header {
      border-bottom: 1px solid #ddd !important;
    }

    .highlight {
      color: #a9cb86;
    }

    .page-break {
      page-break-after: always;
    }
  </style>
</head>

<body>
  <div class="row section-border pb-3">
    <div class="col-md-8">
      <div class="wrapper d-flex flex-column px-3 pt-3">
        <h3>${user.FirstName} ${user.LastName}</h3>

        <!-- <p class="m-0">Vaishanavi Summit,</p>
        <p class="m-0">No. 6/B, Summit, 80 Feet Rd, </p>
        <p class="m-0">Bengaluru, Karnataka 560034</p> -->
      </div>
    </div>

    <div class="col-md-4">
      <div class="wrapper d-flex flex-column px-3 pt-md-3">
        <!-- <p class="m-0">PAN: 748458859</p> -->
        <p class="m-0">Mobile: ${user.MobileNo}</p>
        <p class="m-0">Email: ${user.Email}</p>
      </div>
    </div>
  </div>

  <div class="d-flex align-items-baseline justify-content-start px-3 mt-3">
    <h2 class="fw-bold m-0" style="color: #243466;">Investment Insights</h2>
    <span class="ms-2">(as of ${dateToday})</span>
  </div>

  <div class="row p-3 mt-2">
    ${renderInvestmentSummary(mapInvestmentSummary(portfolio))}
  </div>

  <!-- <div class="d-flex align-items-baseline justify-content-start px-3">
    <p class="fs-6 m-0">Current Value:</p>
    <p class="fs-6 ms-2" style="color:#243465">Forty two thousand five hundred only</p>
  </div> -->

  <div class="row mt-2">
    <div class="wrapper d-flex flex-column">
      <span class="fw-bold px-3 py-2" style="background-color: #243465; color: #ffffff;">
        Category Allocation
      </span>
    </div>

    <div class="col-md-8">
      <table class="table table-striped">
        <thead>
          <tr>
            ${renderTableHeader([
              "Fund",
              "Investment",
              "Current Value",
              "Absolute Returns",
            ])}
          </tr>
        </thead>

        <tbody>
          ${renderCategoryAllocation(mapCategoryAllocation(portfolio))}
        </tbody>
      </table>
    </div>

    <div class="col-md-4 d-flex align-items-start">
      <div class="d-flex flex-column w-100 p-3">
        <p class="fs-4 fw-bold m-0">Category Allocation (%)</p>
        ${renderAllocationPercent(mapCategoryAllocation(portfolio))}
      </div>
    </div>
  </div>
</body>

</html>`;
};

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
  ${SectionHeader({ title: "Investor Portfolio Statement", date: date })}
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

export const AssetsManagement = () => {
  // parameters
  const portfolio = [];
  const user = {
    MasterInvestorCode: "0000-0000-0000",
    FirstName: "Juan",
    LastName: "Dela Cruz",
  };
  const date = new Date();

  // mappers
  const mapAssetSummary = (data = []) => {
    return [
      {
        fundName: "ABC",
        shares: 1,
        assets: 1,
        NAV: 1,
      },
      {
        fundName: "XYZ",
        shares: 1,
        assets: 1,
        NAV: 1,
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

  const renderAssetSummary = (data = []) => {
    const elements = [];

    data.forEach((item) => {
      elements.push(`
        <tr>
          <td class="fw-normal px-3">${item?.fundName}</td>
          <td class="fw-normal px-3">${parseValue(item?.shares)}</td>
          <td class="fw-normal px-3">${parseValue(item?.assets)}</td>
          <td class="fw-normal px-3">${parseCurrency(item?.NAV)}</td>
        </tr>`);
    });

    return data.length
      ? elements.join("\n")
      : `
      <tr>
        <td colspan="4" class="text-center">—</td>
      </tr>`;
  };

  return `
<!doctype html>
<html lang="en">

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

    .section-border {
      border-bottom: 5px solid #f7f7f7;
    }

    .text-small {
      font-size: 14px;
    }
  </style>
</head>

<body>
  ${SectionHeader({ title: "Assets Under Management", date: date })}

  <div class="row mt-3">
    <table class="table table-striped">
      <thead>
        <tr class="border-bottom">
          ${renderTableHeader([
            "Fund",
            "Shares (Outstanding)",
            "Assets (Under Management)",
            "NAV",
          ])}
        </tr>
      </thead>

      <tbody>
          ${renderAssetSummary(mapAssetSummary(portfolio))}
      </tbody>
    </table>
  </div>
</body>

</html>`;
};

export const MonthlyTransactions = () => {
  // parameters
  const portfolio = [];
  const user = {
    MasterInvestorCode: "0000-0000-0000",
    FirstName: "Juan",
    LastName: "Dela Cruz",
  };
  const date = new Date();

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
  ${SectionHeader({ title: "Monthly Sales and Redemptions", date: date })}

  <div class="d-flex flex-column mt-3">
    ${renderBlocks(mapBlocks(portfolio))}
  </div>
</body>

</html>`;
};
