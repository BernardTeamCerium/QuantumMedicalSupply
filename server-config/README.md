# Server config (OPTIONAL)

The site is static HTML with `.html` URLs. Old links used extensionless URLs
(`/providers`, `/contact`, `/shoe-fitter-jobs`). Two ways to keep those working:

1. **Redirect folders (already in the repo, works on any host).**
   Folders like `providers/index.html` redirect `/providers` -> `/providers.html`.
   Nothing to configure — just deploy the whole site.

2. **Server rewrite (cleaner, same-URL, no redirect hop).** Use ONE of these at
   the web root, then you can delete the redirect folders:
   - IIS: `web.config` (requires the URL Rewrite module — do not use it without it)
   - Apache: `.htaccess` (requires mod_rewrite)

Pick one approach, not both.
