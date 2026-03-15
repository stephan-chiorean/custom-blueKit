# DNS & Nameserver Setup — bluekit.md → Vercel

Date completed: 2026-03-15
Status: ✅ Live at https://bluekit.md

---

## What we did (and what went wrong along the way)

### Step 1 — Change nameservers at nic.md (2026-03-14 ~11:37 PM)

1. Went to nic.md (the Moldova domain registry where bluekit.md is registered)
2. Opened DNS Manager for bluekit.md
3. Hit a wall: nic.md's DNS Manager requires their own nameservers to be active before
   you can add records — a chicken-and-egg problem
4. Chose the workaround: switch to Vercel's nameservers entirely so Vercel manages DNS
5. Changed nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
6. nic.md confirmed: "The NameServers for domain(s) have been changed successfully!"
   (nic.md noted their zone updates hourly)

---

### Step 2 — Waited ~9 hours, still broken (2026-03-15 ~9:15 AM)

Vercel still showed "Invalid Configuration" on both bluekit.md and www.bluekit.md.

Ran a DNS check to diagnose:
```bash
dig NS bluekit.md +short          # returned nothing
dig NS bluekit.md @8.8.8.8 +short # returned nothing
whois bluekit.md | grep -i nameserver
# → NameServer: ns1.vercel-dns.com
# → NameServer: ns2.vercel-dns.com
```

`whois` confirmed nic.md had recorded the change. But `dig` returned `SERVFAIL` —
meaning the .md TLD servers were delegating to Vercel's nameservers, but Vercel was
returning an error when queried.

---

### Step 3 — Hit Refresh in Vercel (2026-03-15 ~9:24 AM)

Clicked Refresh on both domains. Error changed from:

> "Invalid Configuration"

to:

> "Failed To Generate Cert — DNS zone not enabled for bluekit.md. Cannot solve dns-01 ACME cert challenge."

This was actually progress. It meant:
- ✅ The nameserver delegation was now working (Vercel's servers were being reached)
- ❌ But Vercel hadn't created a DNS zone for bluekit.md on their side

---

### Step 4 — Add domain at the Vercel account level (the fix)

The root cause: the domain had been added to the **project** in Vercel, but not to the
**Vercel account**. These are two separate things:

- **Project-level domain**: tells Vercel which deployment to serve for bluekit.md
- **Account-level domain / DNS zone**: creates the actual DNS zone on Vercel's nameservers

Without the account-level zone, Vercel's nameservers had no records for bluekit.md,
causing the SERVFAIL and the failed SSL cert challenge.

**Fix:**
1. Go to `vercel.com/stephanchioreans-projects/domains`
2. Add `bluekit.md` there
3. Vercel created the DNS zone, provisioned SSL automatically
4. Both domains turned green ✅

---

## The full error sequence (for future reference)

| Error | What it meant | What to do |
|---|---|---|
| "Invalid Configuration" | Vercel couldn't see its nameservers in DNS | Wait for propagation, hit Refresh |
| `SERVFAIL` from `dig` | TLD is delegating to Vercel NS but Vercel has no zone | Add domain at account level |
| "Failed To Generate Cert / DNS zone not enabled" | Same as above — Vercel confirmed the zone is missing | Add domain at vercel.com/[account]/domains |
| Green checkmark ✅ | Everything wired up, SSL provisioned | Done |

---

## Background: How all of this fits together

If you've never had to think about hosting before, here's the mental model.

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
This is where you bought the domain name `bluekit.md`. They hold the official record
that you own it. They also control which nameservers are authoritative for your domain
(i.e. who gets to answer DNS questions about bluekit.md).

Think of nic.md as: the government office that issued the deed to your property.

**2. Nameservers**
Nameservers are the actual servers that answer DNS queries for your domain.
Before the switch, nic.md's own nameservers (`alfa.dns.md` / `beta.dns.md`) were in charge.
After the switch, Vercel's nameservers (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`) are.

Switching nameservers is like telling the post office: "I moved — forward all mail to
this new address." The registrar (nic.md) just updates who to ask.

**3. DNS Zone**
A DNS zone is the full set of records a nameserver holds for a domain. When Vercel's
nameservers became authoritative for bluekit.md, they needed an actual zone — a file
of records saying "bluekit.md goes to this IP, www.bluekit.md goes here, etc."

This is what was missing. Vercel's nameservers were receiving queries but had no zone
to answer from, so they returned SERVFAIL (server failure).

**4. SSL Certificates**
SSL is what makes https:// work (the padlock). Vercel uses Let's Encrypt to issue certs
automatically. To prove it controls the domain, it uses a "DNS-01 challenge" — it
temporarily adds a special DNS record and Let's Encrypt checks for it. This only works
if Vercel's DNS zone exists. That's why the error said "Cannot solve dns-01 ACME cert
challenge" — no zone, no challenge record, no cert.

**5. Vercel — the hosting platform**
Vercel is where your actual website lives. It builds your React/Vite app from GitHub and
serves it from a global CDN. Once DNS and SSL are sorted, every push to `main` deploys
automatically within ~1 minute.

---

### Project-level vs account-level domains in Vercel

This was the non-obvious part that caused the 9-hour delay.

- **Account-level domain** (`vercel.com/[account]/domains`): registers the domain with
  Vercel and creates the DNS zone on their nameservers. Required when using Vercel DNS.

- **Project-level domain** (`vercel.com/[account]/[project]/settings/domains`): tells
  Vercel which deployment to route traffic to for that domain.

You need both. The project-level domain had been added, but the account-level zone hadn't.
Vercel's UI doesn't make this obvious — the "Vercel DNS" tab just shows the nameservers
to set, it doesn't warn you that the zone also needs to be created separately.

---

## Checklist — verified live ✅

- [x] nic.md nameservers set to ns1.vercel-dns.com / ns2.vercel-dns.com
- [x] Domain added at account level in Vercel (DNS zone created)
- [x] Vercel Domains: both bluekit.md and www.bluekit.md show green "Valid Configuration"
- [x] https://bluekit.md loads over HTTPS
- [x] https://www.bluekit.md redirects correctly
- [x] SSL certificate active
