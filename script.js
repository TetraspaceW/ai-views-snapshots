document.addEventListener("DOMContentLoaded", function () {
  var colors = ["empty", "mine", "possible", "reasonable", "unreasonable"];

  var questions = [
    ["It's physically impossible to ever build STEM+ AI."],
    [
      "STEM+ AI will exist by the year 2035.",
      "STEM+ AI will exist by the year 2100.",
    ],
    [
      "If STEM+ AI is built, within 10 years AIs will be (individually or collectively) able to disempower humanity.",
      "If STEM+ AI is built, within 10 years AIs will disempower humanity.",
    ],
    [
      "The first time an AI reaches STEM+ capabilities (if that ever happens), it will disempower humanity within 3 months.",
      "If AI wipes out humanity and colonises the universe itself, the future will go about as well as if humanity had survived.",
    ],
    [
      "Given sufficient technical knowledge, humanity could in principle build vastly superhuman AIs that reliably produce very good outcomes.",
      "Researchers will solve enough of the alignment problem to prevent world-endangering AI from ever being built.",
    ],
    [
      "For the purpose of preventing AI catastrophes, technical research is more useful than policy work.",
      "Governments will generally be reasonable in how they handle AI risk.",
    ],
    ["It would be an unprecedentedly huge tragedy if we never built STEM+ AI."],
  ];

  var probabilities = ["Below 1%", "~10%", "~50%", "~90%", "Above 99%"];

  questions.forEach((row) => {
    var rowContainer = document.createElement("div");
    rowContainer.className = "row-container";

    row.forEach((question) => {
      var table = document.createElement("table");
      table.className = "prediction-table";

      var header = table.insertRow();
      var headerCell = header.insertCell();
      headerCell.colSpan = probabilities.length;
      headerCell.textContent = question;

      var row = table.insertRow();
      row.className = "probability-row";

      probabilities.forEach((probability) => {
        var cell = row.insertCell();
        cell.className = "empty";
        cell.textContent = probability;

        cell.addEventListener("click", function () {
          var currentColor = this.className;
          var nextColor =
            colors[(colors.indexOf(currentColor) + 1) % colors.length];
          this.className = nextColor;
        });
      });

      rowContainer.appendChild(table);
    });

    var tablesContainer = document.getElementById("tablesContainer");
    tablesContainer.appendChild(rowContainer);
  });

  var exportBtn = document.getElementById("exportBtn");
  exportBtn.addEventListener("click", function () {
    let html = document.documentElement.outerHTML;
    let iframe = document.createElement("iframe");
    iframe.sandbox = "allow-same-origin";
    iframe.style.width = "1920px";
    iframe.style.height = "100%";
    document.body.appendChild(iframe);
    iframe.srcdoc = html;

    iframe.addEventListener("load", () => {
      html2canvas(iframe.contentWindow.document.getElementById("content"))
        .then(function (canvas) {
          let filename = "ai-views-snapshots.png";
          let link = document.createElement("a");
          link.download = filename.toLowerCase();
          canvas.toBlob(function (blob) {
            link.href = URL.createObjectURL(blob);
            link.click();
          }, "image/png");
        })
        .finally(function () {
          document.body.removeChild(iframe);
        });
    });
  });
});
