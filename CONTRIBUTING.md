# Contributing

Thanks for taking the time to help. Bug reports and feature ideas go in
[GitHub issues](https://github.com/rackmarten/eslint-config/issues); pull
requests are welcome too. Keep them small and focused, and for anything
larger than a small fix, open an issue first so we can agree on the
approach. This config follows what the maintainer's own projects need, so a rule
change that doesn't fit them may be declined even if it's a good idea.

## Running the checks

```bash
npm ci
npm test
```

CI runs the same, plus a gitleaks secret scan, on every push and pull request
(`.github/workflows/ci.yml`). Tests live in `test/` and use `node:test` and
`node:assert`; they lint the small fixtures in `test/fixtures/`.

Add tests, and update `README.md` and the `[Unreleased]` section of
`CHANGELOG.md`, along with any rule change. Don't bump the package version in
a PR; that happens when a release is cut.

## Commits

Keep commits focused, and start the subject with one of these prefixes:

| Prefix | Use for |
| --- | --- |
| `Add:` | new functionality |
| `Edit:` | changes to existing functionality |
| `Fix:` | bug fixes |
| `Update:` | dependency or configuration updates |
| `Remove:` | removing functionality |
| `Docs:` | documentation-only changes |
| `DevOps:` | CI, packaging and other operational changes |

By contributing, you agree that your contributions are licensed under the
[MIT License](LICENSE).
