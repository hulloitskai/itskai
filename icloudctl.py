from flask import Flask, request
import fastwsgi  # type: ignore
from os import environ

from pyicloud import PyiCloudService  # type: ignore
from pyicloud.exceptions import (  # type: ignore
    PyiCloudFailedLoginException,
    PyiCloudAPIResponseException,
)


app = Flask(__name__)
service: PyiCloudService | None = None


@app.route("/", methods=["GET"])
def index():
    status = "disconnected"
    if service:
        try:
            status = _status(service)
        except Exception as error:
            status = f"error: {error}"
    return {"data": {"status": status}}


def _status(service: PyiCloudService) -> str:
    if service.requires_2fa:
        return "requires_2fa"
    return "connected"


@app.route("/login", methods=["POST"])
def login():
    payload: dict[str, str] = request.get_json()
    email = payload.get("email")
    if not email:
        return {"error": "Missing email"}, 400
    password = payload.get("password")
    if not password:
        return {"error": "Missing password"}, 400
    credentials_dir = payload.get("credentials_dir")
    try:
        global service
        service = PyiCloudService(email, password, cookie_directory=credentials_dir)
        data = {"success": True, "requires_2fa": service.requires_2fa}
        return {"data": data}
    except PyiCloudFailedLoginException as error:
        message, cause = error.args
        if (
            isinstance(cause, PyiCloudAPIResponseException)
            and cause.reason == "Missing apple_id field"
        ):
            return {"error": "Bad login"}, 400
        return {"error": str(message)}, 500
    except Exception as error:
        return {"error": str(error)}, 500


@app.route("/logout", methods=["POST"])
def logout():
    global service
    service = None
    return {"success": True}


@app.route("/verify_security_code", methods=["POST"])
def verify_security_code():
    payload: dict[str, str] = request.get_json()
    code = payload.get("code")
    if not code:
        return {"error": "Missing code"}, 400
    if not service:
        return {"error": "Service not connected"}, 400
    try:
        service.validate_2fa_code(code)
        service.trust_session()
        data = {"success": True}
        return {"data": data}
    except Exception as error:
        return {"error": str(error)}, 500


@app.route("/device", methods=["GET"])
def device():
    id = request.args.get("id")
    if not id:
        return {"error": "Missing `id' param"}, 400
    if not service:
        return {"error": "Service not connected"}, 400
    try:
        device = service.devices.get(id)
        data = {"device": dict(device)}
        return {"data": data}
    except Exception as error:
        return {"error": str(error)}, 500


def main():
    debug = environ.get("DEBUG") or ""
    if debug.lower() in ("1", "y", "yes", "t", "true"):
        app.run(host="localhost", port=3001, debug=True)
    else:
        fastwsgi.run(wsgi_app=app, host="localhost", port=3001)
