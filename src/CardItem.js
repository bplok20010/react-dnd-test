import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import {
    DragSource,
    DropTarget,
} from 'react-dnd'

const Types = {
    CARD: 'CARD'
};
const CardSource = {
    canDrag(props, monitor) {
        // console.log(props, monitor)
        return 1;
    },
    beginDrag(props, monitor, component) {
        console.log(props, monitor.getItem(), 'abc')
        return {
            name: 'nobo',
            index: props.index
        }
    }
};
const CardTarget = {
    canDrop(props, monitor) { //组件可以被放置时触发的事件

    },
    hover(props, monitor, component) { //组件在target上方时触发的事件
        if (!component) return null;
        //console.log(monitor.getItem())
        const dragIndex = monitor.getItem().index;//拖拽目标的Index
        const hoverIndex = props.index; //目标Index
        if (dragIndex === props.lastIndex || hoverIndex === props.lastIndex) return null;
        if (dragIndex === hoverIndex) { return null }//如果拖拽目标和目标ID相同不发生变化
        const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();//获取卡片的边框矩形
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;//获取X轴中点
        const clientOffset = monitor.getClientOffset();//获取拖拽目标偏移量
        const hoverClientX = (clientOffset).x - hoverBoundingRect.left;
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            return null
        }
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            return null
        }
        props.onDND(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};
function collect1(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }
}
function collect(connect, monitor) {
    //console.log(connect.dragSource(), 123)
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        nobo: 1
    }
}

function Card({ title, children, style }) {

    return (
        <div style={{
            border: '1px solid #ccc',
            marginRight: 20,
            ...style
        }}>
            <div style={{
                padding: 15,
                borderBottom: '1px solid #ccc'
            }}>{title}</div>
            <div style={{
                padding: 15
            }}>{children}</div>
        </div>
    );
}

class CardItem extends Component {

    render() {
        const { isDragging, connectDragSource, connectDropTarget, nobo } = this.props;
        let opacity = isDragging ? 0.5 : 1;
        // console.log(connectDragSource, nobo, 222)
        return connectDragSource(
            connectDropTarget(<div>
                <Card
                    title={this.props.title}
                    style={{ width: 300, opacity }}
                >
                    <p>{this.props.content}</p>
                </Card>
            </div>)
        )
    }
}
let flow = require('lodash.flow');
export default flow(
    DragSource(Types.CARD, CardSource, collect),
    DropTarget(Types.CARD, CardTarget, collect1)
)(CardItem)