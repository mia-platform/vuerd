/**
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 * https://developer.mozilla.org/ko/docs/Web/API/KeyboardEvent/key/Key_Values
 */
type Key =
  | string
  | "Escape"
  | "Enter"
  | "Delete"
  | "Tab"
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowDown"
  | "ArrowLeft"
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "Q"
  | "W"
  | "E"
  | "R"
  | "T"
  | "Y"
  | "U"
  | "I"
  | "O"
  | "P"
  | "A"
  | "S"
  | "D"
  | "F"
  | "G"
  | "H"
  | "J"
  | "K"
  | "L"
  | "Z"
  | "X"
  | "C"
  | "V"
  | "B"
  | "N"
  | "M";

export interface KeymapOption {
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  key?: Key;
}

export interface Keymap {
  addTable: KeymapOption[];
  addColumn: KeymapOption[];
  addMemo: KeymapOption[];
  removeTable: KeymapOption[];
  selectAllTable: KeymapOption[];
  selectAllColumn: KeymapOption[];
  edit: KeymapOption[];
  stop: KeymapOption[];
}

export function createKeymap(): Keymap {
  return {
    addTable: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "N",
      },
    ],
    addColumn: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "Enter",
      },
    ],
    addMemo: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "M",
      },
    ],
    removeTable: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        key: "Delete",
      },
    ],
    selectAllTable: [
      {
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        key: "A",
      },
    ],
    selectAllColumn: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        key: "A",
      },
    ],
    edit: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        key: "Enter",
      },
    ],
    stop: [
      {
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        key: "Escape",
      },
    ],
  };
}

type MultipleKey = "altKey" | "metaKey" | "ctrlKey" | "shiftKey";
const multipleKeys: MultipleKey[] = [
  "altKey",
  "metaKey",
  "ctrlKey",
  "shiftKey",
];
export function keymapMatch(
  event: KeyboardEvent,
  keymapOptions: KeymapOption[]
): boolean {
  let result = false;
  for (const keymapOption of keymapOptions) {
    const isMultipleKey = !multipleKeys.some(
      multipleKey => !(keymapOption[multipleKey] === event[multipleKey])
    );
    if (keymapOption.key) {
      result =
        isMultipleKey &&
        event.key.toUpperCase() === keymapOption.key.toUpperCase();
    } else {
      result = isMultipleKey;
    }
    if (result) {
      break;
    }
  }
  return result;
}

export function keymapOptionToString(keymapOption?: KeymapOption): string {
  if (!keymapOption) return "";
  const result: string[] = [];
  if (keymapOption.metaKey) {
    result.push("Meta");
  }
  if (keymapOption.ctrlKey) {
    result.push("Ctrl");
  }
  if (keymapOption.altKey) {
    result.push("Alt");
  }
  if (keymapOption.shiftKey) {
    result.push("Shift");
  }
  if (keymapOption.key) {
    result.push(keymapOption.key);
  }
  return result.join(" + ");
}