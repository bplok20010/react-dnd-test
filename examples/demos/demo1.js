// Let's make <Card text='Write the docs' /> draggable!

import React from 'react'
import { DragSource, DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const ItemTypes = {
    CARD: '1'
}

/**
 * Your Component
 */
function Card({ isDragging, dragSource, text }) {
    const opacity = isDragging ? 0.5 : 1
    return dragSource(<div style={{ opacity }}>{text}</div>)
}

/**
 * Implement the drag source contract.
 */
const cardSource = {
    beginDrag: props => {
        console.log('start')
        return { text: props.text + '(start dragg...)' }
    },
    isDragging: props => {
        console.log('dragging')
        return { text: props.text + '(dragging...)' }
    }
}

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
    return {
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

// Export the wrapped component:
const DragItem = DragSource(ItemTypes.CARD, cardSource, collect)(Card);

export default function App() {

    return (
        <DragDropContextProvider backend={HTML5Backend}>
            <DragItem text="hello dnd"></DragItem>
        </DragDropContextProvider>
    );

}