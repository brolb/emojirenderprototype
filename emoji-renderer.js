import { parse } from 'https://cdn.skypack.dev/twemoji-parser';

const text = "Hello 👩‍🚀! I love 🇺🇸 and also 😀 and 🧑‍🤝‍🧑.";
const emojiBasePath = 'emojis/';

function emojiToFilename(emoji) {
  return Array.from(emoji)
    .map(c => c.codePointAt(0).toString(16))
    .join('-') + '.png';
}

function renderTextWithEmojis(text) {
  const container = document.createElement('span');
  const emojiTokens = parse(text); // only gives emoji tokens

  let currentIndex = 0;

  for (const token of emojiTokens) {
    // Add text before emoji
    if (token.indices[0] > currentIndex) {
      const beforeText = text.slice(currentIndex, token.indices[0]);
      container.appendChild(document.createTextNode(beforeText));
    }

    // Add emoji image
    const filename = emojiToFilename(token.text);
    const img = document.createElement('img');
    img.className = 'emoji';
    img.src = emojiBasePath + filename;
    img.alt = token.text;
    container.appendChild(img);

    currentIndex = token.indices[1];
  }

  // Add remaining text after the last emoji
  if (currentIndex < text.length) {
    container.appendChild(document.createTextNode(text.slice(currentIndex)));
  }

  return container;
}

document.getElementById('output').appendChild(renderTextWithEmojis(text));