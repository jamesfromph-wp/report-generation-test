import moment from "moment/moment";

export const AssetsManagement = () => {
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
          <td class="fw-normal px-3">${parseValue(item?.NAV)}</td>
        </tr>`);
    });

    return data.length
      ? elements.join("\n")
      : `
      <tr>
        <td colspan="4" class="text-center">—</td>
      </tr>`;
  };

  // components
  const SectionHeader = (options = {}) => {
    const {
      title = "Assets Under Management",
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
  ${SectionHeader({ date: date })}
  ${SectionInvestor(user)}

  <div class="row mt-4">
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
