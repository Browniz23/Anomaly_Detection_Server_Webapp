/*
    onload of result iframe - generate human readable output from the json inside result
*/
function loadResult() {
  var iframe = document.getElementById("result");
  // on first load doesnt write anything
  if (
    !iframe ||
    !iframe.contentDocument ||
    !iframe.contentDocument.body ||
    !iframe.contentDocument.body.innerText
  ) {
    return;
  }
  // result json
  var js = iframe.contentDocument.body.innerText;
  // result json object
  var jsObj = JSON.parse(js);
  // value of anomalies key
  var el = jsObj.anomalies;
  // html result
  var x,
    resultTxt = "";
  resultTxt +=
    '<head><link rel="stylesheet" type="text/css" href="styleResult.css?v=1"></head>';
  resultTxt += "<h4 id='res'>Anomalies List</h4>";
  // doesnt have anomalies key - error
  if (!el) {
    resultTxt +=
      "Oops! something went wrong and we couldn't proccess your request.";
    iframe.contentDocument.write(resultTxt);
    return;
  }
  if (el == "none") {
    resultTxt += "No anomalies were found :)";
    iframe.contentDocument.write(resultTxt);
    return;
  }
  // html - table create
  resultTxt += "<table border=1 class='tab'>";
  // create rows
  for (x in el) {
    resultTxt += "<tr><td>" + x + "</td><td>";
    // create time spans in each row
    for (y in el[x]) {
      if (y != 0) resultTxt += ", " + el[x][y];
      else resultTxt += el[x][y];
    }
    resultTxt += "</td></tr>";
  }
  resultTxt += "</table>";
  iframe.contentDocument.write(resultTxt);
}

// enable upload button if both files uploaded
function enableUpload() {
  var learn = document.getElementById("myLearnFile").value;
  var test = document.getElementById("myTestFile").value;
  if (learn != "" && test != "")
    document.getElementById("detect").disabled = false;
}

/*  
    disable upload button when "choose file" is clicked.
    file input zeros in every click. in case same file is chosen prevent input problems.
*/
function disableUpload(id) {
  document.getElementById(id).value = null;
  document.getElementById("detect").disabled = true;
}

function detectLoading() {
  var iframe = document.getElementById("result");
  if (!iframe || !iframe.contentDocument) {
    return;
  }
  iframe.contentDocument.write("running detect algoritm...");
}
