import React from 'react';
import WidgetItem from './WidgetItem';

const list = [
    {
        id: 'cmp1',
        title: "表格"
    },
    {
        id: 'cmp2',
        title: "折线图"
    },
    {
        id: 'cmp3',
        disabled: true,
        title: "饼图"
    },
    {
        id: 'cmp4',
        title: "柱状图"
    },
    {
        id: 'cmp5',
        title: "条形图"
    }
]

export default () => {
    return (
        <div className="widget-item-list">
            {
                list.map(item => <WidgetItem {...item} key={item.id} />)
            }
        </div>
    );
}