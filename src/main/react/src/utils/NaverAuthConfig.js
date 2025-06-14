export const NAVER_CLIENT_ID = "z8sdRI0bkcryQDZpm5JW";
export const NAVER_REDIRECT_URI =
  // "http://linkedup.store:8111/login/oauth2/code/naver";
  "http://localhost:3000/login/oauth2/code/naver";
export const NAVER_AUTH_URL = (state) =>
  `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    NAVER_REDIRECT_URI
  )}&state=${state}`;
export const CLIENT_SECRET = "c2LPLypaq7";
