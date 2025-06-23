// Load Twemoji parser from Skypack CDN
import { parse } from 'https://cdn.skypack.dev/twemoji-parser';

const text = "Hello 👩‍🚀! I love 🇺🇸 and also 😀 and 🧑‍🤝‍🧑.";
const emojiBasePath = 'emojis/';

// Converts emoji characters to the filename like 1f469-200d-1f680.png
function emojiToFilename(emoji) {
  return Array.from(emoji)
    .map(c => c.codePointAt(0).toString(16))
    .join('-') + '.png';
}

function renderTextWithEmojis(text) {
  const container = document.createElement('span');
  const tokens = parse(text);

  tokens.forEach(token => {
    if (token.type === 'text') {
      container.appendChild(document.createTextNode(token.text));
    } else if (token.type === 'emoji') {
      const filename = emojiToFilename(token.text);
      const img = document.createElement('img');
      img.className = 'emoji';
      img.src = emojiBasePath + filename;
      img.alt = token.text;
      container.appendChild(img);
    }
  });

  return container;
}

// Render the result
document.getElementById('output').appendChild(renderTextWithEmojis(text));