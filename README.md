# Pittsfield Pigskin V3.5

Final tuning: Shane Matt Gay running joke and Nate best-draft/luck gripe each fire on ~50% of advice outcomes. Gameplay and layout unchanged.

# Pittsfield Pigskin Fantasy Draft Advice — V3.4 SHIP

Ship candidate. Keeps the stable V3.3 mobile layout and harder timing mechanic, with the final content pass:

- Rebalanced heckles across the league while still favoring the members with the most material.
- Added Chad 1.01 / Patriots / "only wants to play if he wins" material.
- Added Jonah Maurice Jones-Drew 1.01, McCaffrey, and "built the app" self-owns.
- Preserved and expanded Justin Browns + Busch Light hazing.
- Preserved Ramsey timeline/conspiracy material.
- Expanded Jimbo patriarch / Justin Tucker material.
- Shane now randomly interrupts unrelated advice to brag that his kicker is Gay (Matt Gay).
- Nate now randomly complains that his draft was the best and the rest is luck.
- Kicker lore now includes Jimbo/Justin Tucker and Shane/Matt Gay.

Upload `index.html`, `app.js`, `style.css`, `README.md`, and `assets/` directly to the repository root.

# Fantasy Kick Advice – V3.3

Harder kick mechanic added: the kick now uses a moving timing window on top of the swipe, increasing miss probability without changing the overall flow.

# Free Fantasy Advice — Draft Night Game V2

A static, mobile-friendly fantasy-football field goal mini-game built for GitHub Pages.

## Flow

1. **Start screen** — press **KICK NOW**.
2. **Field goal screen** — swipe upward to aim and kick.
3. **Miss** — you get a dedicated shame screen and must try again.
4. **Make** — Nate and Shane take you to the broadcast booth and **both** give fantasy advice.
5. **Play Again** or return to the main menu.

The presentation is intentionally inspired by late-1990s console football games, without using official game branding or assets.

## Publish on GitHub Pages

If you already have V1 live, simply replace the files in the repo with this package and commit. Otherwise:

1. Create a GitHub repository.
2. Upload **all files and folders in this package to the root of the repo**.
3. Commit them to `main`.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select **main** and **/(root)**, then Save.

No build step, packages, API keys, or backend are required.


## V3.1.1 fixes
- Fixed inactive shame screen overlaying successful kicks.
- Recalibrated kick physics to the 4:3 late-90s game background.
- Added cache-busting query versions for GitHub Pages.


## V3.2 mobile update
- Kick screen is vertically centered in the phone viewport.
- Removed duplicate mobile swipe prompt and oversized sound control over the field.
- Removed mobile double borders / dead page space.
- Uses dynamic viewport height (`100dvh`) for modern mobile browsers.
