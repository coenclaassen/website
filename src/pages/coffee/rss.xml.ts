import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sortEntries } from '../../utils/coffee';
import { SITE_URL } from '../../utils/constants';

export const GET: APIRoute = async () => {
  const entries = await getCollection('coffee');
  const sorted = sortEntries(entries);
  const feedUrl = `${SITE_URL}/coffee/rss.xml`;
  
  const items = sorted.map((entry) => {
    const { id, title, name, date } = entry.data;
    const url = `${SITE_URL}/coffee/${id}`;
    const description = `A conversation on ${title || 'design and technology'} within Eindhoven's design and tech ecosystem.`;
    const pubDate = date ? new Date(date).toUTCString() : new Date().toUTCString();

    return `    <item>
      <title>Curiosity Coffee #${id} — ${title || name}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Curiosity Coffee — Design & Tech in Eindhoven</title>
    <link>${SITE_URL}/coffee</link>
    <description>Conversations on design and technology in and around Eindhoven.</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

