from app.main import app

# Export the ASGI app for Vercel serverless functions
handler = app
