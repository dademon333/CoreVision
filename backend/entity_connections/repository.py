from sqlalchemy import select

from entity_connections.dto import EntityConnectionDBInsertDTO, \
    EntityConnectionDBUpdateDTO
from infrastructure.db import EntityConnection, BaseRepository


class EntityConnectionRepository(
    BaseRepository[
        EntityConnection,
        EntityConnectionDBInsertDTO,
        EntityConnectionDBUpdateDTO,
    ]
):
    model = EntityConnection

    async def get_by_parent_ids(
            self,
            entity_ids: list[int]
    ) -> list[EntityConnection]:
        result = await self.db.scalars(
            select(EntityConnection)
            .where(EntityConnection.parent_id.in_(entity_ids))
        )
        return result.all()

    async def get_by_entities(
            self,
            parent_id: int,
            child_id: int
    ) -> EntityConnection | None:
        result = await self.db.scalars(
            select(EntityConnection)
            .where(
                (EntityConnection.parent_id == parent_id)
                & (EntityConnection.child_id == child_id)
            )
        )
        return result.first()

    async def get_by_type_connection(
            self,
            type_connection_id: int,
    ) -> list[EntityConnection]:
        result = await self.db.scalars(
            select(EntityConnection)
            .where(EntityConnection.type_connection_id == type_connection_id)
        )
        return result.all()
