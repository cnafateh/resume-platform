import type { APIRoute } from "astro";
import sharp from "sharp";
import { data } from "../data/resume";

export const prerender = true;

const escapeXml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
})[character] ?? character);

export const GET: APIRoute = async () => {
  const name = escapeXml(data.basics.name);
  const label = escapeXml(data.basics.label);
  const initials = escapeXml(data.basics.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0c1b22"/><stop offset="1" stop-color="#091219"/></linearGradient><radialGradient id="light"><stop stop-color="#315449" stop-opacity=".65"/><stop offset="1" stop-color="#091219" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="630" fill="url(#bg)"/><circle cx="920" cy="275" r="350" fill="url(#light)"/>
    <g stroke="#779b86" stroke-opacity=".18"><path d="M0 500H1200M0 400H1200M0 300H1200M0 200H1200M0 100H1200M100 0V630M200 0V630M300 0V630M400 0V630M500 0V630M600 0V630M700 0V630M800 0V630M900 0V630M1000 0V630M1100 0V630"/></g>
    <g transform="translate(905 300) rotate(45)"><rect x="-155" y="-155" width="310" height="310" fill="#17363a" stroke="#c7f17f" stroke-width="2"/><rect x="-120" y="-120" width="240" height="240" fill="none" stroke="#c7f17f" stroke-opacity=".5"/><rect x="-87" y="-87" width="174" height="174" fill="#10282b" stroke="#c7f17f" stroke-opacity=".7"/></g>
    <text x="905" y="333" text-anchor="middle" fill="#c7f17f" font-family="Arial,sans-serif" font-weight="700" font-size="78">${initials}</text>
    <rect x="70" y="65" width="48" height="48" fill="none" stroke="#c7f17f" stroke-width="2"/><text x="94" y="96" text-anchor="middle" fill="#c7f17f" font-family="Arial,sans-serif" font-size="17" font-weight="700">${initials}</text>
    <text x="70" y="245" fill="#c7f17f" font-family="Arial,sans-serif" font-size="19" letter-spacing="5">SOFTWARE / SYSTEMS</text>
    <text x="65" y="355" fill="#edf2ed" font-family="Arial,sans-serif" font-size="80" font-weight="700" letter-spacing="-5">${name}</text>
    <text x="70" y="410" fill="#afbfbc" font-family="Arial,sans-serif" font-size="23">${label}</text>
    <path d="M70 515H640" stroke="#7e9d8f" stroke-opacity=".5"/><text x="70" y="555" fill="#c7f17f" font-family="monospace" font-size="16" letter-spacing="3">PORTFOLIO / ENGINEERING</text>
  </svg>`;
  const image = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(image, { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
};
