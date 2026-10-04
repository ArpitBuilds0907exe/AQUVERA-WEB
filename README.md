# Aquvera website

Static website for Aquvera: AI-powered financial operations for accounting and audit teams.
No build step, no dependencies. Plain HTML, CSS and JavaScript.

## Structure

```
aquvera-website/
├── index.html        Page content and layout
├── css/
│   └── styles.css    All styling (creamy white theme)
├── js/
│   ├── config.js     Phone, email, LinkedIn and Instagram links. Edit this file.
│   └── main.js       Menu, enquiry pop-up, contact form, demo, savings calculator
└── README.md
```

## Add your LinkedIn and Instagram links

Open `js/config.js` and replace the two placeholder URLs:

```js
linkedin:  "https://www.linkedin.com/company/your-page",
instagram: "https://www.instagram.com/your-handle",
```

They update everywhere on the site (contact section and footer).

## Point "Try our Aquvera software" at your software

In `js/config.js`, set `softwareUrl` to the address of your live software
(for example your GitHub Pages link). All "Try our Aquvera software" links
(navigation, hero, mobile menu, footer) update from that one line.

## Change phone number or email

Also in `js/config.js`. Enquire buttons open a pop-up with Call and WhatsApp options
for the configured number, plus the "connect with an individual for a personal plan" note.

## Run locally

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Deploy free with GitHub Pages

1. Push these files to a GitHub repository (files at the repo root).
2. Repo **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. The site goes live at `https://<your-username>.github.io/<repo-name>/`.

## Notes

- The contact form opens the visitor's email app addressed to aquveraai@gmail.com.
  For submissions saved without the visitor's email app, connect a form service
  such as Formspree or Netlify Forms later.
- Plan prices are shown as "Custom quote". Edit the `.price` lines in `index.html` to show numbers.
