from typing import List
from pyicloud import PyiCloudService
from pyicloud.services.findmyiphone import AppleDevice


class Client(PyiCloudService):
    def __init__(self, email: str, password: str, credentials_dir: str):
        super().__init__(email, password=password, cookie_directory=credentials_dir)

    def verify_security_code(self, code: str) -> bool:
        return self.validate_2fa_code(code)

    def requires_security_code(self) -> bool:
        return self.requires_2fa

    def devices(self) -> List[AppleDevice]:
        return super().devices._devices
