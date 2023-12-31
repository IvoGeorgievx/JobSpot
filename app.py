from decouple import config
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api

from backend.resources.routes import routes
from db import db


app = Flask(
    __name__, template_folder="frontend/templates", static_folder="frontend/static"
)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"postgresql://{config('DB_USER')}:{config('DB_PASSWORD')}"
    f"@localhost:{config('DB_PORT')}/{config('DB_NAME')}"
)

api = Api(app)
migrate = Migrate(app, db)
CORS(app)

with app.app_context():
    db.init_app(app)

[api.add_resource(*route) for route in routes]

if __name__ == "__main__":
    app.run()
