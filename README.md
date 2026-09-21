# Abdul Rahman Qureshi Portfolio

A dark-first Cloud, DevOps, and SRE portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Dependencies

Install the dependencies with `npm install` or the lockfile-accurate command `npm ci`. The application uses:

- Next.js, React, and React DOM for the static portfolio app
- TypeScript and the React/Node type packages for type checking
- Framer Motion for page animations
- Lucide React for interface icons
- Tailwind CSS and its PostCSS plugin for styling
- ESLint and the Next.js ESLint config for code quality checks

The project is frontend-only. Project examples are presented as portfolio/demo systems and do not claim production ownership beyond the experience listed.

## Contact form and Google Sheets

The contact form keeps the custom portfolio UI and sends submissions to a Google Sheet through Google Apps Script.

1. Create or open a Google Sheet, then choose **Extensions > Apps Script**.
2. Copy `google-apps-script/Code.gs` into the Apps Script editor and save it.
3. Choose **Deploy > New deployment**, select **Web app**, set **Execute as** to yourself, and set access to **Anyone**. Copy the web app URL.
4. Create `.env.local` in the project root:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/your-deployment-id/exec
```

5. Restart the Next.js dev server or rebuild the site. The script creates a `Responses` sheet automatically and adds one row per submission.

The web app URL is public by design, but the Google Sheet itself remains private. For a production site, add rate limiting or a CAPTCHA at the endpoint if spam becomes a problem.

## GitHub Pages

The included workflow builds the static export and deploys it automatically.

1. Push this project to a GitHub repository on the `main` branch.
2. In the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Open **Settings > Secrets and variables > Actions > Variables**, create a repository variable named `GOOGLE_SHEETS_ENDPOINT`, and set it to the Apps Script Web App URL.
4. Push to `main`, or run the **Deploy to GitHub Pages** workflow manually from the **Actions** tab.

The site URL will be `https://YOUR-USERNAME.github.io/abdul-cloud-website/`. The `basePath` in `next.config.ts` already matches this project name.
