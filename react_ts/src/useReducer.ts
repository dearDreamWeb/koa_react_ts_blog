import { createContext } from "react";
const initData = {
  categories: [],
  tags: [],
  articles: []
}; //初始数据

// 派发事件
const reducer = (state: any, action: any) => {
  switch (action.type) {
    // 保存数据
    case "saveState":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const ContextData = createContext({});

export { initData, reducer, ContextData };
