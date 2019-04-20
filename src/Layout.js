import React from 'react';
import { Layout } from 'antd';
import { WidgetsList, WidgetDropTarget } from './widgets';
import LayoutContext from './LayoutContext';
import { uuid } from './utils';

const {
    Header, Footer, Sider, Content,
} = Layout;

export default class AppLayout extends React.Component {

    state = {
        layoutStore: {
            version: '1.0',
            components: {},
            layouts: [
            ]
        }
    }

    getContext() {
        return this;
    }

    getLayoutChildren(id = null) {
        const { layoutStore } = this.state;
        return layoutStore.layouts.filter(item => item.pid === id)
    }

    addLayoutChildren(id, data) {
        this.setState(({ layoutStore }) => {
            data.pid = id;
            layoutStore.components[data.id] = data;
            layoutStore.layouts.push(data);
            return layoutStore;
        })
    }

    componentDidMount() {
        const { layoutStore } = this.state;
        const defaultsLayout = [
            {
                id: uuid(),
                pid: null,
            },
            {
                id: uuid(),
                pid: null,
            },
            {
                id: uuid(),
                pid: null,
            },
            {
                id: uuid(),
                pid: null,
            }
        ];

        defaultsLayout.forEach(item => {
            layoutStore.components[item.id] = item;
            layoutStore.layouts.push(item);
        });

        this.setState({
            layoutStore
        })
    }

    render() {
        const { layoutStore } = this.state;
        return (
            <LayoutContext.Provider value={this.getContext()}>
                <Layout className="main-layout">
                    <Sider theme="light">
                        <WidgetsList />
                    </Sider>
                    <Content style={{
                        padding: 10
                    }}>
                        {
                            this.getLayoutChildren(null).map(item => <WidgetDropTarget key={item.id} data={item} />)
                        }
                    </Content>
                    <Sider theme="light">BBBBB</Sider>
                </Layout>
            </LayoutContext.Provider>
        );
    }

}