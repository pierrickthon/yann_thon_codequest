const generateScoreboard = (players) => 
  players
    .map(p => ({ ...p, total: p.score + p.bonus }))
    .sort((a, b) => b.total - a.total)
    .map((p, i) => ({ rank: i + 1, name: p.name, total: p.total }));

module.exports = { generateScoreboard };


