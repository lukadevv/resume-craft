import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

function encodeIcoPngImages(pngImages) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const imageDataOffsetBase = headerSize + dirEntrySize * pngImages.length;

  let imageDataOffset = imageDataOffsetBase;
  const entries = pngImages.map((image) => {
    const entry = {
      width: image.width === 256 ? 0 : image.width,
      height: image.height === 256 ? 0 : image.height,
      colorCount: 0,
      reserved: 0,
      planes: 1,
      bitCount: 32,
      bytesInRes: image.png.length,
      imageOffset: imageDataOffset,
    };
    imageDataOffset += image.png.length;
    return entry;
  });

  const ico = Buffer.alloc(imageDataOffset);

  // ICONDIR
  ico.writeUInt16LE(0, 0); // reserved
  ico.writeUInt16LE(1, 2); // type = icon
  ico.writeUInt16LE(entries.length, 4);

  // ICONDIRENTRY
  for (let i = 0; i < entries.length; i++) {
    const entryOffset = headerSize + dirEntrySize * i;
    const entry = entries[i];
    ico.writeUInt8(entry.width, entryOffset + 0);
    ico.writeUInt8(entry.height, entryOffset + 1);
    ico.writeUInt8(entry.colorCount, entryOffset + 2);
    ico.writeUInt8(entry.reserved, entryOffset + 3);
    ico.writeUInt16LE(entry.planes, entryOffset + 4);
    ico.writeUInt16LE(entry.bitCount, entryOffset + 6);
    ico.writeUInt32LE(entry.bytesInRes, entryOffset + 8);
    ico.writeUInt32LE(entry.imageOffset, entryOffset + 12);
  }

  // Image data
  for (let i = 0; i < pngImages.length; i++) {
    const image = pngImages[i];
    const entry = entries[i];
    image.png.copy(ico, entry.imageOffset);
  }

  return ico;
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function writeFile(filePath, data) {
  await ensureDir(filePath);
  await fs.writeFile(filePath, data);
}

async function renderSquarePng(inputPath, size) {
  return sharp(inputPath)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function renderSquarePngWithBg(inputPath, size, bgColor) {
  return sharp(inputPath)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .flatten({ background: bgColor })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function main() {
  const repoRoot = process.cwd();
  const sourcePngPath = path.join(repoRoot, 'public', 'logo.png');

  const srcAppDir = path.join(repoRoot, 'src', 'app');
  const publicDir = path.join(repoRoot, 'public');
  const tmpDir = path.join(repoRoot, 'tmp');

  const outputs = {
    nextIconPng: path.join(srcAppDir, 'icon.png'),
    appleIconPng: path.join(srcAppDir, 'apple-icon.png'),
    faviconIco: path.join(srcAppDir, 'favicon.ico'),
    faviconSvg: path.join(publicDir, 'favicon.svg'),
    pwa192: path.join(publicDir, 'icon-192.png'),
    pwa512: path.join(publicDir, 'icon-512.png'),
    preview16: path.join(tmpDir, 'icon-preview-16.png'),
    preview32: path.join(tmpDir, 'icon-preview-32.png'),
  };

  const png512 = await renderSquarePng(sourcePngPath, 512);
  const png192 = await renderSquarePng(sourcePngPath, 192);
  const apple180 = await renderSquarePngWithBg(sourcePngPath, 180, '#222222');
  const png32 = await renderSquarePng(sourcePngPath, 32);
  const png16 = await renderSquarePng(sourcePngPath, 16);

  await writeFile(outputs.nextIconPng, png512);
  await writeFile(outputs.appleIconPng, apple180);
  await writeFile(outputs.pwa192, png192);
  await writeFile(outputs.pwa512, png512);
  await writeFile(outputs.preview16, png16);
  await writeFile(outputs.preview32, png32);

  const ico = encodeIcoPngImages([
    { width: 16, height: 16, png: png16 },
    { width: 32, height: 32, png: png32 },
  ]);
  await writeFile(outputs.faviconIco, ico);

  // favicon.svg — embed 512px PNG as base64 for modern browsers
  const svgBase64 = png512.toString('base64');
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${svgBase64}" width="512" height="512"/>
</svg>`;
  await writeFile(outputs.faviconSvg, faviconSvg);

  console.log('Generated icons:');
  console.log(
    Object.values(outputs)
      .map((p) => `- ${path.relative(repoRoot, p)}`)
      .join('\n')
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
