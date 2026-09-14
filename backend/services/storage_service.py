import os
import logging
from typing import Optional, Tuple

logger = logging.getLogger(__name__)

DEFAULT_FOOD_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"

class StorageService:
    @staticmethod
    def is_cloudinary_configured() -> bool:
        cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
        api_key = os.getenv("CLOUDINARY_API_KEY")
        api_secret = os.getenv("CLOUDINARY_API_SECRET")
        return bool(cloud_name and api_key and api_secret)

    @staticmethod
    def init_cloudinary():
        if StorageService.is_cloudinary_configured():
            import cloudinary
            cloudinary.config(
                cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
                api_key=os.getenv("CLOUDINARY_API_KEY"),
                api_secret=os.getenv("CLOUDINARY_API_SECRET"),
                secure=True
            )

    @staticmethod
    def upload_image(file_or_base64, folder: str = "cafe90/menu") -> Tuple[Optional[str], Optional[str]]:
        """
        Uploads an image (file object or base64 string) to Cloudinary CDN.
        Returns tuple: (image_url, error_message).
        """
        if not file_or_base64:
            return DEFAULT_FOOD_IMAGE, None

        if StorageService.is_cloudinary_configured():
            try:
                import cloudinary.uploader
                StorageService.init_cloudinary()
                
                result = cloudinary.uploader.upload(
                    file_or_base64,
                    folder=folder,
                    transformation=[
                        {"width": 800, "height": 600, "crop": "limit"},
                        {"quality": "auto"},
                        {"fetch_format": "auto"}
                    ]
                )
                return result.get("secure_url"), None
            except Exception as e:
                logger.error(f"Cloudinary upload failed: {e}")
                return None, f"Cloudinary upload failed: {str(e)}"
        
        # Fallback if Cloudinary credentials are not set
        # If input is a URL already, return it
        if isinstance(file_or_base64, str) and (file_or_base64.startswith("http://") or file_or_base64.startswith("https://")):
            return file_or_base64, None
            
        logger.warning("Cloudinary credentials not configured; returning fallback CDN image URL.")
        return DEFAULT_FOOD_IMAGE, None
