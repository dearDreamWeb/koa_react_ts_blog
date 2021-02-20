import React, { FC, useEffect, useState, useRef } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './editor.scss';
import { Input, Modal, Button, Tag, Form, Radio } from 'antd';

const Editor: FC<{}> = () => {
    const [editorState, setEditorState] = useState<string>('');
    const [outputHTML, setOutputHTML] = useState<string>('');  // 富文本编辑器输出的html代码
    const [isModalVisible, setIsModalVisible] = useState(false);  // 是否显示弹窗

    const previewRef = useRef<HTMLDivElement>(null);

    // 编辑器改变时触发
    const handleChange = (editorState: any) => {
        setEditorState(editorState);
        setOutputHTML(editorState.toHTML());
        previewRef.current!.innerHTML = editorState.toHTML();
    }

    // 提交弹窗
    const handleOk = () => {
        setIsModalVisible(false);
    }

    // 关闭弹窗
    const handleCancel = () => {
        setIsModalVisible(false);
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
            >
                <Form>
                    <Form.Item>
                        <Radio.Group>
                            <Radio.Button value="a">1</Radio.Button>
                            <Radio.Button value="b">2</Radio.Button>
                            <Radio.Button value="c">3</Radio.Button>
                            <Radio.Button value="d">4</Radio.Button>
                            <Radio.Button value="e">5</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}

export default Editor;