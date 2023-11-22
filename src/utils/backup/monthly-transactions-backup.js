import moment from "moment/moment";

const numberComma = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const MonthlyTransactions = (
  data = {
    fund_sale: 500,
    fund_redemption: 500,
    beginning_units: 1,
    shares_sold: 1,
    shares_redeemed: 1,
    ending_units: 1,
  },
  logo,
  currentNav = {
    NavPerShare: 1,
  }
) => {
  const fundlogo = logo
    ? `https://mbgbucket2.s3.ap-southeast-1.amazonaws.com/${logo}`
    : "https://mbgbucket2.s3.ap-southeast-1.amazonaws.com/resources/mbgx-logo-4.png";

  const a = numberComma(parseFloat(data.fund_sale).toFixed(2));
  const b = numberComma(parseFloat(data.fund_redemption).toFixed(2));
  const c = numberComma(parseFloat(data.beginning_units).toFixed(2));
  const d = numberComma(parseFloat(data.shares_sold).toFixed(2));
  const e = numberComma(parseFloat(data.shares_redeemed).toFixed(2));
  const f = numberComma(parseFloat(data.ending_units).toFixed(2));
  const g = "100%";
  const h = currentNav.NavPerShare;

  let msrTable = ``;
  msrTable += `
    <tr>
            <td>(A)</td>
            <td>Total amount received from sale of shares</td>
            <td></td>
            <td>${a}</td>
            <td></td>
          </tr>
          <tr>
            <td>(B)</td>
            <td>Total amount of redemption</td>
            <td></td>
            <td>${b}</td>
            <td></td>
          </tr>
          <tr>
            <td>(C)</td>
            <td>Number of shares outstanding at beginning of month</td>
            <td></td>
            <td>${c}</td>
            <td>shares</td>
          </tr>
          <tr>
            <td>(D)</td>
            <td>Number of shares sold during month</td>
            <td></td>
            <td>${d}</td>
            <td>shares</td>
          </tr>
          <tr>
            <td>(E)</td>
            <td>Number of shares redeemed during month</td>
            <td></td>
            <td>${e}</td>
            <td>shares</td>
          </tr>
          <tr>
            <td>(F)</td>
            <td>Number of shares outstanding at end of month</td>
            <td></td>
            <td>${f}</td>
            <td>shares</td>
          </tr>
          <tr>
            <td>(G)</td>
            <td>Percentage of outstanding shares owned by Filipino</td>
            <td></td>
            <td>${g}</td>
            <td></td>
          </tr>
          <tr>
            <td>(H)</td>
            <td>Average net asset value as of the end of the month</td>
            <td></td>
            <td>${h}</td>
            <td>shares</td>
          </tr>
  `;
  return `
    <!DOCTYPE html>
<html>
<head>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">

</head>
<body>
  
  <div class="row  text-center d-flex align-items-center">
    <div class="col-md-6 d-flex justify-content-start">
      <img class="img-fluid" style="width: 150px !important" src="${fundlogo}">
    </div>
    <div class="col-md-6 text-end">
      <h2 class="fw-bold">Monthly Sales and Redemption Report</h2>
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-md-12">
      <table class="table table-borderless">
        <tbody>
          ${msrTable}
        </tbody>

      </table>
    </div>
  </div>

</body>
</html>
  `;
};
