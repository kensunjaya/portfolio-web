const fs = require('fs');
const path = require('path');

// Simple WebP size reader
function getWebpSize(buffer) {
  // WebP files have RIFF header, WEBP container, and VP8 chunks
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    return null;
  }
  
  const type = buffer.toString('ascii', 12, 16);
  if (type === 'VP8 ') {
    // Lossy WebP
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height };
  } else if (type === 'VP8L') {
    // Lossless WebP
    const byte0 = buffer.readUInt8(21);
    const byte1 = buffer.readUInt8(22);
    const byte2 = buffer.readUInt8(23);
    const byte3 = buffer.readUInt8(24);
    
    const width = 1 + (((byte1 & 0x3f) << 8) | byte0);
    const height = 1 + (((byte3 & 0xf) << 10) | ((byte2 << 2) | ((byte1 & 0xc0) >> 6)));
    return { width, height };
  } else if (type === 'VP8X') {
    // Extended WebP
    const width = 1 + (buffer.readUInt32LE(24) & 0xffffff);
    const height = 1 + (buffer.readUInt32LE(27) & 0xffffff);
    return { width, height };
  }
  return null;
}

const dir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.webp')) {
    const p = path.join(dir, f);
    const buf = fs.readFileSync(p);
    try {
      const size = getWebpSize(buf);
      console.log(`${f}: ${size ? `${size.width}x${size.height}` : 'unknown'}`);
    } catch (e) {
      console.log(`${f}: error reading size: ${e.message}`);
    }
  }
});
