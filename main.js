function toCodepointFilename(str) {
  return Array.from(str)
    .map(c => c.codePointAt(0).toString(16).toUpperCase())
    .join('_');
}

async function emojiFileExists(path) {
  try {
    const res = await fetch(path, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

async function renderEmojis(text) {
  let result = '';
  let i = 0;

  while (i < text.length) {
    let match = '';
    let len = 0;

    for (let l = 4; l >= 1; l--) {
      const part = text.slice(i, i + l);
      const filename = `emoji/${toCodepointFilename(part)}.png`;
      if (await emojiFileExists(filename)) {
        match = `<img src="${filename}" alt="${part}" class="emoji">`;
        len = l;
        break;
      }
    }

    if (len > 0) {
      result += match;
      i += len;
    } else {
      result += text[i];
      i++;
    }
  }

  document.getElementById("output").innerHTML = result;
}

// 🔥 Grab message from index.html and render it
const rawText = document.getElementById("raw-message").innerText;
renderEmojis(rawText);

