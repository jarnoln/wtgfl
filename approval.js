function calculateApprovalWinners(ballots) {
  // Give one point for each item in ballot, ignoring order.
  // The option(s) with most points wins.
  // https://en.wikipedia.org/wiki/Approval_voting
  console.log('calculateApprovalWinners: ' + ballots)
  let winners = []
  let counts = {}
  // Count first votes for each option
  for (let i=0; i<ballots.length; i++) {
    let ballot = ballots[i]
    for (let j=0; j<ballot.length; j++) {
      key = ballot[j]
      if (Object.keys(counts).includes(key)) {
        counts[key] += 1
      } else {
        counts[key] = 1
      }
      console.log(key, ': ' + counts[key])
    }
  }

  // Find option with most votes
  let maxVotes = 0
  Object.keys(counts).forEach(function(key) {
    console.log('Votes for ' + key + ': ' + counts[key])
    if (counts[key] > maxVotes) {
      winners = [key]
      maxVotes = counts[key]
      console.log(key + ' is the current winner')
    } else if (counts[key] == maxVotes) {
      winners.push(key)
      console.log(key + ' added to winners')
    }
  })

  console.log('Winners: ' + winners)
  let result = {
    method: 'approval',
    winners: winners,
    counts: counts
  }
  return result
}
