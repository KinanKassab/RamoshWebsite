import { redis } from './utils.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(_req: any, res: any) {
  try {
    const [locked, opened, attempts, answer] = await Promise.all([
      redis.get('pin:locked'),
      redis.get('pin:opened'),
      redis.get('pin:attempts'),
      redis.get('answer:choice'),
    ]);
    res.setHeader('Cache-Control', 'no-store');
    res.json({
      locked:  locked  === '1',
      opened:  opened  === '1',
      attemptsLeft: Math.max(0, 5 - Number(attempts ?? 0)),
      answer: answer ?? null,
    });
  } catch {
    res.json({ locked: false, opened: false, attemptsLeft: 5, error: true });
  }
}
