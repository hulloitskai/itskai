from typing import List
from pyicloud import PyiCloudService
from pyicloud.services import DriveService
from pyicloud.services.findmyiphone import AppleDevice


class Client:
    service: PyiCloudService

    def __init__(self, *, email: str, password: str, cookie_directory: str):
        self.service = PyiCloudService(
            email, password=password, cookie_directory=cookie_directory
        )

    def verify_security_code(self, code: str) -> bool:
        return self.service.validate_2fa_code(code)

    def requires_security_code(self) -> bool:
        return self.service.requires_2fa

    def drive(self) -> DriveService:
        return self.service.drive

    def devices(self) -> List[AppleDevice]:
        return self.service.devices._devices
