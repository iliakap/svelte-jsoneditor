import { createMultiSelection, getEndPath, getStartPath } from './selection.js'
import { initial, isEqual } from 'lodash-es'
import type { JSONValue, JSONPatchDocument } from 'immutable-json-patch'
import { getIn } from 'immutable-json-patch'
import { moveInsideParent } from './operations.js'
import type {
  DocumentState,
  DragInsideAction,
  DragInsideProps,
  JSONSelection,
  MultiSelection,
  RenderedItem
} from '../types'

export interface MoveSelectionProps {
  json: JSONValue
  documentState: DocumentState
  deltaY: number
  items: RenderedItem[]
}

export interface MoveSelectionResult {
  operations: JSONPatchDocument | undefined
  updatedSelection: JSONSelection | undefined
  offset: number
}

export function onMoveSelection({
  json,
  documentState,
  deltaY,
  items
}: MoveSelectionProps): MoveSelectionResult {
  const selection = documentState.selection
  const dragInsideAction =
    deltaY < 0
      ? findSwapPathUp({ json, selection, deltaY, items })
      : findSwapPathDown({ json, selection, deltaY, items })

  if (!dragInsideAction || dragInsideAction.offset === 0) {
    return {
      operations: undefined,
      updatedSelection: undefined,
      offset: 0
    }
  }

  const operations = moveInsideParent(json, documentState.selection, dragInsideAction)

  const path = initial(getStartPath(selection))
  const value = getIn(json, path)
  if (Array.isArray(value)) {
    const updatedSelection = createUpdatedArraySelection({
      items,
      json,
      selection,
      offset: dragInsideAction.offset
    })

    return {
      operations,
      updatedSelection,
      offset: dragInsideAction.offset
    }
  } else {
    // object
    return {
      operations,
      updatedSelection: undefined,
      offset: dragInsideAction.offset
    }
  }
}

function findSwapPathUp({
  items,
  selection,
  deltaY
}: DragInsideProps): DragInsideAction | undefined {
  const initialPath = getStartPath(selection)
  const initialIndex = items.findIndex((item) => isEqual(item.path, initialPath))

  const prevHeight = () => items[index - 1]?.height

  let index = initialIndex
  let cumulativeHeight = 0

  while (prevHeight() !== undefined && Math.abs(deltaY) > cumulativeHeight + prevHeight() / 2) {
    cumulativeHeight += prevHeight()
    index -= 1
  }

  const beforePath = items[index].path
  const offset = index - initialIndex

  return index !== initialIndex && items[index] !== undefined ? { beforePath, offset } : undefined
}

function findSwapPathDown({
  json,
  items,
  selection,
  deltaY
}: DragInsideProps): DragInsideAction | undefined {
  const initialPath = getEndPath(selection)
  const initialIndex = items.findIndex((item) => isEqual(item.path, initialPath))

  let cumulativeHeight = 0
  let index = initialIndex

  const nextHeight = () => items[index + 1]?.height

  while (nextHeight() !== undefined && Math.abs(deltaY) > cumulativeHeight + nextHeight() / 2) {
    cumulativeHeight += nextHeight()
    index += 1
  }

  const parentPath = initial(initialPath)
  const parent = getIn(json, parentPath)
  const isArray = Array.isArray(parent)
  const beforeIndex = isArray ? index : index + 1
  const beforePath = items[beforeIndex]?.path
  const offset = index - initialIndex

  return beforePath ? { beforePath, offset } : { append: true, offset }
}

interface UpdatedArraySelectionProps {
  items: RenderedItem[]
  json: JSONValue
  selection: JSONSelection
  offset: number
}

function createUpdatedArraySelection({
  items,
  json,
  selection,
  offset
}: UpdatedArraySelectionProps): MultiSelection {
  const startPath = getStartPath(selection)
  const endPath = getEndPath(selection)

  const startIndex = items.findIndex((item) => isEqual(item.path, startPath))
  const endIndex = items.findIndex((item) => isEqual(item.path, endPath))

  const anchorPath = items[startIndex + offset]?.path
  const focusPath = items[endIndex + offset]?.path

  return createMultiSelection(json, anchorPath, focusPath)
}
