import { redis, tg, deviceLabel, now } from './utils';

const MAX = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { pin } = req.body as { pin: string };
  const ip  = ((req.headers['x-forwarded-for'] as string) ?? 'unknown').split(',')[0].trim();
  const ua  = (req.headers['user-agent'] as string | undefined) ?? 'unknown';
  const dev = deviceLabel(ua);
  const ts  = now();

  try {
    const [locked, opened] = await Promise.all([
      redis.get('pin:locked'),
      redis.get('pin:opened'),
    ]);

    if (locked === '1' || opened === '1') {
      return res.json({ correct: false, locked: true, attemptsLeft: 0 });
    }

    /* ── Correct PIN ── */
    if (pin === (process.env.CORRECT_PIN ?? '7626')) {
      await redis.set('pin:opened', '1');
      await tg(
        `✅ <b>فُتح الدفتر!</b> 🎊🥹\n\n${dev}\n🌐 IP: <code>${ip}</code>\n🕐 ${ts}`
      );
      return res.json({ correct: true, locked: false });
    }

    /* ── Wrong PIN ── */
    const count = await redis.incr('pin:attempts');
    const left  = Math.max(0, MAX - count);
    const isNowLocked = count >= MAX;

    if (isNowLocked) {
      await redis.set('pin:locked', '1');
      await tg(
        `🔒 <b>الموقع اتقفل!</b>\n\n${MAX} محاولات فاشلة\nآخر رمز: <code>${pin}</code>\n\n${dev}\n🌐 IP: <code>${ip}</code>\n🕐 ${ts}`
      );
    } else {
      await tg(
        `❌ <b>محاولة خاطئة #${count}</b>\n\n🔢 الرمز: <code>${pin}</code>\n⏳ متبقي: <b>${left}/${MAX}</b>\n\n${dev}\n🌐 IP: <code>${ip}</code>\n🕐 ${ts}`
      );
    }

    return res.json({ correct: false, locked: isNowLocked, attemptsLeft: left });

  } catch {
    /* Redis unavailable — local fallback, still notify via Telegram */
    const correct = pin === (process.env.CORRECT_PIN ?? '7626');
    tg(`⚠️ <b>خطأ Redis</b> — محاولة: <code>${pin}</code> ${correct ? '✅' : '❌'}\n\n${dev}\n🌐 IP: <code>${ip}</code>\n🕐 ${ts}`);
    return res.json({ correct, locked: false, attemptsLeft: 5, error: true });
  }
}
