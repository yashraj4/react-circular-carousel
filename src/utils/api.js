// // src/utils/api.js
// export const fetchCardContents = async () => {
//   try {
//     const [quote, fact, Dog_Image, trivia, history, riddle, joke] = await Promise.all([
//       fetch('https://api.quotable.io/random').then(res => res.json()),
//       fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(res => res.json()),
//       fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json()),
//       fetch('https://restcountries.com/v3.1/name/japan').then(res => res.json()),
//       fetch('https://opentdb.com/api.php?amount=1&type=multiple').then(res => res.json()),
//       fetch('https://history.muffinlabs.com/date').then(res => res.json()),
//       fetch('https://riddles-api.vercel.app/random').then(res => res.json()),
//       fetch('https://official-joke-api.appspot.com/random_joke').then(res => res.json()),
//     ]);

//     return [
//       { title: "Quote", text: `${quote.content} — ${quote.author}` },
//       { title: "Fun Fact", text: fact.text },
//       { title: "Movie Quote", text: Dog_Image.quote },
//       { title: "Travel (Japan)", text: `Capital: ${country[0].capital}, Region: ${country[0].region}` },
//       { title: "Trivia", text: trivia.results[0].question },
//       { title: "Today in History", text: history.data.Events[0].text },
//       { title: "Riddle", text: `${riddle.riddle} (Answer: ${riddle.answer})` },
//       { title: "Joke", text: `${joke.setup} — ${joke.punchline}` },
//     ];
//   } catch (err) {
//     console.error("Error fetching card content:", err);
//     return Array(8).fill({ title: "Error", text: "Failed to fetch." });
//   }
// };
