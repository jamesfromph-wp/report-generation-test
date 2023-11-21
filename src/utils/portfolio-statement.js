import { parseInt } from "lodash";
import moment from "moment/moment";

const numberComma = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const PortfolioStatementTemplate = (
  data = [],
  subRedData = { valueArray: [], valueMinusArray: [] },
  user = {},
  subscription = [],
  redemption = [],
  parameterDate = [],
  statementData = [],
  groupedByBankName = false,
  isInvestoryStatement
) => {
  const fundsUnique = Array.from(
    new Set(statementData.map((item) => item.fund_name))
  );

  let tempstatsData = [];
  for (let a = 0; a < fundsUnique.length; a++) {
    let p_net_profit = 0;
    let mp_code = "";
    let p_deposits = 0;
    let p_net_twr = 0;
    let fund_name = "";
    let p_net_capital = 0;
    let p_net_irr = 0;
    let mp_name = "";
    let p_code = "";
    let p_net_srr = 0;
    let p_net_fsrr = 0;
    let p_name = "";
    let p_paid_in = 0;
    let p_withdrawals = 0;
    let report_date = "";
    let ending_nav = 0;
    let ending_units = 0;
    let partner_additions = 0;
    let ending_market_value = 0;
    let beginning_units = 0;
    let beginning_paidin = 0;
    let beginning_nav = 0;
    let paid_in_change = 0;
    let units_purchase = 0;
    let ending_paid_in = 0;
    let partner_account_name = "";
    let investor_name = "";
    let investor_id = "";
    let partner_withdrawals = 0;
    let beginning_market_value = 0;
    let units_withdrawn = 0;
    let logo = "";

    for (let b = 0; b < statementData.length; b++) {
      if (fundsUnique[a] == statementData[b].fund_name) {
        p_net_profit += parseInt(statementData[b].p_net_profit);
        mp_code = statementData[b].mp_code;
        p_deposits += parseInt(statementData[b].p_deposits);
        p_net_twr += parseInt(statementData[b].p_deposits);
        fund_name = statementData[b].fund_name;
        p_net_capital += parseInt(statementData[b].p_net_capital);
        p_net_irr = parseInt(statementData[b].p_net_irr);
        mp_name = statementData[b].mp_name;
        p_code = statementData[b].p_code;
        p_net_srr += parseInt(statementData[b].p_net_srr);
        p_net_fsrr += parseInt(statementData[b].p_net_fsrr);
        p_name = statementData[b].p_name;
        p_paid_in += parseInt(statementData[b].p_paid_in);
        p_withdrawals += parseInt(statementData[b].p_withdrawals);
        report_date = statementData[b].report_date;
        ending_nav = statementData[b].ending_nav;
        ending_units = statementData[b].ending_units;
        partner_additions = statementData[b].matchFundNav.partner_additions;
        ending_market_value = statementData[b].matchFundNav.ending_market_value;
        beginning_units = statementData[b].matchFundNav.beginning_units;
        beginning_paidin = statementData[b].matchFundNav.beginning_paidin;
        beginning_nav = statementData[b].matchFundNav.beginning_nav;
        paid_in_change = statementData[b].matchFundNav.paid_in_change;
        units_purchase += parseInt(
          statementData[b].matchFundNav.units_purchase
        );
        ending_paid_in = statementData[b].matchFundNav.ending_paid_in;
        partner_account_name =
          statementData[b].matchFundNav.partner_account_name;
        investor_name = statementData[b].matchFundNav.investor_name;
        investor_id = statementData[b].matchFundNav.investor_id;
        partner_withdrawals += parseInt(
          statementData[b].matchFundNav.partner_withdrawals
        );
        beginning_market_value =
          statementData[b].matchFundNav.beginning_market_value;
        units_withdrawn += parseInt(
          statementData[b].matchFundNav.units_withdrawn
        );
        logo = statementData[b].Logo;
      }
    }

    tempstatsData.push({
      p_net_profit: p_net_profit,
      mp_code: mp_code,
      p_deposits: p_deposits,
      p_net_twr: p_net_twr,
      fund_name: fund_name,
      p_net_capital: p_net_capital,
      p_net_irr: p_net_irr,
      mp_name: mp_name,
      p_code: p_code,
      p_net_srr: p_net_srr,
      p_net_fsrr: p_net_fsrr,
      p_name: p_name,
      p_paid_in: p_paid_in,
      p_withdrawals: p_withdrawals,
      report_date: report_date,
      ending_nav: ending_nav,
      ending_units: ending_units,
      matchFundNav: {
        p_net_capital: p_net_capital,
        partner_additions: partner_additions,
        ending_market_value: ending_market_value,
        beginning_units: beginning_units,
        beginning_paidin: beginning_paidin,
        beginning_nav: beginning_nav,
        paid_in_change: paid_in_change,
        units_purchase: units_purchase,
        ending_paid_in: ending_paid_in,
        ending_units: ending_units,
        partner_account_name: partner_account_name,
        investor_name: investor_name,
        investor_id: investor_id,
        partner_withdrawals: partner_withdrawals,
        beginning_market_value: beginning_market_value,
        fund_name: fund_name,
        units_withdrawn: units_withdrawn,
        logo: logo,
      },
    });
  }

  statementData = tempstatsData;

  const startDate = moment(parameterDate, "MM-DD-YYYY")
    .startOf("month")
    .format("MMMM DD, YYYY");
  const endDate = moment(parameterDate, "MM-DD-YYYY")
    .endOf("month")
    .format("MMMM DD, YYYY");
  let tableData = ``;
  let investmentTotal = 0;
  let currentValueTotal = 0;
  let currentValueTotal_ = 0;
  let returnValueTotal = 0;
  let allocationTableRow = ``;

  let totalInvestedCapital = 0;
  let totalCurrentValue = 0;
  let totalReturn = 0;
  let totalPercentage = 0;

  let lineChartData = subRedData?.valueArray?.map((item, i) => {
    return item > 0 ? item : 0;
  });

  let lastLargerData = 0;

  for (let counter = lineChartData.length; counter !== 0; counter--) {
    if (lineChartData[counter - 1] !== 0) {
      lastLargerData = lineChartData[counter - 1];
      break;
    }
  }

  for (let counter = lineChartData.length; counter !== 0; counter--) {
    if (lineChartData[counter - 1] !== lastLargerData) {
      lineChartData[counter - 1] = lastLargerData;
    } else {
      break;
    }
  }

  lineChartData = JSON.stringify(lineChartData);

  let lineChartDataMinus = subRedData?.valueMinusArray?.map((item, i) => {
    return item > 0 ? item - 20 : 0;
  });

  let lastLargerDataMinus = 0;

  for (let counter = lineChartDataMinus.length; counter !== 0; counter--) {
    if (lineChartDataMinus[counter - 1] !== 0) {
      lastLargerDataMinus = lineChartDataMinus[counter - 1];

      break;
    }
  }

  for (let counter = lineChartDataMinus.length; counter !== 0; counter--) {
    if (lineChartDataMinus[counter - 1] !== lastLargerDataMinus) {
      lineChartDataMinus[counter - 1] = lastLargerDataMinus;
    } else {
      break;
    }
  }

  lineChartDataMinus = JSON.stringify(lineChartDataMinus);

  let percentagePortfolio = [];

  for (let i = 0; i < data.length; i++) {
    let port = data[i];
    currentValueTotal_ += parseFloat(port.p_net_capital);
  }

  for (let i = 0; i < data.length; i++) {
    let port = data[i];
    let percent = (port.p_net_capital / currentValueTotal_) * 100;
    percentagePortfolio.push(isNaN(percent) ? "0" : percent.toFixed(2));
  }

  for (let bankIndex = 0; bankIndex < groupedByBankName.length; bankIndex++) {
    for (
      let fundIndex = 0;
      fundIndex < groupedByBankName[bankIndex].funds.length;
      fundIndex++
    ) {
      let fund = groupedByBankName[bankIndex].funds[fundIndex];
      let currentValue = parseFloat(fund.matchFundNav.beginning_market_value);
      totalCurrentValue += currentValue;
    }
  }

  for (let bankIndex = 0; bankIndex < groupedByBankName.length; bankIndex++) {
    tableData += `
    <tr>
      <td>
       ${groupedByBankName[bankIndex].bankName}
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>`;
    for (
      let fundIndex = 0;
      fundIndex < groupedByBankName[bankIndex].funds.length;
      fundIndex++
    ) {
      let fund = groupedByBankName[bankIndex].funds[fundIndex];
      let units = parseFloat(fund.matchFundNav.beginning_units).toFixed(2);

      let nav = parseFloat(fund.nav).toFixed(2);

      let investedCapital = parseFloat(
        fund.matchFundNav.beginning_paidin
      ).toFixed(2);
      totalInvestedCapital += parseFloat(investedCapital);

      let currentValue = parseFloat(
        parseFloat(fund.matchFundNav.beginning_market_value).toFixed(2)
      );

      let returnValue = (currentValue - investedCapital).toFixed(2);
      totalReturn += parseFloat(returnValue);

      let returnValuePercentage = (
        (currentValue / investedCapital - 1) *
        100
      ).toFixed(2);

      if (returnValuePercentage === "Infinity") {
        returnValuePercentage = 0;
      }

      tableData += `
        <tr>
          <td>
          &nbsp;&nbsp;${fund.fund_name} 
          </td>
          <td>${numberComma(parseFloat(units).toFixed(2))}</td>
          <td>PHP ${numberComma(parseFloat(nav).toFixed(2))}</td>
          <td>PHP ${numberComma(investedCapital)}</td>
          <td>PHP ${numberComma(currentValue)}</td>
          <td>PHP ${numberComma(returnValue)}(${returnValuePercentage}%)</td>
          <td>${((currentValue / totalCurrentValue) * 100).toFixed(2)}%</td>
        </tr>
      `;
    }
  }

  totalPercentage = (totalCurrentValue / totalInvestedCapital - 1) * 100;

  // PIE CHART
  const backgroundColorAsset = [
    "#ffff34",
    "#0000FF",
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

  const portfolioAssetAllocationChartData = [];
  const portfolioAssetAllocationChartBackgroundColor = [];

  for (let i = 0; i < data.length; i++) {
    let portfolioData = data[i];
    let currentValue = parseFloat(
      parseFloat(portfolioData.matchFundNav.beginning_market_value).toFixed(2)
    );
    let percent = (currentValue / totalCurrentValue) * 100;

    portfolioAssetAllocationChartData.push(percent);
    portfolioAssetAllocationChartBackgroundColor.push(backgroundColorAsset[i]);

    allocationTableRow += `
      <tr>
        <td class="d-flex">
          <i class="bi bi-circle-fill" style="color: ${
            backgroundColorAsset[i]
          }"></i> 
          <span class="ms-2">${portfolioData.fund_name}</span></td>
        <td>PHP ${numberComma(currentValue)}</td>
        <td>
        ${percent.toFixed(2)}
        %</td>
      </tr>
    `;
  }
  allocationTableRow += `
    <tr>
      <td>Total value</td>
      <td>PHP ${numberComma(totalCurrentValue.toFixed(2))}</td>
      <td>100%</td>
    </tr>
  `;

  let grandValueTotal = parseFloat(
    (returnValueTotal / investmentTotal) * 100
  ).toFixed(2);

  tableData += `
    <tr>
      <td>
        Total
      </td>
      <td></td>
      <td></td>
      <td>PHP ${numberComma(totalInvestedCapital.toFixed(2))}</td>
      <td>PHP ${numberComma(totalCurrentValue.toFixed(2))}</td>
      <td>PHP ${numberComma(totalReturn.toFixed(2))}(${totalPercentage.toFixed(
    2
  )}%)</td>
      <td>100%</td>
    </tr>
  `;

  let table = `
   <table class="table table-striped "> 
     <thead> 
      <tr class="text-start" style="background-color: #3848a2; color: white;"> 
        <td colspan="7"> 
          <p><strong>Portfolio Summary</strong></p>
        </td>
      </tr>
    </thead>
    <tbody>  
      <tr>
        <td class="fw-bold">Fund</td>
        <td class="fw-bold">Units</td>
        <td class="fw-bold">NAV</td>
        <td class="fw-bold">Invested Capital</td>
        <td class="fw-bold">Current Value</td>
        <td class="fw-bold">Return</td>
        <td class="fw-bold">Percentage(%) of Portfolio</td>
      </tr>
      ${tableData}
    </tbody>
  </table>
  
`;
  let tableAllocation = `
   <table class="table "> 
          <thead>
            <tr style="background-color: #3848a2; color: white;">
              <td colspan="3">Portfolio Asset Allocation</td>
            </tr>
            <tr>
              <td class="fw-bold">Portfolio</td>
              <td class="fw-bold">Value In ${endDate} </td>
              <td class="fw-bold">Percent of assets</td>
            </tr>
            ${allocationTableRow}
          </thead>
        </table>
  `;
  let subRedTableColumns = "";
  for (let i = 0; i < subscription.length; i++) {
    let sub = subscription[i];
    const { Amount, nav } = sub;

    let units = nav
      ? (Amount / nav.NavPerShare)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "-";

    subRedTableColumns += `
      <tr> 
        <td>${moment(sub.Date).format("MM/DD/YY")}</td>
        <td class="fw-bold">${
          sub.SubscriptionData &&
          sub.SubscriptionData.data &&
          sub.SubscriptionData.data.fund_identifier
            ? sub.SubscriptionData.data.fund_identifier
            : ""
        }</td>
        <td>Subsciption</td>
        <td>${units}</td>
        <td>${nav ? nav.NavPerShare : "-"}</td>
        <td>PHP ${parseFloat(sub.Amount)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>${sub.Status === "S" ? "Confirmed" : "Pending"}</td>
      </tr>
`;
  }
  for (let i = 0; i < redemption.length; i++) {
    let redemp = redemption[i];
    const { Amount, nav } = redemp;

    let units = nav
      ? (Amount / nav.NavPerShare)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "-";

    subRedTableColumns += `
      <tr> 
        <td>${moment(redemp.Date).format("MM/DD/YY")}</td>
        <td class="fw-bold">${
          redemp.RedemptionData &&
          redemp.RedemptionData.data &&
          redemp.RedemptionData.data.fund_identifier
            ? redemp.RedemptionData.data.fund_identifier
            : ""
        }</td>
        <td>Redemption</td>
        <td>${units}</td>
        <td>${nav ? nav.NavPerShare : "-"}</td>
        <td>PHP ${parseFloat(redemp.Amount)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>${redemp.Status === "S" ? "Confirmed" : "Pending"}</td>
      </tr>
`;
  }
  let subRedTable = `
   <table class="table table-striped">
        <thead>
          <tr style="background-color: #3848a2; color: white;">
            <td colspan="7"> Investment Transaction History</td>
          </tr>
          
        </thead>
        <tbody>
          <tr> 
            <td class="fw-bold">Date</td>
            <td class="fw-bold">Fund</td>
            <td class="fw-bold">Type</td>
            <td class="fw-bold">Units</td>
            <td class="fw-bold">NAV</td>
            <td class="fw-bold">Amount</td>
            <td class="fw-bold">Status</td>
          </tr>
          ${subRedTableColumns}
        </tbody>
      </table>
`;

  let content = ``;

  for (let bankIndex = 0; bankIndex < groupedByBankName.length; bankIndex++) {
    for (
      let fundIndex = 0;
      fundIndex < groupedByBankName[bankIndex].funds.length;
      fundIndex++
    ) {
      let fund = groupedByBankName[bankIndex].funds[fundIndex];
      // TODO HERE FOR NEW VALUE

      let marketValue = parseFloat(
        fund.matchFundNav.beginning_market_value
      ).toFixed(2);
      let investedCapital = parseFloat(
        fund.matchFundNav.beginning_paidin
      ).toFixed(2);

      // to be ask
      let gainLossForThePeriod = 0;

      // to be ask
      let gainLossSinceInitialInvested = 0;

      let beginningPosition = {
        units: parseFloat(fund.matchFundNav.beginning_units).toFixed(2),
        netAssetValue: parseFloat(fund.prevNav).toFixed(2),
        marketValue: parseFloat(
          fund.matchFundNav.beginning_market_value
        ).toFixed(2),
      };

      let purchases = {
        units: parseFloat(fund.matchFundNav.units_purchase).toFixed(2),
        netAssetValue: "N/A",
        marketValue: parseFloat(fund.matchFundNav.paid_in_change).toFixed(2),
      };

      let withdrawals = {
        units: parseFloat(fund.matchFundNav.units_withdrawn).toFixed(2) * -1,
        netAssetValue: "N/A",
        marketValue: parseFloat(fund.matchFundNav.partner_withdrawals).toFixed(
          2
        ),
      };

      let changeInValue = {
        units: "N/A",
        netAssetValue: "N/A",
        //WIP
        marketValue: gainLossForThePeriod,
      };

      let endingPosition = {
        units: parseFloat(fund.matchFundNav.beginning_units).toFixed(2),
        netAssetValue: parseFloat(fund.ending_nav).toFixed(2),
        marketValue: marketValue,
      };

      const logo =
        fund.matchFundNav.logo === ""
          ? '<img width="120px" class="img-fluid" src="https://mbgbucket2.s3.ap-southeast-1.amazonaws.com/resources/mbgx-logo-4.png">'
          : `<img width="120px" class="img-fluid" src="https://mbgbucket2.s3-ap-southeast-1.amazonaws.com/${fund.matchFundNav.logo}">`;

      content += `    <div style="page-break-before: always; !important; style: padding-top: 40px"> 

    <div class="row">
      <div class="col-md-12 d-flex " style="border-bottom: 5px solid #f7f7f7;"> 
        <div>
          ${logo}
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
            <td>${fund.fund_name}</td>
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
            <td class="text-end">P${numberComma(marketValue)}</td>
          </tr>
          <tr> 
            <td>Invested Capital</td>
            <td class="text-end">P${numberComma(investedCapital)}</td>
          </tr>
          <tr> 
            <td>Gain/loss for the period</td>
            <td class="text-end">TODO WIP</td>
          </tr>
          <tr> 
            <td>Gain/loss since initial invested</td>
            <td class="text-end">TODO WIP</td>
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
            <td>${parseFloat(beginningPosition.units)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td class="text-end">P${beginningPosition.netAssetValue}</td>
            <td class="text-end">P${numberComma(
              beginningPosition.marketValue
            )}</td>
          </tr>
          <tr> 
            <td>Purchases</td>
            <td>${parseFloat(purchases.units)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td class="text-end">N/A</td>
            <td class="text-end">P${numberComma(purchases.marketValue)}</td>
          </tr>
          <tr> 
            <td>Withdrawals</td>
            <td>${parseFloat(withdrawals.units)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td class="text-end">N/A</td>
            <td class="text-end">P${numberComma(withdrawals.marketValue)}</td>
          </tr>
          <tr>
            <td>Change in Value</td>
            <td>N/A</td>
            <td class="text-end">N/A</td>
            <td class="text-end">TODO WIP</td>
          </tr>
          <tr> 
            <td>Ending Position</td>
            <td>${parseFloat(endingPosition.units)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td class="text-end">P${endingPosition.netAssetValue}</td>
            <td class="text-end">P${numberComma(
              endingPosition.marketValue
            )}</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>`;
    }
  }

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">

    <style>
      html { -webkit-print-color-adjust: exact; }
    </style>
  </head>

<body style='padding: 48px !important'>
  <div> 
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

    <div class="row"> 
      <div class="col-md-4 p-2 ps-0"> 
        <div class="col-md-12 p-2" style="background-color: #f7f7f7;"> 
          <p class="fw-bold m-0">Total Investment</p>
          <b>PHP ${numberComma(totalInvestedCapital.toFixed(2))}</b>
        </div>
      </div>

      <div class="col-md-4 p-2 "> 
        <div class="col-md-12 p-2" style="background-color: #f7f7f7;"> 
          <p class="fw-bold m-0">Current Value</p>
          <b>PHP ${numberComma(totalCurrentValue.toFixed(2))}</b>
        </div>
      </div>

      <div class="col-md-4 p-2 pe-0"> 
        <div class="col-md-12 p-2" style="background-color: #f7f7f7;"> 
          <p class="fw-bold m-0">Holding Period Return</p>
          <b>PHP ${numberComma(
            totalReturn.toFixed(2)
          )}(${totalPercentage.toFixed(2)}%)</b>
        </div>
      </div>
    </div>


    <div class="row"> 
      ${table}
    </div>

    <br><div style="page-break-after:always;"></div>

    <div class="row">
      <div class="col-md-6">
        <div class="d-flex flex-row">
          <div><canvas id="portfolioAssetAllocationChart" width="400" height="400"></canvas></div>
          <div>${tableAllocation}</div>
        </div>
      </div> 
      <div class="col-md-6">
        <table class="table "> 
          <thead>
            <tr style="background-color: #3848a2; color: white;">
              <td colspan="3">Value of Investments over time</td>
            </tr>
          </thead>
        </table>
        <canvas id="myChart" width="600" height="300"></canvas>  
      </div>
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>

    const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
      label: 'Deposits & Withdrawals',
      data: ${lineChartData},
      borderWidth: 1
      },
      {
      label: 'Value of your accounts',
      data: ${lineChartDataMinus},
      borderWidth: 2
      }
    ]
    };

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line',
      data: data,
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

    const portfolioAssetAllocationChartData = {
      datasets: [
        {
          label: 'Funds',
          data: ${JSON.stringify(portfolioAssetAllocationChartData)},
          backgroundColor: ${JSON.stringify(
            portfolioAssetAllocationChartBackgroundColor
          )},
        },
      ]
    };

    const portfolioAssetAllocationChart = document.getElementById('portfolioAssetAllocationChart');
    new Chart(portfolioAssetAllocationChart, {
      type: 'pie',
      data: portfolioAssetAllocationChartData,
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

    </script>
    <br><div style="page-break-after:always;"></div>
    <div> 

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
    
    <div class="row mt-3">
       ${subRedTable}
    </div>
  </div>
  
    <br><div style="page-break-after:always;"></div>
  <div class='p-4'>
  
  ${content}
  </div>
    
</body>
</html>`;
};
