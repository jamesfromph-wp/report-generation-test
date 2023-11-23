import moment from "moment/moment";

export const InvestmentInsights = (
  user = {
    FirstName: "Juan",
    LastName: "Dela Cruz",
    Email: "juandelacruz@dummy-persona.com",
    MobileNo: "09123456789",
  },
  data = [
    {
      fund_name: "ABC",
      matchFundNav: {
        ending_paid_in: 0,
        ending_market_value: 0,
      },
      p_net_capital: 0,
    },
  ]
) => {
  const dateToday = moment().format("Do  MMM  YYYY");

  let totalInvestment = 0;
  let totalCurrentValue = 0;
  let totalAbsoluteReturns = 0;
  let totalAbsoluteReturnsPercent = 0;

  let allocationTable = ``;
  let categoryAllocationTable = ``;

  for (let i = 0; i < data.length; i++) {
    const port = data[i];
    const portFundValues = port.matchFundNav;

    const investmentValue = parseFloat(portFundValues.ending_paid_in).toFixed(
      2
    );
    const currentValue = parseFloat(portFundValues.ending_market_value).toFixed(
      2
    );

    const absoluteReturn = currentValue - investmentValue;
    const absoluteReturnPercent =
      ((currentValue - investmentValue) / investmentValue) * 100;

    totalInvestment += parseFloat(investmentValue);
    totalCurrentValue += parseFloat(currentValue);
    totalAbsoluteReturns += parseFloat(absoluteReturn);
    totalAbsoluteReturnsPercent += absoluteReturnPercent;

    allocationTable += `
      <tr>
        <th scope="row">${port.fund_name}</th>
        <td>PHP ${investmentValue
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>PHP ${parseFloat(currentValue)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td class="d-flex flex-column" style="color: hsl(89deg 40% 66%)">
          <span>PHP ${parseFloat(absoluteReturn)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          <span>(${absoluteReturnPercent.toFixed(2)}%)</span>
        </td>
        </tr>
    
    `;
  }
  for (let i = 0; i < data.length; i++) {
    const port = data[i];
    let percent = (port.p_net_capital / totalCurrentValue) * 100;
    categoryAllocationTable += `

      <div class="mt-3">
        <label>Equity - Banking</label>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: ${percent.toFixed(
            2
          )}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${percent.toFixed(
      2
    )}%</div>
        </div>
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
<html>
<head>

<style>
html { -webkit-print-color-adjust: exact; }
</style>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">

</head>
<body>

<div class="row border-end-1 d-flex justify-content-start">

</div>


<div class="row ">
  <div class="col-md-12 text-start">
    <h3>${user.FirstName} ${user.LastName}</h3>
  </div>
  <div class="col-md-6 text-start">
<!--        <p class="lh-sm m-0 ">Vaishanavi Summit,</p>-->
<!--        <p class="lh-sm m-0 ">No. 6/B, Summit, 80 Feet Rd, </p>-->
<!--        <p class="lh-sm m-0">Bengaluru, Karnataka 560034</p>-->
  </div>
  <div class="col-md-6 text-start">
<!--        <p class="lh-sm m-0 ">PAN: 748458859</p>-->
    <p class="lh-sm m-0 ">Mobile: ${user.MobileNo ? user.MobileNo : "N/A"} </p>
    <p class="lh-sm m-0">Email: ${user.Email ? user.Email : "N/A"}</p>
  </div>
  <div class="col-md-12 mt-4 d-flex justify-content-start align-items-end">
    <h2 class="fw-bold m-0" style="color: hsl(226deg 47% 27%);">Investment Insights</h2>
    <br>
    <span class="ms-2 ">(as of ${dateToday})</span>
  </div>
</div>

<div class="row ps-5 pe-5">
  <div class="col-md-4 p-2 border-end" style="background-color: hsl(210deg 25% 97%);">
    <span class="text-muted">Total Investment</span>
    <h5>PHP ${parseFloat(totalInvestment)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h5>
  </div>
  <div class="col-md-4 p-2 border-end" style="background-color: hsl(210deg 25% 97%);">
    <span class="text-muted">Current Value</span>
    <h5>PHP ${parseFloat(totalCurrentValue)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h5>
  </div>
  <div class="col-md-4 p-2" style="background-color: hsl(210deg 25% 97%);">
    <span class="text-muted">Absolute Returns</span>
    <h5 style="color: hsl(89deg 40% 66%)">PHP ${parseFloat(totalAbsoluteReturns)
      .toFixed(2)
      .toString()
      .replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )} <i class="bi bi-arrow-up-circle-fill ms-2"></i></h5>
  </div>
<!--    <div class="col-md-12 mt-3">-->
<!--        <p>Current Value - <span style="color:hsl(226deg 47% 27%)">Forty two thousand five hundred only</span></p>-->
<!--    </div>-->
</div>

<div class="row ps-5 pe-5 pt-3">
  <div class="p-2" style="background-color: hsl(226deg 47% 27%); color: white;">
    Category Allocation
  </div>
</div>

<div class="row ps-5 pe-5">
  <div class="col-md-8 mt-3 p-1 pe-4">
    <table class="table table-striped">
      <thead>
        <tr>
<!--                <th scope="col">Schema Category</th>-->
        <th scope="col">Fund</th>
        <th scope="col">Investment</th>
        <th scope="col">Current Value</th>
        <th scope="col">Absolute Returns</th>
        </tr>
      </thead>
      <tbody>
        ${allocationTable}
      </tbody>
      </table>
  </div>
  <div class="col-md-4  p-2 mt-3 ps-5" style="border-left: 3px solid hsl(226deg 47% 27%);">
    <div class="col-md-12 pt-5">
      <h5 class="fw-bold">Category Allocation(%)</h5>
    </div>
    <div class="col-md-12">
      ${categoryAllocationTable}
    </div>
  </div>
</div>

</body>
</html>
  `;
};
