import {Button, Form} from 'react-bootstrap';
import '../styles/login.css'

function VerifyAccountForm({
    confirmationCode,
    setConfirmationCode,
    handleVerify,
    isValid,
    formCaption,
    formPlaceholder,
    submitCaption
}) {
    
    return (
        <>
            <div className='login-section'>
                <Form>
                    <Form.Group className='mb-3' controlId='formBasicNameSignup'>
                        <Form.Label>{formCaption}</Form.Label>
                        <Form.Control isInvalid={!isValid} value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} type='code' placeholder={formPlaceholder} />
                        <Form.Text className='text-muted'>
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Button onClick={handleVerify} variant='primary'>{submitCaption}</Button>
            </div>
        </>       
    );

}

export default VerifyAccountForm;