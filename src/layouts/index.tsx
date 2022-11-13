/**
 * 全局布局
 */
import React from 'react';
import c from './index.module.less';
import { Menu } from 'antd';
import { useLocation, useHistory } from 'umi';

const Layouts = ({children}: any) => {
  const _location = useLocation();
  const pathname = _location.pathname;
  const _history = useHistory();
  return (
    <div className={c.wrap}>
      <div className={c.pageLeft}>
        <Menu
          selectedKeys={[pathname]}
          onSelect={({ key }: any) => {
            _history.push(key);
          }}
        >
          <Menu.Item key='/'>home</Menu.Item>
          <Menu.Item key='/reactdemo'>reactdemo</Menu.Item>
          <Menu.Item key='/svgademo'>svgademo</Menu.Item>
          <Menu.Item key='/arraysort'>array sort</Menu.Item>
          <Menu.Item key='/webgldemo'>webgl demo</Menu.Item>
          <Menu.Item key='/graph'>graph</Menu.Item>
          <Menu.Item key='/questions'>questions</Menu.Item>
          <Menu.Item key='/magic'>magic</Menu.Item>
        </Menu>
      </div>
      <div className={c.pageRight}>{children}</div>
    </div>
  )
}
export default Layouts;
