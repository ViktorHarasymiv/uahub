export const setupSession = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 1000, // 15 хв
  });

  const refreshMs = session.refreshTokenValidUntil.getTime() - Date.now();

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: refreshMs,
  });

  res.cookie('sessionId', String(session._id), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: refreshMs,
  });
};
