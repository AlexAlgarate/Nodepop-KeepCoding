import { readFileSync } from 'fs';

import { formatTime } from '../utils/dateutils.js';

const packageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);

export function healthCall(req, res, next) {
  const seconds = process.uptime();
  res.status(200).json({
    status: 'Server Online',
    uptime: formatTime(seconds), // TODO 1
    version: packageJson.version, // TODO 2
  });
}
