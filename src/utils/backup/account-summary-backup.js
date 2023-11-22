import moment from "moment/moment";

export const AccountSummary = (
  data = [
    {
      fund_name: "ABC",
      matchFundNav: {
        ending_paid_in: 0,
        ending_market_value: 0,
      },
      p_net_capital: 0,
    },
  ],
  user = {
    FirstName: "Juan",
    LastName: "Dela Cruz",
    Email: "juandelacruz@webpuppies.com.sg",
    MobileNo: "09123456789",
  },
  parameterDate = new Date(),
  fund
) => {
  const startDate = moment(parameterDate, "MM-DD-YYYY")
    .startOf("month")
    .format("MMMM DD, YYYY");
  const endDate = moment(parameterDate, "MM-DD-YYYY")
    .endOf("month")
    .format("MMMM DD, YYYY");

  let content = ``;
  for (let a = 0; a < data.length; a++) {
    let fundsInvestedInTableRow = "";
    let summaryTable = ``;

    let changeInValue =
      parseFloat(data[a].matchFundNav.ending_market_value) -
      parseFloat(data[a].matchFundNav.beginning_market_value);
    let beginning_market_value = parseFloat(
      data[a].matchFundNav.beginning_market_value
    ).toFixed(2);
    let ending_market_value = parseFloat(
      data[a].matchFundNav.ending_market_value
    ).toFixed(2);
    let partner_additions = parseFloat(
      data[a].matchFundNav.partner_additions
    ).toFixed(2);
    let partner_withdrawals = parseFloat(
      data[a].matchFundNav.partner_withdrawals
    ).toFixed(2);

    let investedTotal = parseFloat(data[a].p_deposits).toFixed(2);

    let returnValue =
      parseFloat(data[a].p_net_capital) - parseFloat(data[a].p_paid_in);
    let returnValuePercent =
      ((parseFloat(data[a].p_net_capital) - parseFloat(data[a].p_paid_in)) /
        parseFloat(data[a].p_paid_in)) *
      100;
    let returnValuePercentBracket = isNaN(returnValuePercent.toFixed(2))
      ? ""
      : returnValuePercent.toFixed(2);

    content += `    <div style="page-break-before: always; !important; style: padding-top: 40px !important"> 

    <div class="row">
      <div class="col-md-12 d-flex " style="border-bottom: 5px solid #f7f7f7;"> 
        <div> 
          <img width="120px" class="img-fluid" src="https://mbgbucket2.s3.ap-southeast-1.amazonaws.com/resources/mbgx-logo-4.png">
        </div>
        <div class="ms-auto"> 
          <p class="m-0"><strong>Investor Portfolio Statement</strong></p>
          <p class="text-secondary"><small>For ${startDate} to ${endDate}</small></p>
        </div>
      </div>
    </div>

    <div class="row mt-3"> 
      <p class="m-0"><strong>Investor ID: </strong> ${
        user.MasterInvestorCode
      }</p>
      <p><strong>Investor Name: </strong> ${user.FirstName} ${user.LastName}</p>
    </div>

    <div class="row mt-3 text-center">
      <p class="fw-bold m-0">Investor Statement</p>
      <p>${startDate} to ${endDate}</p> 
    </div>

    <div class="row">
      <table class="table table-borderless">
        <thead class="border">
          <tr>
            <td class="fw-bold">Fund</td>
            <td class="fw-bold text-end">Currency</td>
          </tr>
        </thead>
        <tbody>
          <tr> 
            <td>${data[a].fund_name}</td>
            <td class="text-end">PHP</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <table class="table table-borderless">
        <thead class="border">
          <tr>
            <td colspan="2" class="fw-bold text-center">Account Summary</td>
          </tr>
        </thead>
        <tbody>
          <tr> 
            <td>Market Value</td>
            <td class="text-end">P${ending_market_value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr> 
            <td>Invested Capital</td>
            <td class="text-end">P${investedTotal
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr> 
            <td>Gain/loss for the period</td>
            <td class="text-end">P${parseFloat(returnValue)
              .toFixed(2)
              .toString()
              .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}(${returnValuePercentBracket}%)</td>
          </tr>
          <tr> 
            <td>Gain/loss since initial invested</td>
            <td class="text-end">P500(+100%)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <table class="table table-borderless">
        <thead class="border">
          <tr>
            <td class="fw-bold">Account Activity</td>
            <td class="fw-bold">Units</td>
            <td class="fw-bold text-end">Net Asset Value</td>
            <td class="fw-bold text-end">Market Value</td>
          </tr>
        </thead>
        <tbody>
          <tr> 
            <td>Beginning Position</td>
            <td>10</td>
            <td class="text-end">P100.00</td>
            <td class="text-end">P1,000.00</td>
          </tr>
          <tr> 
            <td>Purchases</td>
            <td>10</td>
            <td class="text-end">P100.00</td>
            <td class="text-end">P1,000.00</td>
          </tr>
          <tr> 
            <td>Withdrawals</td>
            <td>10</td>
            <td class="text-end">P100.00</td>
            <td class="text-end">P1,000.00</td>
          </tr>
          <tr> 
            <td>Change in Value</td>
            <td>10</td>
            <td class="text-end">P100.00</td>
            <td class="text-end">P1,000.00</td>
          </tr>
          <tr> 
            <td>Ending Position</td>
            <td>10</td>
            <td class="text-end">P100.00</td>
            <td class="text-end">P1,000.00</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>`;
  }

  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
</head>
  <body>
  ${content}
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>
  `;
};
