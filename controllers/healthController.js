import { readFileSync } from 'fs';

const packageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);

export function healthCall(req, res, next) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };
  const seconds = process.uptime();
  res.status(200).json({
    status: 'Server Online',
    uptime: formatTime(seconds), // TODO 1
    version: packageJson.version, // TODO 2
  });
}
