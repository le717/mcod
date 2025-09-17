import { simulate, calculateTotalRounds } from "./core.js";

const qForm = document.forms[0];
const qOutput = document.querySelector(".output");

qForm?.addEventListener("submit", function (ev) {
  ev.preventDefault();

  // Get the form values needed to continue
  let winners =
    Number.parseInt(qForm.elements["total-winners"].value, 10) || null;
  let totalRounds =
    Number.parseInt(qForm.elements["total-rounds"].value, 10) || null;
  let totalPlayers =
    Number.parseInt(qForm.elements["total-players"].value, 10) || null;
  let elimination =
    Number.parseInt(qForm.elements["elimination"].value, 10) || null;

  // Error handling :)
  if (!elimination || elimination < 1) {
    qOutput.innerHTML =
      "<span class='error'>There must be at least 1 player eliminated per round!</span>";
    return;
  }
  if (!winners || winners < 1) {
    qOutput.innerHTML =
      "<span class='error'>There must be at least 1 winning player!</span>";
    return;
  }
  if (!!totalPlayers && !!totalRounds) {
    qOutput.innerHTML =
      "<span class='error'>Only total rounds or total players can be entered, not both!</span>";
    return;
  }
  if (!totalPlayers && (!totalRounds || totalRounds < 1)) {
    qOutput.innerHTML =
      "<span class='error'>There must be at least 1 round!</span>";
    return;
  }
  if (!totalRounds && (!totalPlayers || totalPlayers < 2)) {
    qOutput.innerHTML =
      "<span class='error'>There must be at least 2 players!</span>";
    return;
  }

  // If we're given total players to calculate rounds, make sure the total player count
  // is suitable for a valid game
  if (
    totalPlayers &&
    calculateTotalRounds(totalPlayers, elimination, winners) % 1 !== 0
  ) {
    qOutput.innerHTML =
      "<span class='error'>The amount of requested players will not work. Please add or remove players.</span>";
    return;
  }

  // Generate the game simulation
  let results = simulate(winners, elimination, totalRounds, totalPlayers);
  qOutput.innerHTML = "";

  results.forEach(function (round) {
    console.log(round);
    let t = `<aside class="result"><h3>Round ${round.currentRound}</h3>
    <ul>
      <li>Players: ${round.currentPlayers}</li>
      <li>Chairs: ${round.currentChairs}</li>
      <li>Challengers: ${round.currentChallengers}</li>
    </ul>
    </aside>`;
    qOutput?.insertAdjacentHTML("beforeend", t);
  });
});
