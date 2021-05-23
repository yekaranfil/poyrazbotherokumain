module.exports = async (
  msg,
  pages,
  client,
  emojiList = ["⏮️", "◀️", "⏹️", "▶️", "⏭️"],
  timeout = 120000,
) => {
  if (!msg && !msg.channel) throw new Error("Kanala erişilemez.");
  if (!pages) throw new Error("Sayfalar verilmemiştir.");

  let page = 0;
  const curPage = await msg.channel.send(
    pages[page].setFooter(`Sayfa ${page + 1}/${pages.length} `, msg.author.displayAvatarURL({ dynamic: true }))
  );
  for (const emoji of emojiList) await curPage.react(emoji);
  const reactionCollector = curPage.createReactionCollector(
    (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
    { time: timeout }
  );
  reactionCollector.on("collect", (reaction) => {
    reaction.users.remove(msg.author);
    switch (reaction.emoji.name) {
      case emojiList[0]:
        page = 0;
        break;
      case emojiList[1]:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case emojiList[2]:
        curPage.reactions.removeAll();
        break;
      case emojiList[3]:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      case emojiList[4]:
        page = pages.length - 1;
        break;
      default:
        break;
    }
    curPage.edit(pages[page].setFooter(`Sayfa ${page + 1}/${pages.length} `, msg.author.displayAvatarURL({ dynamic: true })));
  });
  reactionCollector.on("end", () => {
    if (!curPage.deleted) {
      curPage.reactions.removeAll();
    }
  });
  return curPage;
};
