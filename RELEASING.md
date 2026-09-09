# Releasing

Releases of `mithril-markdown-wysiwyg` (the `packages/lib` package) are handled by
[semantic-release](https://semantic-release.gitbook.io/semantic-release/), driven by the
`.github/workflows/release.yml` GitHub Actions workflow.

## How a release happens

- Every push to `main` runs the `release` job's build and test steps, but the `Semantic
  Release` step itself only runs when the workflow is triggered manually via
  `workflow_dispatch` (either from the GitHub UI/Actions tab, or with
  `gh workflow run Release --ref main`). This keeps ordinary merges from silently publishing,
  while still letting a maintainer trigger a release on demand once `main` looks ready.
- `semantic-release` inspects the commits since the last release (using
  [Conventional Commits](https://www.conventionalcommits.org/), e.g. `fix:`/`feat:`/
  `BREAKING CHANGE:`) to determine the next version, updates `CHANGELOG.md`, publishes the
  package to npm, and creates a GitHub release.

## npm authentication: trusted publishing (OIDC)

Publishing to npm uses **npm trusted publishing** via OpenID Connect (OIDC) — there is no
`NPM_TOKEN` secret involved and none is required. The workflow grants the job the
`id-token: write` permission, which lets GitHub Actions mint a short-lived OIDC token that
`@semantic-release/npm` (v13+) exchanges with the npm registry for a scoped publish token at
release time. This avoids managing/rotating long-lived npm access tokens entirely.

For this to work, npm must have a **trusted publisher** configured for the package that
matches this workflow. This is a one-time, npm-side configuration step (not part of the
repo) that a maintainer with publish access to the `mithril-markdown-wysiwyg` npm package
must perform:

1. Sign in to [npmjs.com](https://www.npmjs.com) and open the package's settings:
   `https://www.npmjs.com/package/mithril-markdown-wysiwyg/access`.
2. Under **Trusted Publisher**, choose **GitHub Actions** and fill in:
   - **Organization or user**: `erikvullings`
   - **Repository**: `mithril-markdown-wysiwyg`
   - **Workflow filename**: `release.yml` (the workflow that *triggers* the release run —
     i.e. `.github/workflows/release.yml` itself, since this repo does not use a reusable
     workflow; if it ever does, this must reference the calling workflow, not the callee)
   - **Environment name**: leave blank (the `release` job does not use a GitHub Actions
     `environment:`; only the separate `deploy-docs` job does, for GitHub Pages)
3. Save the trusted publisher configuration.
4. (Recommended, once trusted publishing is verified working) Under **Publishing access**,
   select **Require two-factor authentication and disallow tokens** to fully retire
   token-based publishing for this package.

No `NPM_TOKEN` secret needs to be created or rotated going forward. If the npm-side trusted
publisher is ever removed or misconfigured (wrong repo/workflow filename), the release run
will fail during `@semantic-release/npm`'s `verifyConditions` step with an authentication
error, and the fix is to re-check the trusted publisher settings above rather than to add
back a token.

## Triggering a release manually

```bash
gh workflow run Release --ref main
```

Then watch it with:

```bash
gh run watch --exit-status $(gh run list --workflow=Release --limit 1 --json databaseId --jq '.[0].databaseId')
```
