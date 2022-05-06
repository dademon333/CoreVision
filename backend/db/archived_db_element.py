from sqlalchemy import Integer, Column, ForeignKey, JSON

from .base import Base


class ArchivedDbElement(Base):
    __tablename__ = 'archived_db_elements'

    id = Column(Integer, primary_key=True)
    element_data = Column(JSON, nullable=False)
    change_id = Column(
        Integer,
        ForeignKey('change_log.id', onupdate='CASCADE', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
