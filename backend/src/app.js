import express from 'express';
import cors from 'cors';
import astrologyRoutes from './routes/astrology.routes.js';
import adminRoutes from './routes/admin.routes.js';
import authRoutes from './routes/auth.routes.js';

import { getSitemapXml, getRobotsTxt } from './controllers/astrology.controller.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

// Search Engine Discovery Endpoints
app.get('/sitemap.xml', getSitemapXml);
app.get('/robots.txt', getRobotsTxt);

app.use('/api/v1/astrology', astrologyRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'active', timestamp: new Date().toISOString() });
});

export default app;
