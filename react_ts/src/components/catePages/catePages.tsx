import React, { FC, useEffect, useState, useContext } from 'react';
import styles from './catePages.scss';
import { ContextData } from "../../useReducer" //引入useReducer文件
import { queryAllCategory } from '../../service/api/categories';

interface Props {
    // history: any; 
}

const CatePages: FC<Props> = (props) => {
    // <!-- 获取是state和dispatch -->
    const { state, dispatch } = useContext<any>(ContextData);

    useEffect(() => {
        queryAllCategory({}).then((res) => {
            console.log(res)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div>

        </div>
    )
}

export default CatePages;