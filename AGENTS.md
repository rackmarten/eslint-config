# Agent Instructions

> **This repository is public.** Everything committed here, including commit
> messages, PR titles and descriptions, is world-readable. Read
> "Public repository, private homelab" at the end of this file before
> committing.

## Project

`eslint-config` is a library, not a deployed service: the maintainer's shared
ESLint 9 flat config (`index.js` for TypeScript, `vue.js` for Vue 3) and
Prettier config (`prettier.js`), published to npm as
`@rackmarten/eslint-config` and used by the maintainer's own projects.

See `README.md` for what it enables and how to use it.

## General rules

- It is opinionated on purpose. Change a rule when it keeps fighting real
  code in a consuming project, not on taste alone, and record the reason in
  a one-line comment next to it.
- Prettier owns formatting; `eslint-config-prettier` stays last in every
  exported config so the two never disagree.
- ESLint, TypeScript and Prettier are peer dependencies; the plugins are
  regular dependencies, so a consumer installs only the peers.
- Tests use `node:test` with `node:assert`, in `test/`. They lint small
  fixtures, so a rule or plugin upgrade that changes behaviour shows up
  there.
- Do not commit secrets, credentials, tokens, or private keys.
- Prefer small, focused changes; run `npm test` before considering a change
  complete, and add the change to the `[Unreleased]` section of
  `CHANGELOG.md`. Turning a rule on, or up from `warn`, is a breaking change.

## Releases

`CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
with semver headings. To release: bump `version` in `package.json`, rename
`[Unreleased]` to `[<version>] - <YYYY-MM-DD>` (add a fresh empty
`[Unreleased]` above it and update the link references at the bottom), merge,
then push the tag `v<version>`. `.github/workflows/publish.yml` refuses a tag
that doesn't match `package.json`, publishes to npm with provenance using the
repository's `NPM_TOKEN` secret, and creates a GitHub release whose notes are
that version's `CHANGELOG.md` section.

## Public repository, private homelab

This repository is published under the MIT license. The maintainer's homelab
uses it, but homelab-specific state does not live here. Keep it that way:

- No private inventory: hostnames, domains, internal service names, task
  numbers or email addresses. Examples and test fixtures use invented values
  (`example.com`, `app`, `demo`). RFC1918 addresses such as `192.168.0.x` are
  fine.
- Comments keep the technical reason, not the private history behind it
  ("a consuming app", not a named service or task).
- No links to private repositories in docs. CI is self-contained
  (`.github/workflows/ci.yml`, GitHub-hosted runner), because a public repo
  cannot call a reusable workflow in a private one.

Before pushing, the leak check in CI (`.github/scripts/leak-check.sh`, run
with `--tree --log`) must pass. Its patterns are private and reach CI as the
org's `LEAK_PATTERNS` secret; a hit prints only an opaque id and a location.
`.leak-allow` lists intentional exceptions (`<path-glob>:<id>`), for
functional configuration only. Rephrase a hit rather than allowlisting it.
The script is a vendored copy: change it upstream, not here.
