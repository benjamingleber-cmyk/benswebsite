# Ben's Website — Railway Deployment

## Files
- `server.js` — Node.js backend with UV wisp + bare server
- `package.json` — dependencies
- `public/index.html` — the full website frontend
- `public/uv/uv.config.js` — UV proxy config

## Deploy to Railway (step by step)

1. Go to https://github.com and create a new repository called `benswebsite`
2. Upload all these files keeping the folder structure
3. Go to https://railway.app and sign in with GitHub
4. Click **New Project → Deploy from GitHub repo**
5. Select your `benswebsite` repo
6. Railway will auto-run `npm install` then `npm start`
7. Click **Settings → Generate Domain** to get your public URL
8. Done! Open your URL and the proxy will be fully working.

## Notes
- Railway free tier gives you 500 hours/month — plenty for personal use
- The UV service worker is registered on first load — refresh once if a site doesn't load
- YouTube, Google, Discord, Reddit etc. all work through the UV proxy
