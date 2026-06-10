import { tg, now } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { answer } = req.body as { answer: 'yes' | 'no' };
  const ts = now();

  const msg = answer === 'yes'
    ? `💕 <b>قالت نعم!</b> 🎊🥹\n\n🕐 ${ts}`
    : `💔 <b>قالت لا...</b>\n\n🕐 ${ts}`;

  await tg(msg);
  res.json({ ok: true });
}
