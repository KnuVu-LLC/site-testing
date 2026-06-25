// Auto-lists the site folders in this repo so the index never needs editing.
// It asks the GitHub API what folders exist at the repo root, hides the
// helper folders, and draws each remaining folder as a clickable tile.

// Folders that are NOT sites and should be hidden from the list.
const IGNORE = new Set(["assets", ".git", ".github"]);

const listEl = document.getElementById("folders");
const statusEl = document.getElementById("status");

// Work out owner + repo from the current URL so this keeps working even if
// the repo is renamed or forked. e.g. https://knuvu-llc.github.io/site-testing/
const owner = location.hostname.split(".")[0];               // "knuvu-llc"
const repo = location.pathname.split("/").filter(Boolean)[0] // "site-testing"
  || owner + ".github.io";

const api = `https://api.github.com/repos/${owner}/${repo}/contents/`;

fetch(api)
  .then((res) => {
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return res.json();
  })
  .then((items) => {
    const folders = items
      .filter((it) => it.type === "dir" && !IGNORE.has(it.name))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (folders.length === 0) {
      statusEl.textContent = "No sites yet. Drop a folder in the repo and push.";
      return;
    }

    statusEl.remove();
    for (const folder of folders) {
      listEl.appendChild(makeTile(folder.name));
    }
  })
  .catch((err) => {
    statusEl.classList.add("status--error");
    statusEl.textContent =
      "Couldn't load the site list (" + err.message + "). " +
      "Refresh in a minute — GitHub limits how often this can be checked.";
  });

function makeTile(name) {
  const li = document.createElement("li");
  li.className = "folder";

  const a = document.createElement("a");
  a.href = "./" + encodeURIComponent(name) + "/";

  const icon = document.createElement("span");
  icon.className = "folder__icon";
  icon.textContent = "📁";

  const label = document.createElement("span");
  label.className = "folder__name";
  label.textContent = name;

  a.append(icon, label);
  li.append(a);
  return li;
}
