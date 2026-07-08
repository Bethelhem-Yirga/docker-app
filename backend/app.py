import os
from flask import Flask, jsonify
from flask_cors import CORS

# ⭐ Detect if in development mode
DEBUG_MODE = os.environ.get('FLASK_DEBUG', '0') == '1'

app = Flask(__name__)
CORS(app)

@app.route('/api/hello')
def hello():
    return jsonify({"message": "Hello from Flaskh hi! 🐍"})

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy"})

# ⭐ This runs only when not using flask run
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=DEBUG_MODE)