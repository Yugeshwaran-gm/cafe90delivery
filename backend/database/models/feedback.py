import enum
import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, Text, DateTime, Enum, text
from sqlalchemy.orm import Mapped, mapped_column
from database.connection import db

class FeedbackStatus(str, enum.Enum):
    NEW = "NEW"
    READ = "READ"
    RESOLVED = "RESOLVED"

class Feedback(db.Model):
    __tablename__ = "feedbacks"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()")
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    subject: Mapped[str] = mapped_column(String(200), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[FeedbackStatus] = mapped_column(
        Enum(FeedbackStatus, name="feedback_status_enum", native_enum=False),
        nullable=False,
        default=FeedbackStatus.NEW
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "email": self.email,
            "subject": self.subject,
            "message": self.message,
            "status": self.status.value if isinstance(self.status, FeedbackStatus) else self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
