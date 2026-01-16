from app.main import app

# Export ASGI app for Vercel serverless functions
handler = app
