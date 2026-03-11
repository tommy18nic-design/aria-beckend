# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

ARIA is an Italian-language AI chat assistant with voice support. It consists of a single Node.js/Express server (`server.js`) that serves a vanilla HTML frontend (`public/index.html`) and proxies requests to external AI APIs (Anthropic Claude, Google Gemini, Perplexity).

### Running the application

- Start: `npm start` or `node server.js` (port 3000 by default, configurable via `PORT` env var)
- No build step needed; the frontend is plain HTML/CSS/JS served as static files.
- No database or Docker required.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `CLAUDE_API_KEY` | Yes (for core chat) | Anthropic API key used by the `/api/claude` endpoint |
| `GEMINI_API_KEY` | No | Google Gemini API key for `/api/gemini` |
| `PERPLEXITY_API_KEY` | No | Perplexity API key for `/api/perplexity` |

### Important caveats

- **Frontend API URL is hardcoded**: `public/index.html` line 42 sets `var API="https://cooperative-dedication-production.up.railway.app"`. For local end-to-end testing through the browser, this must be changed to `""` (empty string for same-origin) or `"http://localhost:3000"`. The backend API itself works correctly at `localhost:3000` when tested directly via `curl`.
- **No linter or test framework** is configured in this project. There are no `lint`, `test`, or `build` scripts in `package.json`.
- **Network restrictions in Cloud VM**: The npm registry (`registry.npmjs.org`) may be blocked. If `npm install` fails with `ECONNRESET`, dependencies must be installed via `git clone` from GitHub repositories. See the install script approach used during initial setup.
