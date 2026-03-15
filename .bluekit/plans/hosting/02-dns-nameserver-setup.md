# DNS & Nameserver Setup — bluekit.md → Vercel

Date completed: 2026-03-14
Status: Propagating (nic.md zone updates hourly, next at 06:00 AM GMT+2)

---

## What we did

1. Went to nic.md (the Moldova domain registry where bluekit.md is registered)
2. Opened DNS Manager for bluekit.md
3. Changed the nameservers from nic.md's defaults to Vercel's nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. nic.md confirmed: "The NameServers for domain(s) have been changed successfully!"

Once the .md zone updates (hourly), Vercel will fully control DNS for bluekit.md and the
"Invalid Configuration" errors in the Vercel dashboard will resolve automatically.
No further action needed — Vercel provisions SSL automatically after that.

---

## Background: How all of this fits together

If you've never had to think about hosting before, here's the mental model.

---

### The phone book analogy

The internet runs on IP addresses (e.g. `76.76.21.21`) — numbers that identify servers.
But humans use names like `bluekit.md`. DNS (Domain Name System) is the global phone book
that translates names → numbers.

When someone types `bluekit.md` in their browser:
1. Their computer asks a DNS resolver: "what's the IP for bluekit.md?"
2. The resolver looks it up and returns an IP address
3. The browser connects to that IP and loads the page

---

### The four players involved in your setup

**1. Domain Registrar — nic.md**
This is where you *bought* the domain name `bluekit.md`. They hold the official record
that you own it. They also control which nameservers are authoritative for your domain
(i.e. who gets to answer DNS questions about bluekit.md).

Think of nic.md as: the government office that issued the deed to your property.

**2. Nameservers**
Nameservers are the actual servers that answer DNS queries for your domain.
Before today, nic.md's own nameservers (`alfa.dns.md` / `beta.dns.md`) were in charge.
After today, Vercel's nameservers (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`) are in charge.

Switching nameservers is like telling the post office: "I moved — forward all mail to
this new address." The registrar (nic.md) just updates who to ask.

**3. DNS Records**
Once a nameserver is in charge, it holds individual DNS records — instructions like:
- **A record**: "bluekit.md → IP address 76.76.21.21" (points apex domain to a server)
- **CNAME record**: "www.bluekit.md → fbe84494690efcfd.vercel-dns-017.com" (alias to another hostname)

Before the nameserver switch, we couldn't add these records ourselves at nic.md because
their DNS Manager required you to use nic.md's nameservers first (a chicken-and-egg wall).
By switching to Vercel's nameservers, Vercel manages these records automatically.

**4. Vercel — the hosting platform**
Vercel is where your actual website lives. It builds your React/Vite app from GitHub and
serves it from a global CDN. It also handles SSL certificates (the https:// padlock)
automatically via Let's Encrypt once DNS is pointed at it.

Think of Vercel as: the building your website lives in. DNS is the street address that
tells people how to find that building.

---

### Why the "Invalid Configuration" error appeared

Vercel knew you wanted to use bluekit.md, but when it checked the DNS records, it found
nic.md's nameservers still in charge with no records pointing to Vercel. It's like
putting a sign on a building that says "123 Main St" but the post office still has the
old address on file.

---

### What happens during propagation

"Propagation" is the delay between when you change DNS and when the whole internet knows.
DNS resolvers around the world cache answers for a period of time (called TTL — time to live).
When that cache expires, they re-fetch the latest answer.

For .md domains, nic.md updates their zone file hourly. After that, full global propagation
is typically a few minutes to a few hours, rarely longer.

You don't need to do anything during this window. Just wait and hit Refresh in Vercel's
Domains settings. When both bluekit.md and www.bluekit.md show a green checkmark,
you're live.

---

## Checklist — after propagation

- [ ] Vercel Domains page: both bluekit.md and www.bluekit.md show green "Valid Configuration"
- [ ] Visit https://bluekit.md — landing page loads over HTTPS
- [ ] Visit https://www.bluekit.md — redirects correctly
- [ ] SSL certificate active (padlock in browser)
