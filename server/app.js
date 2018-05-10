'use strict';

const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
// const nj = require('nornj');
// const njExpressEngine = require('nornj/tools/expressEngine');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const configs = require('../configs');
const app = express();

//启动webpack dev server

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:8808');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") res.send(200);
  else next();
});

const priceQuery = require('./routes/purchasePrice/priceQuery');
app.use('/vcs', priceQuery);
//{pages}//

const { resultData } = require('./common/utils');

app.get('/', function(req, res) {
  res.redirect('/index');
});

app.get('/api/getUserinfo', function(req, res) {
    res.type('json');
    let ret = {};
    Object.assign(ret, resultData, {
        data: {
            username:'Silver',
            avatar:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Leica_Camera_logo.svg/2000px-Leica_Camera_logo.svg.png'
        }
    });
  
    res.send(ret);
});

app.get('/api/getSystemMenu', function(req, res) {
    res.type('json');
    let ret = {};
    Object.assign(ret, resultData, {
        data: [
            {
                type: 'group',
                index: 'Menu1_1',
                name: '功能一',
                expanded: false,
                children: [{
                        type: 'link-item',
                        index: 'Page1',
                        name: 'Page1',
                        expanded: false,
                        icon:'area-chart',
                        link: '/page1',
                        children: []
                    }, {
                        type: 'link-item',
                        index: 'Page2',
                        name: 'Page2',
                        expanded: false,
                        icon:'appstore-o',
                        link: '/Page2',
                        children: []
                    }, {
                        type: 'link-item',
                        index: 'Page3',
                        name: 'Page3',
                        expanded: false,
                        icon:'area-chart',
                        link: '/page3',
                        children: []
                    }
                ]
            }, 
            {
                type: 'link-item',
                index: 'Page4',
                name: '功能二',
                link: '/page4',
            }, 
            {
                type: 'link-item',
                index: 'Page5',
                name: '功能三',
                link: '/page5',
            }
        ]
    });
  
    res.send(ret);
});

app.post('/api/signin', function(req, res) {
    res.type('json');
    let ret = {};
    Object.assign(ret, resultData, {
      data: true
    });
  
    res.send(ret);
});


app.post('/api/getDept', function(req, res) {
  res.type('json');
  let ret = {};
  Object.assign(ret, resultData, {
    data: [
        {
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
              value: 'yizhi',
              label: '一致'
          }, {
              value: 'fankui',
              label: '反馈'
          }, {
              value: 'xiaolv',
              label: '效率'
          }, {
              value: 'kekong',
              label: '可控'
          }]
          }, {
          value: 'daohang',
          label: '导航',
          children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
          }, {
              value: 'dingbudaohang',
              label: '顶部导航'
          }]
        }]
        }, {
            value: 'zujian',
            label: '组件',
            children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
                value: 'layout',
                label: 'Layout 布局'
            }, {
                value: 'color',
                label: 'Color 色彩'
            }, {
                value: 'typography',
                label: 'Typography 字体'
            }, {
                value: 'icon',
                label: 'Icon 图标'
            }, {
                value: 'button',
                label: 'Button 按钮'
            }]
            }, {
            value: 'form',
            label: 'Form',
            children: [{
                value: 'radio',
                label: 'Radio 单选框'
            }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
            }, {
                value: 'input',
                label: 'Input 输入框'
            }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
            }, {
                value: 'select',
                label: 'Select 选择器'
            }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
            }, {
                value: 'switch',
                label: 'Switch 开关'
            }, {
                value: 'slider',
                label: 'Slider 滑块'
            }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
            }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
            }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
            }, {
                value: 'upload',
                label: 'Upload 上传'
            }, {
                value: 'rate',
                label: 'Rate 评分'
            }, {
                value: 'form',
                label: 'Form 表单'
            }]
            }, {
            value: 'data',
            label: 'Data',
            children: [{
                value: 'table',
                label: 'Table 表格'
            }, {
                value: 'tag',
                label: 'Tag 标签'
            }, {
                value: 'progress',
                label: 'Progress 进度条'
            }, {
                value: 'tree',
                label: 'Tree 树形控件'
            }, {
                value: 'pagination',
                label: 'Pagination 分页'
            }, {
                value: 'badge',
                label: 'Badge 标记'
            }]
            }, {
            value: 'notice',
            label: 'Notice',
            children: [{
                value: 'alert',
                label: 'Alert 警告'
            }, {
                value: 'loading',
                label: 'Loading 加载'
            }, {
                value: 'message',
                label: 'Message 消息提示'
            }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
            }, {
                value: 'notification',
                label: 'Notification 通知'
            }]
            }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
            }, {
                value: 'tabs',
                label: 'Tabs 标签页'
            }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
            }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
            }, {
                value: 'steps',
                label: 'Steps 步骤条'
            }]
            }, {
            value: 'others',
            label: 'Others',
            children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
            }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
            }, {
                value: 'popover',
                label: 'Popover 弹出框'
            }, {
                value: 'card',
                label: 'Card 卡片'
            }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
            }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
            }]
            }]
        }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
            value: 'axure',
            label: 'Axure Components'
            }, {
            value: 'sketch',
            label: 'Sketch Templates'
            }, {
            value: 'jiaohu',
            label: '组件交互文档'
            }]
        }
    ]
  });

  res.send(ret);
});

app.post('/api/fetchPage1Data', function(req, res) {
  res.type('json');
  let ret = {};
  Object.assign(ret, resultData, {
    data: {
      chart1: [
        [_.random(1, 1000), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(-101, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["供应链协同研发部", "08-31", "09-30", "10-31", "11-30", "07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart2: [
        [10, 20, 30, 40, 50],
        ["类目类目类目", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart3: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30", "07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart4: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart5: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30", "07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart6: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart7: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30", "07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart8: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart9: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30", "07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart10: [
        [_.random(1000000, 9999999), _.random(1000000, 9999999), _.random(1000000, 9999999), _.random(1000000, 9999999), _.random(1000000, 9999999)],
        ["07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart11: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30", "07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      chart12: [
        [_.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100), _.random(1, 100)],
        ["07-31", "08-31", "09-30", "10-31", "11-30"]
      ],
      block1Value:_.random(1, 100),
      block2Value:_.random(1, 100),
      block3Value:_.random(1, 100),
      block4Value:_.random(1, 100),
      block5Value:_.random(1000000, 9999999),
      block6Value:_.random(1, 100),
    }
  });

  res.send(ret);
});

app.post('/api/fetchPage2Data', function(req, res) {
  res.type('json');
  let ret = {};
  Object.assign(ret, resultData, {
    data: {
      value1:_.random(1000000, 9999999),
      value2:_.random(1000000, 9999999),
      value3:_.random(1000000, 9999999),
      value4:_.random(1000000, 9999999),
      value5:_.random(1000000, 9999999),
      value6:_.random(1000000, 9999999),
      value7:_.random(1000000, 9999999),
      value8:_.random(1000000, 9999999),
      updateTime: new Date().getTime()
    }
  });

  res.send(ret);
});


let server = app.listen(3008, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
