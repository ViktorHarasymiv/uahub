export const setupSession = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 1000, // 15 хвилин у мілісекундах
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 днів у мілісекундах
  });
  res.cookie('sessionId', String(session._id), {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 днів у мілісекундах
  });
};
