/* Upstash Redis REST helper — no SDK needed */
async function upstash(cmd: (string | number)[]): Promise<string | number | null> {
  const res = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cmd),
  });
  const { result } = (await res.json()) as { result: string | number | null };
  return result;
}

export const redis = {
  get:  (k: string)           => upstash(['GET', k])         as Promise<string | null>,
  set:  (k: string, v: string) => upstash(['SET', k, v]),
  incr: (k: string)           => upstash(['INCR', k])        as Promise<number>,
};

/* Telegram Bot helper */
export async function tg(text: string): Promise<void> {
  try {
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    );
  } catch { /* fire-and-forget */ }
}

export function deviceLabel(ua = ''): string {
  if (/iPhone|iPad/.test(ua)) return '📱 iPhone';
  if (/Android/.test(ua))     return '📱 Android';
  if (/Mac/.test(ua))         return '💻 Mac';
  if (/Windows/.test(ua))     return '🖥️ Windows';
  return '🌐 Unknown';
}

export function now(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
}
