# site-testing

A scratch repo for testing simple **HTML / CSS / JS** sites on **GitHub Pages**.
No build step, no frameworks, no custom domain — just push static files and they're live.

**Live URL:** https://knuvu-llc.github.io/site-testing/

## How deployment works

GitHub Pages is set to **Deploy from a branch → `main` → `/ (root)`**, so the repo
is served as-is:

| Path in repo                | Live URL                                                    |
| --------------------------- | ---------------------------------------------------------- |
| `index.html`                | `…/site-testing/`                                          |
| `hello-world/index.html`    | `…/site-testing/hello-world/`                              |
| `landing-demo/index.html`   | `…/site-testing/landing-demo/`                            |
| `<any-folder>/index.html`   | `…/site-testing/<any-folder>/`                            |

A `.nojekyll` file disables GitHub's Jekyll processing so files are served
exactly as written (including folders that start with `_`).

The root [`index.html`](index.html) is a **self-updating folder browser**: it asks
the GitHub API which folders exist in the repo and draws a clickable tile for each
one — so the index list never needs to be edited by hand.

## Adding a new site

1. Create a folder at the repo root, e.g. `my-site/`.
2. Put an `index.html` in it (add `style.css` / `script.js` as needed).
3. Commit and push to `main`.

That's it. The new folder shows up automatically on the index in ~30s, and is
live at `…/site-testing/my-site/`. No editing of the index page required.

> Helper folders (`assets`, `.github`) are hidden from the list via the
> `IGNORE` set in [`assets/folders.js`](assets/folders.js). Add a name there to
> hide any other folder you don't want shown.

### Path tips
- Use **relative links** inside a site (`./style.css`, `../` to go up). Avoid
  leading `/` paths — those resolve to the GitHub user root, not the repo.
- Each folder is fully self-contained; sites don't share assets unless you
  point at the shared `/assets/` folder explicitly.

## Layout

```
.
├── .nojekyll           # disable Jekyll
├── index.html          # self-updating folder browser
├── assets/
│   ├── style.css       # styles for the index page
│   └── folders.js      # fetches + renders the folder list
├── hello-world/        # example site #1
└── landing-demo/       # example site #2
```
