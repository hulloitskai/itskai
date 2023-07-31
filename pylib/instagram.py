from typing import Optional
from os.path import isfile, join
from instagrapi import Client as InstagramClient


class Client(InstagramClient):
    def __init__(
        self,
        username: str,
        password: str,
        credentials_dir: str,
        security_code: Optional[str],
    ):
        super().__init__()
        self.delay_range = [1, 3]
        session_file = join(credentials_dir, "session.json")
        if isfile(session_file):
            self.load_settings(session_file)
            self.login(username, password)
        else:
            self.login(username, password, verification_code=security_code)
        self.dump_settings(session_file)
