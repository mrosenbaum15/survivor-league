import {Button, Form} from 'react-bootstrap';
import '../styles/login.css'

function ResetPasswordForm({
    confirmationCode,
    setConfirmationCode,
    setNewPassword,
    handleVerify,
    isValid,
    formCaption,
    formPlaceholder,
    submitCaption
}) {
    
    return (
        <>
            <div className='login-section'>
                <p>{formCaption}</p>
                <Form>
                    <Form.Group className='mb-3' controlId='formBasicNameSignup'>
                        <Form.Label></Form.Label>
                        <Form.Control isInvalid={!isValid} value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} type='code' placeholder={formPlaceholder} />
                        <Form.Text className='text-muted'>
                        </Form.Text>
                    </Form.Group>
                </Form>

                <Form>
                    <Form.Group className='mb-3' controlId='formBasicNameSignup'>
                        <Form.Label></Form.Label>
                        <Form.Control onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter new password' type='password'/>
                        <Form.Text className='text-muted'>
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Button onClick={handleVerify} variant='primary'>{submitCaption}</Button>
            </div>
        </>       
    );

}

export default ResetPasswordForm;