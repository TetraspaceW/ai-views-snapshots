document.addEventListener("DOMContentLoaded", function () {
  const colours = ["empty", "mine", "possible", "reasonable", "unreasonable"];

  var introText =
    'Let "STEM+ AI" be short for "AI that\'s better at STEM research than the best human scientists (in addition to perhaps having other skills)". Then:';

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

  const urlParams = new URLSearchParams(window.location.search);
  const questionsParam = urlParams.get("questions");
  if (questionsParam) {
    questions = [];
    const questionsArray = questionsParam.split(",");
    for (let i = 0; i < questionsArray.length; i += 2) {
      questions.push(questionsArray.slice(i, i + 2));
    }
  }

  const introTextParam = urlParams.get("intro");
  if (introTextParam) {
    introText = introTextParam;
  }

  const probabilities = ["Below 1%", "~10%", "~50%", "~90%", "Above 99%"];

  if (document.getElementsByClassName("row-container").length) {
    return;
  }

  const intro = document.getElementById("introText");
  intro.textContent = introText;

  questions.forEach((row) => {
    const rowContainer = document.createElement("div");
    rowContainer.className = "row-container";

    row.forEach((question) => {
      const table = document.createElement("table");
      table.className = "prediction-table";

      const header = table.insertRow();
      const headerCell = header.insertCell();
      headerCell.colSpan = probabilities.length;
      headerCell.textContent = question;

      const row = table.insertRow();
      row.className = "probability-row";

      probabilities.forEach((probability) => {
        const cell = row.insertCell();
        cell.className = "empty";
        cell.textContent = probability;

        cell.addEventListener("click", function () {
          const currentColour = this.className;
          const nextColour =
            colours[(colours.indexOf(currentColour) + 1) % colours.length];
          this.className = nextColour;
        });
      });

      rowContainer.appendChild(table);
    });

    const tablesContainer = document.getElementById("tablesContainer");
    tablesContainer.appendChild(rowContainer);
  });

  const exportBtn = document.getElementById("exportBtn");
  exportBtn.addEventListener("click", function () {
    const html = document.documentElement.outerHTML;
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.srcdoc = html;

    iframe.addEventListener("load", () => {
      iframe.contentWindow.document.getElementById(
        "colour-blind-checkbox"
      ).style.display = "none";
      html2canvas(iframe.contentWindow.document.getElementById("content"))
        .then(function (canvas) {
          const filename = "ai-views-snapshots.png";
          const link = document.createElement("a");
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

function toggleColourBlind() {
  const content = document.getElementById("content");
  content.className = content.className == "colour-blind" ? "" : "colour-blind";
}
