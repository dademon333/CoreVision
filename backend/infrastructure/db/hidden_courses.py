from sqlalchemy import Integer, Column, ForeignKey

from infrastructure.db import Base


class HiddenCourse(Base):
    __tablename__ = 'hidden_courses'

    id = Column(Integer, primary_key=True)
    course_id = Column(
        Integer,
        ForeignKey('entities.id', onupdate='CASCADE', ondelete='CASCADE'),
        nullable=False,
        unique=True
    )