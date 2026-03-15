# Vercel Hosting Runbook — BlueKit Landing Page

Date verified: 2026-03-14
Landing page repo: https://github.com/stephan-chiorean/custom-blueKit (currently private)
Domain: bluekit.md
Framework: React + Vite (build output: `dist/`)
Vercel account: stephan-chiorean (vercel.com/stephanchioreans-projects)

---

## Step 1 — Make the landing page repo public

The repo needs to be public for Vercel's free hobby plan to deploy it automatically on push.
(Vercel can deploy private repos but requires a Pro plan.)

```bash
gh repo edit stephan-chiorean/custom-blueKit --visibility public
```

Confirm:
```bash
gh repo view stephan-chiorean/custom-blueKit --json visibility --jq '.visibility'
# public
```

---

## Step 2 — Import project in Vercel

1. Go to https://vercel.com/stephanchioreans-projects
2. Click **Add New… → Project**
3. Under "Import Git Repository", find `stephan-chiorean/custom-blueKit`
4. Click **Import**

### Build settings (Vercel should auto-detect, but verify):

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `tsc -b && vite build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. Click **Deploy**

Vercel will build and deploy. You'll get a preview URL like `custom-bluekit-xxx.vercel.app`.

---

## Step 3 — Add the bluekit.md domain

### In Vercel:

1. Open the project → **Settings → Domains**
2. Click **Add Domain**
3. Type `bluekit.md` → click **Add**
4. Also add `www.bluekit.md` if you want the www redirect

Vercel will show you the DNS records you need to set.

---

## Step 4 — Configure DNS at your registrar

Vercel will give you one of two options depending on your registrar:

### Option A — Nameservers (recommended, Vercel manages everything)

Point your domain's nameservers to Vercel:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```
Do this in your domain registrar's DNS settings panel. Propagation: up to 48h.

### Option B — A / CNAME records (keep your registrar's DNS)

Add these records at your registrar:

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Vercel shows the exact records in the Domains UI — use whatever it displays there, not the above, as they can change.

---

## Step 5 — Verify SSL and domain

Once DNS propagates, Vercel auto-provisions an SSL cert (Let's Encrypt). Check:

1. Vercel project → **Settings → Domains** — both domains should show a green checkmark
2. Visit https://bluekit.md — landing page loads over HTTPS
3. Visit https://www.bluekit.md — redirects to apex (or vice versa)

---

## Step 6 — Auto-deploy on push

From this point on, every push to `main` in `custom-blueKit` triggers a Vercel deployment automatically. No manual action needed.

To deploy a new landing page version (e.g. after updating the download link):

```bash
cd "/Users/stephanchiorean/Documents/projects/Custom Landing Page"
git add src/components/Download.tsx
git commit -m "chore: update download link to vX.Y.Z"
git push origin main
```

Vercel picks it up and deploys within ~1 minute.

---

## Updating the download link on each release

File: `src/components/Download.tsx`

Update the `href` to the new R2 URL:
```tsx
href="https://pub-bbfe77b031cf40df8b49f3dcd9f96d78.r2.dev/bluekit-app_X.Y.Z_aarch64.dmg"
```

Then push — Vercel deploys automatically.

---

## Troubleshooting

**Domain shows "Invalid Configuration" in Vercel**
→ DNS hasn't propagated yet, or records are wrong. Check with:
```bash
dig bluekit.md A
dig www.bluekit.md CNAME
```

**Build fails on Vercel**
→ Check the build log in Vercel dashboard. Most common cause: TypeScript errors that pass locally but fail on strict CI. Run `tsc -b && vite build` locally first.

**Vercel can't find the repo**
→ Repo is still private. Run step 1 again.
