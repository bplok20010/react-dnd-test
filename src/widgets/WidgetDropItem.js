import React from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from './Types';
import LayoutContext from '../LayoutContext'
import { uuid } from '../utils';

const spec = {
    canDrop(props, monitor) {
        //  console.log(props)
        return true;
    },
    drop(props, monitor, component) {
        const cid = props.data.id;
        const layout = this.context;
        //console.log(monitor.getItem())
        layout.addLayoutChildren(cid, {
            //uuid: 
        })
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }
}

export default class WidgetDropItem extends React.Component {

    static contextType = LayoutContext;

    render() {
        const { connectDropTarget, isOver, canDrop, data } = this.props;
        const layout = this.context;
        const items = layout.getLayoutChildren(data.id);

        return (
            <div dropId={data.id} className={cx({
                "widget-drop-item": true,
                // "drag-over": isOver,
                // "drop-tips": canDrop,
            })}>

            </div>
        );
    }
}