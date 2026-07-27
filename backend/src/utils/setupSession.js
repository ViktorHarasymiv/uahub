export const setupSession = (res, session) => {
  const accessCookie = `accessToken=${session.accessToken}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${60 * 60 * 2}`;
  const refreshCookie = `refreshToken=${session.refreshToken}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${60 * 60 * 24 * 7}`;
  const sessionCookie = `sessionId=${session.sessionId || session._id}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${60 * 60 * 24 * 7}`;

  res.setHeader('Set-Cookie', [accessCookie, refreshCookie, sessionCookie]);
};
