import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {CLOSE_PROFILE_INFO_MODAL} from '../../../../redux/actionTypes/user/profileTypes'

const ProfileEditorModal = () => {  
    var description = "";
    const dispatch = useDispatch();
    const { handleSubmit, register, watch, errors } = useForm();

    const cProfileInfo = useSelector(state => state.profileInfo.cProfile);
    const handleProfileInfoClose = () => dispatch({type:CLOSE_PROFILE_INFO_MODAL});
    const showProfileInfoModal = useSelector(state => state.profileInfo.profileInfoModalState);

    const onSubmit = data => {
        cProfileInfo.description = data.description;
        axios.post(
            '/api/profile/updateProfileInformation',
            cProfileInfo
        )
        .then(res => {
            console.log(res);
        })
        .catch(err =>  console.log(err));
    }

    return (
        <Modal show={showProfileInfoModal} onHide={handleProfileInfoClose}>
            <Modal.Header id="modalHeader" closeButton></Modal.Header>
            <Modal.Body> 
                <form onSubmit = {handleSubmit(onSubmit)}>
                    <Form.Group controlId="formUserDescription">
                        <Form.Control 
                            name="description" 
                            type="description" 
                            placeholder="Description" 
                            defaultValue={cProfileInfo ? cProfileInfo.description : ""}
                            ref={register({
                            })}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </form>
            </Modal.Body>
        </Modal> 
    )
}

export default ProfileEditorModal;