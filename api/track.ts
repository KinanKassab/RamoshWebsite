import { tg, deviceLabel, now } from './utils.js';

const PAGE_AR: Record<string, string> = {
  cover:      'الغلاف',
  'memory-1': 'ذكرى ١', 'memory-2': 'ذكرى ٢', 'memory-3': 'ذكرى ٣',
  'memory-4': 'ذكرى ٤', 'memory-5': 'ذكرى ٥', 'memory-6': 'ذكرى ٦', 'memory-7': 'ذكرى ٧',
  timeline:   'قصتنا',
  letter:     'الرسالة',
  question:   'السؤال',
  'yes-ending': 'النهاية ♥',
  'no-ending':  'فهمت',
};

const p = (id: string) => PAGE_AR[id] ?? id;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = req.body as Record<string, any>;
  const ip  = ((req.headers['x-forwarded-for'] as string) ?? '').split(',')[0].trim() || 'unknown';
  const dev = deviceLabel((req.headers['user-agent'] as string | undefined) ?? '');
  const ts  = now();

  let msg = '';

  switch (body.type) {
    case 'visit':
      msg = `👁️ <b>فتح الموقع</b>\n\n${dev}\n🌐 <code>${ip}</code>\n🕐 ${ts}`;
      break;

    case 'navigate': {
      const arrow  = body.dir === 'next' ? '→' : '←';
      const method =
        body.method === 'swipe' ? '👆 سحب'   :
        body.method === 'key'   ? '⌨️ كيبورد' : '🖱️ زر';
      msg = `📖 ${method} ${arrow}\n<b>${p(body.from)}</b> ← <b>${p(body.to)}</b>\n\n${dev}\n🕐 ${ts}`;
      break;
    }

    case 'page_time': {
      const secs = body.seconds as number;
      if (secs < 3) { res.json({ ok: true }); return; }
      msg = `⏱️ قضت <b>${secs}ث</b> في "<b>${p(body.page)}</b>"\n\n${dev}\n🕐 ${ts}`;
      break;
    }
  }

  if (msg) tg(msg);
  res.json({ ok: true });
}
