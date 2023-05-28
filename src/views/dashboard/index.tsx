import React from "react"
import { Menu } from "antd"
import type { MenuProps } from "antd"
import { Divider } from "rc-menu"
import FileView from "./components/file-overview.tsx"
import './styles/index.scoped.scss'
import { useSelector } from "react-redux"
import logo from './styles/logo.jpg'

type MenuItem = Required<MenuProps>['items'][number]

const DashBoard = () => {
    const menuItems: MenuProps['items'] = useSelector((state) => state.folder)
    /**
     * 获取菜单栏item
     */
    const getMenuItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
        ): MenuItem => {
            return {
                key,
                icon,
                children,
                label,
                type,
            } as MenuItem
    }

    /**
     * 菜单栏选项
     */
    // const menuItems: MenuProps['items'] = [
    //     getMenuItem('新建分组', 'last-open-file', null,
    //         [
    //             getMenuItem('item1', 'i1'),
    //             getMenuItem('item2', 'i2'),
    //         ]
    //     ),
    //     getMenuItem('新建分组2', 'all-group', null, [
    //         getMenuItem('测试分组1', 't1'),
    //         getMenuItem('测试分组2', 't2'),
    //     ])
    // ]

    /**
     * 左侧导航栏点击函数
     */
    const onMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e)
    }
    return (
        <div className="dashboard">
            <div className="left-side">
                <div className="logo-area">
                    <img src={logo} width={40} height={40} style={{ marginTop: '5px', marginLeft: '20px'}}></img>
                    <div className="title">Schema 工作台</div>
                </div>
                <div className="group-division">
                    <Menu
                        onClick={onMenuClick}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['1']}
                        mode="inline"
                        items={menuItems}
                    />
                </div>
            </div>
            <div className="right-side">
                <FileView/>
            </div>
        </div>
    )
}

export default DashBoard