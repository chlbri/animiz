/** @jsxImportSource solid-js */

import {
  createDraggable,
  createDroppable,
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
  useDragDropContext,
} from '@thisbeyond/solid-dnd';

const Draggable = (props: any) => {
  const draggable = createDraggable(props.id, { type: props.type });
  return (
    <div use:draggable class='px-5 py-3 text-white bg-indigo-600'>
      {`Draggable type '${props.type}'`}
    </div>
  );
};

const Droppable = (props: any) => {
  const droppable = createDroppable(props.id, { type: props.type });

  const [state] = useDragDropContext()!;

  const activeClass = () => {
    if (droppable.isActiveDroppable) {
      if (state.active.draggable?.data.type === props.type) {
        return 'bg-red-100 border-red-500';
      } else {
        return 'bg-blue-100 border-blue-500';
      }
    }
    return 'bg-slate-100 border-slate-500';
  };

  return (
    <div
      use:droppable
      class={`w-60 aspect-square border-2 ${activeClass()}`}
    >
      Droppable
      <br />
      {`accepts type '${props.type}'`}
    </div>
  );
};

const ConditionalDropExample = () => {
  let ref: HTMLDivElement;

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (droppable) {
      if (draggable.data.type === droppable.data.type) {
        droppable.node.append(draggable.node);
      }
    } else {
      ref.append(draggable.node);
    }
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />
      <div ref={ref!} class='min-h-15 flex flex-wrap gap-5 justify-center'>
        <Draggable id={1} type='a' />
        <Draggable id={2} type='b' />
      </div>
      <Droppable id={1} type='a' />
      <Droppable id={2} type='b' />
    </DragDropProvider>
  );
};

export default ConditionalDropExample;
