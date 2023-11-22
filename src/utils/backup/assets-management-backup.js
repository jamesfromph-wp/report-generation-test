import moment from "moment/moment";

export const AssetsManagement = (
  data_ = [
    {
      fund_name: "ABC",
      aum: 1,
      nav: {
        NavPerShare: 1,
      },
      logo: "",
    },
  ],
  props = {
    body: {
      from: new Date(),
      to: new Date(),
    },
  }
) => {
  let temp = ``;
  for (let i = 0; i < data_.length; i++) {
    const data = data_[i];
    let aumTable = ``;
    let shares = parseFloat(data.aum / data.nav.NavPerShare)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let aum = parseFloat(data.aum)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let nav = parseFloat(data.nav.NavPerShare)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    aumTable += `
      <tr>
        <td>${data.fund_name}</td>
        <td>${isNaN(parseFloat(shares)) ? "" : shares}</td>
        <td>${isNaN(parseFloat(aum)) ? "" : aum}</td>
        <td>${isNaN(parseFloat(nav)) ? "" : nav}</td>
      </tr>
    `;
    temp += `
    
  
    <div  style="height: 600px; page-break-before: always; !important, padding: 48px !important; "> 
  
      <div class="row">
        <div class="col-md-12 d-flex " style="border-bottom: 5px solid #f7f7f7;"> 
          <div> 
            ${
              data.logo
                ? `<img width="120px" class="img-fluid" src="https://mbgbucket2.s3-ap-southeast-1.amazonaws.com/${data.logo}">`
                : ""
            }
          </div>
          <div class="ms-auto"> 
            <p class="m-0"><strong>Assets Under Management</strong></p>
            <p class="text-secondary"><small>For ${moment(
              new Date(props.body.from)
            ).format("MMMM DD, YYYY")} to  ${moment(
      new Date(props.body.to)
    ).format("MMMM DD, YYYY")}</small></p>
          </div>
        </div>
      </div>

  
  
      <div class="row mt-4"> 
  
        <table class="table table-borderless table-striped">
          <thead>
            <tr class="border-bottom">
              <td class="fw-bold">FUNDS</td>
              <td class="fw-bold">SHARES OUTSTANDING</td>
              <td class="fw-bold">ASSETS UNDER MANAGEMENT</td>
              <td class="fw-bold">NAV</td>
            </tr>
          </thead>
          <tbody>
            ${aumTable}
          </tbody>
  
        </table>
        
      </div>
      <div class="d-flex align-items-baseline" style="margin-top: 600px;"> 
        <div class="col-md-2 ">
          <img width="120px" class="img-fluid" src="https://mbgbucket2.s3.ap-southeast-1.amazonaws.com/resources/mbgx-logo-4.png">
        </div>
      </div>
  
    </div>
    `;
  }

  return `
  <!doctype html>
  <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
  </head>
    <body style='padding: 48px !important'>
    ${temp}
  </body>
  </html>
  `;

  return `
    <!DOCTYPE html>
<html>
<head>
    
    
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
</head>
<body>
  <div class="row p-5">
    <table class="table table-bordered">
      <tr>
        <th></th>
        <th>Issuer/Mutual Funds Managed & Distributed</th>
        <th>Number of Shares Outstanding for the Quarter ended</th>
        <th>Assests Under Management (AUM) For the Quarter ended</th>
        <th>NAV</th>
      </tr>
      <tbody>
        ${aumTable}
        <tr>
          <td>2</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>5</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>6</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>7</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>8</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>9</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>10</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
</body>
</html>
  
      `;
};
