const fs = require('fs');
const path = require('path');

const deleteFile = (relativePath) => {
  try {
    if (!relativePath) return;
    const full = path.isAbsolute(relativePath) ? relativePath : path.join(__dirname, '..', relativePath);
    if (fs.existsSync(full)) fs.unlinkSync(full);
  } catch (err) {
    // ignore
  }
};

module.exports = { deleteFile };
