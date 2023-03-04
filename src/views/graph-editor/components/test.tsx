import * as d3 from 'd3';
import * as React from 'react';
import ReactDOM from 'react-dom';

// 节点高
const nodeHalfHeight = 300 / 2;
// 节点宽度
const nodeWidth = 240;
// 折叠之后的高度
const foldHeight = 85 / 2;
// 未选择表数据标识
const NO_DATA = 'NO_DATA';
// 获取随机ID
const getRandomId = () => Math.random().toString(32).slice(2);


// 记录当前操作折叠的nodeId
let nodeIds: Array<any> = [];

const D3DataModel = (props: any): React.ReactElement => {
  const refs = React.useRef(null);
  // 表数据
  const [d3NodeData, setD3NodeData] = React.useState(() => {
    // nodeId 用来构建连线以及生成表格区域的ID
    // level 用来根据层级绘画表格背景色
    // data_type 用来区分是否渲染无数据背景图片
    return [{ x: 10, y: 10, data_type: NO_DATA, nodeId: getRandomId(), level: 1 }];
  });
  // d3缩放范围
  const [transformInfo, setTransformInfo] = React.useState<any>(null);

  React.useEffect(() => {
    drawModel();
  }, [d3NodeData.length]);

  const getD3Data = (): any => {
    //   ...3.Demo数据
  };

  /**
   * 计算线条文字位置
   *
   * @param {*} data
   * @return {*}
   */
  const calcuLabelPoint = (data: any): number => {
    //   ...12.计算文字坐标
  };

  /**
   * 获取缩放对象
   *
   * @param {*} g
   * @return {*}
   */
  const d3ZoomObj = (g: any): any => {
    //   ...5.缩放
  };

  /**
   * 获取拖拽对象
   *
   * @param {*} simulation 力模型
   * @return {*}  {object}
   */
  const d3DragObj = (simulation: any): any => {
    //   ...6.拖拽
  };

  /**
   * 构建表格
   *
   * @param {*} g
   * @param {*} data
   * @param {*} drag
   * @return {*}
   */
  const buildTable = (g: any, data: any, drag: any): any => {
    //   ...7.构建表格节点
  };

  /**
   * 构建线条
   *
   * @param {*} g
   * @param {*} data
   * @return {*}  {*}
   */
  const buildLine = (g: any, data: any): any => {
    //   ...8.构建线条
  };

  /**
   * 构建线条文字
   *
   * @param {*} g
   * @param {*} data
   * @return {*}  {*}
   */
  const buildLineLabel = (g: any, data: any): any => {
    //   ...9.构建线条文字
  };

  /**
   * 构建箭头
   *
   * @param {*} g
   * @return {*}  {*}
   */
  const buildArrow = (g: any): any => {
    //   ...10.构建箭头
  };

  /**
   * 绘画
   *
   */
  const drawModel = () => {
    //   ...2.绘制函数
  };

  /**
   * 渲染数据表
   *
   * @param {*} props
   */
  const renderDataTable = (props: any) => {
    //   ...13.渲染React组件到图形中
  };

  return (
    <section className={'d3-dataModel-area'}>
      <div className={'popup-element'} />
      <div className={'d3-element'} ref={refs} />
    </section>
  );
};

export default D3DataModel;