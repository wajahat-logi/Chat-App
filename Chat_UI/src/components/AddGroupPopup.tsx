import { Button, TextBox } from 'devextreme-react';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import React, { useCallback, useMemo, useRef, useState } from 'react';

export default function AddGroupPopup({ closeModal }: any) {
    const [popupVisible, setPopupVisible] = useState(false);
    const [message, setMessage] = useState("");
    const mRef = useRef('');

    const showPopup = useCallback(() => {
        setPopupVisible(true);
    }, [setPopupVisible]);


    const hide = useCallback(() => {
        setPopupVisible(false);
        setMessage('');
    }, [setPopupVisible]);

    const onCloseHandler = () => {
        hide();
        closeModal(mRef.current);
    };

    const bookButtonOptions = useMemo(() => ({
        width: 300,
        text: 'Ok',
        type: 'default',
        stylingMode: 'contained',
        onClick: onCloseHandler,
    }), [hide]);

    const onChangeHandler = (e: any) => {
        setMessage(e.value);
        mRef.current = e.value;
    };


    return (
        <React.Fragment>
            <div style={{ padding: '5px 0px 5px 3px' }} className="demo-container">
                <div className="button-container">
                    <Button
                        text="Add Group"
                        type="default"
                        width={200}
                        onClick={showPopup}
                    />
                </div>
            </div>
            <Popup
                width={360}
                height={200}
                visible={popupVisible}
                onHiding={hide}
                hideOnOutsideClick={true}
                showCloseButton={true}
                title="Add a Group">
                <div className="popup-content">
                    <div className="content">
                        <TextBox
                            value={message}
                            valueChangeEvent="keyup"
                            placeholder="Type your name here..."
                            onValueChanged={onChangeHandler}
                        />
                    </div>
                </div>
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="center"
                    options={bookButtonOptions}
                />
            </Popup>

        </React.Fragment>
    );
}
