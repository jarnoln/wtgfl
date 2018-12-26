function pairwiseDefeat(candidateA, candidateB, ballots) {
  let votesA = 0;
  let votesB = 0;
  for (let i=0; i<ballots.length; i++) {
    let ballot = ballots[i];
    for (let j=0; j<ballot.length; j++) {
      key = ballot[j];
      // Whichever candidate is found first gets one vote from this ballot
      if (key === candidateA) {
        votesA += 1;
        break;
      }
      if (key === candidateB) {
        votesB += 1
        break;
      }
    }
  }
  // console.log(candidateA + ' vs. ' + candidateB + ': ' + votesA + ' - ' + votesB);
  return {
    'A': votesA,
    'B': votesB
  };
}

function calculateSchulzeWinners(candidates, ballots) {
  // A Condorcet method
  // Each candidate is matched against all other candidates in pairwise comparison
  // If there is a candidate that wins against all other candidates, that candidate is winner
  // https://en.wikipedia.org/wiki/Schulze_method
  console.log('calculateSchulzeWinners: ' + candidates)
  let losses = {}
  let wins = {}
  let d = []
  let candidateCount = candidates.length;
  // Initialize wins and losses
  for (let i=0; i<candidateCount; i+=1) {
    wins[candidates[i]] = 0;
    losses[candidates[i]] = 0;
  }

  for (let i=0; i<candidateCount; i+=1) {
    let d_row = []
    for (let j=0; j<candidateCount; j+=1) {
      let candidateA = candidates[i];
      let candidateB = candidates[j];
      if (i !== j) {
        let votes = pairwiseDefeat(candidateA, candidateB, ballots);
        d_row[j] = votes['A'];
        // These are not required by Schulze but allow taking a shortcut if we have Condorcet winner
        if (votes['A'] > votes['B']) {  // A is preferred by more voters than B
          wins[candidateA] += 1
        }
        if (votes['A'] < votes['B']) {  // A is preferred by fewer voters than B
          losses[candidateA] += 1
        }
      }
    }
    d[i] = d_row;
  }

  let winners = []
  // Find candidate with most wins
  let maxWins = 0
  Object.keys(wins).forEach(function(key) {
    console.log('Wins for ' + key + ': ' + wins[key])
    if (wins[key] > 0) {
      if (wins[key] > maxWins) {
        winners = [key]
        maxWins = wins[key]
        console.log(key + ' is the current winner')
      } else if (wins[key] == maxWins) {
        winners.push(key)
        console.log(key + ' added to winners')
      }
    }
  })

  console.log('Winners: ' + winners)
  let result = {
    method: 'schulze',
    winners: winners,
    counts: wins
  }

  if (winners.length === 1) {
    let winner = winners[0];
    if (losses[winner] === 0) {
      console.log('Found single undefeated Condorcet winner: ' + winner)
      return result
    }
  }
  // No clear Condorcet winner. Need to resort to path calculation.
  return result
}
