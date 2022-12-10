from sqlalchemy import select
from sqlalchemy.orm import joinedload

from entity_type_connections.dto import EntityTypeConnectionDBInsertDTO, \
    EntityTypeConnectionDBUpdateDTO
from entity_type_connections.exceptions import \
    TypeConnectionAlreadyExistsError
from infrastructure.db import BaseRepository, EntityTypeConnection, EntityType, \
    EntityConnection


class EntityTypeConnectionRepository(
    BaseRepository[
        EntityTypeConnection,
        EntityTypeConnectionDBInsertDTO,
        EntityTypeConnectionDBUpdateDTO,
    ]
):
    model = EntityTypeConnection

    # noinspection PyShadowingBuiltins
    async def get_by_id_with_connections(
            self, id: int
    ) -> EntityTypeConnection | None:
        result = await self.db.scalars(
            select(EntityTypeConnection, EntityConnection)
            .where(EntityTypeConnection.id == id)
            .options(joinedload(EntityTypeConnection.entity_connections))
        )
        return result.first()

    async def get_by_types(
            self,
            parent_type: EntityType,
            child_type: EntityType
    ) -> EntityTypeConnection | None:
        result = await self.db.scalars(
            select(EntityTypeConnection)
            .where(
                (EntityTypeConnection.parent_type == parent_type)
                & (EntityTypeConnection.child_type == child_type)
            )
        )
        return result.first()

    async def insert(
            self,
            insert_dto: EntityTypeConnectionDBInsertDTO
    ) -> EntityTypeConnection:
        is_exists = await self.get_by_types(
            parent_type=insert_dto.parent_type,
            child_type=insert_dto.child_type,
        )
        is_exists_reverse = await self.get_by_types(
            parent_type=insert_dto.child_type,
            child_type=insert_dto.parent_type,
        )

        if is_exists or is_exists_reverse:
            raise TypeConnectionAlreadyExistsError()

        return await super().insert(insert_dto)