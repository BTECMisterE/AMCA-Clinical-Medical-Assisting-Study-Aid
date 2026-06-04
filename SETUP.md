# AMCA CMAC Study — Setup & Deploy

A static Progressive Web App backed by Firebase (Google sign-in + Cloud Firestore).
Students sign in with Google and study; the instructor (admin) edits the question
bank and views every student's progress. Hosted free on GitHub Pages.

You'll fill in **3 things** in the code, then deploy. Two values to set:
`FIREBASE_CONFIG` and `ADMIN_EMAILS` in `index.html`, plus the same admin email
in `firestore.rules`.

---

## 1. Create the Firebase project
1. Go to https://console.firebase.google.com → **Add project** (e.g. `amca-study`). Disable Analytics if you like.
2. **Build → Authentication → Get started → Sign-in method →** enable **Google**. Set a support email.
3. **Build → Firestore Database → Create database → Production mode →** pick a location.
4. **Project settings (gear) → General → Your apps → Web (`</>`)** → register an app → copy the `firebaseConfig` object.

## 2. Paste your config into the app
In **`index.html`**, replace the placeholder `FIREBASE_CONFIG` with the object you copied, and set your admin email(s):
```js
const ADMIN_EMAILS = ["yourname@gmail.com"]; // lowercase, the Google account you'll sign in with
```

## 3. Set the security rules
1. In `firestore.rules`, replace `__set_your_admin_email__` with the same admin email (lowercase).
2. Firebase console → **Firestore → Rules** → paste the contents of `firestore.rules` → **Publish**.

## 4. Deploy to GitHub Pages
1. Create a new **public** GitHub repo and push these files to `main`.
2. Repo **Settings → Pages → Source: Deploy from a branch → main / (root) → Save.**
3. Wait ~1 minute for the live URL: `https://<you>.github.io/<repo>/`.

## 5. Authorize the live domain in Firebase
Firebase console → **Authentication → Settings → Authorized domains → Add domain** →
add your `*.github.io` domain (e.g. `youruser.github.io`). Without this, Google sign-in fails on the live site.

## 6. Seed the question bank
1. Open the live site and **sign in with your admin Google account**.
2. Tap **Admin** (bottom nav) → **🌱 Seed starter question bank** → confirm.
   This loads the ~65 starter questions into Firestore.
3. Use **➕ Add a question** anytime to add/edit/delete — changes go live for students immediately.

---

## How it works
- **Students:** sign in with Google → study by topic, flashcards, or take the weighted full practice exam. Progress saves to their account.
- **Instructor (admin):** the **Admin** tab appears only for emails in `ADMIN_EMAILS`.
  - **Questions:** add/edit/delete questions (each has a rationale shown after answering).
  - **Students:** see every student's accuracy, per-topic mastery, and exam history.
- **Exam weighting** follows the AMCA CMAC blueprint (Clinical 60%, Administrative 26%, Professionalism 10%, Law & Ethics 4%, with the subcategory weights you specified).
- **Question database is live** in Firestore — edit anytime, no redeploy needed.

> Disclaimer: independent study aid aligned to the AMCA CMAC content domains; not affiliated with AMCA. Confirm details against official AMCA materials.
