# weapp-app-ui

## taro微信小程序项目模版

## Build Setup

```bash
# 获取微信小程序appid，并填写以下文件中的appid值
## project.tt.json
## project.config.json

# install dependencies
pnpm install

# serve with hot reload
pnpm dev:weapp

# build for production with minification
pnpm build:weapp
```

### 一、系统简介

#### 1.1、概述

Taro3+Vue3+Typescript+NutUI4 微信小程序项目模版

#### 1.2 服务维护者

- name: jianfengtheboy email: jianfengtheboy@163.com

### 二、系统介绍

#### 2.1、主要技术

- 1、taro@^3.6.7
- 2、vue@^3.2.40
- 3、taro-plugin-pinia@^1.0.0
- 4、pinia@^2.1.3
- 5、typescript@^4.1.0
- 6、nutui@^4.0.4

#### 2.2、项目结构

##### 文件说明

| 文件名称           | 说明                                               |
| ----------------- | -------------------------------------------------- |
| config            | 项目全局公共配置                                  |
| src               | 项目配置项目开发的所有内容页面                      |
| src/assets        | 配置项目所需的公共的静态资源页面                    |
| src/components    | 配置项目基础相关、业务相关的公共组件                 |
| src/composables   | 配置路由相关资源                                  |
| src/config        | 配置项目的一些全局公共配置                         |
| src/custom-tab-bar| 自定义tabbar                                    |
| src/hooks         | 全局基础hooks、业务hooks                         |
| src/model         | 全局数据模型                                     |
| src/packages      | 分包处理根目录，配置相关模块的页面                   |
| src/pages         | 配置业务的所有tabbar对应的页面                     |
| src/service       | 配置全局接口资源、封装请求方法                      |
| src/stores        | 配置 pinia 做全局状态管理                         |
| src/styles        | 全局样式文件                                     |
| src/utils         | 全局共用方法                                     |
| src/app.config.ts | 项目基础全局配置                                  |
| src/app.scss      | 全局css入口                                     |
| src/app.ts        | 项目入口                                        |
| types             | ts全局type配置                                  |
