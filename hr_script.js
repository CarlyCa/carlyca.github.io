let log = []; // Array to store the questions and answers

async function query(data) {
  const response = await fetch(
    "https://www.stack-inference.com/run_deployed_flow?flow_id=64623ed585854f4fa1d09146&org=ac522f2a-ccb2-4608-8bab-3e1ccf74af42",
    {
      headers: {
        'Authorization': 'Bearer f39536ea-6cd4-4afe-ac99-bd9babd2cd21',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

function submitForm(event) {
  event.preventDefault();
  const input = document.getElementById("input").value;
  const data = {
    "in-0": input
  };
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Thinking..."; // Display loading message
  query(data).then((response) => {
    resultDiv.innerHTML = response["out-0"];
    const question = input.trim();
    const answer = response["out-0"];
    log.push({ question, answer });
    updateLog(); // Update the log display
  });
}

function updateLog() {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = ""; // Clear the log display

  if (log.length > 0) {
    logDiv.style.display = "block"; // Show the log section

    // Determine the starting index based on the length of the log array
    const startIndex = Math.max(log.length - 3, 0);
    const recentLog = log.slice(startIndex);

    recentLog.forEach((entry) => {
      const question = entry.question;
      const answer = entry.answer;

      const questionElement = document.createElement("p");
      questionElement.innerText = "Question: " + question;

      const answerElement = document.createElement("p");
      answerElement.innerText = "Answer: " + answer;

      logDiv.appendChild(questionElement);
      logDiv.appendChild(answerElement);
    });
  } else {
    logDiv.style.display = "none"; // Hide the log section if no content
  }
}
