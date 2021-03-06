function calculatePluralityWinners(ballots) {
  // Give one point the first choice of each ballot, ignoring any choices after that.
  // The option(s) with most points wins.
  // https://en.wikipedia.org/wiki/Plurality_voting
  console.log('calculatePluralityWinners: ' + ballots)
  let winners = []
  let counts = {}
  // Count first votes for each option
  for (let i=0; i<ballots.length; i++) {
    let ballot = ballots[i]
    if (ballot.length > 0) {
      key = ballot[0]
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
    // console.log('Votes for ' + key + ': ' + counts[key])
    if (counts[key] > maxVotes) {
      winners = [key]
      maxVotes = counts[key]
      // console.log(key + ' is the current winner')
    } else if (counts[key] == maxVotes) {
      winners.push(key)
      // console.log(key + ' added to winners')
    }
  })

  // console.log('Winners: ' + winners)
  let result = {
    method: 'plurality',
    winners: winners,
    counts: counts
  }
  return result
}
