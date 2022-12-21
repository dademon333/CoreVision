import { Entity, EntityConnection, TypeConnections, AllData, Course, Row } from '../types/types';
import { EntityType } from '../const';
import { getChilds, getParents, getItems } from './get-items';
import { wrapFirstColElement, wrapSecondColElements } from './wrap';

type MakeRowsProps = {
  items: Entity[] | Course[];
  connections: EntityConnection[];
  typeConnection: TypeConnections;
  entityType: EntityType;
  data: AllData;
}

export const makeRows = ({ items, connections, typeConnection, entityType, data }: MakeRowsProps) => {
  return items.map((item) => {
    const row = makeEmptyRow();
    const childs = getChilds(connections, item.id);
    const parents = getParents(connections, item.id);
    const items = getItems(
      [], 
      typeConnection.parent_type === entityType ? childs : parents,
      data);
    row.name = wrapFirstColElement(item.name);
    row.body = wrapSecondColElements(items);
    return row;
  });
};


const makeEmptyRow = (): Row => ({
  id: 0,
  name: <></>,
  body: <></>
});