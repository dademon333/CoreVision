from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from db import HiddenCourse
from schemas.hidden_courses import HiddenCourseCreate, HiddenCourseUpdate
from .base import CRUDBase


class CRUDHiddenCourses(CRUDBase[HiddenCourse, HiddenCourseCreate, HiddenCourseUpdate]):
    @staticmethod
    async def get_by_course_id(
            db: AsyncSession,
            course_id: int
    ) -> HiddenCourse | None:
        result = await db.scalars(
            select(HiddenCourse)
            .where(HiddenCourse.course_id == course_id)
        )
        return result.first()

    async def get_all(
            self,
            db: AsyncSession
    ) -> list[int]:
        result = await db.scalars(
            select(self.model)
            .order_by(self.model.id)
        )
        result = result.unique().all()
        return [x.course_id for x in result]

    @staticmethod
    async def delete_by_course_id(db: AsyncSession, course_id: int) -> None:
        await db.execute(
            delete(HiddenCourse)
            .where(HiddenCourse.course_id == course_id)
        )


hidden_courses = CRUDHiddenCourses(HiddenCourse)
