import logger, { pino } from 'pino';
import dayjs from 'dayjs';

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true },
})

const log = pino({
  transport,
  level: 'info',
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
