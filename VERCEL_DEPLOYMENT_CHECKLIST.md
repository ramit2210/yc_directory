# Vercel Deployment Fix Checklist

## 1. Fix Database URL (CRITICAL)

Your password contains `@` which needs to be URL-encoded as `%40`. The correct URL is:

```
postgresql://postgres:Clashofclan1%40@db.uwarpzbcaxljfjtvyzry.supabase.co:5432/postgres
```

Note: Password `Clashofclan1@` becomes `Clashofclan1%40` (the @ in password must be encoded)

## 2. Set Environment Variables in Vercel

Go to: https://vercel.com/ramitpandey2002-1612s-projects/yc-directory/settings/environment-variables

Add these variables for **Production, Preview, and Development**:

```
AUTH_SECRET=tr+XmbX792pzNerqpcCQsZQwEvm7tJtOvJZ8PCujEGc=
AUTH_GITHUB_ID=Ov23lineBMqtwaUqNvqi
AUTH_GITHUB_SECRET=06e722d6b9049756e2bc7d535663019d1b0678c5
DATABASE_URL=postgresql://postgres:Clashofclan1%40@db.uwarpzbcaxljfjtvyzry.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://uwarpzbcaxljfjtvyzry.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3YXJwemJjYXhsamZqdHZ5enJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTMyODQsImV4cCI6MjA3ODg2OTI4NH0.TluQQ3OuLT7sqqvwbCGPXtAwkebP0jfaUd5jDtu6I2U
AUTH_TRUST_HOST=true
```

**IMPORTANT**: Make sure `AUTH_TRUST_HOST=true` is added!

## 3. Fix GitHub OAuth Redirect URI

Go to: https://github.com/settings/developers

1. Click on "OAuth Apps"
2. Find your app (Client ID: Ov23lineBMqtwaUqNvqi)
3. Update "Authorization callback URL" to include ALL of these (one per line):

    ```
    http://localhost:3000/api/auth/callback/github
    https://yc-directory-jmwh95gbi-ramitpandey2002-1612s-projects.vercel.app/api/auth/callback/github
    https://yc-directory.vercel.app/api/auth/callback/github
    ```

    **Note**: Vercel creates new preview URLs for each deployment. You may need to add the latest one each time, or use a production domain.

## 4. Redeploy

After setting environment variables in Vercel:

1. Go to your Vercel dashboard
2. Click "Deployments"
3. Click the three dots on the latest deployment
4. Click "Redeploy"

OR just push a new commit to trigger a deployment.

## Quick Links

-   Vercel Dashboard: https://vercel.com/ramitpandey2002-1612s-projects/yc-directory
-   GitHub OAuth Apps: https://github.com/settings/developers
-   Your Deployed Site: https://yc-directory-qbgw40chh-ramitpandey2002-1612s-projects.vercel.app

## 5. Check Vercel Logs (If Still Having Issues)

If you're still getting 500 errors:

1. Go to: https://vercel.com/ramitpandey2002-1612s-projects/yc-directory
2. Click on your latest deployment
3. Click "Functions" tab
4. Click on any failed function to see error logs
5. Look for database connection errors

Common issues:

-   DATABASE_URL not set correctly in Vercel
-   DATABASE_URL still has unencoded `@` in password
-   Supabase database not accessible from Vercel's IP addresses

## Verification Steps

After completing the above:

1. Visit your deployed site
2. Check if the homepage loads (should show startups)
3. Try signing in with GitHub
4. Create a test startup post

---

**Note**: The main issue is that your password contains `@` which must be URL-encoded as `%40` in the DATABASE_URL. This is causing the 500 error on the API route.
