import React, { FC, useEffect, useState, useRef, useContext } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './editor.scss';
import { Input, Modal, Button, Tag, Form, Radio, Checkbox, message } from 'antd';
import { ContextData } from '../../useReducer';
import { queryTags } from '../../service/api/tags';
import { addCategory, queryCategory } from '../../service/api/categories';
import { addArticles } from '../../service/api/articles';

const Editor: FC<{}> = () => {
    const { state, dispatch } = useContext<any>(ContextData);
    const [editorState, setEditorState] = useState<string>('');
    const [outputHTML, setOutputHTML] = useState<string>('');  // 富文本编辑器输出的html代码
    const [articleLen, setArticleLen] = useState<number>(0); // 文章的长度
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);  // 是否显示弹窗
    const [cateInputVis, setCateInputVis] = useState<boolean>(false);  // 添加分类输入框是否显示
    const [tagInputVis, setTagInputVis] = useState<boolean>(false);  // 添加标输入框是否显示
    const [cateInputVal, setCateInputVal] = useState<string>('');  // 添加分类输入框值
    const [tagInputVal, setTagInputVal] = useState<string>('');    // 添加标签输入框值

    const previewRef = useRef<HTMLDivElement>(null);
    const cateInputRef = useRef<any>(null);

    const { categories, tags } = state;

    useEffect(() => {
        if (cateInputVis) {
            cateInputRef.current?.focus();
        }
    }, [cateInputVis])

    // 编辑器改变时触发
    const handleChange = (editorState: any) => {
        setEditorState(editorState);
        setOutputHTML(editorState.toHTML());
        setArticleLen(editorState.toText().length)
        previewRef.current!.innerHTML = editorState.toHTML();
    }

    // 提交弹窗
    const handleOk = () => {
        setIsModalVisible(false);
        addArticles({
            articleContent: outputHTML,
            categoryId: 1,
            tagId: 1,
            articleLenght: articleLen
        }).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err));
    }

    // 关闭弹窗
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    // 添加分类
    const addCategoryHandle = () => {
        let val: string = cateInputVal ? cateInputVal.trim() : '';
        if (val) {
            addCategory({ categoryName: val }).then((res) => {
                if (!res.success) {
                    message.info(res.msg);
                    return;
                }
                // 添加成功，重新获取分类
                queryCategory({}).then(resQueryCate => {
                    if (!resQueryCate.success) {
                        message.info(resQueryCate.msg);
                        return;
                    }
                    dispatch({
                        type: 'saveState',
                        payload: {
                            categories: resQueryCate.list
                        }
                    })
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        } else {
            message.info('请输入内容');
        }
        setCateInputVis(false);
        setCateInputVal('');
    }

    return (
        <div className={styles.editor_wrap}>
            <h1 className={styles.editor_header}>
                <Input
                    className={styles.editor_header_titleInp}
                    placeholder='输入文章标题...' />
                <Button
                    type='primary'
                    className={styles.header_btn}
                    onClick={() => setIsModalVisible(true)}
                >发布</Button>
            </h1>
            <main className={styles.editor_content}>
                <BraftEditor
                    value={editorState}
                    onChange={handleChange}
                    className={styles.editor_text}
                />
                <article
                    className={styles.editor_perview}
                    ref={previewRef}
                ></article>
            </main>
            <Modal
                title="发布文章"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='发布'
                cancelText='取消'
                className={styles.model_wrap}
            >
                <Form>
                    <section className={styles.cate_wrap}>
                        <div className={styles.formItem_title}>分类</div>
                        <Form.Item>
                            <Radio.Group>
                                {
                                    categories.map((item: any) => {
                                        return (
                                            <Radio
                                                key={item.categoryId}
                                                value={item.categoryId}
                                                className={styles.radio_text}
                                            >{item.categoryName}</Radio>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </Form.Item>
                        {
                            cateInputVis
                                ? (
                                    <Input
                                        ref={cateInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={cateInputVal}
                                        onChange={(e) => setCateInputVal(e.target.value)}
                                        onBlur={addCategoryHandle}
                                        onPressEnter={addCategoryHandle}
                                    />
                                )
                                : (
                                    <Tag onClick={() => {
                                        setCateInputVis(true);
                                    }}>
                                        添加分类
                                    </Tag>
                                )
                        }

                    </section>

                    <section>
                        <div className={styles.formItem_title}>标签</div>
                        <Form.Item>
                            <Checkbox.Group>
                                {
                                    tags.map((item: any) => {
                                        return (
                                            <Checkbox
                                                key={item.tagId}
                                                value={item.tagId}
                                                className={styles.checkbox_text}
                                            >{item.tagName}</Checkbox>
                                        )
                                    })
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    </section>
                </Form>

            </Modal>
        </div>
    )
}

export default Editor;