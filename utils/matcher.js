const stringSimilarity = require("string-similarity");

const matchUsers = (currentUser, allUsers) => {
  const matches = [];

  allUsers.forEach((user) => {
    if (user._id.toString() === currentUser._id.toString()) return;

    const currentSkills = currentUser.skills.map(s => s.name.toLowerCase());
    const targetSkills = user.skills.map(s => s.name.toLowerCase());

    const matchScore = stringSimilarity.findBestMatch(
      currentSkills.join(" "),
      targetSkills
    ).bestMatch.rating;

    if (matchScore > 0.5) {
      matches.push({
        userId: user._id,
        name: user.name,
        matchScore,
      });
    }
  });

  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = matchUsers;
