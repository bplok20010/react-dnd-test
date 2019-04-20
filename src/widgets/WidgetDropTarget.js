import React from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from './Types';
import LayoutContext from '../LayoutContext';
import { uuid } from '../utils';
import WidgetDropItem from './WidgetDropItem';

const spec = {
    canDrop(props, monitor) {
        //  console.log(props)
        return true;
    },
    drop(props, monitor, component) {
        const cid = props.data.id;
        const layout = component.context;
        //console.log(monitor.getItem())
        layout.addLayoutChildren(cid, {
            uuid: uuid(),
            widget: monitor.getItem(),
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

class WidgetDropTarget extends React.Component {

    static contextType = LayoutContext;

    render() {
        const { connectDropTarget, isOver, canDrop, data } = this.props;
        const layout = this.context;
        const items = layout.getLayoutChildren(data.id);

        return connectDropTarget(
            <div dropId={data.id} className={cx({
                "widget-drop-container": true,
                "drag-over": isOver,
                "drop-tips": canDrop,
            })}>
                {
                    items.map(item => {
                        return <WidgetDropItem data={item} />
                    })
                }
            </div>
        );
    }
}

export default DropTarget(Types.WidgetComponent, spec, collect)(WidgetDropTarget);