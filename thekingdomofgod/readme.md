# The Kingdom: When, Who, How

A single-page interactive study tracing the kingdom of God through Scripture (KJV).

## Deploy to Netlify

**Option 1: drag and drop (fastest)**
1. Unzip this folder.
2. Go to https://app.netlify.com/drop and sign in.
3. Drag the unzipped folder onto the page. Netlify gives you a live URL in seconds.
4. Under Site configuration > Change site name, pick a friendlier subdomain.

**Option 2: Git (best for ongoing edits)**
1. Put these files in a GitHub repository.
2. In Netlify: Add new site > Import an existing project > choose the repo.
3. Leave the build command empty and set the publish directory to `.` (netlify.toml already does this).
4. Every push to the repo redeploys the site.

**Option 3: Netlify CLI**
```
npm install -g netlify-cli
netlify login
netlify deploy --dir . --prod
```

## Files
- `index.html`: the whole page (HTML, CSS, JS and all KJV verse text inlined).
- `netlify.toml`: no build step, plus basic security and caching headers.

Fonts load from Google Fonts. Everything else is self-contained.
