const BASE = process.env.REACT_APP_API_URL || 'ticket-booking-modex-assignment-production.up.railway.app';

export async function fetchJSON(path: string, opts: RequestInit = {}) {
  const url = `${BASE}/api${path}`;
  const merged: RequestInit = {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  };
  if (merged.body && typeof merged.body !== 'string') {
    merged.body = JSON.stringify(merged.body);
  }
  const res = await fetch(url, merged);
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || res.statusText);
  }
  return json;
}
