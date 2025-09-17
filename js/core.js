"use strict";

/**
 * Calculate the number of chairs needed for a round.
 * @param {Number} players The current number of players
 * @param {Number} elimination The number of players to be eliminated per round
 * @param {Number} winners The number of winning players
 * @returns {Number} The number of chairs needed
 */
function chairs(players, elimination, winners) {
  return players - elimination - winners;
}

/**
 * Calculate the total number of players needed for the game, given a total number of rounds.
 * @param {Number} elimination The number of players to be eliminated per round
 * @param {Number} totalRounds The total number of rounds to be played
 * @param {Number} winners The number of winning players
 * @returns {Number} The total number of players needed to play
 */
function totalPlayers(elimination, totalRounds, winners) {
  return (elimination * totalRounds) + winners;
}

/**
 * Calculate the number of players in a round.
 * @param {Number} totalPlayers The total number of players
 * @param {Number} elimination The number of players to be eliminated per round
 * @param {Number} currentRound The current round index, zero-based
 * @returns The number of players in the current round
 */
function players(totalPlayers, elimination, currentRound) {
  return totalPlayers - (elimination * currentRound);
}

/**
 * Calculate the number of rounds to be played for a game, given a total number of players.
 * @param {Number} totalPlayers The total number of players
 * @param {Number} elimination The number of players to be eliminated per round
 * @param {Number} winners The number of winning players
 * @returns {Number} The number of rounds to be played
 */
export function calculateTotalRounds(totalPlayers, elimination, winners) {
  return (totalPlayers - winners) / elimination;
}

/**
 * Simulate the starting state of each round.
 * @param {Number} winners The number of winners at the end of the game
 * @param {Number} elimination The number of players to be eliminated per round
 * @param {Number|null} rounds The total number of rounds to be played
 * @param {Number|null} playersWanted The total number of rounds to be played
 */
export function simulate(winners, elimination, rounds, playersWanted) {
  let results = [];

  // Handle both wanting to play with a specific number of players or specific number of rounds.
  // We export `calculateTotalRounds` for the view to use and determine if the requested player
  // count is suitable for a game to be playable
  if (playersWanted) {
    rounds = calculateTotalRounds(playersWanted, elimination, winners);
  } else {
      // For round 1, the total number of players and the current number of players are the same,
      // but calculating the current players for subsequent rounds requires the total number,
      // and the formulas for each are different. So, we allow the "duplication" of work for round 1
      // because there's no other way to do this
    playersWanted = totalPlayers(elimination, rounds, winners);
  }

  // Calculate the state of the game for each round we want to play
  for (let currentRound = 0; currentRound < rounds; currentRound++) {
    let currentPlayers = players(playersWanted, elimination, currentRound);
    let currentChairs = chairs(currentPlayers, elimination, winners);
    let currentChallengers = elimination + winners;
    results.push({
      "currentRound": currentRound + 1,
      currentPlayers,
      currentChairs,
      currentChallengers
    });
  };

  // Provide those results to the caller so it can decide how to best display the data
  return results;
}
