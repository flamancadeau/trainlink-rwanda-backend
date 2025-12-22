export const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5000', 10),
    apiVersion: process.env.API_VERSION || 'v1',

database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'trainlink_rwanda',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'mysecretpassword', 
    dialect: 'postgres' as const,
},

    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
        expiresIn: process.env.JWT_EXPIRE || '24h',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    },

    email: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        user: process.env.SMTP_USER || '',
        password: process.env.SMTP_PASSWORD || '',
        from: process.env.EMAIL_FROM || 'noreply@trainlinkrwanda.com',
    },

    sms: {
        apiKey: process.env.SMS_API_KEY || '',
        senderId: process.env.SMS_SENDER_ID || 'TrainLink',
        apiUrl: process.env.SMS_API_URL || '',
    },

    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
        uploadPath: process.env.UPLOAD_PATH || './uploads',
    },

    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },
};