import jwt from 'jsonwebtoken';
import { SessionsCollection } from '../db/models/session.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

      console.log(decoded);

      const session = await SessionsCollection.findById(decoded.sessionId);

      if (!session || !session._id) {
        throw new Error('Session not found or invalid');
      }

      req.user = { id: decoded.id, sessionId: decoded.sessionId };
      return next();
    } catch (err) {
      // accessToken протух → пробуємо refresh
    }

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ error: 'Unauthorized' });

    const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);

    console.log('dec', decodedRefresh);

    const session = await SessionsCollection.findById(decodedRefresh.sessionId);
    if (!session || !session.isValid) {
      return res.status(401).json({ error: 'Session expired' });
    }

    // Генеруємо новий accessToken
    const newAccessToken = jwt.sign(
      { id: session.userId, sessionId: session._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' },
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 15,
    });

    req.user = { id: session.userId, sessionId: session._id };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
