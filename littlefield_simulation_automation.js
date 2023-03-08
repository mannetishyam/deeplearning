function shyamfun(input) {

  // headers
  var headers = { "Cookie": getSessionDetails() };

  // urls
  var job_arrivals_url = "https://op.responsive.net/Littlefield/Plot?data=JOBIN&x=all"
  var com_queue_jobs_url = "https://op.responsive.net/Littlefield/Plot?data=JOBQ&x=all"
  var inventory_url = "https://op.responsive.net/Littlefield/Plot?data=INV&x=all"
  var st1_queue_url = "https://op.responsive.net/Littlefield/Plot?data=S1Q&x=all"
  var mach1_util_url = "https://op.responsive.net/Littlefield/Plot?data=S1UTIL&x=all"
  var st2_queue_url = "https://op.responsive.net/Littlefield/Plot?data=S2Q&x=all"
  var mach2_util_url = "https://op.responsive.net/Littlefield/Plot?data=S2UTIL&x=all"
  var st3_queue_url = "https://op.responsive.net/Littlefield/Plot?data=S3Q&x=all"
  var mach3_util_url = "https://op.responsive.net/Littlefield/Plot?data=S3UTIL&x=all"
  var completed_job_url = "https://op.responsive.net/Littlefield/Plot?data=JOBOUT&x=all"
  var lead_time_url = "https://op.responsive.net/Littlefield/Plot?data=JOBT&x=all"
  var revenue_url = "https://op.responsive.net/Littlefield/Plot?data=JOBREV&x=all"
  var cash_url = "https://op.responsive.net/Littlefield/Plot?data=CASH&x=all&team=moksha"


  switch (input) {
    case "job_arrival":
      return editArray(job_arrivals_url);

    case "com_queue":
      return editArray(com_queue_jobs_url);

    case "inventory":
      var webContent = UrlFetchApp.fetch(inventory_url, { 'headers': headers }).getContentText().trim();
      var value = webContent.substring(webContent.indexOf("points:"), webContent.indexOf("legend"));
      var newvalue = value.substring(value.indexOf("'") + 1, value.indexOf("'}"));
      var arr = newvalue.split(' ').map(x => +x)
      var col1 = arr.filter(function (element, index, array) { return (index % 2 === 0); });;
      var col2 = arr.filter(function (element, index, array) { return (index % 2 !== 0); });;
      col = []
      for (let i = 0; i < col1.length; i++) {
        if (col1[i].toString().length <= 4) {
          col.push(col2[i])
        }
      }
      return col;

    case "st1_queue":
      return editArray(st1_queue_url);

    case "mach1_util":
      return editArray(mach1_util_url);

    case "st2_queue":
      return editArray(st2_queue_url);

    case "mach2_util":
      return editArray(mach2_util_url);

    case "st3_queue":
      return editArray(st3_queue_url);

    case "mach3_util":
      return editArray(mach3_util_url);

    case "complete_job":
      return editArray(completed_job_url);

    case "lead_time":
      return editArray(lead_time_url);

    case "revenue":
      return editArray(revenue_url);

    case "cash":
      return editArray(cash_url);

    default:
      return editArray(completed_job_url);
    //return "Wrong command";
  }

  function editArray(url) {
    var webContent = UrlFetchApp.fetch(url, { 'headers': headers }).getContentText().trim();
    Logger.log(webContent)
    var value = webContent.substring(webContent.indexOf("points:"), webContent.indexOf("legend"));
    var newvalue = value.substring(value.indexOf("'") + 1, value.indexOf("'}"));
    var arr = newvalue.split(' ').map(x => +x)
    Logger.log(arr)
    var col2 = arr.filter(function (element, index, array) { return (index % 2 !== 0); });;

    return col2;
  }

  function getSessionDetails() {

    var url = "https://op.responsive.net/Littlefield/CheckAccess";

    var payload =
    {
      "id": "****", // change id here
      "password": "****", //change password here
      "institution": "****" // change the institution here
    };

    var options =
    {
      "method": "post",
      "payload": payload,
      "followRedirects": false,
    };
    var login = UrlFetchApp.fetch(url, options);
    var sessionDetails = login.getAllHeaders()['Set-Cookie'];
    return sessionDetails;
  }
}
