import moment from "moment/moment";

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
