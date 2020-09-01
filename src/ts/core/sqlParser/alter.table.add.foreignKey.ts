import {
  Token,
  Current,
  StatementType,
  isTable,
  isConstraint,
  isForeign,
  isString,
  isPeriod,
  isCurrent,
} from "./SQLParserHelper";
import { parserForeignKey } from "./create.table";

export interface AlterTableAddForeignKey {
  type: StatementType;
  name: string;
  columnNames: string[];
  refTableName: string;
  refColumnNames: string[];
}

export function alterTableAddForeignKey(
  tokens: Token[]
): AlterTableAddForeignKey {
  const current: Current = { value: 0 };

  const ast: AlterTableAddForeignKey = {
    type: "alter.table.add.foreignKey",
    name: "",
    columnNames: [],
    refTableName: "",
    refColumnNames: [],
  };

  while (isCurrent(tokens, current.value)) {
    let token = tokens[current.value];

    if (isTable(token)) {
      token = tokens[++current.value];

      if (isString(token)) {
        ast.name = token.value;

        token = tokens[++current.value];

        if (isPeriod(token)) {
          token = tokens[++current.value];

          if (isString(token)) {
            ast.name = token.value;
            current.value++;
          }
        }
      }

      continue;
    }

    if (isConstraint(token)) {
      token = tokens[++current.value];

      if (isString(token)) {
        current.value++;
      }

      continue;
    }

    if (isForeign(token)) {
      const foreignKey = parserForeignKey(tokens, current);

      if (foreignKey) {
        ast.columnNames = foreignKey.columnNames;
        ast.refTableName = foreignKey.refTableName;
        ast.refColumnNames = foreignKey.refColumnNames;
      }

      continue;
    }

    current.value++;
  }

  return ast;
}