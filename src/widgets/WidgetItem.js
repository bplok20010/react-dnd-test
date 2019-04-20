import React from 'react';
import { Icon } from 'antd';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from './Types';

const spec = {
    beginDrag(props) {
        return props;
    },
    canDrag(props) {
        return !props.disabled;
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging,
    };
};

class WidgetItem extends React.Component {

    render() {
        const { cmpid, disabled, title = "未知组件", connectDragSource, isDragging } = this.props;

        return connectDragSource(
            <div className={cx({
                "widget-item": true,
                "widget-item-disabled": disabled,
            })}>
                <div className="widget-item-icon">
                    <Icon type="pie-chart" theme="filled" />
                </div>
                <div className="widget-item-title">
                    {title}
                </div>
            </div>
        );
    }
}

export default DragSource(Types.WidgetComponent, spec, collect)(WidgetItem);