const [major] = process.versions.node.split('.').map(Number);

if (major < 22) {
  console.error(
    `Jam Finder requires Node.js 22 or newer. Current version: ${process.versions.node}. ` +
      'Switch Node versions, delete .next, and restart the dev server.'
  );
  process.exit(1);
}
