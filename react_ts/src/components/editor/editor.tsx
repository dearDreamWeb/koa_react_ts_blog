import React, { FC, useEffect, useState, useRef, useContext } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './editor.scss';
import { Input, Modal, Button, Tag, Form, Radio, Checkbox, message } from 'antd';
import { ContextData } from '../../useReducer';
import { addCategory, queryCategory } from '../../service/api/categories';
import { addTag, queryTags } from '../../service/api/tags';
import { addArticles } from '../../service/api/articles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group'


const Editor: FC<{}> = (props: any) => {
    const { state, dispatch } = useContext<any>(ContextData);
    const [editorState, setEditorState] = useState<string>('');
    const [outputHTML, setOutputHTML] = useState<string>('');  // 富文本编辑器输出的html代码
    const [articleLen, setArticleLen] = useState<number>(0); // 文章的长度
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);  // 是否显示弹窗
    const [cateInputVis, setCateInputVis] = useState<boolean>(false);  // 添加分类输入框是否显示
    const [tagInputVis, setTagInputVis] = useState<boolean>(false);  // 添加标输入框是否显示
    const [cateInputVal, setCateInputVal] = useState<string>('');  // 添加分类输入框值
    const [tagInputVal, setTagInputVal] = useState<string>('');    // 添加标签输入框值
    const [radioVal, setRadioVal] = useState<Number | null>(null);  //  单选组选择的值
    const [checkboxVal, setCheckboxVal] = useState<Array<CheckboxValueType>>([]);  //  多选组选择的值

    const previewRef = useRef<HTMLDivElement>(null);
    const cateInputRef = useRef<any>(null);
    const tagInputRef = useRef<any>(null);

    const { categories, tags } = state;

    useEffect(() => {
        if (cateInputVis) {
            cateInputRef.current?.focus();
        }
    }, [cateInputVis])


    useEffect(() => {
        if (tagInputVis) {
            tagInputRef.current?.focus();
        }
    }, [tagInputVis])

    // 编辑器改变时触发
    const handleChange = (editorState: any) => {
        setEditorState(editorState);
        setOutputHTML(editorState.toHTML());
        setArticleLen(editorState.toText().length)
        previewRef.current!.innerHTML = editorState.toHTML();
    }

    // 提交弹窗
    const handleOk = () => {
        if (!radioVal || checkboxVal.length === 0) {
            message.info('请选择对应的选项')
            return;
        }
        setIsModalVisible(false);
        addArticles({
            articleContent: outputHTML,
            categoryId: radioVal,
            tagArrId: checkboxVal,
            articleLenght: articleLen
        }).then((res) => {
            if (!res.success) {
                message.info(res.msg);
                return;
            }
            message.success(res.msg);
            props.history.push('/');
        }).catch((err) => console.log(err));
    }

    // 关闭弹窗
    const handleCancel = () => {
        setIsModalVisible(false);
        setRadioVal(null);
        setCheckboxVal([]);
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

    // 添加标签
    const addTagHandle = () => {
        let val: string = tagInputVal ? tagInputVal.trim() : '';
        if (val) {
            addTag({ tagName: val }).then((res) => {
                if (!res.success) {
                    message.info(res.msg);
                    return;
                }

                // 添加成功，重新获取标签
                queryTags({}).then(resQueryTag => {
                    if (!resQueryTag.success) {
                        message.info(resQueryTag.msg);
                        return;
                    }
                    dispatch({
                        type: 'saveState',
                        payload: {
                            tags: resQueryTag.list
                        }
                    })
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        } else {
            message.info('请输入内容');
        }
        setTagInputVis(false);
        setTagInputVal('');
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
                            <Radio.Group value={radioVal} onChange={(e) => setRadioVal(e.target.value)}>
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
                                        <FontAwesomeIcon icon={faPlus} className={styles.add_icon} />
                                        添加分类
                                    </Tag>
                                )
                        }

                    </section>

                    <section>
                        <div className={styles.formItem_title}>标签</div>
                        <Form.Item>
                            <Checkbox.Group value={checkboxVal} onChange={(arr: Array<CheckboxValueType>) => setCheckboxVal(arr)}>
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
                        {
                            tagInputVis
                                ? (
                                    <Input
                                        ref={tagInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={tagInputVal}
                                        onChange={(e) => setTagInputVal(e.target.value)}
                                        onBlur={addTagHandle}
                                        onPressEnter={addTagHandle}
                                    />
                                )
                                : (
                                    <Tag
                                        onClick={() => {
                                            setTagInputVis(true);
                                        }}>
                                        <FontAwesomeIcon icon={faPlus} className={styles.add_icon} />
                                        添加标签
                                    </Tag>
                                )
                        }

                    </section>
                </Form>

            </Modal>
        </div>
    )
}

export default Editor;